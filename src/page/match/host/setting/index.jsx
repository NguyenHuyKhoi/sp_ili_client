import { ArrowDropDown, ArrowLeft } from '@mui/icons-material'
import { Button, Grid, Switch, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { GameContext } from '../../../../context/game/other/context'
import { theme } from '../../../../theme'
import GameModes from './component/GameModes'
import GameModeItem from './component/GameModes'
import GameOptions from './component/GameOptions'
import Header from './component/Header'
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'purple'
    },
    body: {
        flex: 1,
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(40),
        paddingRight: theme.spacing(40)
    },
    title: {
        padding: theme.spacing(1.5),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}))

const MatchHostSettingPage = () => {
    const classes = useStyles()
    const {game} = useContext(GameContext)
    const {title} = game
    return (
        <div className = {classes.container}>
            <Header/>
            <div className = {classes.body}>
                <div className = {classes.title}>
                    <Typography variant = 'h5' sx = {{color: 'black', fontWeight: 'bold'}}>
                        {title}
                    </Typography>
                </div>
                <GameModes/>
                <GameOptions/>
            </div>  
        </div>
    )
}

export default MatchHostSettingPage