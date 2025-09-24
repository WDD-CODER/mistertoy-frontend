import { Avatar, Button, ButtonGroup, Card, Chip, Container, Grid, List, Stack } from "@mui/material"
import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export function ToyList({ toys, onRemoveToy }) {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    //QUESTION //לא מובן מדוע אם אין את הקונסול בפרטים אז לפעמים צריך כמה לחיצות עד שהכפתור מגיב
    // לבדוק אפשרות שאולי זה לוחץ בחלק מסויים מהכפתור ולכן זה לא מגיב. לשים לב אם זה היה בטגית של הקישור או התגית של הכפתור
    return (
        <List sx={{
            width:'100%',
            display: "flex",
            flexWrap: "wrap",
            placeContent: "space-evenly",
        }}
            className="toy-list" >
            {toys.map(toy =>
                    <Card key={toy._id} sx={{
                        maxWidth:'300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        paddingBottom:1
                    }}>
                        <ToyPreview toy={toy} />
                        <Container  >
                            <List sx={{ display: "flex", flexWrap: "wrap",placeContent:'center' ,gap: 2}}>
                                {toy?.labels.map(label =>
                                    <Chip key={label} label={label}
                                    />
                                )}
                            </List>

                            <ButtonGroup fullWidth  >
                                {loggedinUser?.isAdmin && <Button onClick={() => onRemoveToy(toy._id)}>Remove</Button>}
                                {loggedinUser?.isAdmin && <Button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></Button>}
                                <Button><Link to={`/toy/${toy._id}`}>Details</Link></Button>
                            </ButtonGroup>

                        </Container>
                    </Card>
                )}
        </List >
    )
}

