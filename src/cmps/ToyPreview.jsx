import { Card, CardContent, Container } from "@mui/material"
import { ImgCmp } from "./ImgCmp"

export function ToyPreview({ toy, onToggleInStock }) {
    var checkedBox = ''
    var unavailable = ''
    var style = ''
    var setStockTo
    var header = 'Please Selecet Toy Stock Value'

    const date = new Date(toy.createdAt).toLocaleDateString()

    // getStockStatus()
    // function getStockStatus() {
        if (toy.inStock === 'Available') {
            checkedBox = 'checked'
            style = 'green'
            header = 'Toy is in Stock'
        }
        if (toy.inStock === 'Unavailable') {
            checkedBox = 'checked'
            style = 'red'
            header = 'Toy is Not available'
        }
    // }

    if (toy.inStock === '' || toy.inStock === 'Unavailable') setStockTo = 'available'
    if (toy.inStock === 'available') setStockTo = 'Unavailable'

    return (
        <Card  sx={{textAlign: "center"}}>
            <CardContent className={` ${toy.inStock}`}>
                <h2> Toy's Name: {toy.txt}</h2>
                <h4>Toy price: ${toy.price}</h4>
                <article className="createdAt">Created At:{date}</article>
             <ImgCmp imgSrc={`https://robohash.org/${toy._id}`} imgTitle={'Toy Image'}/>
            </CardContent>
         </Card > 
    )
}
