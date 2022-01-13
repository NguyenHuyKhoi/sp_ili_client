import { Square } from '@mui/icons-material'
import { Divider, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
import {createUrl} from '../../../../../util/helper'
import Answer from './Answer'
import {answerStyles} from '../../../../game/creator/component/Answers'
import AnswerCount from './AnswerCount'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        display: 'flex',
        backgroundColor: theme.palette.secondary.main,
        flexDirection: 'column'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.main,
        padding: theme.spacing(2)
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7)
    },
    answerCounts: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    answers: {
        padding: theme.spacing(1),
    }
}))

const QuestionEnd = (props) => {
    const classes = useStyles()
    var {question, time, answer_counts} = props

     answer_counts = [2,3,4,1]
    const {title, image, answers, correct_answers} = question
    const total_count = answer_counts.reduce((res, count) => res += count, 0)
    return (
        <div className = {classes.container}>
            <div className = {classes.title} >
                <Typography variant = 'header' sx = {{color: '#000'}}>
                    {title}
                </Typography>
            </div>
            <Divider/>
            <div className = {classes.center}>
                <div className = {classes.answerCounts}>
                    {
                        answers.map((answer, index) => (
                            <div style = {{marginLeft: theme.spacing(2)}} key = {'' + index}>
                                <AnswerCount   
                                    style = {answerStyles[index]}
                                    answer = {answer} 
                                    count = {answer_counts[index]}
                                    percent = {total_count == 0 ? 0 : answer_counts[index] / total_count}
                                    isCorrect = {correct_answers.indexOf(index) != -1}/>
                            </div>
                        ))
                    }
                </div>
             
            </div>
            <div className = {classes.answers} >
                <Grid container columnSpacing = {1.5} rowSpacing = {1.5}>
                    {
                        answers.map((item, index) => (
                            <Grid item xs = {6}   key = {''+index}>
                                <Answer
                                    style = {answerStyles[index]}
                                    answer = {item} 
                                    count = {answer_counts[index]}
                                    isCorrect = {correct_answers.indexOf(index) != -1}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
       </div>
    )
}

export default QuestionEnd
