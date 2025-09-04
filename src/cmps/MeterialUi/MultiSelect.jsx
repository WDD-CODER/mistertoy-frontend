import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export function MultiSelect({ items, onSetFilterByToEdit, handleChange, filterByToEdit }) {
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

            <Autocomplete
                id="tags-filled"
                multiple={false}
                options={selectOptions}
                value={stockValue}
                onChange={(event, newValue) => handleChange({ target: { name: 'inStock', type: 'MultiSelect', value: newValue } })}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Stock Status"
                        variant="filled"
                        placeholder="Filter By Availability"
                    />
                )}
            />
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
                    onChange={(event, newValue) => handleChange({ target: { name: 'sortBy', type: 'select-one', value: newValue } })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Sort By"
                            variant="filled"
                            placeholder="Sort By"
                        />
                    )}
                />
            </div>
        </Stack>
    );
}


