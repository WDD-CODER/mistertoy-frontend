import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,      
    Tooltip,       
    Legend         
} from "chart.js"
import { toyService } from "../../services/toy.service";
import { Loader } from "../Loader";

ChartJS.register(ArcElement, Tooltip, Legend)

export function DoughnutChart({ items = {} }) {
    const title = "Average Prices per label   "

    const labels = toyService.getLabelsFromToys(items)

    const selectedItems = items.filter(item => item.labels.some(label => labels.includes(label)))
    const totalPriceByLabel = selectedItems.reduce((groups, item) => {
        item.labels.forEach(label => {
            if (!groups[label]) groups[label] = [];
            groups[label].push(item.price);
        });
        return groups;
    }, {});

    const evgPricePerLabel = Object.values(totalPriceByLabel).map((label) => {
        const totalLabelPrice = label.reduce((sum, price) => sum + price, 0)
        return totalLabelPrice / label.length
    });

    function getData() {
        const data = {
            labels: labels.map(item => item),
            datasets: [
                {
                    label: title,
                    data: evgPricePerLabel.map(item => item),
                    backgroundColor: items.map(item => item.color),
                    borderColor: "black",
                    borderWidth: 1,
                },
            ],
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "left",
                    labels: {
                        boxWidth: 20,
                        padding: 15
                    }
                },
                title: {
                    display: true,
                    text: title,
                    align: "end",
                    font: { size: 18 },
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

            cutout: "60%",
            radius: "80%",
        }
        return { data, options }
    }

    const { data, options = {} } = getData()
    if (!data.labels.length) return <div style={{margin:'100px'}}> No labels selected </div>
    return (
        <Doughnut data={data} options={options} />
    )

}