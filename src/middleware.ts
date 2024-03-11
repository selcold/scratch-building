import { NextResponse, NextRequest } from 'next/server'
import { _cfgMaintenancePages } from '@/components/configs/config'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Check if the path is in the maintenance pages list
    if (_cfgMaintenancePages.includes(request.url)) {
        return NextResponse.redirect(new URL(`/maintenance?requestUrl=${request.url}`, request.url))
    } else {
        return NextResponse.next()
    }
}

export const config = {
    matcher: [ "/((?!.+\\.[\\w]+$|_next).*)","/"]
}