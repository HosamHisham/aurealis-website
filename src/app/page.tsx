import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import FeaturedProducts from '@/components/FeaturedProducts'
import { createClient } from '@/lib/supabase/server'
import type { Product, ProductError } from '@/types/products'

export default async function Home() {
  let featuredProducts: Product[] = []
  let error: ProductError | null = null

  try {
    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing required Supabase environment variables')
    }

    // Initialize Supabase client
    const supabase = await createClient()

    // Fetch featured products
    const { data, error: dbError } = await supabase
      .from('products')
      .select('id, name, description, price, category, image_url, featured, benefits, ingredients, stock_quantity, created_at, updated_at')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6)

    if (dbError) {
      console.error('Error fetching featured products:', dbError)
      error = {
        message: 'Failed to fetch featured products',
        details: dbError.message
      }
    } else {
      featuredProducts = (data as Product[]) || []
    }
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e)
    error = {
      message: 'Failed to connect to database',
      details: e instanceof Error ? e.message : 'Unknown error'
    }
  }

  return (
    <div className="min-h-screen bg-pearl">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh]">
          <div className="absolute inset-0 bg-gradient-luxury opacity-90" />
          <div className="relative h-full flex items-center justify-center bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
            <div className="text-center max-w-4xl mx-auto px-4 animate-fade-in">
              <h1 className="font-serif text-6xl md:text-7xl font-medium tracking-tight text-pearl mb-8">
                <span className="block">Discover Your</span>
                <span className="block text-gold font-accent italic">Timeless Beauty</span>
              </h1>
              <p className="text-lg md:text-xl text-pearl/90 mb-12 max-w-2xl mx-auto font-light">
                Indulge in our exquisite collection of premium cosmetics. Each product is meticulously crafted to enhance your natural radiance.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-gold text-navy px-12 py-4 text-lg font-medium hover:bg-gold/90 transition-colors shadow-gold"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <FeaturedProducts products={featuredProducts} error={error} />

        {/* Categories */}
        <section className="py-24 px-4 bg-gradient-luxury">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="font-serif text-4xl text-pearl mb-4">Curated Collections</h2>
              <p className="text-pearl/80 font-light max-w-2xl mx-auto">Explore our thoughtfully curated categories, each designed to elevate your beauty ritual.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {['Skincare', 'Makeup', 'Body Care', 'Fragrance'].map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="relative overflow-hidden group animate-slide-up"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <div className="relative h-64">
                      <Image
                        src={`/images/categories/${category.toLowerCase().replace(' ', '-')}.jpg`}
                        alt={category}
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/50 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="text-center transform group-hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="font-serif text-2xl text-pearl mb-2">{category}</h3>
                        <span className="text-gold font-accent italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">Discover More</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
