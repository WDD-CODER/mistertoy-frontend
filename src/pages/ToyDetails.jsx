import { getToy, onDeleteToyMsg as onRemoveToyMsg, onSaveToyMsg, updateToy } from "../store/actions/toy.actions.js"
import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { LabelsList } from "../cmps/LabelsList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ToyPreview } from "../cmps/ToyPreview.jsx"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"
import { Box, Button, Container, Grid, Paper, Toolbar, Typography } from "@mui/material"
import { Loader } from "../cmps/Loader.jsx"
import { AddMsg } from "../cmps/AddMsg.jsx"
import { useSelector } from "react-redux"
import { toyService } from "../services/toy/index.js"
import { utilService } from "../services/util.service.js"
import { addReview, getToyReviews, removeReview } from "../store/actions/review.actions.js"
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export function ToyDetails() {


    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [toy, setToy] = useState(null)
    const [massage, setMassage] = useState(toyService.getEmptyMsg())
    const [isReviewOpen, setIsReviewOpen] = useState(false)
    const [review, setReview] = useState({ txt: '' })
    const [reviews, setReviews] = useState(null)

    const toyRef = useRef(null)
    const { toyId } = useParams()


    useEffect(() => {
        if (toyId) fetchToy()

        return () => {
            if (toyRef.current && loggedinUser?.isAdmin) {
                updateToy(toyRef.current)
            }
        }
    }, [toyId])

    useEffect(() => {
        if (loggedinUser) {
            setMassage(prevMsg => ({ ...prevMsg, by: ({ _id: loggedinUser._id, username: loggedinUser.username }) }))
        }
    }, [loggedinUser])

    async function fetchToy() {
        try {
            const toy = await getToy(toyId)
            const toyReviews = await getToyReviews(toyId)
            setReviews(toyReviews)
            toyRef.current = toy
            setToy(toy)
        } catch (error) {
            showErrorMsg("can't get toy ")
        }
    }

    function onUpdateToyStockValue(ev) {
        const modifiedStockValue = utilService.getStockModifiedValue(ev.target.value)
        setToy(prevToy => {
            let toy = ({ ...prevToy, inStock: modifiedStockValue })
            toyRef.current = toy
            return toy
        })
    }

    function onUpdateToyLabels(ev) {
        const labelsToAdd = ev.target.value
        var updatedField = []
        if (toy.labels.some(curLabel => curLabel === labelsToAdd)) {
            updatedField = toy.labels.filter(curLabel => curLabel !== labelsToAdd)
            setToy(prevToy => {
                let toy = ({ ...prevToy, labels: updatedField })
                toyRef.current = toy
                return toy
            })
        } else {
            setToy(prevToy => {
                let toy = ({ ...prevToy, labels: labelsToAdd })
                toyRef.current = toy
                return toy
            })
        }

    }

    function onSaveMsg(newMsg, resetForm) {
        const msgToSave = { ...massage, ...newMsg };
        setToy(prevToy => ({ ...prevToy, msgs: [...(prevToy.msgs || []), msgToSave] }))
        setReview(null)
        resetForm()
        onSaveToyMsg(toy._id, msgToSave)
    }

    function onAddReview({ txt }) {
        const review = { aboutToyId: toy._id, txt }
        setReviews(prevReviews => [...prevReviews, review])
        setIsReviewOpen(false)
        addReview(review)
    }

    function onRemoveReview({ _id }) {
        setReviews(prevReviews => prevReviews.filter(review => review._id !== _id))
        setIsReviewOpen(false)
        showSuccessMsg('Review Removed')
        removeReview(_id)
    }

    function onRemoveMsg({ id }) {
        setToy(prevToy => ({ ...prevToy, msgs: prevToy.msgs.filter(msg => msg.id !== id) }))
        // setIsReviewOpen(false)
        showSuccessMsg('Massage Removed')
        onRemoveToyMsg(toyId, id)
        // removeReview(_id)
    }




    return (
        <Container>
            {toy ? <Box className={'toy-details'}>
                <ToyPreview toy={toy} />
                {loggedinUser?.isAdmin && <LabelsList item={toy} onUpdateLabels={onUpdateToyLabels} onUpdateStockValue={onUpdateToyStockValue} />}

                {loggedinUser ?
                    <AddMsg
                        msg={massage}
                        onSaveMsg={onSaveMsg}
                    />
                    :
                    <Typography>
                        Please login in order to send message to toy.
                    </Typography>
                }
                <Container sx={{ backgroundColor: 'lightskyblue', textAlign: 'center' }} >
                    <Typography>Toy Messages</Typography>

                    <Grid container spacing={2} padding={2}>
                        {toy.msgs?.map((msg, idx) => {
                            return <Grid key={idx}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    {msg.txt}
                                    {loggedinUser?.isAdmin && <IconButton onClick={() => onRemoveMsg(msg)} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>}
                                </Paper>
                            </Grid>
                        })
                        }
                    </Grid>
                </Container>

                <Container sx={{ backgroundColor: 'lightgrey', textAlign: 'center' }} >
                    <Typography>Reviews</Typography>
                    {!isReviewOpen && loggedinUser?.isAdmin && <Button onClick={() => setIsReviewOpen(true)}>Add Review</Button>}

                    <Grid container spacing={2} padding={2} >
                        {reviews?.map((review, idx) => {
                            return <Grid key={idx}>
                                <Paper sx={{ textAlign: 'center', backgroundColor: 'burlywood', padding: '1em' }}>
                                    {review.txt}
                                    {loggedinUser?.isAdmin && <IconButton onClick={() => onRemoveReview(review)} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>}
                                </Paper>
                            </Grid>
                        })
                        }
                    </Grid>
                    {isReviewOpen && loggedinUser && <PopUp
                        header={<h3>Add Review About {toy.name}s</h3>}
                        onClose={() => setIsReviewOpen(false)}
                        isOpen={isReviewOpen}
                    >
                        <AddMsg
                            msg={review}
                            onSaveMsg={onAddReview}
                        />
                    </PopUp>}
                </Container>

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
        </Container>
    )
}


