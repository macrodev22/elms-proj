import { Chart, LinearScale,BarController,CategoryScale,BarElement } from "chart.js";
import { useEffect, useRef, } from "react";
import Card from "./Card";
import './LeavePattern.css'

Chart.register(LinearScale)
Chart.register(BarController)
Chart.register([CategoryScale, BarElement])

function LeavePattern(props) {

    const canvasRef = useRef(null)

    
    useEffect(() => {
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const data = [0, 1, 2, 0,0,2,4,0,1,0,2,0]
        const ctx = canvasRef.current.getContext('2d')
        let chartInstance

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    { label: 'Days on Leave', data, borderWidth:1, backgroundColor:'#BA7432', hoverBackgroundColor: '#A45408' }
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {beginAtZero: 0 }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: (ctx) => `${ctx.dataset.label || ''} day(s)`
                        }
                    }
                }
            }
        })

        // Cleanup
        return () => {
            chartInstance.destroy()
        }
    }, [])

    return (
        <div className={`w-full ${props.className}`}>
        <Card className="h-[355px]">
            <h4 className="text-2xl flex justify-between">
                <span>Leave pattern</span>
                <select name="period" id="period">
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                    <option value="quarter">Quarter</option>
                    <option value="decade">Decade</option>
                </select>
                </h4>
            <div className="h-[300px]">
                <canvas ref={canvasRef} id="leaveChart"></canvas>
            </div>
        </Card>
        </div>
    )
}

export default LeavePattern