import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextFields } from '@mui/icons-material';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { useSelector } from "react-redux"
import { FilterMultiSelect } from "./MeterialUi/FilterMultiSelect.jsx";
import { Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react"

import { utilService } from "../services/util.service.js"
import { setFilter } from "../store/actions/toy.actions.js"
import { toyService } from '../services/toy.service.js';

export function ToyFilter({ filterBy }) {
    const debouncedOnSetFilter = useRef(utilService.debounce(setFilter, 500)).current
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const stateLabels = useSelector(state => state.toyModule.labels)

    const sortByOptions = ['txt', 'price', 'createdAt']
    const selectOptions = ['All', 'Available', 'Unavailable']


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
                break
            default: break
        }

        // if (field === 'inStock') value = utilService.getStockModifiedValue(value)

        setFilterByToEdit(prevFilter => {
            const curFilter = { ...prevFilter, [field]: value }
            return curFilter
        })
    }

    function onClearFilter() {
        setFilterByToEdit(toyService.getDefaultFilter())
    }


    return (
        <Container sx={{ placeItems: "center" }} className="toy-filter">
            <Typography variant="h4">Filter Toys</Typography>
            <Grid container spacing={2}>
                <Grid >

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
                <Grid >

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
                <Grid>
                    <FormControl>
                        <InputLabel id="labels-select-label">Choose Labels</InputLabel>
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
                <Grid>


                    <FormControl>
                        <InputLabel id="availability">Select Toy availability</InputLabel>
                        <Select
                            value={toyService.getStockValueToShow(filterByToEdit)}
                            onChange={handleChange}
                            name="inStock"
                            variant="standard"
                        >
                            <MenuItem value='all'>All</MenuItem>
                            <MenuItem value='available'>Available</MenuItem>
                            <MenuItem value='unavailable'>Unavailable</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid >
                    <FormControl>
                        <InputLabel id="sortBy">Select Sort By</InputLabel>
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
                <Grid>


                    <FormControl>
                        <FormControlLabel
                            label={filterByToEdit.sortDir ? 'Descending' : 'Ascending'}
                            control={
                                <Switch
                                    name='sortDir'
                                    checked={filterByToEdit.sortDir}
                                    onChange={handleChange}
                                />
                            }
                        />
                    </FormControl>
                </Grid>
                <><Button onClick={onClearFilter}>Clear Filter</Button></>
            </Grid>
        </Container >
    )
}

