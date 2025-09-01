import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';

export function MultiSelect({ items, onSetFilterByToEdit, filterByToEdit }) {

    return (
        <Stack spacing={3} sx={{ width: 150 }} >
            <Autocomplete
                multiple
                id="tags-standard"
                options={items}
                value={filterByToEdit.labels}
                onChange={(event, newValue) => onSetFilterByToEdit(prevFilter=> ({...prevFilter,labels:newValue}))}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Choose Labels"
                        placeholder="Select A Value "
                    />
                )}
            />
        </Stack>
    );
}


