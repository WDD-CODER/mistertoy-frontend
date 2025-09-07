import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getToy, saveToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MyForm from "../cmps/formik/MyForm.jsx"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { Box, Container } from "@mui/material"

export function ToyEdit() {

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
                navigate('/toy')
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Problem while trying to save toy', err)
                showErrorMsg('Cannot save toy')
            })
    }


    return (
        <Container className="toy-edit">
            <AppHeader />
            <Box display="flex" sx={{width:'300px'}}>
                <MyForm
                    key={toyToEdit._id || 'new'}
                    onSaveToy={onSaveToy}
                    toyToEdit={toyToEdit} />
            </Box>
        </Container>
    )
}