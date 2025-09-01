import { utilService } from "../services/util.service.js"

import { useEffect, useRef, useState } from "react"
import { setFilter } from "../store/actions/toy.actions.js"
import { useSelector } from "react-redux"
import { MultiSelect } from "../cmps/MeterialUi/MultiSelect.jsx";

export function ToyFilter({ filterBy }) {

    const debouncedOnSetFilter = useRef(utilService.debounce(setFilter, 500)).current
    const [filterByToEdit, onSetFilterByToEdit] = useState(filterBy)
    const stateLabels = useSelector(state => state.toyModule.labels)

    const { txt, price, inStock, sortDir, sortBy, labels } = filterByToEdit

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log("🚀 ~ handleChange ~ target:", target)
        const field = target.name
        console.log("🚀 ~ handleChange ~ field:", field)
        let value = target.value
        console.log("🚀 ~ handleChange ~ value:", value)

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

    function onClearFieldFromFilter({ target }) {
        const field = target.name
        const modifiedFilter = { ...filterBy, [field]: [] }
        onSetFilterByToEdit(modifiedFilter)
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
                        <label className="selections sortBy" htmlFor="sortBy">
                            <h4>{(sortDir) ? 'Descending' : ' Ascending'}</h4>
                            <input checked={(sortDir) ? 'checked' : ''} value={sortDir} onChange={handleChange} type="checkbox" name="sortDir" id="sortDir" />
                        </label>
                    </section>
                    <section className="selections">
                        <h4>Sort By</h4>
                        <label htmlFor="sortBy" >
                            <select value={sortBy} name="sortBy" id="sortBy" onChange={handleChange}>
                                <option value="" disabled >Select Sort By</option>
                                <option value="txt">By Name</option>
                                <option value="price">By Price</option>
                                <option value="createdAt">Time Of Creation</option>
                            </select>
                        </label>
                        <h4>availability</h4>
                        <label className="selections" htmlFor="inStock"  >
                            <button name="inStock" value={inStock} className="clear-select" onClick={onClearFieldFromFilter}>Clear Stock</button>
                            <select value={inStock} name="inStock" id="inStock" onChange={handleChange}>
                                { }
                                <option value="" disabled>Stock Status</option>
                                <option value="">All</option>
                                <option value="true">In Stock</option>
                                <option value="false">Out of Stock</option>
                            </select>
                        </label>
                    </section>
                    <section className="selections">
                        <MultiSelect  onSetFilterByToEdit={onSetFilterByToEdit} filterByToEdit={filterByToEdit} items={stateLabels} />
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