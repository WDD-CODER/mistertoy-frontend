import { getToy, onSaveToyMsg, updateToy } from "../store/actions/toy.actions.js"
import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { LabelsList } from "../cmps/LabelsList.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"
import { ToyPreview } from "../cmps/ToyPreview.jsx"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { Box, Button, Container, Grid, Paper, Toolbar, Typography } from "@mui/material"
import { AppFooter } from "../cmps/AppFooter.jsx"
import { Loader } from "../cmps/Loader.jsx"
import { AddMsg } from "../cmps/AddMsg.jsx"
import { useSelector } from "react-redux"
import { toyService } from "../services/toy/index.js"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {

    const [reviews, setReviews] = useState([])

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [toy, setToy] = useState(null)
    const [toyMsg, setToyMsg] = useState(toyService.getEmptyMsg())

    const toyRef = useRef(null)
    const { toyId } = useParams()


    useEffect(() => {
        if (toyId) fetchToy()

        return () => {
            if (toyRef.current) {
                const updatedToy = toyRef.current
                updateToy(updatedToy)
            }
        }
    }, [toyId])

    useEffect(() => {
        toyRef.current = toy
    }, [toy])

    useEffect(() => {
        if (loggedinUser) {
            setToyMsg(prevMsg => ({ ...prevMsg, by: ({ _id: loggedinUser._id, username: loggedinUser.username }) }))
        }
    }, [loggedinUser])

    async function fetchToy() {
        try {
            const toy = await getToy(toyId)
            setToy(toy)
        } catch (error) {
            showErrorMsg("can't get toy ")
        }
    }

     function onUpdateToyStockValue(ev) {
        const modifiedStockValue = utilService.getStockModifiedValue(ev.target.value)
        setToy(prevToy => ({ ...prevToy, inStock: modifiedStockValue }))
    }

    function onUpdateToyLabels(ev) {
        const labelsToAdd = ev.target.value
        var updatedField = []
        if (toy.labels.some(curLabel => curLabel === labelsToAdd)) {
            updatedField = toy.labels.filter(curLabel => curLabel !== labelsToAdd)
            setToy(({ ...toy, labels: updatedField }))
        } else {
            setToy(({ ...toy, labels: labelsToAdd }))
        }
    }


    function onSaveMsg(newMsg, resetForm) {
        const msgToSave = { ...toyMsg, ...newMsg };
        setToy(prevToy => ({ ...prevToy, msgs: [...(prevToy.msgs || []), msgToSave] }))
        setToyMsg(toyService.getEmptyMsg())
        resetForm()
        onSaveToyMsg(toy._id, msgToSave)
    }

    return (
        <Container>
            <AppHeader />
            {toy ? <Box className={'toy-details'}>
                <ToyPreview toy={toy} />
                <LabelsList item={toy} onUpdateLabels={onUpdateToyLabels} onUpdateStockValue={onUpdateToyStockValue} />

                {(loggedinUser) ?
                    <AddMsg
                        msg={toyMsg}
                        onSaveMsg={onSaveMsg}
                    />
                    :
                    <Typography>
                        Please login in order to send message to toy.
                    </Typography>
                }

                <Grid container spacing={2}>
                    {toy.msgs?.map((msg, idx) => {
                        return <Grid key={idx}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                {msg.txt}
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
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


