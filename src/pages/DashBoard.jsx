import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadToys } from "../store/actions/toy.actions";
import { LineChart } from "../cmps/chartJs/LineChart.jsx";
import { DoughnutChart } from "../cmps/chartJs/DoughnutChart.jsx";
import { PiaChart } from "../cmps/chartJs/PiaChart.jsx";
import { Box, Container } from "@mui/material";
import { showErrorMsg } from "../services/event-bus.service.js";

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
            {toys &&
                    <Container sx={{ display: "flex", flexWrap:'wrap', justifyContent: 'space-evenly' }} className="dash-board-container">
                    <Box sx={{ display: 'flex', flexWrap:'wrap', gap: 2 , placeContent:'center'}}>

                        <Box sx={{ height: '30vh' }}>
                            <DoughnutChart items={toys} />
                        </Box>
                        <Box sx={{ height: '30vh' }}>
                            <PiaChart items={toys} />
                        </Box>
                    </Box>
                    <Box br sx={{ height: '50vh', width: { xs: '100%', sm: '90%', md: '90%' } }} className="line-chart-container">
                        <LineChart className="line-chart" items={toys} />
                    </Box>
                    </Container>
            }
        </Container>
    )

}

