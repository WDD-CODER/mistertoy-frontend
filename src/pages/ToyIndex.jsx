import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, saveToy, setFilter, setToysLabels, updateToy } from "../store/actions/toy.actions.js"

import { useEffect, useRef } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdateOnly.js"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { Box, Container } from "@mui/material"
import { AppFooter } from "../cmps/AppFooter.jsx"


export function ToyIndex() {

    const toys = useSelector(state => state.toyModule.toys)
    console.log("🚀 ~ ToyIndex ~ toys:", toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const count = useRef(0)
    count.current += 1
    useEffect(() => {
        setFilter(toyService.getFilterFromSearchParams(searchParams))
    }, [])


    useEffectOnUpdate(setToysLabels, toys)

    useEffect(() => {
       toyService.setSearchParamsFromFilter(filterBy,setSearchParams )
    }, [filterBy])


    useEffect(() => {
        loadToys(filterBy)
            .catch(() => showErrorMsg('Cannot get toys'))
    }, [filterBy])



    function onRemoveToy(toyId) {
        try {
            removeToy(toyId)
            showSuccessMsg(`Toy removed`)
        } catch (err) {
            console.log(' Problem while trying to remove toy', err)
            showErrorMsg('toy was not removed!')
        }
    }

    function onToggleInStock(toy) {

        try {
            const toyToSave = { ...toy, inStock: !toy.inStock }
            updateToy(toyToSave)
            showSuccessMsg(`Toy ${(toy.inStock) ? 'Back In Stock!' : 'Out Of Stock'}`)
        } catch (err) {
            console.log('problem setting toy stock', err)
            showErrorMsg('toy stock not changed ' + toy._Id)
        }
    }

    return (
        <Container>
            <AppHeader />
            <ToyFilter filterBy={filterBy} />
            <Box >
                <Link to="/toy/edit" className="btn" >Add Toy</Link>
            </Box>
            {toys &&
                <Container>
                    <h2>Toys List</h2>
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                    <AppFooter />
                </Container>
            }
        </Container>
    )
}