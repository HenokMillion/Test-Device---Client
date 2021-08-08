import { useEffect, useState } from "react";
import { getAuthUser, signOut } from "../../services/auth.service";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link, useHistory } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header(props) {
    const [authenticatedUser, setAuthenticatedUser] = useState(null)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const authUser = getAuthUser()
    const isAdmin = authUser.role === 'admin'

    useEffect(() => {
        if (!authenticatedUser) {
            setAuthenticatedUser(getAuthUser())
        }
    })
    const history = useHistory();


    const handleSignOut = () => {
        signOut()
        history.push('/login')
    }

    return (
        <div class="relative bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div class="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span class="sr-only">Workflow</span>
                            <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                        </a>
                    </div>
                    <div class="-mr-2 -my-2 md:hidden">
                        <button onClick={e => setShowMobileMenu(true)} type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                            <span class="sr-only">Open menu</span>
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <nav class="hidden md:flex space-x-10">
                        <Link to='/'>
                            <div class="relative">
                                <button type="button" class="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false">
                                    <span>Test Devices</span>
                                </button>
                            </div></Link>
                        <Link to='/'>
                            <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
                                My Devices
                            </a>
                        </Link>
                        {
                            isAdmin ?
                                <Link to='/users'>
                                    <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
                                        Testers
                                    </a>
                                </Link> : null
                        }
                    </nav>
                    <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <div class="flex -space-x-2 cursor-pointer">
                            <Menu as="div" className="relative inline-block text-left">
                                {({ open }) => (
                                    <>
                                        <div>
                                            <Menu.Button className="inline-flex justify-center w-full rounded-md focus:border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                                <span class="inline-block h-10 w-10 bg-gray-300 p-3 rounded-full ring-2 ring-white">
                                                    {authenticatedUser ? authenticatedUser.firstName[0] : ''}
                                                </span>
                                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                static
                                                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={handleSignOut}
                                                                type="submit"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block w-full text-left px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Sign out
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </>
                                )}
                            </Menu>

                        </div>
                    </div>
                </div>
            </div>
            <div className={`${showMobileMenu ? 'absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden' : 'hidden absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'}`}>
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div class="pt-5 pb-6 px-5">
                        <div class="flex items-center justify-between">
                            <div>
                                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                            </div>
                            <div class="-mr-2">
                                <button type="button" onClick={e => setShowMobileMenu(false)} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span class="sr-only">Close menu</span>
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="py-6 px-5 space-y-6">
                        <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                            <Link to='/'>
                                <a class="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Test Devices
                                </a>
                            </Link>
                            <Link to='/'>
                                <a class="text-base font-medium text-gray-900 hover:text-gray-700">
                                    My Devices
                                </a>
                            </Link>
                            {
                                isAdmin ?
                                    <Link to='/users'>
                                        <a class="text-base font-medium text-gray-900 hover:text-gray-700">
                                            Testers
                                        </a>
                                    </Link> : null
                            }
                        </div>
                        <div>
                            <div class="flex -space-x-2 flex-wrap justicy-center align-center text-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    {({ open }) => (
                                        <>
                                            <div>
                                                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                                    <span class="inline-block h-10 w-10 bg-gray-300 p-3 rounded-full ring-2 ring-white">
                                                        {authenticatedUser ? authenticatedUser.firstName[0] : ''}
                                                    </span>
                                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    <div className="py-1">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={handleSignOut}
                                                                    type="submit"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block w-full text-left px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    Sign out
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}