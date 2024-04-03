import { NextResponse, NextRequest } from 'next/server'
import { _cfgMaintenancePages } from '@/components/configs/config'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Check if the path is in the maintenance pages list
    if (_cfgMaintenancePages.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL(`/maintenance?requestUrl=${request.nextUrl.href}`, request.url))
    } else {
        if (request.nextUrl.pathname === "/play") {
            return NextResponse.redirect(new URL(`/games`, request.url))
        } else {
            return NextResponse.next()
        }
    }
}

export const config = {
    matcher: [ "/((?!.+\\.[\\w]+$|_next).*)","/"]
}