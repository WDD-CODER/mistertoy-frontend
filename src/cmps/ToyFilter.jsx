import { debounceFilterBy } from "../store/actions/toy.actions.js"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_FILTER_BY } from "../store/reduce/toy.reduce.js"

export function ToyFilter({ filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const dispatch = useDispatch()

    const [labels, setLabels] = useState([])

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
                return

            default: break
        }

        setFilterByToEdit(prevFilter => {
            const curFilter = { ...prevFilter, [field]: value }
            debounceFilterBy(curFilter)
            return curFilter
        })
    }

    function updateStateFilterBy(ev) {
        ev.preventDefault()

        // const filter = { ...filterBy.labels, labels }
        // const clearLabels = []
        // dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, clearLabels } })
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, labels } })
        // setLabels([])
    }

    function clearSelect(ev) {
        ev.preventDefault()
        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, labels } })
        setLabels([])

    }

    function removeLabelFromFilter(label) {
        const toyLabels = labels.filter(curLabel => curLabel !== label)
        setLabels(toyLabels)
    }


    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        debounceFilterBy(filterByToEdit)
    }

    const { txt, price } = filterByToEdit
    return (
        <section className="toy-filter">
            <h2>Filter Toys</h2>
            <form onBlur={updateStateFilterBy} onSubmit={onSubmitFilter}>
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
                <div>
                    {labels.map(label => <button key={label} onClick={() => removeLabelFromFilter(label)}>{label}</button>)}
                </div>

                <button hidden>Set Filter</button>
            </form>
        </section>

    )
}