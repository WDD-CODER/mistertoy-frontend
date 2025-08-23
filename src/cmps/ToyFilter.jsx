// import { utilService } from "../services/util.service.js"
import { debounceFilterBy } from "../store/actions/toy.actions.js"
// import { SET_FILTER_BY, toyReducer } from "../store/reduce/toy.reduce.js"

import { useState } from "react"
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux"
=======
import { useSelector } from "react-redux"
>>>>>>> feat/toy-price-model

export function ToyFilter() {

    const filterBy = useSelector(state => state.toyModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    // const dispatch = useDispatch()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => {
            const curFilter = { ...prevFilter, [field]: value }
            debounceFilterBy(curFilter)
            return curFilter
        })
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        debounceFilterBy(filterByToEdit)
    }

<<<<<<< HEAD
    const { txt, importance } = filterByToEdit
=======
    const { txt, price } = filterByToEdit
>>>>>>> feat/toy-price-model
    return (
        <section className="toy-filter">
            <h2>Filter Toys</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
<<<<<<< HEAD
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
=======
                <label htmlFor="price">price: </label>
                <input value={price} onChange={handleChange}
                    type="number" placeholder="By price" id="price" name="price"
>>>>>>> feat/toy-price-model
                />

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}