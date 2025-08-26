import { debounceFilterBy, SetFilter } from "../store/actions/toy.actions.js"

import { useEffect, useState } from "react"

export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, onSetFilterByToEdit] = useState(filterBy)
    const [stock, setStock] = useState([])
    const [labels, setLabels] = useState([])

    useEffect(() => {
        onSetFilterByToEdit(filterBy)
    }, [filterBy])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'select-multiple':
                var updatedField = []
                if (field === 'inStock') {
                    if (stock.some(curStock => curStock === value)) {
                        updatedField = stock.filter(curStock => curStock !== value)
                    }
                    else updatedField = [...stock, value]
                    setStock(updatedField)
                }

                else {
                    if (labels.some(curLabel => curLabel === value)) {
                        updatedField = labels.filter(curLabel => curLabel !== value)
                    }
                    else updatedField = [...labels, value]
                    setLabels(updatedField)
                }

                value = updatedField
                break
            default: break
        }


        onSetFilterByToEdit(prevFilter => {
            const curFilter = { ...prevFilter, [field]: value }
            debounceFilterBy(curFilter)
            return curFilter
        })
    }

    function onClearFieldFromFilter({ target }) {
        const field = target.name
        const modifiedFilter = { ...filterBy, [field]: [] }
        onSetFilterBy(modifiedFilter)
        field === 'labels' ? setLabels([]) : setStock([])
    }


    function removeLabelFromFilter(label) {
        const toyLabels = labels.filter(curLabel => curLabel !== label)
        const modifiedFilter = { ...filterBy, labels: [...toyLabels] }
        onSetFilterBy(modifiedFilter)
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
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />

                <label htmlFor="price">price: </label>
                <input value={price} onChange={handleChange}
                    type="number" placeholder="By price" id="price" name="price"
                />

                <div className="selections">
                    <label className="actions flex" htmlFor="inStock"  >
                        <section className="actions">
                            <h4>availability:</h4>
                            <button name="inStock" className="clear-select" onClick={onClearFieldFromFilter}>Clear Stock</button>
                        </section>
                        <select multiple={true} size="3" value={filterByToEdit.inStock} name="inStock" id="inStock" onChange={handleChange}>
                            <option value="" disabled>Stock Status</option>
                            <option value="">All</option>
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                        </select>
                    </label>

                    <label className="actions flex" htmlFor="labels"  >
                        <section className="actions">
                            <h4>Labels:</h4>
                            <button name="labels" className="clear-select" onClick={onClearFieldFromFilter}>Clear Labels</button>
                        </section>
                        <select multiple={true} size="4" value={filterByToEdit.labels} name="labels" id="labels" onChange={handleChange}>
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
                </div>
                <div>
                    {labels.map(label => <button key={label} onClick={() => removeLabelFromFilter(label)}>{label}</button>)}
                </div>

                <button hidden>Set Filter</button>
            </form>
        </section >

    )
}