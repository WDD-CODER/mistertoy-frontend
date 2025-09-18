
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, FormControlLabel, FormLabel, Slider, Switch, Typography } from '@mui/material';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.string()
        .required('Required')
        .matches(/^[1-9]\d*$/, 'Price must be a positive whole number!'),
    inStock: Yup.boolean()
});

const MyForm = ({ onSaveToy,item }) => {
    return (

        <Container >
            <Typography variant='h4' >
                Signup
            </Typography>
            <Formik initialValues={{
                name: item.name,
                price: item.price,
                inStock: item.inStock,
            }} validationSchema={SignupSchema} onSubmit={values => {
                onSaveToy(({ ...item, ...values }))
            }}>
                {({ values, errors, touched }) => (<Form>
                    <FormLabel htmlFor="name" className="toy-name">
                        Toy's Name
                        <Field name="name" />
                        {errors.name && touched.name ? (<Box sx={{ color: 'alert.main' }}>{errors.name}</Box>) : null}
                    </FormLabel >
                    <FormLabel htmlFor="price" className="toy-price">
                        <Field name="price" />
                        {errors.price && touched.price ? (<Box sx={{ color: 'alert.main' }}>{errors.price}</Box>) : null}
                    </FormLabel>
                    <FormLabel>
                        <FormControlLabel
                            label={values.inStock ? 'Toy is Available' : 'Is The Toy is Available?'}
                            sx={{ color: values.inStock ? 'success.main' : '' }}
                            control={<Field name="inStock" as={Switch} />}
                        />
                        {/* {errors.inStock && touched.inStock ? (<Box>{errors.inStock}</Box>) : null} */}
                    </FormLabel>
                    <Button type="submit">Submit</Button>
                </Form>)}
            </Formik>
        </Container>);
};
export default MyForm