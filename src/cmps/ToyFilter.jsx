import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { useSelector } from "react-redux"
import { Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react"

import { utilService } from "../services/util.service.js"
import { setFilter } from "../store/actions/toy.actions.js"
import { toyService } from "../services/toy"
import { Link } from 'react-router-dom';

export function ToyFilter() {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...useSelector(state => state.toyModule.filterBy) })
    const debouncedOnSetFilter = useRef(utilService.debounce(setFilter, 500))
    const stateLabels = useSelector(state => state.toyModule.labels)

    const { name, price, inStock, sortDir, sortBy, labels } = filterByToEdit

    useEffect(() => {
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

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

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
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
                            value={name}
                            onChange={handleChange}
                            type="search"
                            label="Search By Txt"
                            id="name" name="name"
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
                            value={labels}
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
                            value={sortBy}
                            onChange={handleChange}
                            name="sortBy"
                            variant="standard"
                        >
                            <MenuItem value='name'>Toy Name</MenuItem>
                            <MenuItem value='price'>Toy Price</MenuItem>
                            <MenuItem value='createdAt'>Time of creation</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl>
                        <FormControlLabel
                            label={sortDir ? 'Descending' : 'Ascending'}
                            control={
                                <Switch
                                    name='sortDir'
                                    checked={sortDir}
                                    onChange={handleChange}
                                />
                            }
                        />
                    </FormControl>
                </Grid>
                {loggedinUser?.isAdmin && <Button ><Link to="/toy/edit" className="btn" >Add Toy</Link></Button>}
                <><Button onClick={onClearFilter}>Clear Filter</Button></>
            </Grid>
        </Container >
    )
}

