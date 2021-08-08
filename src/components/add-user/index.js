import { useEffect, useState, Fragment } from "react"
import { addUser, updateUser } from "../../services/api.service"
import { Listbox, Transition, Switch } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

export default function AddUser(props) {
    const [addingUser, setAddingUser] = useState(false)
    const [user, setUser] = useState(props.user)
    const [firstName, setFirstName] = useState(user ? user.firstName : '')
    const [lastName, setLastName] = useState(user ? user.lastName : '')
    const [password, setPassword] = useState(user ? user.password : '')
    const [email, setEmail] = useState(user ? user.email : '')
    const [savingSuccess, setSavingSuccess] = useState(false)
    const [savingError, setSavingError] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [active, setActive] = useState(user ? user.active : false)
    // const _addUser = addUser()

    const saveUser = () => {
        if (!addingUser) {
            setAddingUser(true)
            addUser({ firstName, lastName, password, email })
                .then((data) => {
                    console.log('DATA: ', data)
                    if (data) {
                        setSavingSuccess(true)
                        setTimeout(() => {
                            setSavingSuccess(false)
                            props.hideAddUserDialog()
                        }, 3000);
                    } else {
                        setSavingError(true)
                        setTimeout(() => setSavingError(false), 3000);
                    }
                })
                .catch((err) => {
                    console.log('ERR: ', err)
                    setSavingError(true)
                    setTimeout(() => setSavingError(false), 3000);
                })
                .finally(() => {
                    setAddingUser(false)
                })
        }
    }

    const _updateUser = () => {
        if (!addingUser) {
            setAddingUser(true)
            updateUser(user._id, { firstName, lastName, password, email })
                .then((data) => {
                    console.log('DATA: ', data)
                    if (data) {
                        setSavingSuccess(true)
                        setTimeout(() => {
                            setSavingSuccess(false)
                            props.hideAddUserDialog()
                        }, 3000);
                    } else {
                        setSavingError(true)
                        setTimeout(() => setSavingError(false), 3000);
                    }
                })
                .catch((err) => {
                    console.log('ERR: ', err)
                    setSavingError(true)
                    setTimeout(() => setSavingError(false), 3000);
                })
                .finally(() => {
                    setAddingUser(false)
                })
        }
    }
    return (
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                {/* <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg> */}
                                <i class="fa fa-mobile-alt h-6 w-6 text-blue-600"></i>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {user ? 'Update' : 'Add'} Tester
                                </h3>
                                {
                                    savingSuccess ? (
                                        <span className="flex flex-wrap rounded-md bg-green-50 p-4 text-green-700">User added successfully!</span>
                                    ) : null
                                }
                                {
                                    savingError ? (
                                        <span className="flex flex-wrap rounded-md bg-red-50 p-4 text-red-700">Sorry, adding device failed</span>
                                    ) : null
                                }
                                <div class="mt-2">
                                    <div>
                                        <div>
                                            <label for="price" class="block text-sm font-medium text-gray-700">First Name</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input onChange={e => setFirstName(e.target.value)} defaultValue={user ? user.firstName : ''} type="text" name="price" id="price" class="focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-2 border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label for="price" class="block text-sm font-medium text-gray-700">Last Name</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input onChange={e => setLastName(e.target.value)} defaultValue={user ? user.lastName : ''} type="text" name="price" id="price" class="focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-2 border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label for="price" class="block text-sm font-medium text-gray-700">Email Address</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input onChange={e => setEmail(e.target.value)} defaultValue={user ? user.email : ''} type="email" name="price" id="price" class="focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-2 border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label for="price" class="block text-sm font-medium text-gray-700">Password</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input onChange={e => setPassword(e.target.value)} type="password" name="price" id="price" class="focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-2 border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <label for="price" class="mt-4 block text-sm font-medium text-gray-700"></label>
                                            <Switch.Group>
                                                <div className="flex items-center">
                                                    <Switch.Label className="mr-4">Active</Switch.Label>
                                                    <Switch
                                                        checked={active}
                                                        onChange={setActive}
                                                        className={`${active ? 'bg-blue-600' : 'bg-gray-200'
                                                            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                    >
                                                        <span
                                                            className={`${active ? 'translate-x-6' : 'translate-x-1'
                                                                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                                                        />
                                                    </Switch>
                                                </div>
                                            </Switch.Group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button disabled={addingUser} onClick={e => user ? _updateUser() : saveUser()} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            {addingUser ? '...' : (user ? 'UPDATE' : 'SAVE')}
                        </button>
                        <button disabled={addingUser} onClick={props.hideAddUserDialog} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>)
}