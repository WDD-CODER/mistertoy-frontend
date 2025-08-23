export function ToyPreview({ toy, onToggleToy }) {
    return (
        <article className="toy-preview">
            <h2 className={(toy.isDone)? 'done' : ''} onClick={onToggleToy}>
                Toy: {toy.txt}
            </h2>
            <h4>Toy price: ${toy.price}</h4>
            <img src={`../assets/img/${'toy'}.png`} alt="" />
        </article>
    )
}
