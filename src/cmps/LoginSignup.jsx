// import { authService } from "../services/auth.service.remote.js"
import { useState } from "react"
import { userService } from "../services/user"
import { useSelector } from "react-redux"
import { Box, Button, Container, FormControl, FormControlLabel, Switch, FormLabel, TextField, Typography } from "@mui/material"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { httpService } from "../services/http.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { loginUser, signupUser } from "../store/actions/user.actions.js";

const USER_URL = 'user/'
const AUTH_URL = 'auth/'

export function LoginSignup({ setIsLoginOpen }) {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const [isSignUp, setIsSignUp] = useState(true)
    // const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(5, ' Password must be at least 5 Characters!')
            .max(10, 'Too Long!')
            .matches(/[A-Z]/, 'password must contain at least one capital letter.')
            .matches(/^\S*$/, 'password cannot contain spaces.')
            .required('Required'),
    })

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
        isAdmin: Yup.boolean()
    });

    async function login(credentials) {
        try {
            await loginUser(credentials)
            showSuccessMsg(`${credentials.username} Logged in with success`)
            setIsLoginOpen(false)
        } catch (error) {
            showErrorMsg(' Failed Login ')
        }
    }

    async function signup(credentials) {
        try {
            await signupUser(credentials)
            showSuccessMsg(`${credentials.username} Signed Up with success`)
            setIsLoginOpen(false)
        } catch (err) {
            showErrorMsg(err.message || 'Failed signing up')
        }
    }
    return (

        <Container >
            <Typography variant='h4' >
                {isSignUp ? 'Signup' : 'Login'}
            </Typography>

            <Formik
                initialValues={userService.getEmptyCredentials()}
                validationSchema={isSignUp ? SignupSchema : LoginSchema} onSubmit={values => {

                    isSignUp ? signup(values) : login(values)
                }}
            >
                {({ values, errors, touched }) => (<Form>
                    <FormControl >
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
                            <Field
                                as={TextField}
                                name="fullname"
                                placeholder="what's your full name?"
                                required
                                autoFocus
                            />
                            {errors.fullname && touched.fullname ? (
                                <Box sx={{ color: 'alert.main' }}>{errors.fullname}</Box>
                            ) : null}
                        </FormControl>
                    }
    
                    <FormLabel>
                       <FormControlLabel
                        label={values.isAdmin ? 'User Is admin' : 'Set user to admin ?'}
                        sx={{ color: values.isAdmin ? 'success.main' : 'grey.600' }}
                        control={<Field name="isAdmin" as={Switch} />}
                    />
                    </FormLabel>
                   
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

