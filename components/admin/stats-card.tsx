import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    trend?: "up" | "down" | "neutral"
    trendValue?: string
}

export function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                    {description && (
                        <p className="text-sm text-gray-400 mt-1">{description}</p>
                    )}
                </div>
                <div className="p-3 bg-[#006A4E]/10 rounded-lg">
                    <Icon className="w-6 h-6 text-[#006A4E]" />
                </div>
            </div>
        </div>
    )
}
