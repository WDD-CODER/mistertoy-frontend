import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { toyService } from "../../services/toy"

ChartJS.register(ArcElement, Tooltip, Legend)
export function PiaChart({ items }) {
    const title = "   Toys In Stock By Label"

    const labels = toyService.getLabelsFromToys(items)

    const selectedItems = items.filter(item => item.labels.some(label => labels.includes(label)))
    const totalToysInStockByLabel = selectedItems.reduce((groups, item) => {
        item.labels.forEach(label => {
            if (!groups[label]) groups[label] = [];
            groups[label].push(item);
        });
        return groups;
    }, {});


    function getData() {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: title,
                    data: toyService.getPercentages(totalToysInStockByLabel),
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
                    position: "right",
                    labels: {
                        boxWidth: 20,
                        padding: 15,
                    }
                },
                title: {
                    display: true,
                    text: title,
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
                            return `${toyName}: %${value}`
                        }
                    }
                }
            },

            radius: "80%",
            rotation: 0,
        }
        return { data, options }
    }
    const { data, options = {} } = getData()
    if (!data.labels.length) return <div style={{ margin: '100px' }}> No labels selected </div>
    return <Pie data={data} options={options} />
}
