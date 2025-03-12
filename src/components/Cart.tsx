import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'

interface CartProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Cart({ isOpen, setIsOpen }: CartProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-navy/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-pearl shadow-luxury">
                    <div className="flex-1 overflow-y-auto px-6 py-8">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="font-serif text-2xl text-navy">Your Collection</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative p-2 text-navy hover:text-gold transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-navy/10">
                            {items.map((item) => (
                              <li key={item.id} className="flex py-8">
                                <div className="h-32 w-32 flex-shrink-0 overflow-hidden shadow-luxury">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={128}
                                    height={128}
                                    className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                                  />
                                </div>

                                <div className="ml-6 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between">
                                      <h3 className="font-serif text-lg text-navy">{item.name}</h3>
                                      <p className="ml-4 font-accent text-lg text-gold">${item.price.toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between">
                                    <div className="flex items-center space-x-3 bg-white/50 rounded-full px-4 py-1 shadow-luxury">
                                      <button
                                        onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                                        className="text-navy hover:text-gold transition-colors duration-300 text-lg font-medium"
                                      >
                                        −
                                      </button>
                                      <p className="font-accent text-navy">{item.quantity}</p>
                                      <button
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        className="text-navy hover:text-gold transition-colors duration-300 text-lg font-medium"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => removeItem(item.productId)}
                                      className="font-accent text-plum hover:text-gold transition-colors duration-300"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-navy/10 px-6 py-8">
                      <div className="flex justify-between items-baseline">
                        <p className="font-serif text-xl text-navy">Total</p>
                        <p className="font-accent text-2xl text-gold">${getTotal().toFixed(2)}</p>
                      </div>
                      <p className="mt-2 text-sm text-warm-gray font-light">Complimentary shipping on orders over $200</p>
                      <div className="mt-8">
                        <a
                          href="#"
                          className="flex items-center justify-center bg-navy text-pearl px-8 py-4 text-lg font-medium hover:bg-plum transition-colors duration-300 shadow-luxury"
                        >
                          Proceed to Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center">
                        <button
                          type="button"
                          className="font-accent text-navy hover:text-gold transition-colors duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          Continue Exploring
                          <span aria-hidden="true" className="ml-2">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
