import { Card, CardContent } from "@mui/material"
import { ImgCmp } from "./ImgCmp"

export function ToyPreview({ toy }) {
    var setStockTo
    const date = new Date(toy.createdAt).toLocaleDateString()

    if (toy.inStock === false) setStockTo = 'unavailable'
    return (
        <Card sx={{ textAlign: "center" }}>
            <CardContent className={` ${setStockTo}`}>
                <h2>{toy.name}</h2>
                <h4>Toy price: ${toy.price}</h4>
                {/* <article className="createdAt">Created At:{date}</article> */}
                <ImgCmp imgSrc={`https://robohash.org/${toy._id}`} imgTitle={'Toy Image'} />
            </CardContent>
        </Card >
    )
}
