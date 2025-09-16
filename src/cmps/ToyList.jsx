import { Button, ButtonGroup, Card, List } from "@mui/material"
import { LabelsList } from "./LabelsList.jsx"
import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export function ToyList({ toys, onRemoveToy }) {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    //QUESTION //לא מובן מדוע אם אין את הקונסול בפרטים אז לפעמים צריך כמה לחיצות עד שהכפתור מגיב

    return (
        <List className="toy-list" >
            {toys.map(toy =>
                <Card key={toy._id} sx={{ height: 'auto', display: 'flex', flexDirection: 'column', }}>
                    <ToyPreview toy={toy} />
                    {loggedinUser?.isAdmin &&
                        <>
                            <LabelsList toy={toy} />
                            <ButtonGroup>
                                <Button onClick={() => onRemoveToy(toy._id)}>Remove</Button>
                                <Button onClick={() => console.log('Details')}><Link to={`/toy/${toy._id}`}>Details</Link></Button>
                                <Button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></Button>
                            </ButtonGroup>
                        </>
                    }
                </Card>
            )}
        </List>
    )
}