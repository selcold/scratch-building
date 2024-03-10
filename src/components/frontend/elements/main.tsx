// /src/components/frontend/elements/main.tsx

export function ElementGroup({ children, className }: { children: React.ReactNode, className?: string}) {
    return (
        <>
            <div className={`max-w-screen w-full min-h-screen h-full ${className? className:''}`}>
                {children}
            </div>
        </>
    )
}

export function Main({ children, className }: { children: React.ReactNode, className?: string}) {
    return (
        <>
            <main className={`w-full h-full mt-[78px] ${className? className:''}`}>
                {children}
            </main>
        </>
    )
}