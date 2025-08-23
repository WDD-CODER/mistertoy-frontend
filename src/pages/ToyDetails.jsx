import { getToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Labels } from "../cmps/Labels.jsx"

export function ToyDetails() {


    // const isLoading = useSelector(state => state.toyModule.isLoading)
    const toys = useSelector(state => state.toyModule.toys)
    const [toy, setToy] = useState(null)
    const [notFound, setNotFound] = useState(true)
    const { toyId } = useParams()

    useEffect(() => {
        getToy(toyId)
            .then(toy => {
                if (!toy) setNotFound(true)
                else setNotFound(false)
                setToy(toy)
            })
    }, [toyId,toys])

    // if (isLoading) return <div>Loading...</div>
    if (notFound) return <div>no such...<button><Link to={`/toy/`}>Back to list</Link></button></div>
    if (!toy) return null

    return (
        <section className="toy-details">
            \
            <h1>Toy price: {toy.price}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>

            <Labels toy={toy} />

            <button><Link to={`/toy/`}>Back to list</Link></button>
            <div>
                <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link> |
                <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
            </div>
        </section>
    )
}