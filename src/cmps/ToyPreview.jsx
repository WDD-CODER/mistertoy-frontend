export function ToyPreview({ toy, onToggleToy }) {
    return (
        <article className="toy-preview">
            <h2 className={(toy.isDone)? 'done' : ''} onClick={onToggleToy}>
                Toy: {toy.txt}
            </h2>
<<<<<<< HEAD
            <h4>Toy Importance: {toy.importance}</h4>
=======
            <h4>Toy price: ${toy.price}</h4>
>>>>>>> feat/toy-price-model
            <img src={`../assets/img/${'toy'}.png`} alt="" />
        </article>
    )
}
