import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Card, Container, FormControlLabel, FormLabel, Switch, Typography } from '@mui/material'

// This part need to be applied where the Reusable form will be used as the given inputs.
//   const fieldsConfig = [
//     { name: 'name', label: 'Toy Name ', type: 'string', required: true, min: 2, max: 50 },
//     { name: 'price', label: 'Toy Price ', type: 'numeric', required: true, min: 0 },
//     { name: 'inStock', type: 'boolean' }
// ]


// The main reusable form component
export const ReusableForm = ({ item, setItem, fieldsConfig, children }) => {
    // Dynamically build the schema based on fieldsConfig
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
    // Set initial values from the item, filtered by the fieldsConfig
    const initialValues = {}
    fieldsConfig.forEach(field => {
        initialValues[field.name] = item[field.name]
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => setItem({ ...item, ...values })}
        >
            {({ values, errors, touched }) => (
                <Form>
                    <Container sx={{ height: 'auto', display: 'flex', flexDirection: 'column', }}>
                        {/* Render fields from the config array */}
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
                    </Container>
                    {/* {children}s */}
                    {/* <Button type="submit">Save</Button> */}
                </Form>
            )}
        </Formik>
    )
}