import { Divider, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import Button from '../../../../../component/Button'
import TextField from '../../../../../component/TextField'
import { theme } from '../../../../../theme'
import { createUrl } from '../../../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        display: 'flex',
        backgroundColor: theme.palette.secondary.main,
        flexDirection: 'column'
    },
    center: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    header: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.background.main,
    },
    answerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2)
    }
}))

const PicWordQuestion = (props) => {
    const classes = useStyles()
    const {data} = props
    var {question,answer_counts, question_index, question_total, isPlayer} = data
    const [userAnswer, setuserAnswer] = useState('');
    const [isAnswered, setisAnswered] = useState(!isPlayer);
    

    const {title, correct_answer, images} = question


    var answerTotal = answer_counts.reduce((res, item) => res += item.count, 0)

    const handleAnswer = () => {
        if (userAnswer ===  '') return
        console.log("Answer:", userAnswer);
        setisAnswered(true)
        if (props.onAnswer) props.onAnswer(userAnswer)
    }

    if (isPlayer ===  undefined) isPlayer = false 
    return (
        <div className = {classes.container}>
            <div className = {classes.header} >
                <Typography variant = 'btnLabel' sx = {{color: '#000', width: theme.spacing(20), textAlign: 'left'}}>
                    {`${question_index + 1}/${question_total}`}
                </Typography>
                <Typography variant = 'header' sx = {{color: '#000', flex: 1, textAlign: 'center'}}>
                    {title}
                </Typography>
                <Typography variant = 'btnLabel' sx = {{color: '#000', width: theme.spacing(20), textAlign: 'right'}}>
                    {`Answers: ${answerTotal}`}
                </Typography>
            </div>
        
            <Divider/>
            <div className = {classes.center}>
                <div style = {{
                    width: theme.spacing(90),
                    aspectRatio: 1.6,
                }}>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                    {
                        images.map((image, index) => (
                            <Grid item xs = {6} key = {'' + index}>
                                <img style = {{
                                    width: '100%',
                                    height: theme.spacing(25),
                                    objectFit: 'cover'
                                }}
                                    alt = 'Hint'
                                    src = {createUrl(image)}/>
                            </Grid>
                        ))
                    }
                    </Grid>
                </div>
             
            </div>
            <div className = {classes.answerContainer}>
                {
                    !isAnswered &&
                    <Button 
                        variant = 'warning'
                        label = 'Clear'
                        style = {{
                            marginRight: theme.spacing(5),
                            width: theme.spacing(20)
                        }}
                        onClick = {() => setuserAnswer('')}/>
                }
                <TextField 
                    placeholder = 'Type keyword ...' 
                    style = {{ 
                        backgroundColor: 'white', textAlign: 'center',
                        padding: theme.spacing(1),
                        width: '50%', fontSize: 50,
                        paddingLeft: theme.spacing(2),
                        paddingRight: theme.spacing(2)
                    }}
                    disabled = {isAnswered}
                    onSubmit = {handleAnswer}
                    value={isPlayer ? userAnswer : correct_answer}
                    onChange={ (value)=> setuserAnswer(value.toUpperCase())}/>
                {
                    !isAnswered &&
                    <Button 
                        variant = 'success'
                        label = 'Answer'
                        style = {{
                            marginLeft: theme.spacing(5),
                            width: theme.spacing(20)
                        }}
                        onClick = {handleAnswer}/>
                }
               
            </div>
       </div>
    )
}

export default PicWordQuestion
