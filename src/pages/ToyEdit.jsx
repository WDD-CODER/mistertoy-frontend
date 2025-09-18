import { toyService } from "../services/toy"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getToy, saveToy, updateToy } from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { Button, Container, Stack } from "@mui/material"
import { AppFooter } from "../cmps/AppFooter.jsx"

import { ReusableForm } from "../cmps/ReuseForm.jsx"
import { LabelsList } from "../cmps/LabelsList.jsx"
import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdateOnly.js"

export function ToyEdit() {

    const [toy, setToy] = useState(toyService.getEmptyToy())

    const navigate = useNavigate()
    const { toyId } = useParams()

    const debouncedToyUpdate = utilService.debounce(updateToy, 500)

    useEffectOnUpdate(() => {
        debouncedToyUpdate(toy)
    }, toy)


    useEffect(() => {
        fetchToy()
    }, [])

    async function fetchToy() {
        try {
            if (toyId) {
                const curToy = await getToy(toyId)
                setToy(curToy)
            }
        } catch (error) {
            showErrorMsg("can't get toy ")
        }
    }

    async function onSaveToy() {
        try {
            saveToy(toy)
            navigate('/toy')
            showSuccessMsg(`Toy Saved (id: ${toy.name})`)
        } catch (err) {
            console.log('Problem while trying to save toy', err)
            showErrorMsg('Cannot save toy')
        }
    }

    const fieldsConfig = [
        { name: 'name', label: 'Toy Name ', type: 'string', required: true, min: 2, max: 50 },
        { name: 'price', label: 'Toy Price ', type: 'numeric', required: true, min: 0 }
    ]

    return (
        <Container className="toy-edit">
            <AppHeader />
            <Stack display="flex" sx={{ width: '300px' }}>
                <ReusableForm
                    item={toy}
                    setItem={setToy}
                    fieldsConfig={fieldsConfig}
                />
                <LabelsList item={toy} setItem={setToy} />
                <Button onClick={onSaveToy} type="save-toy">Save</Button>
            </Stack>

            <AppFooter />
        </Container>
    )
}