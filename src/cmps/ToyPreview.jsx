export function ToyPreview({ toy, toggleInStock }) {

    return (
        <article className="toy-preview">
            <h2>
                {/*   className={(toy.isDone)? 'done' : ''} onClick={onToggleToy} */}
                Toy's Name: {toy.txt}
            </h2>
            <label htmlFor="in-stock" className="in-stock">
                Is Toy in stock ?
                <input onChange={() => toggleInStock(toy)} type="checkbox" name="in-stock" id="in-stock" />
            </label>
            <h4>Toy price: ${toy.price}</h4>
            <img className="toy-img" src={`https://robohash.org/${toy._id}`} alt="Toy Image" />
        </article>
    )
}
