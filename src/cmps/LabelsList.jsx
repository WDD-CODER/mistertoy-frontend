import { useEffect, useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { updateToy } from "../store/actions/toy.actions"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdateOnly"
import { Autocomplete, Stack, TextField } from "@mui/material"
import { toyService } from "../services/toy.service"

export function LabelsList({ toy }) {
const stockValues = toyService.getStockValues().slice(1)
const demoLabels = toyService.getDemoLabels()

    const [labels, setLabels] = useState(toy.labels)
    const [inStock, setInStock] = useState(toy.inStock)

    useEffectOnUpdate(onUpdateToyLabels, labels)
    useEffectOnUpdate(onUpdateToyStockValue, inStock)

    function onAddLabel({ target }) {
        const labelsToAdd = [target.value]
        if (labels.includes(target.value)) return showErrorMsg('toy label exist already')
        setLabels(prevLabels => [...prevLabels, ...labelsToAdd])
    }

    function onUpdateToyLabels() {
        const updatedToy = { ...toy, labels}
        updateToy(updatedToy)
            .then(() => showSuccessMsg('Updated Toy Labels'))
            .catch(err => {
                console.log(`Couldn't add label`, err)
                showErrorMsg('toy label not add'), err
            })
    }

    function onUpdateToyStockValue() {
        const updatedToy = { ...toy, inStock}
        updateToy(updatedToy)
            .then(() => showSuccessMsg('Updated Toy Stock Value'))
            .catch(err => {
                console.log(`Couldn't add label`, err)
                showErrorMsg('toy label not add'), err
            })
    }

    return (
        <Stack spacing={3} sx={{ width: 'auto', border: 1, padding: 1, justifyContent:'space-evenly' }} >
            <Autocomplete
                multiple
                id="tags-standard"
                options={demoLabels}
                value={labels}
                onChange={(event, newValue) => {
                    return setLabels(newValue);
                }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Choose LabelsList"
                        placeholder="Select Label "
                    />
                )}
            />

            <Autocomplete
                id="tags-filled"
                multiple={false}
                options={stockValues}
                value={inStock}
                onChange={(event, newValue) => setInStock(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Stock Status"
                        variant="filled"
                        placeholder="Select Toy Stock Value"
                    />
                )}
            />
            {/* <Box className="sortBy flex">
                <FormControlLabel control={<Checkbox onChange={() => handleChange({
                    target: { name: 'sortDir', type: 'checkbox', }
                })} />}
                    label={"sortDir"} />
            </Box> */}
        </Stack>


    )
}

