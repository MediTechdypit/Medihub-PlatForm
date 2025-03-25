'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className=" fixed top-0 bg-white  w-full z-50">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between  px-4 py-2.5 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                   <span className="sr-only">MediHub</span>
                   <div className="bg-transparent flex items-center justify-center ">
                       <h1 className="text-black font-bold text-lg flex items-center">
                          <span className="text-4xl text-red-500">M</span> {/* Larger and red */}
                           <span className="animate-text-change text-3xl ">ediHub</span> {/* Color-changing effect */}
                       </h1>
                   </div>
                    </Link >
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-950 focus:ring-2 focus:ring-gray-300"
                    >
                        <span className="sr-only">{mobileMenuOpen ? "Close main menu" : "Open main menu"}</span>
                        {mobileMenuOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <a href="#" className="text-sm font-semibold text-gray-800 lg:text-gray-250 hover:text-gray-900">
                        Features
                    </a>
                    <a href="#" className="text-sm font-semibold text-gray-800 lg:text-gray-250 hover:text-gray-900">
                        Marketplace
                    </a>
                    <a href="#" className="text-sm font-semibold text-gray-800 lg:text-gray-250 hover:text-gray-900">
                        Company
                    </a>
                </PopoverGroup>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/login" className="text-sm font-semibold text-gray-100 bg-blue-700 py-2 px-6 rounded-md hover:bg-blue-800 transition">
                  Log in <span aria-hidden="true">&rarr;</span>
                    </Link >
                </div>
            </nav>

            {/* Mobile Menu */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 " />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-950 px-6 py-6 sm:w-full sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">MediHub</span>
                            <div className="bg-transparent flex items-center justify-center ">
                                <h1 className="text-white font-bold text-lg flex items-center">
                                    <span className="text-4xl text-red-500">M</span> {/* Larger and red */}
                                    <span className="animate-text-change text-3xl ">ediHub</span> {/* Color-changing effect */}
                                </h1>
                            </div>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-200">
                            <div className="space-y-2 py-6">
                                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-200 hover:bg-blue-200 hover:text-gray-700">
                                    Features
                                </a>
                                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-200 hover:bg-blue-200 hover:text-gray-700">
                                    Marketplace
                                </a>
                                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-200 hover:bg-blue-200 hover:text-gray-700">
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-200 hover:bg-blue-200 hover:text-gray-700">
                                  Log in
                                </Link >
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
