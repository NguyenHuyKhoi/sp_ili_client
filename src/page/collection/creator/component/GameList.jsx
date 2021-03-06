import { makeStyles } from '@mui/styles'
import React from 'react'
import { GameItem } from './GameItem'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display: 'flex',
        flexDirection:'column',
    },
    item: {
        marginBottom: theme.spacing(2),
        display:'flex',
        flexDirection:'column'
    },
}))

const GameList = (props) => {
    const classes = useStyles()
    const {games} = props
    return (
        <div className = {classes.container}>
            {
                games.map((game, index) => (
                    <div className = {classes.item}   key = {''+index}>
                        <GameItem game = {game} isAdded = {true}/>
                    </div>
                ))
            }
        </div>
    )
}

export default GameList
