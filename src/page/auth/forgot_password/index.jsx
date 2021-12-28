import { CheckCircleSharp } from '@mui/icons-material'
import { Alert, Button, Link, Snackbar, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useState } from 'react'
import { theme } from '../../../theme'
import { validateEmail } from '../../../util/validator'
const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        backgroundColor: '#f2f2f2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    form: {
        width: '28%',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        display: 'flex',
        flexDirection: 'column'
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
        borderBottom: '2px solid #f2f2f2'
    },
    footer: {
        padding: theme.spacing(2),
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    },
    checkEmail: {
        display: 'flex',
        width: '25%',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(0.5),
        alignItems: 'center'
    }
}))

const ForgotPasswordPage = () => {
    const classes = useStyles()
    const [inputs, setInputs] = useState({email: ''})
    const [alert, setAlert] = useState({})
    const {email} = inputs

    const handleSubmit = (e) => {
        console.log("Handle submit")
        e.preventDefault() 

        if (!validateEmail(email)) {
            setAlert({
                type: 'error',
                msg: 'Email is empty or invalid'
            })
            return
        }

        axios.post('auth/forgot-password', {email})
            .then (() => {
                setAlert({
                    type: 'success'
                })
            })
            .catch((err) => {
                setAlert({
                    type: 'error',
                    msg: err.response.data.error
                })
            })
    }

    const handleChange = (key, value) => {
        setAlert({})
        setInputs({
            ...inputs,
            [key]: value
        })
    }
    return (
        <div className = {classes.container}>
            {
                alert.type == 'success' ?
                <div className = {classes.checkEmail}>
                    <CheckCircleSharp sx = {{color: 'green', fontSize: 60}}/>
                    <Typography variant = 'h4' sx = {{fontWeight: 'bold', mt: theme.spacing(2)}}>
                        Check your email
                    </Typography>
                    <Typography variant = 'caption' sx = {{textAlign: 'center',mx: theme.spacing(3), my: theme.spacing(2)}}>
                        We've send you an email about resetting your password
                            if you signuped by this mail
                    </Typography>
                    <Button variant = 'contained' color = 'success'>
                        <Link href = '/auth/login' underline = 'none' sx = {{color: 'white'}}>
                                Back to login
                        </Link>
                    </Button>
                </div>
                :
                <>
                 <Snackbar open={alert.type != undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                    anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                    <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                        {
                            alert.msg
                        }
                    </Alert>
                </Snackbar>
                   <Typography variant = 'h5' sx = {{alignSelf: 'center',fontWeight: 'bold', mb: theme.spacing(3)}}>
                        Reset Password
                    </Typography>
                    <div className = {classes.form}>
                        <div className = {classes.inputs}>
                            <TextField id="outlined-basic" label="Email" placeholder = "Enter your email" variant="outlined"
                                   value = {email}
                                   onChange = {(e) => handleChange('email', e.target.value)}
                                 />
                            <Button 
                                color = {email == ''? 'neutral' : 'success'}
                                disabled = {email == ''}
                                variant = 'contained' 
                                sx = {{width: '100%', mt: theme.spacing(2)}}
                                onClick = {handleSubmit}>
                                Send reset link
                            </Button>
                        </div>
                        <div className = {classes.footer}>
                            <Link href = '/auth/login'>
                                Back to login
                            </Link>
                        </div>
                    
                    </div>
                </>
            }
         

        </div>
    )
}

export default ForgotPasswordPage
