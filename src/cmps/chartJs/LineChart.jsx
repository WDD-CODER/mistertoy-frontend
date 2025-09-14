import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export function LineChart({ items }) {
    function getData() {
        const data = {
            labels: items[0].sales.map(s => s.date),
            datasets: items.map((item) => {
                return {
                    label: [item.name],
                    data: item.sales.map(s => s.amount),
                    borderColor: item.color,
                    backgroundColor: "lightblue",
                    fill: false,
                    tension: 0.1,
                }
            })
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        title: function (contexts) {
                            return `Toy: ${contexts[0].dataset.label}`;
                        },
                        label: (context) => {
                            const toyName = context.label
                            const soldAmount = context.parsed.y
                            return [
                                `Sold Units: ${soldAmount}`,
                                `${toyName} `]
                        }
                    }
                }
            }

        }
        return { data, options }
    }


    const { data, options } = getData()

    return (
        <Line data={data} options={options} />
    )
}



