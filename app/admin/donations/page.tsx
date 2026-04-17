"use client"

import { useEffect, useState } from "react"
import { Heart, Calendar, TrendingUp, DollarSign, Loader2, Search, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { StatsCard } from "@/components/admin/stats-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Donation {
    _id: string
    donorName: string
    email: string
    amount: number
    invoiceId: string
    transactionId?: string
    status: "pending" | "completed" | "cancelled" | "failed"
    paymentMethod?: string
    createdAt: string
}

interface Stats {
    totalAmount: number
    totalCount: number
    completedCount: number
    todayCount: number
    thisWeekCount: number
}

interface Pagination {
    page: number
    limit: number
    total: number
    totalPages: number
}

export default function DonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([])
    const [stats, setStats] = useState<Stats | null>(null)
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    })
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    useEffect(() => {
        fetchDonations()
    }, [pagination.page, statusFilter])

    const fetchDonations = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString(),
                ...(search && { search }),
                ...(statusFilter !== "all" && { status: statusFilter }),
            })

            const response = await fetch(`/api/admin/donations?${params}`)
            const data = await response.json()

            if (data.success) {
                setDonations(data.data)
                setPagination(data.pagination)
                setStats(data.stats)
            }
        } catch (error) {
            console.error("Failed to fetch donations:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setPagination((prev) => ({ ...prev, page: 1 }))
        fetchDonations()
    }

    const handleExport = async () => {
        try {
            // Create CSV content
            const headers = ["Date", "Name", "Email", "Amount", "Status", "Transaction ID", "Payment Method"]
            const rows = donations.map((d) => [
                new Date(d.createdAt).toLocaleString(),
                d.donorName,
                d.email,
                d.amount.toString(),
                d.status,
                d.transactionId || "",
                d.paymentMethod || "",
            ])

            const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
            const blob = new Blob([csvContent], { type: "text/csv" })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `donations-${new Date().toISOString().split("T")[0]}.csv`
            document.body.appendChild(a)
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Export failed:", error)
        }
    }

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            completed: "bg-green-100 text-green-700",
            pending: "bg-yellow-100 text-yellow-700",
            cancelled: "bg-gray-100 text-gray-700",
            failed: "bg-red-100 text-red-700",
        }
        const labels: Record<string, string> = {
            completed: "Completed",
            pending: "Pending",
            cancelled: "Cancelled",
            failed: "Failed",
        }
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
                {labels[status] || status}
            </span>
        )
    }

    if (loading && donations.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#006A4E]" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Donations</h1>
                    <p className="text-gray-500 mt-1">Manage all donations</p>
                </div>
                <Button onClick={handleExport} className="flex items-center justify-center gap-2 bg-[#006A4E] hover:bg-[#005a42] shadow-lg shadow-green-900/10">
                    <Download className="w-5 h-5" />
                    <span>Export CSV</span>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Donations"
                    value={stats?.totalCount || 0}
                    icon={Heart}
                    description="All time"
                />
                <StatsCard
                    title="Completed"
                    value={stats?.completedCount || 0}
                    icon={TrendingUp}
                    description="Successful payments"
                />
                <StatsCard
                    title="Today"
                    value={stats?.todayCount || 0}
                    icon={Calendar}
                    description="Received today"
                />
                <StatsCard
                    title="Total Amount"
                    value={`৳${(stats?.totalAmount || 0).toLocaleString()}`}
                    icon={DollarSign}
                    description="From completed donations"
                />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search name, email, or transaction ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 text-gray-900 bg-white border-gray-200 placeholder:text-gray-400"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="flex-1 lg:w-48 px-4 py-2 border rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-[#006A4E]/20 focus:border-[#006A4E] border-gray-200"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="failed">Failed</option>
                        </select>
                        <Button type="submit" variant="outline" className="px-6">
                            Search
                        </Button>
                    </div>
                </form>
            </div>

            {/* Donations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Transaction</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {donations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No donations found
                                    </td>
                                </tr>
                            ) : (
                                donations.map((donation) => (
                                    <tr key={donation._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(donation.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{donation.donorName}</div>
                                            <div className="text-sm text-gray-500">{donation.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-[#006A4E]">
                                                ৳{donation.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{getStatusBadge(donation.status)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {donation.paymentMethod || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-gray-500">
                                            {donation.transactionId
                                                ? `${donation.transactionId.substring(0, 12)}...`
                                                : "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page === pagination.totalPages}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
