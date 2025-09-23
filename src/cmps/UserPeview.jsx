import { Box, Card, CardContent, List, ListItem, Typography } from "@mui/material"
import { ImgCmp } from "./ImgCmp"

export function UserPreview({ user }) {

    const gender = (user.gender === 'male') ? 'male' : 'female'
    return (
        <Card sx={{borderRadius:2, textAlign: "center", placeContent: 'space-evenly' }}>
            <CardContent sx={{ display: "flex", placeContent:'space-evenly'}}>
                <Box padding={1} border={1} borderRadius={2}>
                    <ImgCmp
                        imgSrc={`https://robohash.org/${user._id}?set=set4&size=128x128`}
                        imgTitle={'User Avatar'} />
                </Box>
                <List sx={{placeContent:'space-evenly'}}>
                    <ListItem>
                        <Typography variant="body1">User Name : {user.username}</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">{user.username ? `${user.username} Is Admin` : `${user.username} Not Admin`}</Typography>
                    </ListItem>
                    {/* <article className="createdAt">Joint  At:{date}</article> */}
                </List>
            </CardContent>
        </Card >
    )
}
