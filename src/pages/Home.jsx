import { AppHeader } from "../cmps/AppHeader";
import {  Container } from '@mui/material';
import Leaflet from "../cmps/MyMap";

export function Home() {


    return (
        <Container>
            <AppHeader />
            <Leaflet />
        </Container>
    )

}

