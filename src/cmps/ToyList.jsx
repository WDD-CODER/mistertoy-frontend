import { Labels } from "./Labels.jsx"
import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom"

export function ToyList({ toys, onRemoveToy, onToggleInStock }) {
    //לא מובן מדוע אם אין את הקונסול בפרטים אז לפעמים צריך כמה לחיצות עד שהכפתור מגיב
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} onToggleInStock={onToggleInStock} />
                    <Labels toy={toy} />
                    <label htmlFor="in-stock" className="in-stock">
                        Is Toy in stock ?
                        <input onChange={() => onToggleInStock(toy)} type="checkbox" name="in-stock" id="in-stock" />
                    </label>

                    <section>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <button onClick={() => console.log('Details')}><Link to={`/toy/${toy._id}`}>Details</Link></button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}