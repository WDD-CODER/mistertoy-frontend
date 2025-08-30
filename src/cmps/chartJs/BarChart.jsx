import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

// Register elements needed for Bar
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function BarChart({ items }) {
    const title = 'My Bar Chart'

    function getData() {
        const data = {
            labels: items.map(item => item.txt),
            datasets: [
                {
                    label: title,
                    data: items.map(item => item.price),
                    backgroundColor: items.map(item => item.color),
                },]

        }

        const options = {
            responsive: true,
              maintainAspectRatio: false, 
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart',
                },
            },
        }
        return { data, options }
    }
    const { data, options } = getData()

    return (
        <Bar data={data} options={options} />
    )
}


