// /src/app/error.tsx

'use client';

import { Metadata } from 'next'
import { useEffect } from 'react'

export const metadata:Metadata = {
    title: '500'
}

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}