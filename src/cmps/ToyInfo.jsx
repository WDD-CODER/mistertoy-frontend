

export function ToyInfo({ toy }) {

    const demoImg = `https://robohash.org/${toy._id}`
    const toyImg = toy.imgUrl ? toy.imgUrl :demoImg
    const date = new Date(toy.createdAt).toLocaleDateString()


    return (
        <div className="toy-info">
            <article className="price">Price:{toy.price}</article>
            <article className="in-stock">Toy In Stock:{toy.instock}</article>
            <article className="createdAt">Created At:{date}</article>
            <img className="toy-img" src={toyImg} alt="Toy Image" />
        </div>
    )
}

