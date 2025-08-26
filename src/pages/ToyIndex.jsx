import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, saveToy, SetFilter } from "../store/actions/toy.actions.js"

import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"

export function ToyIndex() {

    const toys = useSelector(state => state.toyModule.toys)
    const isLoading = useSelector(state => state.toyModule.isLoading)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    console.log("🚀 ~ ToyIndex ~ filterBy:", filterBy)
    // Special hook for accessing search-params:
    const [searchParams] = useSearchParams()

    useEffect(() => {
        SetFilter(toyService.getFilterFromSearchParams(searchParams))
    }, [])


    useEffect(() => {
        loadToys(filterBy)
            .catch(err => {
                console.log(' Problem while trying to load toys ', err)
                showErrorMsg('Cannot get toys')
            })

    }, [filterBy])

    function onSetFilterBy(curFilter) {
        SetFilter(curFilter)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg(`Toy removed`))
            .catch(err => {
                console.log(' Problem while trying to remove toy', err)
                showErrorMsg('toy was not removed!')
            })
    }

    function onToggleInStock(toy) {
        const toyToSave = { ...toy, inStock: !toy.inStock }
        saveToy(toyToSave)
            .then((savedToy) => showSuccessMsg(`Toy is ${(savedToy.inStock) ? ' Available for purchase!' : ' Sorry, no more left in stock'}`))
            .catch(err => {
                console.log('problem trying to set toy stock value', err)
                showErrorMsg('toy stock not changed ' + toy._Id)
            })
    }

    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <div>
                <Link to="/toy/edit" className="btn" >Add Toy</Link>
            </div>
            <h2>Toys List</h2>
            {isLoading && !toys.length ?
                <div>Loading...</div> : <>
                    <ToyList toys={toys}  onRemoveToy={onRemoveToy} onToggleInStock={onToggleInStock} />
                    <hr />
                    <h2>Toys Table</h2>
                    <div style={{ width: '60%', margin: 'auto' }}>
                    </div>
                </>
            }
        </section>
    )
    //לא מצאתי פתרון איך למנוע פליקר בלי להגדיר גם אם לודינג וגם אם המטלות ריקות ומרגיש לי שאני מפספס משהו
}