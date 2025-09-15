import { toyService } from "../services/toy.service.remote.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getToy, saveToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MyForm from "../cmps/formik/MyForm.jsx"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { Box, Container } from "@mui/material"
import { AppFooter } from "../cmps/AppFooter.jsx"

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        fetchToy()
    }, [])

    async function fetchToy() {
        try {
            if (toyId) {
                const toy = await getToy(toyId)
                setToyToEdit(toy)
            }
        } catch (error) {
            showErrorMsg("can't get toy ")
        }
    }

    async function onSaveToy(toyToEdit) {
        try {
            saveToy(toyToEdit)
            navigate('/toy')
            showSuccessMsg(`Toy Saved (id: ${toyToEdit.name})`)
        } catch (err) {
            console.log('Problem while trying to save toy', err)
            showErrorMsg('Cannot save toy')
        }
    }


    return (
        <Container className="toy-edit">
            <AppHeader />
            <Box display="flex" sx={{ width: '300px' }}>
                <MyForm
                    key={toyToEdit._id || 'new'}
                    onSaveToy={onSaveToy}
                    toyToEdit={toyToEdit} />
            </Box>
            <AppFooter />
        </Container>
    )
}