// import { authService } from "../services/auth.service.remote.js"
import { useState } from "react"
import { userService } from "../services/user.service.js"
import { useSelector } from "react-redux"
import { Box, Button, Container, FormControl, TextField, Typography } from "@mui/material"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export function LoginSignup() {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const [isSignUp, setIsSignUp] = useState(true)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        fullname: Yup.string()
            .min(3, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(5, ' Password must be at least 5 Characters!')
            .max(10, 'Too Long!')
            .matches(/[A-Z]/, 'password must contain at least one capital letter.')
            .matches(/^\S*$/, 'password cannot contain spaces.')
            .required('Required'),
    });


    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCred => ({ ...prevCred, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        isSignUp ? signup(credentials) : login(credentials)
    }


    function login(credentials) {
    }

    function signup() {
        // authService.signup(credentials)
        //     .then(user => {
        //         setLoggedinUser(user)
        //         showSuccessMsg(` Signed up with success`)
        //         navigate('/')
        //     })
        //     .catch(err => {
        //         console.log('err', err);
        //         showErrorMsg(` Couldn't signup property`)
        //     })

    }

    // import { Box, Button, Container, FormControlLabel, FormLabel, Slider, Switch, Typography } from '@mui/material';


    return (

        <Container >
            <Typography variant='h4' >
                Signup
            </Typography>
            <Formik initialValues={{
                username: credentials.username,
                price: credentials.fullname,
                inStock: credentials.password,
            }} validationSchema={SignupSchema} onSubmit={values => {
                login(values)
            }}>
                {({ values, errors, touched }) => (<Form>
                    <FormControl>
                        <Field as={TextField}
                            name="username"
                            placeholder='Select User Name'
                            required
                            autoFocus
                        />  
                        {errors.username && touched.username ? (<Box sx={{ color: 'alert.main' }}>{errors.username}</Box>) : null}
                    </FormControl>
                      <FormControl>
                        <Field as={TextField}
                            name="password"
                            placeholder='Set up a new password'
                            required
                            autoFocus
                        />  
                        {errors.password && touched.password ? (<Box sx={{ color: 'alert.main' }}>{errors.password}</Box>) : null}
                    </FormControl>
                   
                    {isSignUp &&
                      <FormControl>
                        <Field as={TextField}
                            name="fullname"
                            placeholder="what's your full name?"
                            value={credentials.fullname}
                            required
                            autoFocus
                        />  
                        {errors.fullname && touched.fullname ? (<Box sx={{ color: 'alert.main' }}>{errors.fullname}</Box>) : null}
                    </FormControl>
                    
                    // <input
                    //     type="text"
                    //     name="fullname"
                    //     value={credentials.fullname}
                    //     placeholder="Full name"
                    //     onChange={handleChange}
                    //     required
                    // />
                    }
                    <Button type="submit">{isSignUp ? 'Signup' : 'Login'}</Button>
                </Form>)}
            </Formik>
            <Box className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </Box>
        </Container>);
};
