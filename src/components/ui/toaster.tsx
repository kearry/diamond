// components/ui/toaster.tsx

"use client"

import * as React from "react"
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
    const { toasts } = useToast()

    return (
        <div className="fixed top-0 right-0 z-50 flex flex-col items-end gap-2 min-h-screen w-full md:max-w-[420px] p-4">
            {toasts.map(({ id, title, description, action, ...props }) => (
                <Toast key={id} {...props}>
                    <div className="grid gap-1">
                        {title && <div className="text-sm font-semibold">{title}</div>}
                        {description && (
                            <div className="text-sm opacity-90">{description}</div>
                        )}
                    </div>
                    {action}
                </Toast>
            ))}
        </div>

    )
}