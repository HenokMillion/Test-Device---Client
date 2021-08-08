import { useState } from "react";
import { useHistory } from "react-router-dom";
import { authUser } from "../services/auth.service";

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggingIn, setLoggingIn] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const history = useHistory();

    const login = () => {
        setLoggingIn(true)
        setLoginError(null)
        authUser(email, password)
            .then(user => {
                console.log('USER: ', user)
                history.push('/')
            })
            .catch(err => {
                console.log('ERROR: ', err)
                setLoginError('Incorrect username or password')
            })
            .finally(() => {
                setLoggingIn(false)
            })
    }

    return (
        <>
            <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div>
                        <h1 className='text-center text-4xl'>Johnson &amp; Johnson</h1>
                        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Login
                        </h2>
                    </div>
                    {
                        loginError ? (
                            <div className="m-3 text-center bg-red-100 py-3 text-red-800">
                                <span>{loginError}</span>
                            </div>
                        ) : null
                    }
                    <div class="mt-8 space-y-6">
                        <input type="hidden" name="remember" value="true" />
                        <div class="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="email-address" class="sr-only">Email address</label>
                                <input id="email-address" onChange={e => setEmail(e.target.value)}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter' && email && password) {
                                            login()
                                        }
                                    }}
                                    name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                            <div>
                                <label for="password" class="sr-only">Password</label>
                                <input id="password" onChange={e => setPassword(e.target.value)}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter' && email && password) {
                                            login()
                                        }
                                    }}
                                    name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>
                        <div>
                            <button onClick={login} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                {
                                    loggingIn ? <span>...</span> : <span>Login</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
