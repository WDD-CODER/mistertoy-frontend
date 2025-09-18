import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, loadToysLabels, removeToy, setFilter, updateToy } from "../store/actions/toy.actions.js"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppHeader } from "../cmps/AppHeader.jsx"
import {  Container, Typography } from "@mui/material"
import { AppFooter } from "../cmps/AppFooter.jsx"
import { PaginationButtons } from "../cmps/PaginationButtons.jsx"


export function ToyIndex() {

    const toys = useSelector(state => state.toyModule.toys)
    const maxPage = useSelector(storeState => storeState.toyModule.maxPage)
    const filterBy = useSelector(state => state.toyModule.filterBy)

    useEffect(() => {
        if (toys) loadToysLabels(toys)
    }, [toys])


    // FIXME לדאוג שזה יטען את הפילטר מהיו אר ל 
    // useEffect(() => {
    //     toyService.setSearchParamsFromFilter(filterBy, setSearchParams)
    // }, [filterBy])


    useEffect(() => {
        fetchToys()
    }, [filterBy])

    async function fetchToys() {
        try {
            await loadToys()
        } catch (error) {
            showErrorMsg('Cannot load toys')
        }
    }




    function onRemoveToy(toyId) {
        try {
            removeToy(toyId)
            showSuccessMsg(`Toy removed`)
        } catch (err) {
            console.log(' Problem while trying to remove toy', err)
            showErrorMsg('toy was not removed!')
        }
    }


    function onChangePageIdx(diff) {
        let newPageIdx = +filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = maxPage - 1
        if (newPageIdx >= maxPage) newPageIdx = 0
        setFilter({ pageIdx: newPageIdx })
    }

    return (
        <Container>
            <AppHeader />
            <ToyFilter />
            {toys &&
                <Container sx={{textAlign:"center"}}>
                    <Typography>Toys List</Typography>
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                    <AppFooter />
                    {!!toys.length && maxPage > 1 && (
                        <PaginationButtons
                            pageIdx={filterBy.pageIdx}
                            onChangePageIdx={onChangePageIdx}
                        />
                    )}
                </Container>
            }
        </Container>
    )
}