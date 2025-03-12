import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Cart from './Cart'
import { useCartStore } from '@/store/cartStore'

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const items = useCartStore((state) => state.items)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-pearl/80 backdrop-blur-sm fixed w-full z-50 border-b border-gold/10">
      <nav className="mx-auto max-w-8xl px-6 lg:px-12" aria-label="Top">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center space-x-16">
            <Link 
              href="/" 
              className="relative group"
            >
              <span className="font-serif text-3xl text-navy group-hover:text-plum transition-colors duration-300">
                Aurealis
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="hidden space-x-12 lg:block">
              <Link 
                href="/shop" 
                className="relative group inline-block"
              >
                <span className="font-accent text-lg text-navy group-hover:text-gold transition-colors duration-300">
                  Collections
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/categories" 
                className="relative group inline-block"
              >
                <span className="font-accent text-lg text-navy group-hover:text-gold transition-colors duration-300">
                  Categories
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/about" 
                className="relative group inline-block"
              >
                <span className="font-accent text-lg text-navy group-hover:text-gold transition-colors duration-300">
                  Our Story
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/contact" 
                className="relative group inline-block"
              >
                <span className="font-accent text-lg text-navy group-hover:text-gold transition-colors duration-300">
                  Contact
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="group flex items-center p-3 hover:bg-gold/5 rounded-full transition-all duration-300"
            >
              <ShoppingBagIcon
                className="h-6 w-6 flex-shrink-0 text-navy group-hover:text-gold transition-colors duration-300"
                aria-hidden="true"
              />
              {itemCount > 0 && (
                <span className="ml-2 text-sm font-medium text-gold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  )
}
