import { useEffect, useState, Fragment } from "react"
import { addDevice } from "../../services/api.service"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

export default function AddDevice(props) {
    const [addingDevice, setAddingDevice] = useState(false)
    const [deviceName, setDeviceName] = useState('')
    const [deviceOS, setDeviceOS] = useState('iOS')
    const deviceOSes = ['iOS', 'Android']
    const [deviceManufacturer, setDeviceManufacturer] = useState('')
    const [savingSuccess, setSavingSuccess] = useState(false)
    const [savingError, setSavingError] = useState(false)
    const [showDeviceOS, setShowDeviceOS] = useState(false)
    // const _addDevice = addDevice()

    const saveDevice = () => {
        if (!addingDevice) {
            setAddingDevice(true)
            addDevice({ name: deviceName, os: deviceOS, manufacturer: deviceManufacturer })
                .then((data) => {
                    console.log('DATA: ', data)
                    if (data) {
                        setSavingSuccess(true)
                        setTimeout(() => {
                            setSavingSuccess(false)
                            props.hideAddDeviceDialog()
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
                    setAddingDevice(false)
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
                                    Add Test Device
                                </h3>
                                {
                                    savingSuccess ? (
                                        <span className="flex flex-wrap rounded-md bg-green-50 p-4 text-green-700">Device added successfully!</span>
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
                                            <label for="price" class="block text-sm font-medium text-gray-700">Device Name</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input onChange={e => setDeviceName(e.target.value)} type="text" name="price" id="price" class="focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-2 border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label id="listbox-label" class="block text-sm font-medium text-gray-700">
                                            OS
                                        </label>
                                        <Listbox value={deviceOS} onChange={setDeviceOS}>
                                            <div className="relative mt-1">
                                                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                    <span className="block truncate">{deviceOS}</span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                        <SelectorIcon
                                                            className="w-5 h-5 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute w-full z-50 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {deviceOSes.map((device, deviceIdx) => (
                                                            <Listbox.Option
                                                                key={deviceIdx}
                                                                className={({ active }) =>
                                                                    `${active ? 'text-amber-900 bg-amber-100  cursor-pointer hover:bg-gray-100' : ' cursor-pointer hover:bg-gray-50 text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                                                }
                                                                value={device}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                        <span
                                                                            className={`${selected ? 'font-medium' : 'font-normal'
                                                                                } block truncate`}
                                                                        >
                                                                            {device}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span
                                                                                className={`${active ? 'text-amber-600' : 'text-amber-600'
                                                                                    }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                            >
                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                    <div className="mt-3">
                                        <div>
                                            <label for="price" class="block text-sm font-medium text-gray-700">Device Manufacturer</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input onChange={e => setDeviceManufacturer(e.target.value)} type="text" name="price" id="price" class="focus:ring-indigo-500 h-10 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-2 border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button disabled={addingDevice} onClick={saveDevice} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            {addingDevice ? '...' : 'SAVE'}
                        </button>
                        <button disabled={addingDevice} onClick={props.hideAddDeviceDialog} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>)
}