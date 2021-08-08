import { useEffect, useState } from "react";
import { listUsers } from "../../services/api.service"
import AddUser from "../add-user";
import DeviceDrawer from "../device-drawer";

export default function UsersTable(props) {
    const [users, setUsers] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [loadedUsers, setLoadedUsers] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const [user, setUser] = useState(null)
    const [showUpdateDialog, setShowUpdateDialog] = useState(null)

    const fetchUsers = () => {
        setLoadingUsers(true)
        if (!loadedUsers) {
            listUsers()
                .then(users => setUsers(users.users))
                .catch(err => setUsers([]))
                .finally(() => {
                    setLoadingUsers(false)
                    setLoadedUsers(true)
                })
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [users, loadedUsers, loadingUsers])

    const handleUserRowClick = (user) => {
        setUser(user)
        setShowDrawer(true)
    }

    const hideUpdateUserDialog = () => {
        fetchUsers()
        setShowUpdateDialog(false)
        setShowDrawer(false)
        setUser(null)
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
                                        Email
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {
                                    !loadedUsers ? null :
                                        (users.map((_user, index) => {
                                            return (
                                                <tr key={index} className={`${!user || (user._id !== _user._id) ? 'cursor-pointer':'bg-blue-50 cursor-pointer'}`} onClick={e => handleUserRowClick(_user)}>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">
                                                                    {_user.firstName} {_user.lastName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="text-sm text-gray-900">{_user.email}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
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
                <AddUser user={user} hideAddUserDialog={hideUpdateUserDialog} /> : null}
        </div>
    )
}