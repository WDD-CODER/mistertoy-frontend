
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Card, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select, Stack, Switch, Typography } from '@mui/material'
import { LabelsList } from './LabelsList'
import { utilService } from '../services/util.service'

export function ToyEditForm({ item, setItem, fieldsConfig, onSave }) {
    // This part need to be applied where the ToyEditForm will be used as the given inputs.
    //   const fieldsConfig = [
    //     { name: 'name', label: 'Toy Name ', type: 'string', required: true, min: 2, max: 50 },
    //     { name: 'price', label: 'Toy Price ', type: 'numeric', required: true, min: 0 },
    //     { name: 'inStock', type: 'boolean' }
    // ]

    const { name, price, inStock, sortDir, sortBy, labels } = item


    async function onUpdateToyLabels(labelsToAdd) {
        var updatedField = []
        if (labels.some(curLabel => curLabel === labelsToAdd)) {
            updatedField = labels.filter(curLabel => curLabel !== labelsToAdd)
            setItem(({ ...item, labels: updatedField }))
        } else {
            setItem(({ ...item, labels: labelsToAdd }))
        }
    }

    async function onUpdateToyStockValue({ target }) {
        const modifiedStockValue = utilService.getStockModifiedValue(target.value)
        setItem(prevToy => ({ ...prevToy, inStock: modifiedStockValue }))
    }

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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => onSave({ ...item, ...values })}
        >
            {({ values, errors, touched }) => (

                <Form>
                    <Container sx={{ height: 'auto', display: 'flex', flexDirection: 'column', }}>
                        {fieldsConfig.map(field => (
                            <div key={field.name}>
                                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                                {field.type === 'boolean' ? (
                                    <FormControlLabel
                                        sx={{ color: values[field.name] ? 'success.main' : 'alert.main' }}
                                        control={<Field name={field.name} as={Switch} />}
                                        label={values[field.name] ? 'Toy is Available' : 'Toy Out Of Stock'} />
                                ) : (
                                    <Field name={field.name} />
                                )}
                                {errors[field.name] && touched[field.name] ? (
                                    <Box sx={{ color: 'alert.main' }}>{errors[field.name]}</Box>
                                ) : null}
                            </div>
                        ))}
                        <Stack spacing={3} margin={1} sx={{ textAlign: "center" }} >
                            <FormControl >
                                <InputLabel id="labels-multiple-label">Choose Labels</InputLabel>
                                <Select
                                    labelId="labels-multiple-label"
                                    id="labels-multiple-select"
                                    multiple
                                    value={labels || []}
                                    onChange={event => onUpdateToyLabels(event.target.value)}
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
                                    onChange={onUpdateToyStockValue}
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