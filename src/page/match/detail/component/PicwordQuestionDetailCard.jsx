import { Check, Close } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Icon from '../../../../component/Icon';
import { theme } from "../../../../theme";
import { createUrl } from '../../../../util/helper/index';
import { answerStyles } from '../../../question/creator/component/Answers';
const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: theme.palette.background.main,
		padding: theme.spacing(2)
	},
	img: {
		aspectRatio: 1.6,
		height: theme.spacing(16),
		border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
	},
	infors: {
		display: 'flex',
    	flexDirection: 'row',
    	justifyContent: 'space-between',
		marginTop: theme.spacing(1)
	},
  	infor: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
}))

const InforItem = (props) => {
	const classes = useStyles()
	const {value, label, icon} = props
	return (
		<div className = {classes.infor} >
			<Icon name = {icon} style = {{fontSize: 25, color: '#000'}}/>
			<Typography variant = 'btnLabel' sx = {{ml: theme.spacing(1), color: '#000'}}>
				{label + ': ' + value}
			</Typography>
		</div>
	)
}

const PicwordQuestionDetailCard = (props) => {
	const classes = useStyles() 
	const {stage, players} = props 
	const {question} = stage
	const {images, answers, correct_answer, time_limit, score} = question
	return (
		<div className = {classes.container}>
			<Typography variant = 'btnLabel' sx = {{color: '#000'}}>
				{'Keyword: ' + correct_answer}
			</Typography>
			<Grid container columnSpacing={3} sx = {{pt: theme.spacing(1)}}
				sx = {{px: theme.spacing(10)}}>
				{	
					images.map((image, index) => (
						<Grid item xs = {3} key = {'' + index} >
							<img className = {classes.img} 
								alt = 'Hint'
								src = {createUrl(image)}/>
						</Grid>
					))
				}
			</Grid>
			<div className = {classes.infors}>
				<InforItem label = {'Time'} value = {time_limit} icon = 'QueryBuilder'/>
				<InforItem label = {'Score'} value = {score} icon = 'MilitaryTech'	/>
			</div>
		</div>
	)
}


export default PicwordQuestionDetailCard