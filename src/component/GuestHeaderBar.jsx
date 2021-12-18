import { Button, Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { theme } from '../theme'
import { TabItem } from './HeaderBar'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
       // height: theme.spacing(7),
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight:  theme.spacing(2)
    },
    logo: {
        height: theme.spacing(5)
    },
    menu: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    tabItem: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(1.5),
        alignItems: 'center',
        marginLeft: theme.spacing(1.5)
    },
    avatarPopover: {
        display: 'flex',
        width: 300,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(2)
    },
    avatarPopoverHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatarPopoverFooter: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center'
    }
}))


const GuestHeaderBar = () => {
    const classes = useStyles()
 //   const history = useHistory()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickAvatar = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleTabChange = (index) => {
        setSelectedIndex(index)
    }

    const handleClickSignUp = () => {
        
    }
    const handleClickLogin = () => {

    }
    return (
        <div className = {classes.container}>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/1280px-Kahoot_Logo.svg.png'
                className = {classes.logo}/>
            <div className = {classes.menu}>
                {
                    Array.from(Array(3)).map((_, index) => (
                        <TabItem isSelected = {selectedIndex == index}
                            onClick = {()=>handleTabChange(index)}
                            key = {''+index}/>
                    ))
                }
            </div>
            <Button variant = 'outlined'>
                Play
            </Button>
            <Button variant = 'contained' sx = {{mx: theme.spacing(2)}} onClick = {handleClickSignUp}>
                <Link href = '/auth/signup' sx = {{color: 'white'}} underline = 'none'>
                    Sign up
                </Link>
            </Button>
            <Button variant = 'outlined' onClick = {handleClickLogin}>
                <Link href = '/auth/login' sx = {{color: 'blue'}} underline = 'none'>
                    Login
                </Link>
            </Button>
        </div>
    )
}

export default GuestHeaderBar