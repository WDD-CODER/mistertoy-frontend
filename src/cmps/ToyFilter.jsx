import { debounceFilterBy, SetFilter } from "../store/actions/toy.actions.js"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { SET_FILTER_BY } from "../store/reduce/toy.reduce.js"

export function ToyFilter({ filterBy, SetFilterBy }) {
    console.log("🚀 ~ ToyFilter ~ filterBy:", filterBy)

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [labels, setLabels] = useState([])
    const dispatch = useDispatch()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'select-multiple':
                if (labels.some(curLabel => curLabel === value)) return
                const updatedLabels = [...labels, value]
                setLabels(updatedLabels)
                value = updatedLabels
                break
            default: break
        }

        setFilterByToEdit(prevFilter => {
            const curFilter = { ...prevFilter, [field]: value }
            debounceFilterBy(curFilter)
            return curFilter
        })
    }

    // function updateStateFilterBy(ev) {
    //     ev.preventDefault()
    //     console.log("🚀 ~ updateStateFilterBy ~ filterBy:", filterBy)
    //     dispatch({ type: SET_FILTER_BY, filterBy: ({ ...filterBy, labels }) })
    // }

    function clearSelect(ev) {
        ev.preventDefault()
        setLabels([])
        const updatedFilter = ({ ...filterBy, labels: [] })
        console.log("🚀 ~ clearSelect ~ updatedFilter:", updatedFilter)
        SetFilterBy(updatedFilter)
        // console.log('clearSelect')
        // // filterByToEdit(prevFilter => ({ ...prevFilter, labels: [] }))
        // console.log("🚀 ~ clearSelect ~ filterBy:", filterBy)
        // dispatch({ type: SET_FILTER_BY, filterBy:  })
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        console.log("🚀 ~ onSubmitFilter ~ filterByToEdit:", filterByToEdit)
        // SetFilterBy(filterByToEdit)
        debounceFilterBy(filterByToEdit)
    }

    const { txt, price } = filterByToEdit
    return (
        <section className="toy-filter">
            <h2>Filter Toys</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="price">price: </label>
                <input value={price} onChange={handleChange}
                    type="number" placeholder="By price" id="price" name="price"
                />
                {/* <label className="actions" htmlFor="labels"  >
                    availability:
                    <select multiple={true} size="1" value={inStock} name="labels" id="labels" onChange={handleChange}>
                        <option value="">On Wheels</option>
                        <option value="inS">Box Game</option>
                        <option value="art">Art</option>
                    </select>
                </label> */}
                <button className="cleare-select" onClick={ev => clearSelect(ev)}>Clear Select</button>
                <label className="actions" htmlFor="labels"  >
                    Label:
                    <select multiple={true} size="4" value={labels} name="labels" id="labels" onChange={handleChange}>
                        <option value="" disabled>Labels</option>
                        <option value="on-wheels">On Wheels</option>
                        <option value="box-game">Box Game</option>
                        <option value="art">Art</option>
                        <option value="baby">Baby</option>
                        <option value="doll">Doll</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="out-door">Out Door</option>
                        <option value="battery-powered">Battery Powered</option>
                    </select>
                </label>

                <button hidden>Set Filter</button>
            </form>
        </section>

    )
}