export function ToyPreview({ toy, onToggleInStock }) {
    console.log("🚀 ~ toy.inStock:", toy.inStock)

    const inStock = toy.inStock ? false : true
    return (
        <article className={(toy.inStock) ? 'toy-preview' : 'toy-preview outOfStock'}>
            <h2> Toy's Name: {toy.txt}</h2>
                <h4>{inStock ? "Not available" : "Toy is in Stock"}</h4>
                <input checked={inStock} onChange={() => onToggleInStock(toy)} type="checkbox" name="in-stock" id="in-stock" />
            <h4>Toy price: ${toy.price}</h4>
            <img className="toy-img" src={`https://robohash.org/${toy._id}`} alt="Toy Image" />
        </article>
    )
}
