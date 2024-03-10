import { Card } from "@/components/ui/card";

export function CardContents({ children, className, durationPls }: { children: React.ReactNode, className?: string, durationPls?: number }) {
    return (
        <>
            <Card className={`w-full shadow-lg animate-fade-up animate-once animate-duration-[${durationPls? `${300 + durationPls}ms`:'300ms'}] animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards`}>
                {children}
            </Card>
        </>
    )
}