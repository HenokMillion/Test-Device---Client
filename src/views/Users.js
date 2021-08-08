import { useState } from "react"
import AddDevice from "../components/add-device"
import AddUser from "../components/add-user"
import DeviceDrawer from "../components/device-drawer"
import DevicesTable from "../components/devicesTable"
import Header from "../components/header"
import UsersTable from "../components/usersTable"

export default function Users(props) {
    const [showAddUserDialog, setShowAddUserDialog] = useState(false)

    const hideAddUserDialog = () => {
        setShowAddUserDialog(false)
    }
    
    const openAddDeviceDialog = () => {
        if (!showAddUserDialog) {
            setShowAddUserDialog(true)
        }
    }

    return (
        <div>
            <Header />
            <header class="bg-white">
                <div class="max-w-7xl mx-auto py-3 pt-6 px-4 sm:px-6 lg:px-8 flex flex-wrap flex-row justify-between w-full">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Testers
                    </h1>
                    <button className="rounded-lg px-3 py-2 bg-blue-700 text-white" onClick={openAddDeviceDialog}>+ Add New</button>
                </div>
            </header>
            <main>
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <UsersTable />
                    {
                        showAddUserDialog ? <AddUser hideAddUserDialog={hideAddUserDialog}/> : null
                    }
                </div>
            </main>
        </div>
    )
}