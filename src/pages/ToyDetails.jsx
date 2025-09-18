import { getToy,updateToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { LabelsList } from "../cmps/LabelsList.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"
import { ToyPreview } from "../cmps/ToyPreview.jsx"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { Box, Button, Container, Toolbar } from "@mui/material"
import { AppFooter } from "../cmps/AppFooter.jsx"
import { Loader } from "../cmps/Loader.jsx"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdateOnly.js"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {

    const [reviews, setReviews] = useState([])

    const [isChatOpen, setIsChatOpen] = useState(false)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    const debouncedToyUpdate = utilService.debounce(updateToy, 500)
    
    useEffectOnUpdate(() => {
        debouncedToyUpdate(toy)
    }, toy)



    useEffect(() => {
        if (toyId) fetchToy()

        }, [toyId])

    async function fetchToy() {
        try {
            const toy = await getToy(toyId)
            setToy(toy)
        } catch (error) {
            showErrorMsg("can't get toy ")
        }
    }
    

    return (
        <Container>
            <AppHeader />
            {toy ? <Box className={'toy-details'}>
                <ToyPreview toy={toy} />
                <LabelsList item={toy} setItem={setToy}/>

                <Button><Link to={`/toy/`}>Back to list</Link></Button>
                {!isChatOpen && <Button onClick={() => setIsChatOpen(true)} className='open-chat'>Chat</Button>}

                <Toolbar className="prev-next-btns flex" >
                    <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link>
                    <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
                </Toolbar>
                <PopUp
                    header={<h3>Chat About {toy.name}s</h3>}
                    footer={<h4>&copy; 2025-9999 Toys INC.</h4>}
                    onClose={() => setIsChatOpen(false)}
                    isOpen={isChatOpen}
                >
                    <Chat />
                </PopUp>
            </Box>
                :
                <Loader />}
            <AppFooter />
        </Container>
    )
}