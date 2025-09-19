import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material"
import { toyService } from "../services/toy"

export function LabelsList({item, onUpdateLabels ,onUpdateStockValue}) {

    return (
        <Stack spacing={3} margin={1} sx={{ textAlign: "center" }} >
            <FormControl >
                <InputLabel id="labels-multiple-label">Choose Labels</InputLabel>
                <Select
                    labelId="labels-multiple-label"
                    id="labels-multiple-select"
                    multiple
                    value={item.labels || []}
                    onChange={onUpdateLabels}
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
                    value={toyService.getStockValueToShow(item)}
                    onChange={onUpdateStockValue}
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

