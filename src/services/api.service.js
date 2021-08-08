import { getAuthUser } from "./auth.service"

const apiURL = 'http://localhost:9400/api/v1/'

export const listDevices = () => {
    return fetch(apiURL + 'device/', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .catch(err => err)
}

export const addDevice = (device) => {
    return fetch(apiURL + 'device/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(device)
    })
        .then(resp => resp.json())
        .catch(err => err)
}

export const checkoutDevice = (params) => {
    params = { device: params, user: getAuthUser() }
    return fetch(apiURL + 'device/checkout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
        .then(resp => resp.json())
        .catch(err => err)
}

export const checkinDevice = (params) => {
    params = { device: params, user: getAuthUser() }
    return fetch(apiURL + 'device/checkin/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
        .then(resp => resp.json())
        .catch(err => err)
}

export const submitDeviceReview = (params) => {
    params = { device: params, user: getAuthUser(), review: params.review }
    return fetch(apiURL + 'device/review/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
        .then(resp => resp.json())
        .catch(err => err)
}


// user api
export const listUsers = () => {
    return fetch(apiURL + 'user/', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .catch(err => err)
}

export const addUser = (user) => {
    return fetch(apiURL + 'user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(resp => resp.json())
        .catch(err => err)
}

export const updateUser = (id, updateParams) => {
    return fetch(apiURL + 'user/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({updateParams})
    })
        .then(resp => resp.json())
        .catch(err => err)
}