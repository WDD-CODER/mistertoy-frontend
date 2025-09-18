import {Button, ButtonGroup, Card, Container, List } from "@mui/material"
import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export function ToyList({ toys, onRemoveToy }) {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    //QUESTION //לא מובן מדוע אם אין את הקונסול בפרטים אז לפעמים צריך כמה לחיצות עד שהכפתור מגיב
// לבדוק אפשרות שאולי זה לוחץ בחלק מסויים מהכפתור ולכן זה לא מגיב. לשים לב אם זה היה בטגית של הקישור או התגית של הכפתור
    return (
        <List className="toy-list" >
            {toys.map(toy =>
                <Card key={toy._id} sx={{marginBottom:'auto', height: 'auto', display: 'flex', flexDirection: 'column', }}>
                    <ToyPreview toy={toy} />
                    {loggedinUser?.isAdmin &&
                            //FIXME STYLE כרגע סידרתי את הלייבילים ככפתור לפתרון זריז.
                        <Container sx={{padding:'0' , marginTop:'auto', height:'fit-content'}} >
                            <List>{toy?.labels.map(label => <Button  key={label} >{label}</Button>)}
                            </List>
                            <ButtonGroup fullWidth  >
                                <Button onClick={() => onRemoveToy(toy._id)}>Remove</Button>
                                <Button onClick={() => console.log('Details')}><Link to={`/toy/${toy._id}`}>Details</Link></Button>
                                <Button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></Button>
                            </ButtonGroup>
                        </Container>
                    }
                </Card>
            )}
        </List>
    )
}

