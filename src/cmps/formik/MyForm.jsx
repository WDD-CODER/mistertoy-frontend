
// import React from 'react'
// import { Formik, Form, Field } from 'formik'
// import * as Yup from 'yup'
// import { Box, Button, Container, FormControlLabel, FormLabel, Slider, Switch, Typography } from '@mui/material'

// // const SignupSchema = Yup.object().shape({
// //     name: Yup.string()
// //         .min(2, 'Too Short!')
// //         .max(50, 'Too Long!')
// //         .required('Required'),
// //     price: Yup.string()
// //         .required('Required')
// //         .matches(/^[1-9]\d*$/, 'Price must be a positive whole number!'),
// //     inStock: Yup.boolean()
// // })

// const MyForm = ({ onSaveToy, item, txt = '', numericValue = 0, booleanValue = true }) => {
//     console.log("🚀 ~ MyForm ~ booleanValue:", booleanValue)
//     console.log("🚀 ~ MyForm ~ txt:", txt)
//     console.log("🚀 ~ MyForm ~ numericValue:", numericValue)

//     const SignupSchema = (item) => {
//         return Yup.object().shape({
//             txt: Yup.string()
//                 .min(2, 'Too Short!')
//                 .max(50, 'Too Long!')
//                 .required('Required'),
//             numericValue: Yup.string()
//                 .required('Required')
//                 .matches(/^[1-9]\d*$/, 'Number must be a positive whole number!'),
//             inStock: Yup.boolean()
//         })
//     }

//     return (

//         <Container >
//             <Typography variant='h4' >
//                 Signup
//             </Typography>
//             <Formik initialValues={{
//                 txt: item.txt,
//                 numericValue: item.numericValue,
//                 booleanValue: item.booleanValue,
//             }} validationSchema={SignupSchema} onSubmit={values => {
//                 onSaveToy(({ ...item, ...values }))
//             }}>
//                 {({ values, errors, touched }) => (<Form>
//                     <FormLabel htmlFor="txt" className="txt">
//                         Toy's Name
//                         <Field
//                             name="txt"
//                         />
//                         {errors.txt && touched.txt ? (<Box sx={{ color: 'alert.main' }}>{errors.txt}</Box>) : null}
//                     </FormLabel >
//                     <FormLabel htmlFor="numericValue" className="numeric-value">
//                         <Field name="numericValue" />
//                         {errors.numericValue && touched.numericValue ? (<Box sx={{ color: 'alert.main' }}>{errors.numericValue}</Box>) : null}
//                     </FormLabel>
//                     <FormLabel>
//                         <FormControlLabel
//                             className="boolean-value"
//                             name="booleanValue"
//                             label={values.booleanValue ? 'Toy is Available' : 'Is The Toy Available?'}
//                             sx={{ color: values.booleanValue ? 'success.main' : '' }}
//                             control={<Field name="booleanValue" as={Switch} />}
//                         />
//                         {/* {errors.inStock && touched.inStock ? (<Box>{errors.inStock}</Box>) : null} */}
//                     </FormLabel>
//                     <Button type="submit">Submit</Button>
//                 </Form>)}
//             </Formik>
//         </Container>)
// }
// export default MyForm


import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Container, FormControlLabel, FormLabel, Switch, Typography } from '@mui/material'

// The main reusable form component
export const ReusableForm = ({ item, onSave, fieldsConfig }) => {
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
            onSubmit={values => onSave(values)}
        >
            {({ errors, touched }) => (
                <Form>
                    {/* Render fields from the config array */}
                    {fieldsConfig.map(field => (
                        <div key={field.name}>
                            <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                            {field.type === 'boolean' ? (
                                <FormControlLabel control={<Field name={field.name} as={Switch} />} label={field.label} />
                            ) : (
                                <Field name={field.name} />
                            )}
                            {errors[field.name] && touched[field.name] ? (
                                <Box sx={{ color: 'alert.main' }}>{errors[field.name]}</Box>
                            ) : null}
                        </div>
                    ))}
                    <Button type="submit">Save</Button>
                </Form>
            )}
        </Formik>
    )
}