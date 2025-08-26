

export function ToyInfo({ toy, }) {

    // setToyInStockValue(toy, ev)


    const demoImg = `https://robohash.org/${toy._id}`
    const toyImg = toy.imgUrl ? toy.imgUrl : demoImg
    const date = new Date(toy.createdAt).toLocaleDateString()
    const res = toy.inStock || ''


    return (
        <div className="toy-info">
            <h2>    Toy's Name: {toy.txt}</h2>
            <article className="price">Toy Price:${toy.price}</article>
            <article className="in-stock">Toy In Stock:{toy.inStock}</article>
            <article className="createdAt">Created At:{date}</article>
            {/* <label htmlFor="in-stock" className="in-stock">
               {`Is ${toy.txt} in stock ?`}
                <input onChange={() => toggleInStock(toy)} type="checkbox" name="in-stock" id="in-stock" />
            </label> */}
            {/* <label htmlFor="in-stock" className="in-stock">
                {`Is ${toy.txt} in stock ?`}
                <select value={res} name="labels" id="labels" onChange={ }>
                    <option value="" disabled>Labels</option>
                    <option value="on-wheels">On Wheels</option>
                    <option value="box-game">Box Game</option>
                </select>
            </label> */}
            <img className="toy-img" src={toyImg} alt="Toy Image" />
        </div>
    )

}
