import { Alert, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { addQuestion, deleteQuestion, duplicateQuestion, selectQuestion, showDefectiveQuestions, updateDefectiveQuestions, updateQuestion } from '../../../../context/question/creator/actions'
import { DEFECTIVE_CHECK_TYPES, QuestionCreatorContext, QUESTION_TYPES_ID } from '../../../../context/question/creator/context'
import { cloneQuestion, validateQuestion } from '../../../../context/question/creator/reducer'
import { theme } from '../../../../theme'
import DeleteQuestionModal from './DeleteQuestionModal'
import MultipleChoicesQuestionBuilder from './MultipleChoicesQuestionBuilder'
import PicWordQuestionBuilder from './PicWordQuestionBuilder'
import QuestionConfig from './QuestionConfig'
import QuestionList from './QuestionList'
import SelectQuestionTypeModal from './SelectQuestionTypeModal'
import TFChoicesQuestionBuilder from './TFChoicesQuestionBuilder'
import ValidateQuestionModal from './ValidateQuestionModal'
import WordTableQuestionBuilder from './WordTableQuestionBuilder'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor:'white',
        overflow: 'hidden'
    }
}))

const QuestionCreator = (props) => {
    const classes = useStyles()
    
    const {questions, questionIndex,defectiveQuestions, dispatch, showDefectives} = useContext(QuestionCreatorContext)

    useEffect(() => {
        if (showDefectives == DEFECTIVE_CHECK_TYPES.CHECK_AND_SHOW) {
            handleShowDefectiveQuestions()
        }
    
        return () => {
        };
    }, [showDefectives]);
    
    var question = questionIndex != null && questions.length > 0 ? questions[questionIndex] : {}

    const [canDeleteQuestion, setCanDeleteQuestion] = useState(false)
    const [modal, setModal] = useState({})
    const [alert, setAlert] = useState({})
    useEffect(() => {
        setCanDeleteQuestion((questions.length > 1))
        return () => {
            
        }
    }, [questions.length])

    const handleShowDefectiveQuestions = () => {
        var qs = []
        questions.forEach((item, index) => {
            let cloned = cloneQuestion(item)
            let defects = validateQuestion(cloned)
            if (defects.length > 0) {
                cloned.defectives = defects

                console.log("Defective questions:", cloned)
                qs.push(cloned)
            }
        })
        dispatch(updateDefectiveQuestions(qs))
        if (qs.length > 0) {
            setModal({state: 'validate'})
        }
    }

    const handleSelectFixQuestion = (index) => {
        setModal({})
        dispatch(selectQuestion(index))
    }

    const handleSelectQuestionType = (id) => {
        console.log("Select question type", id);
        dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.NOT_CHECK))
        dispatch(addQuestion(id))
        setModal({})
    }

    const handleClickAdd = () => {
        setModal({state: 'select_type'})
    }

    const handleUpdateQuestion = (ques) => {
        dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.NOT_CHECK))
        dispatch(updateQuestion(question, questionIndex))
    }

    const renderBuilder = () => {
        switch (question.typeId) {
            case  QUESTION_TYPES_ID.MULTIPLE_CHOICE :
                return  <MultipleChoicesQuestionBuilder 
                    question = {question} 
                    onChange = {handleUpdateQuestion}/>
            case QUESTION_TYPES_ID.TF_CHOICE :
                return <TFChoicesQuestionBuilder
                    question = {question} 
                    onChange = {handleUpdateQuestion}/>
            case QUESTION_TYPES_ID.PIC_WORD :
                return <PicWordQuestionBuilder
                    question = {question} 
                    onChange = {handleUpdateQuestion}/>
            case QUESTION_TYPES_ID.WORD_TABLE :
                return <WordTableQuestionBuilder
                    question = {question} 
                    onChange = {handleUpdateQuestion}/>
            default:
                return null 
        }
    }
    return (
        <div className = {classes.container}>
            <Snackbar open={alert.type !== undefined} autoHideDuration={5000} onClose={() => setAlert({})}
                anchorOrigin = {{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setAlert({})} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
            </Snackbar>

            <SelectQuestionTypeModal 
                open = { modal.state === 'select_type' }     
                onClose = {() => setModal({})}
                onSelectType = {handleSelectQuestionType}/>

            <ValidateQuestionModal
                open = {modal.state === 'validate'}    
                questions = {defectiveQuestions}
                onClickQuestion = {handleSelectFixQuestion} 
                onClose = {() => {
                    setModal({})
                    dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.CHECK_AND_UNSHOW))
                }}
                onCancel = {() => setModal({})}/>

            <DeleteQuestionModal 
                open = {modal.state === 'delete_question'}     
                canDelete = {canDeleteQuestion}
                onClose = {() => setModal({})}
                onCancel = {() => setModal({})}
                onDone = {() => {
                    setModal({})
                    if (canDeleteQuestion) {
                        dispatch(deleteQuestion(questionIndex))
                        dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.NOT_CHECK))
                    }
                }}/>

            <Grid container sx = {{pt: theme.spacing(7), flex: 1}}>
                <Grid item sm={1.7} >
                    <QuestionList onAdd = {handleClickAdd} />
                </Grid>
                <Grid item sm={8.3}>
                    {
                        renderBuilder()
                    }
                </Grid>
                <Grid item sm={2}>
                    <QuestionConfig 
                        onClickDelete = {() => setModal({state: 'delete_question'})}
                        onClickDuplicate = {() => {
                            dispatch(showDefectiveQuestions(DEFECTIVE_CHECK_TYPES.NOT_CHECK))
                            dispatch(duplicateQuestion(questionIndex))
                        }}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default QuestionCreator
