import { getToy, saveToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Labels } from "../cmps/Labels.jsx"
import { ToyInfo } from "../cmps/ToyInfo.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function ToyDetails() {

    const isLoading = useSelector(state => state.toyModule.isLoading)
    const toys = useSelector(state => state.toyModule.toys)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()


    useEffect(() => {
        if (toyId) {
            getToy(toyId)
                .then(setToy)
        }
    }, [toyId, toys])

    function onToggleInStock(toy) {
        const toyToSave = { ...toy, inStock: !toy.inStock }
        console.log("🚀 ~ onToggleInStock ~ toyToSave:", toyToSave)
        setToy(toy => toy.inStock === !toy.inStock)
        saveToy(toyToSave)
            .then(savedToy => {
                console.log("🚀 ~ onToggleInStock ~ savedToy:", savedToy)
                
                showSuccessMsg(` Changed Toy ${savedToy.txt} stock value `)})
            .catch(err => {
                console.log('problem trying to set toy stock value', err)
                showErrorMsg('toy stock not changed ' + toy._Id)
            })
    }

// אני לא מבין כיצד לבטל את ההמתנה הארוכה לרנדור זה מרגיש לי לא נכון

    if (isLoading) return <div>Loading...</div>
    if (!toy) return null

    return (

        <section className={(toy.inStock) ? 'toy-details' : 'toy-details outOfStock'}>
            <h1>Toy name: {toy.txt}</h1>
            <ToyInfo toy={toy} />
            <h4>{toy.inStock ? "Toy is in Stock" : "Not available"}</h4>
            <input checked={toy.inStock} onChange={() => onToggleInStock(toy)} type="checkbox" name="in-stock" id="in-stock" />
            <Labels toy={toy} setToy={setToy} />
            <button><Link to={`/toy/`}>Back to list</Link></button>
            <div>
                <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link>
                <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
            </div>
        </section>
    )
}