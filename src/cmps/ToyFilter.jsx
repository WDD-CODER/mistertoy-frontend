import { utilService } from "../services/util.service.js"

import { useEffect, useRef, useState } from "react"
import { setFilter } from "../store/actions/toy.actions.js"
import { useSelector } from "react-redux"
import { FilterMultiSelect } from "./MeterialUi/FilterMultiSelect.jsx";

export function ToyFilter({ filterBy }) {

    const debouncedOnSetFilter = useRef(utilService.debounce(setFilter, 500)).current
    const [filterByToEdit, onSetFilterByToEdit] = useState(filterBy)
    const stateLabels = useSelector(state => state.toyModule.labels)

    const { txt, price, inStock, sortDir, sortBy, labels } = filterByToEdit

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        var updatedField = []


        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = !filterByToEdit[field]
                break
            case 'select-one':
                if (field !== 'sortBy') {
                    value = utilService.getInStockValue(value)
                }
                break
            case 'FilterMultiSelect':
                if (value === 'Available') value = true
                else if (value === 'Unavailable') value = false
                else value = ''
                
                break
            case 'select-multiple':
                if (filterByToEdit.labels.some(curLabel => curLabel === value)) {
                    updatedField = labels.filter(curLabel => curLabel !== value)
                }
                else updatedField = [...labels, value]
                value = updatedField
                break
            default: break
        }


        onSetFilterByToEdit(prevFilter => {
            const curFilter = { ...prevFilter, [field]: value }
            return curFilter
        })
    }

    function removeLabelFromFilter(label) {
        const toyLabels = labels.filter(curLabel => curLabel !== label)
        const modifiedFilter = { ...filterBy, labels: [...toyLabels] }
        onSetFilterByToEdit(modifiedFilter)
    }



    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterByToEdit(filterByToEdit)
    }

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
                <div className="sortFilter flex">
                    <section className="selections">
                        <FilterMultiSelect handleChange={handleChange} onSetFilterByToEdit={onSetFilterByToEdit} filterByToEdit={filterByToEdit} items={stateLabels} />
                    </section>
                </div>
                <div>
                    {labels.map(label => <button key={label} onClick={() => removeLabelFromFilter(label)}>{label}</button>)}
                </div>
                <button hidden>Set Filter</button>
            </form>
        </section >

    )
}