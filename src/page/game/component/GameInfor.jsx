import { Avatar, Button, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../../asset/image/logo.jpg'
import { theme } from '../../../../theme'

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column'
    },
    gameImg: {
        width: '100%',
        height: 250
    },
    body: {
        flex:1, 
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    btnBar: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(1)
    },
    ownerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ownerInfor: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(1)
    }
}))

export const OwnerInfor = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const handleClick = () => {
        navigate('/profiles', {replace: false})
    }
    return (
        <div className = {classes.ownerContainer} onClick={handleClick}>
            <Avatar alt="Remy Sharp" src="../../../asset/image/logo.jpg"/>
            <div className ={classes.ownerInfor}>
                <Link href="#" underline="hover" color = {'black'}>
                    Game Owner
                </Link>
                <Typography variant = 'subtitle2'>
                    Update 1 hour ago
                </Typography>
            </div>
        </div>
    )
}

const GameInfor = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const handleEdit = () => {
        navigate('/game/creator', {replace: false})
    }

    const handlePlay = () => {
        navigate('/game/host_setting', {replace: false})
    }
    return (
        <div className = {classes.container}>
            <img className = {classes.gameImg} src = {logo}/>
            <div className = {classes.body} >
                <Typography variant = 'h6'>Game Title</Typography>
                <div className = {classes.btnBar} >
                    <Button variant="contained" color="success" 
                        onPlay = {handlePlay}>
                        Play
                    </Button>
                    <Button variant="contained" color="primary" sx = {{mx: theme.spacing(2)}}
                        onClick={handleEdit}>
                        Edit
                    </Button>
                </div>
                <Typography variant = 'subtitle2' sx = {{my: theme.spacing(2)}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias iure quibusdam repellendus totam velit inventore, blanditiis officiis enim facilis ipsa nulla ut recusandae ex molestias nihil consectetur voluptatibus corporis doloremque.</Typography>
            </div>
            <OwnerInfor/>
           
        </div>
    )
}

export default GameInfor