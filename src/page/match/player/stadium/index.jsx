import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTION_TYPES_ID } from '../../../../context/question/creator/context'
import { updateMatch } from '../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../context/match/play/context'
import { SocketContext } from '../../../../context/socket/context'
import Header from '../../host/stadium/component/Header'
import MultipleChoiceQuestion from '../../host/stadium/component/MultipleChoiceQuestion'
import PicWordQuestion from '../../host/stadium/component/PicWordQuestion'
import QuestionEnd from '../../host/stadium/component/QuestionEnd'
import Scoreboard from '../../host/stadium/component/Scoreboard'
import TFChoiceQuestion from '../../host/stadium/component/TFChoiceQuestion'
import WordTableQuestion from '../../host/stadium/component/WordTableQuestion'
import WordTableQuestionEnd from '../../host/stadium/component/WordTableQuestionEnd'
import BottomBar from './component/BottomBar'
import Correct from './component/Correct'
import Incorrect from './component/Incorrect'
import Timesup from './component/Timesup'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    questionContainer: {
        flex: 1
    }
}))

const MatchPlayerStadiumPage = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {question, match, dispatch, answer_counts} = useContext(MatchPlayContext)
    const {socket} = useContext(SocketContext)
    const [earnScore, setEarnScore] = useState(0)
    const [time, setTime] = useState(0)
    const [timeTotal, setTimeTotal] = useState(question.time_limit)
    const [stage, setStage] = useState({type:'on_question'})
    const {questionIndex, pinCode, players} = match

    useEffect(() => {
        socket.on('match:onCountdown', (data) => {
            let {time} = data
            //console.log("Receive emit on countdown: ",  time)
            setTime(time)
        })

        socket.on('match:onNotAnswer', (data) => {
            let {timeTotal} = data 

            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            setStage({type: 'not_answer'})
        })

        socket.on('match:onCorrectAnswer', (data) => {
            let {timeTotal, earnScore} = data 
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            setStage({type: 'correct_answer'})
            setEarnScore(earnScore)
        })

        socket.on('match:onWrongAnswer', (data) => {
            let {timeTotal} = data
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            setStage({type: 'wrong_answer'})
        })

        socket.on('match:onQuestion', (data) => {
            let {match, timeTotal} = data
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            dispatch(updateMatch(match))
            setStage({type: 'on_question'})
        })
        
        socket.on('match:onEndQuestion', (data) => {
            let {match, timeTotal} = data
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            dispatch(updateMatch(match))
            setStage({type: 'end_question'})
        })

        socket.on('match:scoreboard', (data) => {
            let {match, timeTotal} = data
            console.log("Set time total:", timeTotal)
            setTimeTotal(timeTotal)
            dispatch(updateMatch(match))
            setStage({type: 'scoreboard'})
        })

        socket.on('match:onSummary', (data) => {
            let {match} = data
            dispatch(updateMatch(match))
            navigate('/match/player/hall', {replace: true})
        })
        return () => {
            
        }
    }, [])

    const handleAnswer = (answer) => {
        console.log("handle Send anser:", answer    );
        let me = findMe()
        if (me._id===undefined) {
            console.log("Not found me");
            return 
        }
        let answerTime = question.time_limit - time
        console.log("Client send answer: ", answer, time);
        socket.emit('match:answer', pinCode, me, answer, answerTime)
    }

    const findMe = () => {
        let player = match.players.find((item, index) => item._id===socket.id) 
            ||
            {
                name: 'Unknown',
                score: 0
            }
        return player
    }

    const renderQuestionEnd = () => {
        console.log("render question end");
        var data = {
            question,
            time,
            answer_counts,
            question_index :questionIndex,
            question_total : match.game.questions.length
        }
        var stage = match.progress[match.progress.length - 1]
        switch (question.typeId) {
            case  QUESTION_TYPES_ID.MULTIPLE_CHOICE :
            case QUESTION_TYPES_ID.TF_CHOICE :
            case QUESTION_TYPES_ID.PIC_WORD :
                return  <QuestionEnd  data = {data} />

            case QUESTION_TYPES_ID.WORD_TABLE :
                console.log("render word table question end");
                return <WordTableQuestionEnd
                    data = {{...data, open_word_states: stage.open_word_states, userAnswers: stage.answers}} />
            default:
                return null 
        }
    }
    const renderQuestion = () => {
        var data = {
            question,
            time,
            answer_counts,
            question_index :questionIndex,
            question_total : match.game.questions.length,
            isPlayer: true
        }
        var stage = match.progress[match.progress.length - 1]
        switch (question.typeId) {
            case  QUESTION_TYPES_ID.MULTIPLE_CHOICE :
                return  <MultipleChoiceQuestion 
                    onAnswer = {handleAnswer}
                    data = {data} />
            case QUESTION_TYPES_ID.TF_CHOICE :
                return <TFChoiceQuestion
                    onAnswer = {handleAnswer}
                    data = {data}/>
            case QUESTION_TYPES_ID.PIC_WORD :
                return <PicWordQuestion
                    onAnswer = {handleAnswer}
                    data = {data} />
            case QUESTION_TYPES_ID.WORD_TABLE :
                return <WordTableQuestion
                    onAnswer = {handleAnswer}
                    data = {{...data, open_word_states: stage.open_word_states, userAnswers: stage.answers}}/>
            default:
                return null 
        }
    }

    const getCorrectAnswer = () => {
        // For only nultichoi/TF/Picword
        var correct_answer = question.correct_answer
        if (question.typeId===QUESTION_TYPES_ID.MULTIPLE_CHOICE) {
                return ['A','B','C','D'][correct_answer]
            }
        if (question.typeId===QUESTION_TYPES_ID.TF_CHOICE) {
            return ['True', 'False'][correct_answer]
        }
        return correct_answer
    }
    return (
        <div className = {classes.container}>
            <Header
                time = {time}
                timeTotal = {timeTotal}/>
            {
                stage.type==='on_question' ?
                    renderQuestion()
                : stage.type==='end_question' ?
                    renderQuestionEnd()
                : stage.type==='not_answer'? 
                <Timesup/>
                : stage.type==='correct_answer'?
                <Correct earnScore = {earnScore}/>
                : stage.type==='wrong_answer' ?
                <Incorrect correct_answer = {getCorrectAnswer()}/>
                : stage.type==='scoreboard' ?
                <Scoreboard time = {time} players = {players}/>
                
                : null
            }
            <BottomBar player = {findMe()}/>
        </div>
    )
}

export default MatchPlayerStadiumPage
