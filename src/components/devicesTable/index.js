import { useEffect, useState } from "react";
import { listDevices } from "../../services/api.service"
import DeviceDrawer from "../device-drawer";

export default function DevicesTable(props) {
    const [devices, setDevices] = useState([])
    const [loadingDevices, setLoadingDevices] = useState(false)
    const [loadedDevices, setLoadedDevices] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const [drawerDevice, setDrawerDevice] = useState(null)

    const fetchDevices = () => {
        setLoadingDevices(true)
        if (!loadedDevices) {
            console.log('SETTING DEVICES')
            listDevices()
                .then(devices => setDevices(devices.devices))
                .catch(err => setDevices([]))
                .finally(() => {
                    setLoadingDevices(false)
                    setLoadedDevices(true)
                })
        }
    }

    useEffect(() => {
        fetchDevices()
    }, [devices, loadedDevices, loadingDevices])

    const handleDeviceRowClick = (device) => {
        hideDeviceDrawer()
        setTimeout(() => {
            setDrawerDevice(device)
            setShowDrawer(true)
        }, 50);
    }

    const hideDeviceDrawer = () => {
        fetchDevices()
        setDrawerDevice(null)
        setShowDrawer(false)
    }

    return (
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        OS
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Manufacturer
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {
                                    !loadedDevices ? null :
                                        (devices.map((device, index) => {
                                            return (
                                                <tr key={index} className={`${!drawerDevice || (drawerDevice._id !== device._id) ? 'cursor-pointer' : 'bg-blue-50 cursor-pointer'}`} onClick={e => handleDeviceRowClick(device)}>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">
                                                                    {device.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="text-sm text-gray-900">{device.os}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {device.manufacturer}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        {!device.isCheckedOut ?
                                                            (
                                                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    Available
                                                                </span>
                                                            ) :
                                                            (
                                                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200">
                                                                    Checked-Out
                                                                </span>
                                                            )}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" class="text-indigo-600 hover:text-indigo-900">Details</a>
                                                    </td>
                                                </tr>
                                            )
                                        }))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showDrawer ?
                <DeviceDrawer device={drawerDevice} hideDeviceDrawer={hideDeviceDrawer} /> : null}
        </div>
    )
}