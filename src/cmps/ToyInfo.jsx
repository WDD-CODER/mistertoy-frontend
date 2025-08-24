
import noImg from "../assets/img/react.svg"

export function ToyInfo({ toy }) {

    const toyImg = toy.imgUrl ? toy.imgUrl : noImg
    const date = new Date(toy.createdAt).toLocaleDateString()


    return (
        <div className="toy-info">
            <article className="price">Price:{toy.price}</article>
            <article className="in-stock">Toy In Stock:{toy.instock}</article>
            <article className="createdAt">Created At:{date}</article>
            <img className="toy-img" src={toyImg} alt="toy-img" />
        </div>
    )
}

