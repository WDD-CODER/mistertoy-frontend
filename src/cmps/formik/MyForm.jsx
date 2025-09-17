
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Container, FormControlLabel, FormLabel, Slider, Switch, Typography } from '@mui/material'

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.string()
        .required('Required')
        .matches(/^[1-9]\d*$/, 'Price must be a positive whole number!'),
    inStock: Yup.boolean()
})

const MyForm = ({ onSaveToy, item}) => {
    // const SignupSchema = (item) => {
    //     return Yup.object().shape({
    //         txt: Yup.string()
    //             .min(2, 'Too Short!')
    //             .max(50, 'Too Long!')
    //             .required('Required'),
    //         numericValue: Yup.string()
    //             .required('Required')
    //             .matches(/^[1-9]\d*$/, 'Number must be a positive whole number!'),
    //         inStock: Yup.boolean()
    //     })
    // }

    return (

        <Container >
            <Typography variant='h4' >
                Signup
            </Typography>
            <Formik initialValues={{
                name: item.txt,
                numericValue: item.numericValue,
                booleanValue: item.booleanValue,
            }} validationSchema={SignupSchema} onSubmit={values => {
                onSaveToy(({ ...item, ...values }))
            }}>
                {({ values, errors, touched }) => (<Form>
                    <FormLabel htmlFor="txt" className="txt">
                        Toy's Name
                        <Field
                            name="txt"
                        />
                        {errors.txt && touched.txt ? (<Box sx={{ color: 'alert.main' }}>{errors.txt}</Box>) : null}
                    </FormLabel >
                    <FormLabel htmlFor="numericValue" className="numeric-value">
                        <Field name="numericValue" />
                        {errors.numericValue && touched.numericValue ? (<Box sx={{ color: 'alert.main' }}>{errors.numericValue}</Box>) : null}
                    </FormLabel>
                    <FormLabel>
                        <FormControlLabel
                            className="boolean-value"
                            name="booleanValue"
                            label={values.booleanValue ? 'Toy is Available' : 'Is The Toy Available?'}
                            sx={{ color: values.booleanValue ? 'success.main' : '' }}
                            control={<Field name="booleanValue" as={Switch} />}
                        />
                        {/* {errors.inStock && touched.inStock ? (<Box>{errors.inStock}</Box>) : null} */}
                    </FormLabel>
                    <Button type="submit">Submit</Button>
                </Form>)}
            </Formik>
        </Container>)
}
export default MyForm


