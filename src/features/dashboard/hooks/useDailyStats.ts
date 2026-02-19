import { useEffect, useState } from "react"

interface DailyStats {
    dailyRevenue: number;
    newClientsToday: number;
    appointmentsOccupied: number;
}


export const useDailyStats = () => {
    const [stats, setStats] = useState<DailyStats | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true)
            try {
                const response = await fetch("/stats/daily", {
                    credentials: "include"
                })
                if (!response.ok) throw new Error("Error al obtener estadisticas")
                const data = await response.json()
                setStats(data)
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])


    return {
        stats,
        loading,
        error
    }
}