import { toyService } from "../services/toy"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getToy, saveToy} from "../store/actions/toy.actions.js"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { Container, Stack } from "@mui/material"
import { AppFooter } from "../cmps/AppFooter.jsx"
import { ToyEditForm } from "../cmps/ToyEditForm.jsx"
import { utilService } from "../services/util.service.js"

export function ToyEdit() {

    const [toy, setToy] = useState(toyService.getEmptyToy())

    const navigate = useNavigate()
    const { toyId } = useParams()

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

    async function onSaveToy(toy) {
        try {
            await saveToy(toy)
            navigate('/toy')
            showSuccessMsg(`Toy Saved (id: ${toy.name})`)
        } catch (err) {
            console.log('Problem while trying to save toy', err)
            showErrorMsg('Cannot save toy')
        }
    }

     function onUpdateToyStockValue(ev) {
        const modifiedStockValue = utilService.getStockModifiedValue(ev.target.value)
        setToy(prevToy => ({ ...prevToy, inStock: modifiedStockValue }))
    }

    function onUpdateToyLabels(ev) {
        const labelsToAdd = ev.target.value
        var updatedField = []
        if (toy.labels.some(curLabel => curLabel === labelsToAdd)) {
            updatedField = toy.labels.filter(curLabel => curLabel !== labelsToAdd)
            setToy(({ ...toy, labels: updatedField }))
        } else {
            setToy(({ ...toy, labels: labelsToAdd }))
        }
    }


    return (
        <Container className="toy-edit">
            <AppHeader />
            <Stack display="flex" sx={{ width: '300px' }}>
                <ToyEditForm
                    item={toy}
                    onUpdateLabels={onUpdateToyLabels}
                    onUpdateStockValue={onUpdateToyStockValue}
                    onSave={onSaveToy}
                />
            </Stack>

            <AppFooter />
        </Container>
    )
}