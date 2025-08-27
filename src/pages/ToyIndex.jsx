import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, saveToy, SetFilter } from "../store/actions/toy.actions.js"

import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Loader } from "../cmps/Loader.jsx"

export function ToyIndex() {

    const toys = useSelector(state => state.toyModule.toys)
    const isLoading = useSelector(state => state.toyModule.isLoading)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        SetFilter(toyService.getFilterFromSearchParams(searchParams))
    }, [])

    // יש לי בעיה שאם אני מכניס בכוח את הכתובת עם הפילטר שלי הוא עדיין מרנדר ושולח לי את כל הצעצעועים ולא רק את מה שאני באמת צריך
    useEffect(() => {
        setSearchParamsFromFilter()
        loadToys(filterBy)
            .catch(err => {
                console.log(' Problem while trying to load toys ', err)
                showErrorMsg('Cannot get toys')
            })

    }, [filterBy])

    function setSearchParamsFromFilter() {
        const sp = new URLSearchParams()

        if (filterBy.txt) sp.set('txt', filterBy.txt)
        if (filterBy.price) sp.set('price', filterBy.price)
        if (filterBy.inStock !== '' && filterBy.inStock !== undefined) {
            sp.set('inStock', filterBy.inStock)
        }
        if (filterBy.labels?.length) {
            sp.set('labels', [...filterBy.labels])
        }
        if (filterBy.sortBy) sp.set('sortBy', filterBy.sortBy)
        if (filterBy.sortDir) sp.set('sortDir', filterBy.sortDir)

        setSearchParams(sp)
    }


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
            .then((savedToy) => showSuccessMsg(`Toy ${(savedToy.inStock) ? 'Back In Stock!' : 'Out Of Stock'}`))
            .catch(err => {
                console.log('problem setting toy stock', err)
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
               <Loader/> : <>
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} onToggleInStock={onToggleInStock} />
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