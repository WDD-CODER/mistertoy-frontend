import { Box, Button, Card, Container, FormLabel, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { userService } from "../services/user";
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { UserPreview } from "../cmps/UserPeview";
import { useParams } from "react-router-dom";
import { showErrorMsg } from "../services/event-bus.service";
import { Loader } from "../cmps/Loader";
import { useSelector } from "react-redux";
import { loadToyReviews, loadUserReviews } from "../store/actions/review.actions";

export function UserDetails() {
    const reviews = useSelector(state => state.reviewModule.reviews)

    const { userId } = useParams()
    const [user, setUser] = useState()

    useEffect(() => {
        if (userId) fetchUser()
    }, [])

    async function fetchUser() {
        try {
            if (userId) {
                const curUser = await userService.getById(userId)
                const userReviews = await loadUserReviews(userId)
                setUser(curUser)
            }
        } catch (error) {
            showErrorMsg("can't get user ")
        }
    }

    function onRemoveReview({ _id }) {
        // setIsReviewOpen(false)
        // showSuccessMsg('Review Removed')
        // removeReview(_id)
    }

    if (!user) return <Loader />

    return (
        <Container className="user-details" sx={{ display: 'flex', flexDirection: 'column', }}>
            <UserPreview user={user} />

            <Box sx={{ backgroundColor: 'lightgrey', textAlign: 'center', marginTop: 10 }} >
                <Typography>reviews</Typography>
                <Button >Add Review</Button>

                <Grid container spacing={2} padding={2} >
                    {reviews?.map((review, idx) => {

                        return <Grid key={idx}>
                            <Card sx={{ display: "flex", backgroundColor: 'burlywood', }}>
                                <Stack  >
                                      <FormLabel sx={{ gap: 1, display: "grid", textAlign: 'center', padding: '1em' }}>
                                        <Paper> About Toy :<Typography > {review.toy.name}</Typography></Paper>
                                      </FormLabel>
                                      <FormLabel sx={{ gap: 1, display: "grid", textAlign: 'center', padding: '1em' }}>
                                        <Paper variant="">What It Say:<Typography > { review.txt}</Typography></Paper>
                                      </FormLabel>
                                      <FormLabel sx={{ gap: 1, display: "grid", textAlign: 'center', padding: '1em' }}>
                                        <Paper variant="">Created At:<Typography > { review.txt}</Typography></Paper>
                                      </FormLabel>
                                </Stack>
                                {user?.isAdmin && <IconButton onClick={() => onRemoveReview(review)} aria-label="close">
                                    <CloseIcon />
                                </IconButton>}
                            </Card>
                        </Grid>
                    })
                    }
                </Grid>
            </Box>
        </Container>
    )
}