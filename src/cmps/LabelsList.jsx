import { useState } from "react"
import { updateToy } from "../store/actions/toy.actions"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdateOnly"
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { toyService } from "../services/toy"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"

export function LabelsList({item, setItem}) {
    // const item = useSelector(state => state.toyModule.toy)
    
    // const debouncedToyUpdate = utilService.debounce(updateToy, 500)
    // const [toyToUpdate, setToyToUpdate] = useState(item)
    const { name, price, inStock, sortDir, sortBy, labels } = item

    // useEffectOnUpdate(() => {

    //     debouncedToyUpdate(toyToUpdate)
    // }, toyToUpdate)

    async function onUpdateToyLabels(labelsToAdd) {
        
        var updatedField = []
        if (labels.some(curLabel => curLabel === labelsToAdd)) {
            updatedField = labels.filter(curLabel => curLabel !== labelsToAdd)
            setItem(({ ...item, labels: updatedField }))
        } else {
            setItem(({ ...item, labels: labelsToAdd }))
        }
    }


    async function onUpdateToyStockValue({ target }) {
        const modifiedStockValue = utilService.getStockModifiedValue(target.value)
        setItem(prevToy => ({ ...prevToy, inStock: modifiedStockValue }))
    }

    return (
        <Stack spacing={3} margin={1} sx={{ textAlign: "center" }} >
            <FormControl >
                <InputLabel id="labels-multiple-label">Choose Labels</InputLabel>
                <Select
                    labelId="labels-multiple-label"
                    id="labels-multiple-select"
                    multiple
                    value={labels || []}
                    onChange={event => onUpdateToyLabels(event.target.value)}
                    label="Choose Labels"
                >
                    {toyService.getDemoLabels().map((label) => (
                        <MenuItem
                            key={label}
                            value={label}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="availability">Select Toy availability</InputLabel>
                <Select
                    value={toyService.getStockValueToShow(item)}
                    onChange={onUpdateToyStockValue}
                    name="inStock"
                    variant="standard"
                >
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value='available'>Available</MenuItem>
                    <MenuItem value='unavailable'>Unavailable</MenuItem>
                </Select>
            </FormControl>
        </Stack>

    )
}

