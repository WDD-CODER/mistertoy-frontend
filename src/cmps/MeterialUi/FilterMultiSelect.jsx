import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextFields } from '@mui/icons-material';
import { FormControl, MenuItem } from '@mui/material';

export function FilterMultiSelect({ items, onSetFilterByToEdit, handleChange, filterByToEdit }) {
    console.log("🚀 ~ FilterMultiSelect ~ filterByToEdit:", filterByToEdit)
    console.log("🚀 ~ FilterMultiSelect ~ items:", items)
    const sortByOptions = ['txt', 'price', 'createdAt']
    const selectOptions = ['All', 'Available', 'Unavailable']
    const stockValue = getData()
    const sortDir = (filterByToEdit.sortDir) ? 'Descending' : ' Ascending'
    function getData() {
        if (filterByToEdit.inStock === '') return 'All'
        else if (filterByToEdit.inStock === false) return 'Unavailable'
        else return 'Available'
    }

    return (
        <Stack spacing={3} sx={{ width: 350, border: 1, padding: 1 }} >
            <FormControl fullWidth variant="standard">

            <Autocomplete
                multiple
                id="tags-standard"
                options={items}
                value={filterByToEdit.labels}
                onChange={(event, newValue) => onSetFilterByToEdit(prevFilter => ({ ...prevFilter, labels: newValue }))}
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
                </FormControl>
{/* 
            <TextField
                select
                label="Choose LabelsList"
                value={filterByToEdit.labels}
                onChange={(event) => onSetFilterByToEdit(prevFilter => ({ ...prevFilter, labels: event.target.value }))}
                variant="standard"
            >
                {items.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <div className="sortBy flex">
                <FormControlLabel control={<Checkbox onChange={() => handleChange({
                    target: { name: 'sortDir', type: 'checkbox', }
                })} />}
                    label={sortDir} />
                <Autocomplete
                    sx={{ width: 200 }}
                    id="tags-filled"
                    multiple={false}
                    options={sortByOptions}
                    value={filterByToEdit.sortBy}
                    onChange={(event, newValue) =>
                        handleChange({ target: { name: 'sortDir', type: 'checkbox', checked: event.target.checked } })
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Sort By"
                            variant="filled"
                            placeholder="Sort By"
                        />
                    )}
                />
            </div> */}
        </Stack>
    );
}


