import { createClient } from '@/lib/supabase/server'
import { type CartItem, clearCart } from './cart'
import { type UserProfile } from './auth'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type Order = {
  id: string
  user_id: string
  status: OrderStatus
  total_amount: number
  shipping_address: UserProfile['shipping_address']
  billing_address: UserProfile['billing_address']
  shipping_method: string
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_time: number
  created_at: string
  product?: {
    name: string
    image_url: string
    category: string
  }
}

/**
 * Create a new order from cart items
 * @param shippingMethod Selected shipping method
 * @param notes Optional order notes
 * @returns Created order or error
 */
type CartItemWithProduct = {
  quantity: number
  product: {
    id: string
    name: string
    price: number
    stock_quantity: number
  } | null
}

type CartItemResponse = {
  quantity: number
  product: {
    id: string
    name: string
    price: number
    stock_quantity: number
  }[]
}

export async function createOrder(shippingMethod: string, notes?: string) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) return { data: null, error: new Error('No authenticated user') }

    // Get user profile for addresses
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('shipping_address, billing_address')
      .eq('id', user.id)
      .single()

    if (profileError) throw profileError
    if (!profile.shipping_address || !profile.billing_address) {
      throw new Error('Shipping and billing addresses are required')
    }

    // Get cart items with product details
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select(`
        quantity,
        product:products (
          id,
          name,
          price,
          stock_quantity
        )
      `)
      .eq('user_id', user.id)

    if (cartError) throw cartError
    if (!cartItems?.length) {
      throw new Error('Cart is empty')
    }

    // Calculate total and validate stock
    let totalAmount = 0
    const orderItems: Array<{
      product_id: string
      quantity: number
      price_at_time: number
    }> = []

    const typedCartItems = (cartItems as CartItemResponse[]).map(item => ({
      quantity: item.quantity,
      product: item.product[0] || null
    })) as CartItemWithProduct[]

    for (const item of typedCartItems) {
      if (!item.product) continue
      if (item.product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${item.product.name}`)
      }
      totalAmount += item.product.price * item.quantity
      orderItems.push({
        product_id: item.product.id,
        quantity: item.quantity,
        price_at_time: item.product.price
      })
    }

    // Start transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: user.id,
          status: 'pending' as const,
          total_amount: totalAmount,
          shipping_address: profile.shipping_address,
          billing_address: profile.billing_address,
          shipping_method: shippingMethod,
          notes
        }
      ])
      .select()
      .single()

    if (orderError) throw orderError

    // Insert order items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(
        orderItems.map(item => ({
          order_id: order.id,
          ...item
        }))
      )

    if (itemsError) throw itemsError

    // Update product stock quantities
    for (const item of typedCartItems) {
      if (!item.product) continue
      const { error: stockError } = await supabase
        .from('products')
        .update({ 
          stock_quantity: item.product.stock_quantity - item.quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', item.product.id)

      if (stockError) throw stockError
    }

    // Clear the cart
    await clearCart()

    return { data: order, error: null }
  } catch (error) {
    console.error('Error creating order:', error)
    return { data: null, error }
  }
}

/**
 * Get user's order history
 * @param limit Number of orders to fetch
 * @param offset Offset for pagination
 * @returns List of orders with items or error
 */
export async function getOrderHistory(limit: number = 10, offset: number = 0) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) return { data: [], error: new Error('No authenticated user') }

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items (
          id,
          quantity,
          price_at_time,
          product:products (
            name,
            image_url,
            category
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (ordersError) throw ordersError
    return { data: orders || [], error: null }
  } catch (error) {
    console.error('Error fetching order history:', error)
    return { data: [], error }
  }
}

/**
 * Get a specific order's details
 * @param orderId Order ID to fetch
 * @returns Order details with items or error
 */
export async function getOrderDetails(orderId: string) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) return { data: null, error: new Error('No authenticated user') }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items (
          id,
          quantity,
          price_at_time,
          product:products (
            name,
            image_url,
            category
          )
        )
      `)
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (orderError) throw orderError
    return { data: order, error: null }
  } catch (error) {
    console.error('Error fetching order details:', error)
    return { data: null, error }
  }
}

/**
 * Cancel an order if it's still pending
 * @param orderId Order ID to cancel
 * @returns Updated order or error
 */
export async function cancelOrder(orderId: string) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) return { data: null, error: new Error('No authenticated user') }

    // Get order status and items
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        status,
        items:order_items (
          product_id,
          quantity
        )
      `)
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (orderError) throw orderError
    if (!order) throw new Error('Order not found')
    if (order.status !== 'pending') {
      throw new Error('Only pending orders can be cancelled')
    }

    // Restore product stock quantities
    for (const item of (order.items || [])) {
      // Update stock directly since we can't use RPC
      const { data: product, error: getError } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', item.product_id)
        .single()

      if (getError) throw getError
      if (!product) continue

      const { error: stockError } = await supabase
        .from('products')
        .update({ 
          stock_quantity: product.stock_quantity + item.quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', item.product_id)

      if (stockError) throw stockError
    }

    // Update order status
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({ 
        status: 'cancelled' as const,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) throw updateError
    return { data: updatedOrder, error: null }
  } catch (error) {
    console.error('Error cancelling order:', error)
    return { data: null, error }
  }
}
