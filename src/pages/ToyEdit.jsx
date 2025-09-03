import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getToy, saveToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Loader } from "../cmps/Loader.jsx"
import MyForm from "../cmps/formik/MyForm.jsx"
import { AppHeader } from "../cmps/AppHeader.jsx"

export function ToyEdit() {

    const isLoading = useSelector(state => state.toyModule.isLoading)
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) getToy(toyId)
            .then(toy => setToyToEdit(toy))
    }, [])


    function onSaveToy(toyToEdit) {
        saveToy(toyToEdit)
            .then((savedToy) => {
                console.log('savedToy')

                navigate('/toy')
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Problem while trying to save toy', err)
                showErrorMsg('Cannot save toy')
            })
    }

    if (isLoading) return <Loader />

    return (
        <section className="toy-edit">
             <AppHeader/>
            <MyForm
                key={toyToEdit._id || 'new'}
                onSaveToy={onSaveToy}
                toyToEdit={toyToEdit} />
        </section>
    )
}