import { useState } from 'react'
import { useEffect } from 'react/cjs/react.production.min'
import { checkinDevice, checkoutDevice, submitDeviceReview } from '../../services/api.service'
import { getAuthUser } from '../../services/auth.service'
import './device-drawer.css'

export default function DeviceDrawer(props) {

    const [device, setDevice] = useState(props.device)
    const [checkingOut, setCheckingOut] = useState(false)
    const [checkingIn, setCheckingIn] = useState(false)
    const [checkoutSuccess, setCHeckoutSuccess] = useState(false)
    const [checkoutError, setCHeckoutError] = useState(false)
    const [checkinSuccess, setCHeckinSuccess] = useState(false)
    const [checkinError, setCHeckinError] = useState(false)
    const [submittingReview, setSubmittingReview] = useState(false)
    const [review, setReview] = useState('')
    const [submitReviewSuccess, setSubmitReviewSuccess] = useState(false)
    const [submitReviewError, setSubmitReviewError] = useState(false)
    const mAuthUser = getAuthUser()

    const checkout = () => {
        setCHeckoutError(false)
        setCHeckoutSuccess(false)
        setCheckingOut(true)
        return checkoutDevice(device)
            .then(success => {
                setCHeckoutSuccess(true)
                const _device = device
                _device.isCheckedOut = true
                setDevice(_device)
                setTimeout(() => {
                    props.hideDeviceDrawer()
                }, 2000)
            })
            .catch(err => {
                setCHeckoutError(true)
                setTimeout(() => setCHeckoutError(false), 2000)
            })
            .finally(() => {
                setCheckingOut(false)
            })
    }

    const checkin = () => {
        setCHeckinError(false)
        setCHeckinSuccess(false)
        setCheckingOut(true)
        return checkinDevice(device)
            .then(checkInResp => {
                if (!checkInResp.error) {
                    setCHeckinSuccess(true)
                    const _device = device
                    _device.isCheckedOut = false
                    setDevice(_device)
                    setTimeout(() => {
                        props.hideDeviceDrawer()
                        setCHeckinSuccess(false)
                    }, 2000)
                } else {
                    setCHeckinError(true)
                    setTimeout(() => setCHeckinError(false), 2000)
                }
            })
            .catch(err => {
                setCHeckinError(true)
                setTimeout(() => setCHeckinError(false), 2000)
            })
            .finally(() => {
                setCheckingIn(false)
            })
    }

    const submitReview = () => {
        setSubmittingReview(true)
        setSubmitReviewSuccess(false)
        setSubmitReviewError(false)
        submitDeviceReview(review)
            .then(success => {
                const _device = device
                if (_device.reviews) {
                    _device.reviews.push({ review, user: getAuthUser(), device, time: new Date().toString() })
                } else {
                    _device.reviews = [{ review, user: getAuthUser(), device, time: new Date().toString() }]
                }
                setDevice(_device)
                setSubmitReviewSuccess(true)
                setTimeout(() => setSubmitReviewSuccess(false), 2000)
            })
            .catch(err => {
                setTimeout(() => setSubmitReviewSuccess(false), 2000)
                setSubmitReviewError(true)
            })
            .finally(() => setSubmittingReview(false))
    }

    let drawerClasses = 'side-drawer sm:w-2/3 md:w-1/3'
    if (!props.show) {
        drawerClasses = 'side-drawer sm:w-2/3 md:w-1/3 open'
    }
    return (
        <div className={drawerClasses}>
            <span className="px-2 py-3 cursor-pointer rounded-full text-3xl font-light" onClick={props.hideDeviceDrawer}>
                <i class="fa fa-window-close h-6 w-6 text-blue-600"></i> X
            </span>
            <div className='container p-8'>
                <div className="flex flex-col  divide-y">
                    <div className="flex flex-wrap md:flex-row">
                        <div class="py-6 px-8 rounded-lg bg-white">
                            <h1 class="text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer">{device.name}</h1>
                            <p class="text-gray-700 tracking-wide text-sm flex-col flex">
                                <span><span className="text-gray-500">OS: </span><span>{device.os}</span></span>
                                <span><span className="text-gray-500">Manufacturer: </span><span>{device.manufatrurer}</span></span>
                            </p>
                            {
                                !device.isCheckedOut ? <button className="bg-blue-700 mt-3 text-white shadow-sm px-4 py-3 rounded-lg" onClick={checkout}>
                                    {checkingOut ? <span>...</span> : <span>Checkout</span>}
                                </button> :
                                    <span class="mt-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200">
                                        Checked-Out
                                    </span>
                            }
                            {
                                !device.isCheckedOut || (device.isCheckedOut && !device.lastCheckedOutBy) || (mAuthUser.email !== device.lastCheckedOutBy.email) ? null :
                                    <div>
                                        <button className="bg-blue-700 mt-3 text-white shadow-sm px-4 py-3 rounded-lg" onClick={checkin}>
                                            {checkingIn ? <span>...</span> : <span>Checkin</span>}
                                        </button>
                                    </div>
                            }
                            {
                                checkoutSuccess ? (
                                    <span className="flex flex-wrap rounded-md bg-green-50 p-4 text-green-700">Checked-out successfully!</span>
                                ) : null
                            }
                            {
                                checkoutError ? (
                                    <span className="flex flex-wrap rounded-md bg-red-50 p-4 text-red-700">Sorry, check-out failed</span>
                                ) : null
                            }
                            {
                                checkinSuccess ? (
                                    <span className="flex flex-wrap rounded-md bg-green-50 p-4 text-green-700">Checked-in successfully!</span>
                                ) : null
                            }
                            {
                                checkinError ? (
                                    <span className="flex flex-wrap rounded-md bg-red-50 p-4 text-red-700">Sorry, check-in failed</span>
                                ) : null
                            }
                            {/* <button class="mt-6 py-2 px-4 bg-yellow-400 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300">Checkout</button> */}
                        </div>
                        <div class="py-6 px-8 rounded-lg bg-white">
                        </div>
                    </div>
                    <div className="flex flex-wrap md:flex-row mt-10">
                        <div class="py-6 px-8 rounded-lg bg-white">
                            <h1 class="text-gray-700 font-semibold text-xl mb-3 hover:text-gray-900 hover:cursor-pointer">Reviews</h1>
                            <div className="flex flex-col">
                                {
                                    !device.reviews || device.reviews.length < 1 ?
                                        <span className="p-3 text-xs">No Reviews</span> :
                                        (
                                            device.reviews.map(review => {
                                                return (
                                                    <div className="mb-3 flex flex-col flex-wrap p-3 bg-gray-100 rounded"> {/* comment item */}
                                                        <div className="flex flex-col text-xs text-gray-500">
                                                            <span>{review.time}</span>
                                                            <span className="font-semibold">{review.user.firstName} {review.user.lastName}</span>
                                                        </div>
                                                        <div className="mt-1">
                                                            <p className='text-sm font-light'>{review.review}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                }
                                <div className="mt-4 flex flex-col flex-wrap rounded"> {/* comment item */}
                                    <div className="flex flex-col text-xs text-gray-500">
                                        <span className="font-semibold">Add Review</span>
                                        {
                                            submitReviewSuccess ? (
                                                <span className="flex flex-wrap rounded-md bg-green-50 p-4 text-green-700">Review added successfully!</span>
                                            ) : null
                                        }
                                        {
                                            submitReviewError ? (
                                                <span className="flex flex-wrap rounded-md bg-red-50 p-4 text-red-700">Sorry, review submission failed</span>
                                            ) : null
                                        }
                                    </div>
                                    <div className="mt-1">
                                        <textarea onChange={e => setReview(e.target.value)} className="bg-gray-50 p-1 border-2 flex w-full h-20"></textarea>
                                    </div>
                                    <div className="flex flex-wrap justify-end align-end w-full">
                                        <button className="sm:w-full mt-3 lg:w-1/4 border-gray-500 text-sm border-2 shadow-sm px-2 py-1 rounded-lg"
                                            onClick={submitReview}>
                                            {submittingReview ? '...' : 'SUBMIT'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* <button class="mt-6 py-2 px-4 bg-yellow-400 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300">Checkout</button> */}
                        </div>
                        <div class="py-6 px-8 rounded-lg bg-white">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}