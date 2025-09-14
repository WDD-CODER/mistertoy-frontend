import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { toyService } from "../services/toy.service.remote.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, loadToysLabels, removeToy, setFilter, updateToy } from "../store/actions/toy.actions.js"

import { useEffect, useRef } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { Box, Container } from "@mui/material"
import { AppFooter } from "../cmps/AppFooter.jsx"


export function ToyIndex() {

    const toys = useSelector(state => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
       if (toys)  loadToysLabels(toys)
    }, [toys])


    useEffect(() => {
        toyService.setSearchParamsFromFilter(filterBy, setSearchParams)
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

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }


    return (
        <Container>
            <AppHeader />
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
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