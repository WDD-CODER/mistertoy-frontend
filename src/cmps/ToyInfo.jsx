import { Box, Card, CardContent, Typography } from "@mui/material"
import { ImgCmp } from "./ImgCmp"

export function ToyInfo({ toy }) {
const {name,createdAt, price , inStock, updatedAt } = toy
    const demoImg = `https://robohash.org/${toy._id}`
    const toyImg = toy.imgUrl ? toy.imgUrl : demoImg
    // var stockValue = 'Please Selecet Toy Stock Value'
    var setStockTo
    const date = new Date(toy.createdAt).toLocaleDateString()

    if (toy.inStock === false) setStockTo = 'unavailable'

    return (
        <Card className={`toy-info ${inStock}`} sx={{width:'300px'}}>
            <CardContent className={` ${setStockTo}`}>
                <Typography variant="h4">    Toy's Name: {name}</Typography>
                <Typography className="price">Toy Price:${price}</Typography>
                <Typography  variant="h4" className="in-stock">{inStock}</Typography>
                <Typography className="createdAt">Created At:{createdAt}</Typography>
                <Typography className="createdAt">Updated At:{updatedAt}</Typography>
                <ImgCmp className="toy-img" src={toyImg} alt="Toy Image" />
            </CardContent>
        </Card>
    )
}
