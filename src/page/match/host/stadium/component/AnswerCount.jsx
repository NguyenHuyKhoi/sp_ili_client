import { Check } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'
const useStyles = makeStyles((theme) => ({
    container: {
        width: theme.spacing(18),
        display: 'flex',
        flexDirection:'column',
        border: 'solid 2px #000000',
        borderRadius: '255px 10px 225px 10px/10px 225px 10px 255px',
        overflow: 'hidden'
    },
    countDiv: {
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent: 'space-evenly',
        padding: theme.spacing(0.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderRadius: theme.spacing(0.5),
        '&:hover': {
            cursor: 'pointer'
        },
    }
}))

const AnswerCount = (props) => {
    const classes = useStyles()
    const { count, isCorrect, percent, style, value} = props 
    var {color} = style

    if (color ===  undefined) color = theme.palette.success.main
    console.log("Is correct:", isCorrect);
    return (
        <div className = {classes.container} 
            style={{backgroundColor: color}}
            onClick = {() => {
                if (props.onClick) props.onClick()
            }}>
            <div className = {classes.countDiv} 
                style = {{
                    backgroundColor: color,
                    margin: percent > 0 ? theme.spacing(0.2) : 0,
                    opacity: 1, 
                    height: theme.spacing(30 * (percent))}}/>
            <div className = {classes.body} > 
            {/* {
                icon &&
                <Icon name = {icon} style = {{fontSize: 30, color: theme.palette.background.main}}/>
            } */}
                <Typography variant = 'btnLabel' sx = {{color: '#000'}}>
                    {`(${count})`}
                </Typography>
                <Typography variant = 'btnLabel' sx = {{mx: theme.spacing(1),color: '#000', flex: 1, textAlign: 'center'}}>
                    {value}
                </Typography>
                {
                    isCorrect !==  undefined && 
                    (
                        isCorrect && 
                        <Check sx = {{color: '#000', fontSize: 30}}/>
                    )
                }
            </div>   
          
        </div>
    )
}


export default AnswerCount
