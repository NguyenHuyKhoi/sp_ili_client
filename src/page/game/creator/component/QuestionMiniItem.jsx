import { Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../theme'
import { createUrl } from '../../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(0.5),
        display:'flex',
        flexDirection:'column',
        position: 'relative'
    },
    answers: {
        flex:1,
        marginTop: theme.spacing(1)
    },
    answer: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        border: '1px solid gray',
        height:7
    },
    img: {
        height:25,
        width:45,
        alignSelf:'center',
        marginTop: theme.spacing(1)
    },
    time: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 11,
        border: '1px solid #b2b2b2',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        left: theme.spacing(2),
        top: 0,
        bottom: 0,
        margin: 'auto'
    }
}))

const QuestionMiniItem = (props) => {
    const classes = useStyles()
    const {question} = props
    //console.log("Question :", question)
    const {title, image, correct_answers} = question
    const limitTitle = title != null? title.substring(0, 20) + '...' : 'Question'
    return (
        <div className = {classes.container} style={{backgroundColor: props.selected ? '#ffffff':'#f2f2f2'}}>
            <Typography variant='caption' sx = {{alignSelf:'center'}}>
                {limitTitle}
            </Typography>
            <img src = {createUrl(image)} 
                className = {classes.img}/>

            <div className= {classes.time} >
                <Typography variant='caption' sx = {{color: '#b2b2b2', fontSize: 10}}>
                    20
                </Typography>
            </div>
            <div className = {classes.answers}>
                <Grid container sx = {{flex: 1}}>
                {
                    Array.from(Array(4)).map((_, index) => (
                        <Grid item xs = {6} sx = {{p: theme.spacing(0.2)}}   key = {''+index}>
                            <div className = {classes.answer} 
                                style = {{backgroundColor: (correct_answers.indexOf(index) != -1) ? '#59B32C' : 'white'}}/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
           
        </div>
    )
}

export default QuestionMiniItem
