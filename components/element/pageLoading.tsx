'use client'

import Script from "next/script"

export function PageLoading() {
    return (
        <>
            <div className="fixed flex justify-center items-center w-full h-full" aria-label="loading">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
        </>
    )
}

// <Script src='https://www.google.com/recaptcha/enterprise.js?render=6LeWZYEpAAAAAPNXB6L2qb0182D8hpS-fnzD9nK8'></Script>