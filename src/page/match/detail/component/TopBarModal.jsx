import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { theme } from '../../../../theme';
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',	
		padding: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	left:{
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	right: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
}))

const TopBarModal = (props) => {
	const classes = useStyles()
	const {title, index, total, leftLabel} = props 
	const handleClose = () => {
		if (props.onClose) {
			props.onClose()
		}
	}

	const handleLeft = () => {
		if (index == 1) return 
		if (props.onLeft) props.onLeft()
	}

	const handleRight = () => {
		if (index == total) return 
		if (props.onRight) props.onRight()
	}
	return (
		<div className = {classes.container}>
			<div className = {classes.left}>
				{leftLabel}
				<Typography variant = 'subtitle1' sx = {{ml: theme.spacing(2), fontWeight: 'bold', color: '#333333'}}>
					{title}
				</Typography>
			</div>
			<div className = {classes.right}>
				<Typography variant = 'subtitle1' sx = {{fontWeight: 'bold', color: '#333333'}}>
					{`${index} of ${total}`}
				</Typography>
				<ChevronLeft 
					sx = {{
						color: index == 1 ? '#f2f2f2' : '#333333',
						fontSize: 35,
						ml: theme.spacing(1)
					}}
					onClick = {handleLeft}
				/>
				<ChevronRight
					sx = {{
						color: index == total ? '#f2f2f2' : '#333333',
						fontSize: 35,
						mr: theme.spacing(1)
					}}
					onClick = {handleRight}
				/>
				<Close onClick = {handleClose} sx = {{fontSize: 25, color: '#333333'}}/>
			</div>
		</div>
	)
}

export default TopBarModal