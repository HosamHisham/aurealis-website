import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check environment variables first
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_SUPABASE_URL is not set' },
        { status: 500 }
      )
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_SUPABASE_ANON_KEY is not set' },
        { status: 500 }
      )
    }

    const supabase = await createClient()
    
    // Test query to get featured products
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, category, image_url')
      .eq('featured', true)
      .limit(1)

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json({
        error: error.message,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL
      }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Supabase connection successful',
      data,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL
    })
  } catch (error) {
    console.error('Error testing Supabase connection:', error)
    return NextResponse.json(
      {
        error: 'Failed to connect to Supabase',
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL
      },
      { status: 500 }
    )
  }
}
