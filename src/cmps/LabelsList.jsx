import { useEffect, useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { updateToy } from "../store/actions/toy.actions"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdateOnly"
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { toyService } from "../services/toy.service.remote"
import { utilService } from "../services/util.service"

export function LabelsList({ toy }) {
    const debouncedToyUpdate = utilService.debounce(updateToy, 500)

    const [toyToUpdate, setToyToUpdate] = useState(toy)

    // useEffectOnUpdate(debouncedToyUpdate(toy),[toyToUpdate])

    useEffect(() => {
        if (toyToUpdate) debouncedToyUpdate(toyToUpdate)

    }, [toyToUpdate]);

    async function onUpdateToyLabels(labelsToAdd) {
        var updatedField = []
        if (toyToUpdate.labels.some(curLabel => curLabel === labelsToAdd)) {
            updatedField = toyToUpdate.labels.filter(curLabel => curLabel !== labelsToAdd)
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
                    onChange={event => onUpdateToyStockValue(event)}
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

