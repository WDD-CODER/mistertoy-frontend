import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextFields } from '@mui/icons-material';
import { FormControl, Grid, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { useSelector } from "react-redux"
import { FilterMultiSelect } from "./MeterialUi/FilterMultiSelect.jsx";
import { Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react"

import { utilService } from "../services/util.service.js"
import { setFilter } from "../store/actions/toy.actions.js"

export function ToyFilter({ filterBy }) {
    const debouncedOnSetFilter = useRef(utilService.debounce(setFilter, 500)).current
    const [filterByToEdit, onSetFilterByToEdit] = useState(filterBy)
    const stateLabels = useSelector(state => state.toyModule.labels)

    const sortByOptions = ['txt', 'price', 'createdAt']
    const selectOptions = ['All', 'Available', 'Unavailable']
    const stockValue = getStockData()

    const { txt, price, inStock, sortDir, sortBy, labels } = filterByToEdit

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        var updatedField = []

        switch (target.type || target.name) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = !filterByToEdit[field]
                break
            case 'inStock':
                value = utilService.getStockModifiedValue(value)
                break

            case 'select-multiple':
                if (filterByToEdit.labels.some(curLabel => curLabel === value)) {
                    updatedField = labels.filter(curLabel => curLabel !== value)
                } else updatedField = [...labels, value]
                value = updatedField
                break
            default: break
        }

        if (field === 'inStock') value = utilService.getStockModifiedValue(value)

        onSetFilterByToEdit(prevFilter => {
            const curFilter = { ...prevFilter, [field]: value }
            return curFilter
        })
    }

    function getStockData() {
        if (filterByToEdit.inStock === '') return 'All'
        else if (filterByToEdit.inStock === false) return 'Unavailable'
        else return 'Available'
    }

    return (
        <Container sx={{ placeItems: "center" }} className="toy-filter">
            <Typography variant="h4">Filter Toys</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

                    <FormControl >
                        <TextField
                            value={txt}
                            onChange={handleChange}
                            type="search"
                            label="Search By Txt"
                            id="txt" name="txt"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>

                    <FormControl>
                        <TextField
                            value={price}
                            onChange={handleChange}
                            type="number"
                            label="Minimum Price"
                            id="price"
                            name="price"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>


                    <FormControl>
                        <InputLabel id="labels-select-label">Choose LabelsList</InputLabel>
                        <Select
                            multiple
                            value={filterByToEdit.labels}
                            onChange={handleChange}
                            type='select-multiple'
                            name="labels"
                            variant="standard"
                        >
                            <MenuItem disabled value=""></MenuItem>
                            {stateLabels.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>


                    <FormControl>
                        <InputLabel id="availability">Select Toy availability</InputLabel>
                        <Select
                            value={getStockData()}
                            onChange={handleChange}
                            name="inStock"
                            variant="standard"
                        >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='Available'>Available</MenuItem>
                            <MenuItem value='Unavailable'>Unavailable</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>


                    <FormControl>
                        <InputLabel id="availability">Select Sort By</InputLabel>
                        <Select
                            value={filterByToEdit.sortBy}
                            onChange={handleChange}
                            name="sortBy"
                            variant="standard"
                        >
                            <MenuItem value='txt'>Toy Name</MenuItem>
                            <MenuItem value='price'>Toy Price</MenuItem>
                            <MenuItem value='createdAt'>Time of creation</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>


                    <FormControl>
                        <FormControlLabel
                            label={filterByToEdit.sortDir ? 'Descending' : 'Ascending'}
                            control={
                                <Switch
                                    name='sortDir'
                                    type='checkbox'
                                    checked={filterByToEdit.sortDir}
                                    onChange={handleChange}
                                />
                            }
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Container >
    )
}

