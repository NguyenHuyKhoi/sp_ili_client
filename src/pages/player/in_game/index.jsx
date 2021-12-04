import { Alert, Container, Divider, Grid, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import Correct from './components/Correct'
import Header from './components/Header'
import Incorrect from './components/Incorrect'
import Question from './components/Question'
import InputCard from './components/Question'
import Timesup from './components/Timesup'
import UserBar from './components/UserBar'
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

const INPUT_STAGE = {
    ENTER_PIN: 0, 
    ENTER_NAME: 1
}
const PlayerInGame = () => {
    const classes = useStyles()
    return (
        <div className = {classes.container}>
            <Header/>
            <Divider/>
            <div className = {classes.questionContainer}>
                <Timesup/>
            </div>  
            <UserBar/>
        </div>
    )
}

export default PlayerInGame
