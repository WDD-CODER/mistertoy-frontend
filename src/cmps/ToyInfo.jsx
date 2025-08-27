
export function ToyInfo({ toy, }) {


    const demoImg = `https://robohash.org/${toy._id}`
    const toyImg = toy.imgUrl ? toy.imgUrl : demoImg
    var stockValue = 'Please Selecet Toy Stock Value'
    var inStock = ''
    // const date = new Date(toy.createdAt).toLocaleDateString()

    if (toy.inStock === true) {
        stockValue = 'Toy is in Stock'
    }
    if (toy.inStock === false) {
        inStock = 'unavailable'
        stockValue = 'Toy is Not available'
    }

    return (
        <div className={`toy-info ${inStock}`}>
            <h2>    Toy's Name: {toy.txt}</h2>
            <article className="price">Toy Price:${toy.price}</article>
            <h4 className="in-stock">{stockValue}</h4>
            {/* <article className="createdAt">Created At:{date}</article> */}
            <img className="toy-img" src={toyImg} alt="Toy Image" />
        </div>
    )

}
