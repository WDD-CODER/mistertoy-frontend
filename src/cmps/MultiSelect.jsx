import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { utilService } from "../services/util.service";
import { toyService } from "../services/toy.service.remote";

export function MultiSelect({item, updateItem}) {
const {name, price,labels, inStock,} = item
const demoLabels = toyService.getDemoLabels()
    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type || target.name) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'inStock':
                value = utilService.getStockModifiedValue(value)
                break
                
            default: break
        }

        updateItem(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    return (
        <Container   sx={{ width:'300px', }}>
            <Grid container spacing={2}>
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
                            {demoLabels.map((option) => (
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
                            value={toyService.getStockValueToShow(item)}
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
            </Grid>
        </Container>
    )
}