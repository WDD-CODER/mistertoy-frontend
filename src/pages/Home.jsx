import { AppHeader } from "../cmps/AppHeader";
import { Container } from '@mui/material';
import Leaflet from "../cmps/MyMap";
import MyMap from "../cmps/MyMap";

export function Home() {


    return (
        <>
            <AppHeader />
            <MyMap />
        </>
    )

}

