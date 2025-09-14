import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadToys } from "../store/actions/toy.actions";
import { LineChart } from "../cmps/chartJs/LineChart.jsx";
import { DoughnutChart } from "../cmps/chartJs/DoughnutChart.jsx";
import { PiaChart } from "../cmps/chartJs/PiaChart.jsx";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { Box, Container } from "@mui/material";
import { showErrorMsg } from "../services/event-bus.service.js";
import { AppFooter } from "../cmps/AppFooter.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);


export function DashBoard() {

    const [toys, setToys] = useState()

    useEffect(() => {
        fetchToys()
    }, [])


    async function fetchToys() {
        try {
            const toys = await loadToys()
            setToys(toys)
        } catch (error) {
            showErrorMsg(" Can't load toys properly ")
        }
    }

    return (
        <Container >
            <AppHeader />
            {toys &&
                <Box >
                    <Container sx={{ display: "flex", justifyContent: 'space-evenly' }} className="dash-board-container">
                        <Box sx={{ height: '30vh' }}>
                            <DoughnutChart items={toys} />
                        </Box>
                        <Box sx={{ height: '30vh' }}>
                            <PiaChart items={toys} />
                        </Box>
                    </Container>
                    <Box sx={{ height: '50vh' }} className="line-chart-container">
                        <LineChart className="line-chart" items={toys} />
                    </Box>
                </Box>
            }
            <AppFooter />
        </Container>
    )

}

