import { saveToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Labels } from "../cmps/Labels.jsx"
import { ToyInfo } from "../cmps/ToyInfo.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"

export function ToyDetails() {

    const isLoading = useSelector(state => state.toyModule.isLoading)
    // const toys = useSelector(state => state.toyModule.toys)
    // אותו נושא של לנהל את הצעצעו המקומי ורק כשהוא מוכן לשלוח לסטור
    const [toy, setToy] = useState(null)
    console.log("🚀 ~ ToyDetails ~ toy:", toy)
    const { toyId } = useParams()
    console.log("🚀 ~ ToyDetails ~ toyId:", toyId)


    useEffect(() => {
        if (toyId) {
            // getToy(toyId)
            toyService.getById(toyId)
                .then(setToy)
        }

        return () => saveToy(toy)
            .then(savedToy => {
                console.log("🚀 ~ onToggleInStock ~ savedToy:", savedToy)
                showSuccessMsg(` Changed Toy ${savedToy.txt} stock value `)
            })
            .catch(err => {
                console.log('problem trying to set toy stock value', err)
                showErrorMsg('toy stock not changed ' + toy._Id)
            })


    }, [toyId])

    function onToggleInStock(toy) {
        const toyToSave = { ...toy, inStock: !toy.inStock }
        console.log("🚀 ~ onToggleInStock ~ toyToSave:", toyToSave)
        setToy(toyToSave)
    }

    // אני לא מבין כיצד לבטל את ההמתנה הארוכה לרנדור זה מרגיש לי לא נכון

    if (isLoading) return <div>Loading...</div>
    console.log("🚀 ~ ToyDetails ~ toy:", toy)
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