import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getToy, saveToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"  
import { useSelector } from "react-redux"

export function ToyEdit() {
    
    const isLoading = useSelector(state => state.toyModule.isLoading)
    // const stateToy = useSelector(state => state.toyModule.toy)
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) getToy(toyId)
            .then(toy => setToyToEdit(toy))
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                navigate('/toy')
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Problem while trying to save toy', err)
                showErrorMsg('Cannot save toy')
            })
    }

    const { txt, price, isDone } = toyToEdit
    
    if (isLoading) return <div>Loading...</div>
    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="price">price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} value={isDone} type="checkbox" name="isDone" id="isDone" />


                <button>Save</button>
            </form>
        </section>
    )
}