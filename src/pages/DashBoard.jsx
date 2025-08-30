import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { ToyFilter } from "../cmps/ToyFilter";
import { Link } from "react-router-dom";
import { Loader } from "../cmps/Loader";
import { useEffect, useState } from "react";
import { loadToys } from "../store/actions/toy.actions";
// import { ChartDoughnut, DoughnutChart } from "../cmps/chartJs/DoughnutChart.jsx";
import { BarChart } from "../cmps/chartJs/BarChart.jsx";
import { DoughnutChart } from "../cmps/chartJs/DoughnutChart.jsx";
import { PiaChart } from "../cmps/chartJs/PiaChart.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);


export function DashBoard() {

    const filterBy = useSelector(state => state.toyModule.filterBy)
    const [toys, setToys] = useState()

    useEffect(() => {
        loadToys()
            .then(toys => {
                setToys(toys)
            })

    }, [filterBy])


    if (!toys) return <Loader />
    return (
        <div className="dash-board">
            <ToyFilter filterBy={filterBy} />
            <Link to="/toy" className="btn" >Go To Toys</Link>
            <section className="dash-board-container">
                <div className="circle-charts">
                    <article className="doughnut-chart-container">
                        <DoughnutChart className="doughnut-chart" items={toys} />
                    </article>
                    <article className="pia-chart-container">
                        <PiaChart className="pia-chart" items={toys} />
                    </article>
                </div>
                <article className="bar-chart-container">
                    <BarChart className="bar-chart" items={toys} />
                </article>
            </section>
        </div>
    )

}

