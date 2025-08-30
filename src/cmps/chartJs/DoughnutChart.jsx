import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,      // donut arcs
    Tooltip,         // optional
    Legend           // optional
} from "chart.js"
import { useSelector } from "react-redux";
import { toyService } from "../../services/toy.service";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend)

export function DoughnutChart({ items = {} }) {

    const [labels, setLabels] = useState(toyService.getLabelsFromToys(items))

    const selectedItems = items.filter(item => item.labels.some(label => labels.includes(label)))
    const totalPriceByLabel = selectedItems.reduce((groups, item) => {
        item.labels.forEach(label => {
            if (!groups[label]) groups[label] = [];
            groups[label].push(item.price);
        });
        return groups;
    }, []);

    const evgPricePerLabel = Object.values(totalPriceByLabel).map((label) => {
        const totalLabelPrice = label.reduce((sum, price) => sum + price, 0)
        return totalLabelPrice / label.length
    });

    function getData() {
        const data = {
            labels: labels.map(item => item),
            datasets: [
                {
                    // label: title,
                    data: evgPricePerLabel.map(item => item),
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
                    position: "left",        // "top" | "bottom" | "left" | "right"
                    labels: {
                        boxWidth: 20,           // size of the legend color box
                        padding: 15             // spacing between legend items
                    }
                },
                title: {
                    display: true,
                    text: " Average Prices per label   ",
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

            cutout: "60%",  // size of inner hole (50% by default) → smaller = more "pie-like"
            radius: "80%",  // how large the chart is relative to canvas
        }
        return { data, options }
    }

    const { data, options = {} } = getData()
    return (
        <Doughnut data={data} options={options} />
    )

}