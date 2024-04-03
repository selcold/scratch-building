import { NextResponse, NextRequest } from 'next/server'
import { _cfgMaintenancePages } from '@/components/configs/config'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Check if the path is in the maintenance pages list
    return NextResponse.redirect(new URL(`https://scratch-building.vercel.app/`, request.url))
}

export const config = {
    matcher: [ "/((?!.+\\.[\\w]+$|_next).*)","/"]
}