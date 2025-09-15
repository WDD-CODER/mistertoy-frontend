import {useState } from "react"
import {  updateToy } from "../store/actions/toy.actions"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdateOnly"
import {  FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { toyService } from "../services/toy.service.remote"
import { utilService } from "../services/util.service"

export function LabelsList({ toy }) {
    const debouncedToyUpdate = utilService.debounce(updateToy, 500)

    const [toyToUpdate, setToyToUpdate] = useState(toy)
    const { name, price, inStock, sortDir, sortBy, labels } = toyToUpdate

    useEffectOnUpdate(() => {
        debouncedToyUpdate(toyToUpdate)
    }, toyToUpdate)


    async function onUpdateToyLabels(labelsToAdd) {
        var updatedField = []
        if (labels.some(curLabel => curLabel === labelsToAdd)) {
            updatedField = labels.filter(curLabel => curLabel !== labelsToAdd)
            setToyToUpdate(prevToy => ({ ...prevToy, labels: updatedField }))
        } else {
            setToyToUpdate(prevToy => ({ ...prevToy, labels: labelsToAdd }))
        }
    }

    async function onUpdateToyStockValue({ target }) {
        const modifiedStockValue = utilService.getStockModifiedValue(target.value)
        setToyToUpdate(prevToy => ({ ...prevToy, inStock: modifiedStockValue }))
    }

    return (
        <Stack spacing={3} margin={1} sx={{ textAlign: "center" }} >
            <FormControl >
                <InputLabel id="labels-multiple-label">Choose Labels</InputLabel>
                <Select
                    labelId="labels-multiple-label"
                    id="labels-multiple-select"
                    multiple
                    value={toyToUpdate.labels}
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
                    value={toyService.getStockValueToShow(toyToUpdate)}
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

