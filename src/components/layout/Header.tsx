import { Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { ShoppingBagIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { useStore } from '@/store/cart'

const navigation = {
  categories: [
    {
      name: 'Shop',
      featured: [
        { name: 'New Arrivals', href: '/shop/new-arrivals' },
        { name: 'Bestsellers', href: '/shop/bestsellers' },
        { name: 'Skincare', href: '/shop/skincare' },
        { name: 'Makeup', href: '/shop/makeup' },
      ],
    },
  ],
  pages: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
}

export default function Header() {
  const cartItems = useStore((state) => state.items)

  return (
    <header className="relative bg-white">
      <nav aria-label="Top">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="hidden lg:flex lg:items-center">
                <Link href="/" className="text-2xl font-bold text-gray-900">
                  AUREALIS
                </Link>
              </div>

              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button className="relative z-10 flex items-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800">
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full">
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                    {category.featured.map((item) => (
                                      <div key={item.name} className="group relative">
                                        <Link href={item.href} className="mt-4 block font-medium text-gray-900">
                                          {item.name}
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex flex-1 items-center lg:hidden">
                <button
                  type="button"
                  className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <Link href="/" className="lg:hidden">
                <span className="sr-only">Aurealis</span>
                <span className="text-2xl font-bold text-gray-900">AUREALIS</span>
              </Link>

              <div className="flex flex-1 items-center justify-end">
                <Link href="/auth/signin" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Account</span>
                  <UserIcon className="h-6 w-6" aria-hidden="true" />
                </Link>

                <Link href="/cart" className="ml-4 group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cartItems?.length || 0}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}