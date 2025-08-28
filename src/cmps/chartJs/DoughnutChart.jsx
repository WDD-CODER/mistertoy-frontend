import { Doughnut } from "react-chartjs-2";
import { utilService } from "../../services/util.service";
import {
    Chart as ChartJS,
    ArcElement,      // donut arcs
    Tooltip,         // optional
    Legend           // optional
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export function DoughnutChart({ items = {} }) {
    const title = 'My Doughnut  Chart'

    function getData() {
        const data = {
            labels: items.map(item => item.txt),
            datasets: [
                {
                    label: title,
                    data: items.map(item => item.price),
                    backgroundColor: items.map(item => item.color),
                    borderColor: items.map(item => item.color),
                    borderWidth: 1,
                },
            ],
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false,   // let it grow/shrink inside container

            plugins: {
                legend: {
                    position: "right",        // "top" | "bottom" | "left" | "right"
                    labels: {
                        boxWidth: 20,           // size of the legend color box
                        padding: 15             // spacing between legend items
                    }
                },
                title: {
                    display: true,
                    text: "Toy Prices",
                    font: {
                        size: 18
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const toyName = context.label
                            const value = context.raw
                            return `${toyName}: $${value}`
                        }
                    }
                }
            },

            cutout: "60%",  // size of inner hole (50% by default) → smaller = more "pie-like"
            radius: "90%",  // how large the chart is relative to canvas
        }
        return { data, options }
    }

    const { data, options ={}} = getData()
    return (
        <Doughnut data={data} options={options}/>
    )

}