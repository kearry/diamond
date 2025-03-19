// components/ui/toast.tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline" // Corrected import

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
        variants: {
            variant: {
                default: "border bg-background text-foreground",
                destructive:
                    "destructive group border-destructive bg-destructive text-destructive-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface ToastProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
    variant?: "default" | "destructive" | null;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ className, variant, title, description, action, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(toastVariants({ variant }), className)}
                {...props}
            >
                <div className="grid gap-1">
                    {title && <div className="text-sm font-semibold">{title}</div>}
                    {description && (
                        <div className="text-sm opacity-90">{description}</div>
                    )}
                </div>
                {action}
                <div
                    className="absolute right-2 top-2 opacity-70 transition-opacity group-hover:opacity-100"
                >
                    {variant === "destructive" ? (<XMarkIcon className='h-4 w-4' />) :
                        (<CheckCircleIcon className="h-4 w-4" />)}
                </div>

            </div>
        )
    }
)
Toast.displayName = "Toast"

export { Toast, toastVariants }