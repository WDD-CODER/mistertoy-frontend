import { Box, Container } from '@mui/material';
import MyMap from "../cmps/MyMap";

export function Home() {

    return (
        <Container sx={{width:'90vw', height: '80vh', placeContent:'center'}} >
            <MyMap />
        </Container>
    )
}

