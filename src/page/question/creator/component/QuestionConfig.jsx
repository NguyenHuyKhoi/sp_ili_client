import {Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import Button from '../../../../component/Button'
import DropdownSelect from '../../../../component/DropdownSelect'
import { updateQuestion } from '../../../../context/question/creator/actions'
import { QuestionCreatorContext, QUESTION_TYPES } from '../../../../context/question/creator/context'
import { theme } from '../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        height: '92vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
        boxShadow: `1px 3px 1px #f0f0f0`,
        paddingTop: theme.spacing(5)
    },
    inputs: {
        flex:1, 
        flexDirection:'column',
        padding: theme.spacing(2)
    },
    input: {
        marginBottom: theme.spacing(5)
    },
    bottom: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.secondary.main
    }
}))

const QuestionConfig = (props) => {
    const classes = useStyles()
    const {questions, questionIndex, dispatch, isEditMode} = useContext(QuestionCreatorContext)
    const question = questions[questionIndex]
    const {score, time_limit} = question
    const handleDeleteQuestion = () => {
        if (props.onClickDelete) {
            props.onClickDelete()
        }
    }
    const handleDuplicateQuestion = () => {
        if (props.onClickDuplicate) {
            props.onClickDuplicate()
        }
    }
    const handleChange = (key, value) => {
        question[key] = value
        dispatch(updateQuestion(question))
        
    }

    var questionType = QUESTION_TYPES.find((item) => item.id == question.typeId)

    console.log("Question config: ", question.typeId, questionType)
    var time_limits = questionType.time_limits
    var scores = questionType.scores
    return (
        <div className = {classes.container}>
            <div className = {classes.inputs} >
                <div className = {classes.input}>
                    <DropdownSelect 
                        title = 'Time'
                        list = {time_limits.map((item) => ({
                            value: item, label: item + 's'
                        }))}
                        value = {time_limit}
                        onChange = {(value)=>handleChange('time_limit',value)}/>
                </div>
                <div className = {classes.input}>
                    <DropdownSelect title = 'Score'
                        list = {scores.map((item) => ({
                            value: item, label: item + ' points'
                        }))}
                        value = {score}
                        onChange = {(value)=>handleChange('score',value)}/>
                </div>
            </div>
            <Divider />
            {
                isEditMode == false && 
                <div className = {classes.bottom} >
                    <Button 
                        variant = 'primary' 
                        size = 'small' 
                        style = {{ width: theme.spacing(20), alignSelf: 'center'}}
                        onClick = {handleDuplicateQuestion}
                        label = 'Duplicate'/>
                    <Button 
                        variant = 'warning'  
                        size = 'small' 
                        style = {{marginTop: theme.spacing(2), width: theme.spacing(20), alignSelf: 'center'}}
                        label = 'Delete'
                        onClick = {handleDeleteQuestion}/>
                </div>
            }
          
        </div>
    )
}

export default QuestionConfig
