import { Fullscreen, Language, MusicNote, VolumeDown } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useContext} from 'react'
import { theme } from '../../../../../theme'
import { MatchPlayContext } from '../../../../../context/match/play/context'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'violet',
        padding: theme.spacing(1.5)
    },
    langContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(3),
        alignSelf: 'flex-start'
    },
    pinContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(1.5)
    },
    btns:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    btnIcon: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: theme.spacing(2),
        backgroundColor: 'white',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

}))
const Header = (props) => {
    const classes = useStyles()
    const {match} = useContext(MatchPlayContext)
    const {pinCode} = match
    return (
        <div className = {classes.container}>   
            <div className = {classes.langContainer}>
                <Language   sx = {{color: 'black', fontSize: 20}} />
                <Typography variant = 'subtitle1' sx  ={{ml: theme.spacing(1),fontWeight: 'bold', color: 'black'}}>EN</Typography>
            </div>
            <div className = {classes.pinContainer}>
                <Typography variant = 'h6' sx  ={{ color: 'black'}}>Game pin</Typography>
                <Typography variant = 'h1'  sx  ={{ color: 'black', fontWeight: 'bold'}}> 
                    {
                        pinCode == undefined || pinCode == null ? 'XXXXXX' : pinCode
                    }
                </Typography>
            </div>
            <div className = {classes.btnsContainer}>
                <div className = {classes.btnIcon}>
                    <Fullscreen sx = {{color: 'black', fontSize: 20}} />
                </div>
                <div className = {classes.btnIcon}>
                    <MusicNote sx = {{color: 'black', fontSize: 20}}/>
                </div>
                <div className = {classes.btnIcon}>
                    <VolumeDown sx = {{color: 'black', fontSize: 20}} />
                </div>
            </div>
        </div>
    )
}

export default Header
