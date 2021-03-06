import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { theme } from '../../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex:1,
        height:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main,
    },
    msg: {
        backgroundColor: theme.palette.error.main ,
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
        marginTop: theme.spacing(2),
        border: 'solid 2px #000000',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
    }
}))
const Incorrect = (props) => {
    var {correct_answer} = props
    if (correct_answer===undefined) correct_answer = ''
    const classes = useStyles()
        return (
            <div className = {classes.container}>
                <Typography variant = 'bigHeader' sx = {{ color: '#000', textAlign: 'center'}}> 
                    Wrong !
                </Typography>
                <div style= {{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant = 'bigHeader' sx = {{ color: '#000'}}> 
                        {'  +'}
                    </Typography>
                    <Typography variant = 'bigHeader' sx = {{ color: '#000', fontSize: 100, mx: theme.spacing(2)}}> 
                        0
                    </Typography>
                    <Typography variant = 'header' sx = {{ color: '#000'}}> 
                        Points
                    </Typography>
                </div>
                <div className = {classes.msg}>
                    <Typography variant = 'bigLabel' sx = {{color: '#000'}}>
                        {`Correct answer is :` + correct_answer}
                    </Typography>
                </div>
            </div>
    )
}

export default Incorrect
