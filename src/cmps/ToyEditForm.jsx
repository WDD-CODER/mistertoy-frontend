import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import { toyService } from '../services/toy'

export function ToyEditForm({ item, onUpdateLabels, onUpdateStockValue, onSave }) {
    const fieldsConfig = [
        { name: 'name', label: 'Toy Name ', type: 'string', required: true, min: 2, max: 50 },
        { name: 'price', label: 'Toy Price ', type: 'numeric', required: true, min: 0 }
    ]

    const createValidationSchema = () => {
        const schema = {}
        fieldsConfig.forEach(field => {
            let validator
            switch (field.type) {
                case 'string':
                    validator = Yup.string()
                    if (field.required) validator = validator.required('Required')
                    if (field.min) validator = validator.min(field.min, `Too Short!`)
                    if (field.max) validator = validator.max(field.max, `Too Long!`)
                    break
                case 'numeric':
                    // Retained original Yup.string() to keep changes minimal, but Yup.number() is recommended
                    validator = Yup.string()
                        .required('Required')
                        .matches(/^[1-9]\d*$/, 'Number must be a positive whole number!');
                    break
                case 'boolean':
                    validator = Yup.boolean()
                    break
                default:
                    validator = Yup.mixed()
            }
            schema[field.name] = validator
        })
        return Yup.object().shape(schema)
    }

    const validationSchema = createValidationSchema()
    const initialValues = {}
    fieldsConfig.forEach(field => {
        initialValues[field.name] = item[field.name]
    })

    return (
        <Formik
            key={item._id || 'new'} 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => onSave({ ...item, ...values })}
        >
            {({ values, errors, touched }) => (

                <Form>
                    <Container sx={{padding:1, display: 'flex', flexDirection: 'column',textAlign:'center',gap:1}}>
                        {fieldsConfig.map(field => (
                            <Box sx={{display:'flex', flexDirection:'column' ,gap:2}} key={field.name}>
                                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                                {field.type === 'boolean' ? (
                                    <FormControlLabel
                                        sx={{ color: values[field.name] ? 'success.main' : 'alert.main' }}
                                        control={<Field name={field.name} as={Switch} />}
                                        label={values[field.name] ? 'Toy is Available' : 'Toy Out Of Stock'} />
                                ) : (
                                    <Field
                                        as={TextField}
                                        name={field.name}
                                        id={field.name}
                                        placeholder={field.label.trim()} 
                                        size="small"
                                        type={field.type === 'numeric' ? 'number' : 'text'}
                                    />
                                )}
                                {errors[field.name] && touched[field.name] ? (
                                    <Box sx={{ color: 'alert.main' }}>{errors[field.name]}</Box>
                                ) : null}
                            </Box>
                        ))}
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

                    </Container>
                    <Button type="submit">Save</Button>
                </Form>
            )}
        </Formik>
    )
}