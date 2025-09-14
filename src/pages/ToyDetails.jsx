import { getToy, saveToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { LabelsList } from "../cmps/LabelsList.jsx"
import { ToyInfo } from "../cmps/ToyInfo.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.remote.js"
import { ToyPreview } from "../cmps/ToyPreview.jsx"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { Box, Button, Container, Stack, Toolbar } from "@mui/material"
import { AppFooter } from "../cmps/AppFooter.jsx"
import { Loader } from "../cmps/Loader.jsx"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdateOnly.js"

export function ToyDetails() {

    const [isChatOpen, setIsChatOpen] = useState(false)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

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
                <LabelsList toy={toy} setToy={setToy} />

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