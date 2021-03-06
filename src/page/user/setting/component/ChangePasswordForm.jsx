import { Alert, Grid, Snackbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import Button from '../../../../component/Button'
import LoadingModal from '../../../../component/LoadingModal'
import TextField from '../../../../component/TextField'
import { AuthContext } from '../../../../context/auth/context'
import { theme } from '../../../../theme'
import {validatePassword} from '../../../../util/validator'
const useStyles = makeStyles((theme) => ({
    container: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
		backgroundColor: theme.palette.secondary.main,
		border: 'solid 2px #000000',
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
		alignItems: 'center'
    }
}))

const ChangePasswordForm = (props) => {
	const classes = useStyles()
	const {token} = useContext(AuthContext)
	const [inputs, setInputs] = useState({old: "", neww: "", repeat: ""})
    const [alert, setAlert] = useState({})
	const [modal, setModal] = useState({})
    const {old, neww, repeat} = inputs

  	const handleSubmit = (e) => {
		e.preventDefault() 
		if (old.length == 0) {
			setAlert({
				type: 'error',
				msg:"Old password is empty or invalid"
			})
			return
		}
		if (!validatePassword(neww)) {
			setAlert({
				type: 'error',
				msg:"New password is empty or invalid"
			})
			return
		}
		if (!validatePassword(repeat)) {
			setAlert({
				type: 'error',
				msg:"Repeat password is empty or invalid"
			})
			return
		}

		if (neww!==repeat) {
			setAlert({
				type: 'error',
				msg: 'new and repeat password not same'
			})
			return
		}
		if (neww===old) {
			setAlert({
				type: 'error',
				msg: 'new and old password are same'
			})
			return
		}

		setModal({state: 'loading'})

		axios.post('auth/change-password', {
			token,
			oldPassword: old,
			newPassword: neww
		})
		.then (() => {
			setAlert({
				type: 'success',
				msg: 'Change password successfully'
			})
			setInputs({
				old: '', neww:'', repeat: ''
			})
		})
		.catch ((err) => {
			setAlert({
				type: 'error',
				msg: 'Something is wrong: ' + err.response.data.error
			})
		})
		.finally(() => {
			setModal({})
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
			<LoadingModal 
				open = {modal.state == 'loading'}/>
			<Snackbar open={alert.type!==undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>
			<Typography variant = 'bigLabel' sx = {{color: '#000'}}>
				Change password
			</Typography>
			<Grid container columnSpacing = {2} rowSpacing = {2} sx = {{mt: theme.spacing(2), mb: theme.spacing(4)}}>
				<Grid item xs = {6} >
					<TextField 
						placeholder="Old password..." 
						// type="password"  
						style = {{width: '100%', textAlign: 'center'}} 
						value={old}
						onChange = {(value) => handleChange('old', value)}
					/>
				</Grid>
				<Grid item xs = {6} >
					<div/>
				</Grid>
				<Grid item xs = {6} >
					<TextField 
						placeholder="New password..." 
						// type="password"  
						style = {{width: '100%', textAlign: 'center'}} 
						value={neww}
						onChange = {(value) => 	handleChange('neww', value)}
					/>
				</Grid>
				<Grid item xs = {6} >
					<TextField 
						placeholder="Repeat new password..." 
						// type="password"  
						style = {{width: '100%', textAlign: 'center'}} 
						value={repeat}
						onChange = {(value) => handleChange('repeat', value)}
					/>
				</Grid>

			</Grid>
			<Button 
				variant = 'success' 
				label = 'Save' 
				style = {{width: theme.spacing(20)}}
				onClick = {handleSubmit}/>
		</div>
  );
}

export default ChangePasswordForm