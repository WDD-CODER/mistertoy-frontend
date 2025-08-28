import { saveToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Labels } from "../cmps/Labels.jsx"
import { ToyInfo } from "../cmps/ToyInfo.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { ToyPreview } from "../cmps/ToyPreview.jsx"
import { Loader } from "../cmps/Loader.jsx"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"

export function ToyDetails() {

    const isLoading = useSelector(state => state.toyModule.isLoading)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()


    useEffect(() => {
        if (toyId) {
            toyService.getById(toyId)
                .then(setToy)
        }
    }, [toyId])

    function onToggleInStock(toy) {
        const toyToSave = { ...toy, inStock: !toy.inStock }
        setToy(toyToSave)
    }

    if (isLoading) return <Loader />
    if (!toy) return null


    return (
        <section className={'toy-details'}>
            <ToyPreview toy={toy} onToggleInStock={onToggleInStock} />
            <Labels toy={toy} setToy={setToy} />
            <button><Link to={`/toy/`}>Back to list</Link></button>
            <div className="prev-next-btns flex" >
                <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link>
                <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
            </div>
            <PopUp
                header={<h3>Chat About {toy.txt}s</h3>}
                footer={<h4>&copy; 2025-9999 Toys INC.</h4>}
                onClose={() => setIsChatOpen(false)}
                isOpen={isChatOpen}
            >
                <Chat />
            </PopUp>
            {!isChatOpen && <button onClick={() => setIsChatOpen(true)} className='open-chat'>Chat</button>}
        </section>
    )
}