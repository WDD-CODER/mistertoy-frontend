
export function ToyPreview({ toy, onToggleInStock }) {
    var checkedBox = ''
    var unavailable = ''
    var style = ''
    var setStockTo
    var header = 'Please Selecet Toy Stock Value'

    const date = new Date(toy.createdAt).toLocaleDateString()

    getStockStatus()

    function getStockStatus() {
        if (toy.inStock === true) {
            checkedBox = 'checked'
            unavailable = 'available'
            style = 'green'
            header = 'Toy is in Stock'
        }
        if (toy.inStock === false) {
            checkedBox = 'checked'
            unavailable = 'unavailable'
            style = 'red'
            header = 'Toy is Not available'
        }
    }

    if (unavailable === '' || unavailable === 'unavailable') setStockTo = 'available'
    if (unavailable === 'available') setStockTo = 'unavailable'

    return (
        <article className={`toy-preview`}>
            <section className={` ${unavailable}`}>
                <h2> Toy's Name: {toy.txt}</h2>
                <h4>Toy price: ${toy.price}</h4>
                <article className="createdAt">Created At:{date}</article>
            </section>
            <img className="toy-img" src={`https://robohash.org/${toy._id}`} alt="Toy Image" />
            <h4>{header}</h4>
            <label htmlFor="checkbox" className="grid">
                {`Set Toy Stock To ${setStockTo}`}
                <input style={{ accentColor: style }} checked={checkedBox} onChange={() => onToggleInStock(toy)} type="checkbox" name="in-stock" id="in-stock" />
            </label>
        </article>
    )
}
