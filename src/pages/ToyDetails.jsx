import { getToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Labels } from "../cmps/Labels.jsx"
import { ToyInfo } from "../cmps/ToyInfo.jsx"

export function ToyDetails() {


    const isLoading = useSelector(state => state.toyModule.isLoading)
    const toys = useSelector(state => state.toyModule.toys)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        getToy(toyId)
            .then(setToy)
    }, [toyId, toys])

    if (isLoading) return <div>Loading...</div>
    if (!toy) return null


    return (
        <section className="toy-details">
            <h1>Toy name: {toy.txt}</h1>
            <ToyInfo toy={toy}/>
            <Labels toy={toy} />
            <button><Link to={`/toy/`}>Back to list</Link></button>
            <div>
                <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link> |
                <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
            </div>
        </section>
    )
}