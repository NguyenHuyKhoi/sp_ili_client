import { makeStyles } from '@mui/styles';
import React from 'react';
import MediaUploadCard from '../../../../component/MediaUploadCard';
import TextField from '../../../../component/TextField';
import { theme } from '../../../../theme';
import Answers from './Answers';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(5),
        display: 'flex',
        flex:1,
        height: '92vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.main,
        alignItems:'center'
    },
    titleBox: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        boxShadow: `1px 3px 1px #f0f0f0`,
        borderRadius: theme.spacing(0.5)

    },

    uploadImg: {
        width: 420,
        height: 280
    }
}))

const MultipleChoicesQuestionBuilder = (props) => {
    const classes = useStyles()
    const {question} = props
    
    const {title, image, answers, correct_answer} = question
    const handleChange = (key, value) => {
        question[key] = value
        if (props.onChange) {
            props.onChange(question)
        }
    }
    return ( 
        <div className = {classes.container}>
            <TextField 
                placeholder = 'Enter question ...' 
                style = {{ 
                    backgroundColor: 'white', textAlign: 'center',
                    height: theme.spacing(7),
                    width: '90%', fontSize: 30,
                    paddingLeft: theme.spacing(10),
                    paddingRight: theme.spacing(10)
                }}
                value={title == null ? '':title}
                onChange={(value)=> handleChange('title', value)}/>

            <div className = {classes.uploadImg}>
                <MediaUploadCard 
                    onSelectImage = {(image) => handleChange('image', image)}
                    onRemoveImage = {() => handleChange('image', null)}
                    label = 'Upload a hint'
                    image = {image}/>
            </div>
            <Answers 
                answers = {answers}
                correct_answer = {correct_answer}
                onAnswerCorrectChange = {(correct_answer) => handleChange('correct_answer', correct_answer)}
                onAnswerChange = {(answers) => handleChange('answers',answers)}/>
        </div>
    )
}

export default MultipleChoicesQuestionBuilder
