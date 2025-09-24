import { Card, CardContent, Typography } from "@mui/material"
import { ImgCmp } from "./ImgCmp"

export function ToyPreview({ toy }) {
    var setStockTo
    const date = new Date(toy.createdAt).toLocaleDateString()
    if (toy.inStock === false) setStockTo = 'unavailable'
    return (
        <Card sx={{ textAlign: "center", height:'350px', placeContent:'space-evenly'}}>
            <CardContent className={` ${setStockTo}`}>
                <Typography variant="body1">{toy.name}</Typography>
                <Typography variant="body1">Toy price: ${toy.price}</Typography>
                {/* <article className="createdAt">Created At:{date}</article> */}
                <ImgCmp imgSrc={`https://robohash.org/${toy._id}?size=200x200`} imgTitle={'Toy Image'} />
            </CardContent>
        </Card >
    )
}
