
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    txt: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.number()
        .min(2, 'Price Must Be more then 1!')
        .required('Required'),
});

const MyForm = ({ onSaveToy, toyToEdit }) => {
    console.log("🚀 ~ MyForm ~ toyToEdit:", toyToEdit)
    
    return (<div>
        <h1>Signup</h1>
        <Formik initialValues={{
            txt: toyToEdit.txt,
            price: toyToEdit.price,
            inStock: toyToEdit.inStock,
        }} validationSchema={SignupSchema} onSubmit={values => {
            onSaveToy(({ ...toyToEdit, ...values }))
        }}>
            {({ values, errors, touched }) => (<Form>
                <label htmlFor="txt" className="toy-name">
                    Toy's Name
                    <Field name="txt" />
                    {errors.txt && touched.txt ? (<div>{errors.txt}</div>) : null}
                </label>
                <label htmlFor="price" className="toy-price">
                    <Field name="price" />
                    {errors.price && touched.price ? (<div>{errors.price}</div>) : null}
                </label>
                <label>
                    <Field name="inStock" type="checkbox" />
                   {values.inStock ? 'Toy is Available':'Toy is Unavailable'}
                    {errors.inStock && touched.inStock ? (<div>{errors.inStock}</div>) : null}
                </label>
                <button type="submit">Submit</button>
            </Form>)}
        </Formik>
    </div>);
};
export default MyForm