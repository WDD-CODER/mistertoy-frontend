import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { utilService } from "../../services/util.service"

ChartJS.register(ArcElement, Tooltip, Legend)
export function PiaChart({ items }) {
    const title = 'My Pia Chart'

    function getData() {
        const data = {
            labels: items.map(item => item.txt),
            datasets: [
                {
                    label: title,
                    data: items.map(item => item.price),
                    backgroundColor: items.map(() => utilService.getRandomColor()),
                    borderColor: items.map(() => utilService.getRandomColor()),
                    borderWidth: 1,
                },
            ],

        }

        const options = {
            responsive: true,
            maintainAspectRatio: false,  
            plugins: {
                legend: {
                    position: "right", 
                    labels: {
                        boxWidth: 20,
                        padding: 15,
                    }
                },
                title: {
                    display: true,
                    text: "   Toy Prices (Pie Chart)",
                    align: "start",
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

            // Pie-specific options
            radius: "80%",   // controls how big the pie is inside its canvas
            rotation: 0,     // starting angle (radians) — e.g. rotate slices
        }

        return { data, options }
    }
    const { data, options ={}} = getData()

    return <Pie data={data} options={options} />
}
