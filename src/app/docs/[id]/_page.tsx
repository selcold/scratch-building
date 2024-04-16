'use client'

import { redirect } from 'next/navigation'

export default function PageRedirect({ pass }: { pass: string }) {
    redirect(pass);
    return(
        <>
        
        </>
    )
};