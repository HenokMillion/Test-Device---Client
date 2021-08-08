import jwtDecode from "jwt-decode";

const apiURL = 'http://localhost:9400/api/v1/'

const setAuthUser = user => {
    if (!user) {
        localStorage.removeItem('AUTH_USER')
    } else {
        localStorage.setItem('AUTH_USER', JSON.stringify(user))
    }
}

export const authUser = (email, password) => {
    return fetch(apiURL + 'user/auth', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(data => {
            const user = jwtDecode(data.token)
            setAuthUser(user)
            return user
        })
        .catch(err => {
            setAuthUser(null)
            return err
        })
}

export const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('AUTH_USER'))
}

export const signOut = () => {
    localStorage.removeItem('AUTH_USER')
}