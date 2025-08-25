export function ToyPreview({ toy, onToggleToy }) {
    return (
        <article className="toy-preview">
            <h2>
                {/*   className={(toy.isDone)? 'done' : ''} onClick={onToggleToy} */}
                Toy's Name: {toy.txt}
            </h2>
            <h4>Toy price: ${toy.price}</h4>
            <img className="toy-img" src={`https://robohash.org/${toy._id}`} alt="Toy Image" />
        </article>
    )
}
