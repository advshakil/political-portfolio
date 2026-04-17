"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isLoginPage = pathname === "/admin/login"

    // Don't show sidebar on login page
    if (isLoginPage) {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
