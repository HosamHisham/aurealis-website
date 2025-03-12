import { createClient } from '@/lib/supabase/server'

export type CartItem = {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: {
    id: string
    name: string
    description: string
    price: number
    category: string
    image_url: string
    stock_quantity: number
  }
}

/**
 * Get the current user's cart items with product details
 * @returns Cart items with product information or error
 */
export async function getCartItems() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) return { data: [], error: new Error('No authenticated user') }

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        user_id,
        product_id,
        quantity,
        created_at,
        product:products (
          id,
          name,
          description,
          price,
          category,
          image_url,
          stock_quantity
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error fetching cart items:', error)
    return { data: [], error }
  }
}

/**
 * Add a product to the cart
 * @param productId Product ID to add
 * @param quantity Quantity to add
 * @returns Added cart item or error
 */
export async function addToCart(productId: string, quantity: number = 1) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) return { data: null, error: new Error('No authenticated user') }

    // Check if product exists and has sufficient stock
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('stock_quantity')
      .eq('id', productId)
      .single()

    if (productError) throw productError
    if (!product) throw new Error('Product not found')
    if (product.stock_quantity < quantity) {
      throw new Error('Insufficient stock')
    }

    // Check if product already exists in cart
    const { data: existingItem, error: existingError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .single()

    if (existingError && existingError.code !== 'PGRST116') throw existingError

    let result
    if (existingItem) {
      // Update existing cart item
      const newQuantity = existingItem.quantity + quantity
      if (newQuantity > product.stock_quantity) {
        throw new Error('Cannot exceed available stock')
      }

      result = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select()
        .single()
    } else {
      // Add new cart item
      result = await supabase
        .from('cart_items')
        .insert([
          {
            user_id: user.id,
            product_id: productId,
            quantity
          }
        ])
        .select()
        .single()
    }

    if (result.error) throw result.error
    return { data: result.data, error: null }
  } catch (error) {
    console.error('Error adding to cart:', error)
    return { data: null, error }
  }
}

/**
 * Update cart item quantity
 * @param cartItemId Cart item ID to update
 * @param quantity New quantity
 * @returns Updated cart item or error
 */
export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) return { data: null, error: new Error('No authenticated user') }

    // Get cart item and check stock
    const { data: cartItem, error: cartError } = await supabase
      .from('cart_items')
      .select('product_id')
      .eq('id', cartItemId)
      .eq('user_id', user.id)
      .single()

    if (cartError) throw cartError
    if (!cartItem) throw new Error('Cart item not found')

    // Check product stock
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('stock_quantity')
      .eq('id', cartItem.product_id)
      .single()

    if (productError) throw productError
    if (!product) throw new Error('Product not found')
    if (product.stock_quantity < quantity) {
      throw new Error('Insufficient stock')
    }

    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating cart item:', error)
    return { data: null, error }
  }
}

/**
 * Remove an item from the cart
 * @param cartItemId Cart item ID to remove
 * @returns Success status or error
 */
export async function removeFromCart(cartItemId: string) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) return { data: null, error: new Error('No authenticated user') }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)
      .eq('user_id', user.id)

    if (error) throw error
    return { data: true, error: null }
  } catch (error) {
    console.error('Error removing from cart:', error)
    return { data: null, error }
  }
}