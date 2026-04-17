"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, MessageSquare, Heart, LogOut, Menu, X, Video } from "lucide-react"
import { useState } from "react"

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/opinions", label: "Opinions", icon: MessageSquare },
    { href: "/admin/donations", label: "Donations", icon: Heart },
    { href: "/admin/videos", label: "Videos", icon: Video },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" })
            router.push("/admin/login")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#006A4E] text-white flex items-center justify-between px-4 z-40 shadow-md">
                <div className="flex items-center gap-2">
                    <h1 className="font-bold text-lg">Shakil Ahmad</h1>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-[#006A4E] text-white z-50 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Name */}
                    <div className="p-8 border-b border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">SA</div>
                            <h1 className="text-xl font-bold tracking-tight">Admin</h1>
                        </div>
                        <p className="text-xs text-white/50 uppercase tracking-widest font-medium">Management Portal</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1.5 mt-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? "bg-white text-[#006A4E] shadow-lg shadow-black/10 font-semibold"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-[#006A4E]" : ""}`} />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Footer Info & Logout */}
                    <div className="p-4 border-t border-white/10 space-y-4">
                        <div className="px-4 py-3 bg-white/5 rounded-xl">
                            <p className="text-xs text-white/40 mb-1">Signed in as</p>
                            <p className="text-sm font-medium truncate">sakilreal@gmail.com</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors w-full group"
                        >
                            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
