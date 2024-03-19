import { Card } from "@/components/ui/card";
import { Script } from "vm";

export function CardContents({ children, className, durationPls }: { children: React.ReactNode, className?: string, durationPls?: number }) {
    return (
        <>
            <Card className={`w-full shadow-lg animate-fade-up animate-once animate-duration-[${durationPls? `${300 + durationPls}ms`:'300ms'}] animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards ${className?className:""}`}>
                {children}
            </Card>
        </>
    )
}

export function ModCard({ children, className, projectId }: { children: React.ReactNode, className?: string, projectId?: number | null }) {

    if(projectId) {
        return (
            <div onClick={() => { window.open(`https://scratch.mit.edu/projects/${projectId}/`) }} className={`bg-neutral-50 dark:bg-neutral-950 border-neutral-300 dark:border-neutral-700 border text-black dark:text-white w-[225px] p-2 rounded-md cursor-pointer hover:shadow-neutral-500/20 dark:hover:shadow-neutral-600/20 hover:scale-[1.04] shadow-lg transition duration-300 ease-in-out ${className?className:""}`}>
                {children}
            </div>
        )
    }

    return (
        <div className={`bg-neutral-50 dark:bg-neutral-950 border-neutral-300 dark:border-neutral-700 border text-black dark:text-white w-[225px] p-2 rounded-md cursor-pointer hover:shadow-neutral-500/20 dark:hover:shadow-neutral-600/20 hover:scale-[1.04] shadow-lg transition duration-300 ease-in-out ${className?className:""}`}>
            {children}
        </div>
    )
};
export function ModCardHeader({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`${className?className:""}`}>
            {children}
        </div>
    )
};
export function ModCardContent({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`p-1 py-2 ${className?className:""}`}>
            {children}
        </div>
    )
};
export function ModCardFooter({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`p-1 ${className?className:""}`}>
            {children}
        </div>
    )
}