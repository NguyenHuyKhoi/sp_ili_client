import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: theme.spacing(2)
    },
    scoreContainer: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        backgroundColor: 'black',
        borderRadius: theme.spacing(0.5)
    }
}))


const BottomBar = (props) => {
    const classes = useStyles()

    return (
        <div className = {classes.container}>
            <Typography variant = 'h6' sx = {{flex: 1, color: 'black'}}> userName </Typography>
            <div className = {classes.scoreContainer} >
                <Typography variant = 'h6' sx = {{fontWeight: 'bold', color: 'white'}}>620</Typography>
            </div>
       </div>
    )
}

export default BottomBar