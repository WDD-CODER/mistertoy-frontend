import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadToys } from "../store/actions/toy.actions";
import { LineChart } from "../cmps/chartJs/LineChart.jsx";
import { DoughnutChart } from "../cmps/chartJs/DoughnutChart.jsx";
import { PiaChart } from "../cmps/chartJs/PiaChart.jsx";
import { AppHeader } from "../cmps/AppHeader.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);


export function DashBoard() {

    const [toys, setToys] = useState()

    useEffect(() => {
        loadToys()
            .then(toys => {
                setToys(toys)
            })

    }, [])


    return (
        <>
            {toys && <div className="dash-board">
                <AppHeader />
                <section className="dash-board-container">
                    <div className="circle-charts">
                        <article className="doughnut-chart-container">
                            <DoughnutChart className="doughnut-chart" items={toys} />
                        </article>
                        <article className="pia-chart-container">
                            <PiaChart className="pia-chart" items={toys} />
                        </article>
                    </div>
                    <article className="line-chart-container">
                        <LineChart className="line-chart" items={toys} />
                    </article>
                </section>
            </div>}
        </>
    )

}

