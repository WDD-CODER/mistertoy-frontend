import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy, setStateFilterFromSearchParams } from "../store/actions/toy.actions.js"

import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"

export function ToyIndex() {

    const toys = useSelector(state => state.toyModule.toys)
    const isLoading = useSelector(state => state.toyModule.isLoading)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    // Special hook for accessing search-params:
    const [searchParams] = useSearchParams()
    // const dispatch = useDispatch()

    useEffect(() => {
        setStateFilterFromSearchParams(searchParams)
    }, [])

    useEffect(() => {
        loadToys(filterBy)
            .catch(() => showErrorMsg('Cannot load toys'))
    }, [filterBy])


    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg(`Toy removed`))
            .catch(err => showErrorMsg(err))
    }

    function onToggleToy(toy) {
        const toyToSave = { ...toy, isDone: !toy.isDone }
        toyService.saveToy(toyToSave)
            .then((savedToy) => showSuccessMsg(`Toy is ${(savedToy.isDone) ? 'done' : 'back on your list'}`))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle toy ' + toy._Id)
            })
    }

    return (
        <section className="toy-index">
            <ToyFilter />
            <div>
                <Link to="/toy/edit" className="btn" >Add Toy</Link>
            </div>
            <h2>Toys List</h2>
            {isLoading && !toys.length ?
                <div>Loading...</div> : <>
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} onToggleToy={onToggleToy} />
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