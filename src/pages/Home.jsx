import { AppHeader } from "../cmps/AppHeader";
import { Box, Container } from '@mui/material';
import Leaflet from "../cmps/MyMap";
import MyMap from "../cmps/MyMap";
import { AppFooter } from "../cmps/AppFooter";

export function Home() {

    return (
        <>
        <Container>
            <AppHeader />
            <MyMap />
        </Container>
            <AppFooter />
        </>
    )
}

