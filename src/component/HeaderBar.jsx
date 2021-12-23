import { HomeOutlined, Logout, NotificationsOutlined } from '@mui/icons-material'
import { Avatar, Button, Popover, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutSuccess } from '../context/auth/actions'
import { AuthContext } from '../context/auth/context'
import { startCreateGame } from '../context/game/creator/actions'
import { GameCreatorContext } from '../context/game/creator/context'
import { theme } from '../theme'
import { DropdownMenu } from './DropdownMenu'
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

export const TabItem = (props) => {
    const classes = useStyles()
    const {isSelected, label} = props
    const handleClick = () => {
        if (props.onClick != undefined) {
            props.onClick()
        }
    }
    return (
        <div className = {classes.tabItem}
            onClick = {handleClick}
            style ={{
                borderBottom: isSelected ?
                    '2px solid purple' : null
            }}>
            <HomeOutlined sx = {{
                color: isSelected ? 'purple':'gray'
            }}/>
            <Typography variant = 'subtitle1' 
                sx = {{ml: theme.spacing(1.5),
                    color: isSelected ? 'purple':'gray'}}>
                {label}
            </Typography>
        </div> 
    )
}

const AvatarPopover = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {dispatch, user, token} = useContext(AuthContext)

    const handleLogout = (e) => {
        e.preventDefault()
        axios.post('auth/logout', null, {
                headers: {
                    'x-access-token': token
                }
            })
        .then((res) => {
            dispatch(logoutSuccess())
        })   
    }

    const handleClickSettings = () => {
        navigate('/user/setting', {replace: false})
    }
    return (
        <div className = {classes.avatarPopover}>
            <div className = {classes.avatarPopoverHeader}>
                <Typography variant = 'subtitl1'>
                    User name
                </Typography>
                <Typography variant = 'caption'>
                    View profile    
                </Typography>
            </div>
            <DropdownMenu menu = {{
                title: 'Change Language'
            }}
            />
              <DropdownMenu menu = {{
                title: 'Subscriptions',
                items: [
                    'Kahoot AccessPass'
                ]
            }}/>
            <DropdownMenu menu = {{
                title: 'Profile Settings'
            }}
                onClick = {handleClickSettings}/>
            <DropdownMenu menu = {{
                title: 'Resources',
                items: [
                    'Help & Support Center',
                    'Blog',
                    'Library',
                    'Certification',
                    'Shop'
                ]
            }}/>
            <div className = {classes.avatarPopoverFooter} onClick = {handleLogout}>
                <Logout sx = {{color: 'red', fontSize: 20}}/>
                <Typography variant = 'subtitle2' sx = {{mx: theme.spacing(1),color: 'red'}}>
                    Sign out
                </Typography>
            </div>
        </div>
    )
}
const tabs = [
    {
        label: 'Home',
        link: '/',
    },
    {
        label: 'Discover',
        link: '/discover/suggestion'
    },
    {
        label: 'Library',
        link: '/game/library'
    },
    {
        label: 'Report',
        link: '/report'
    },
    {
        label: 'Groups',
        link: '/group/list'
    }
]

const HeaderBar = (props) => {
    const navigate = useNavigate()
    const classes = useStyles()
    const {dispatch} = useContext(GameCreatorContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {selectedIndex} = props
    const handleClickAvatar = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleTabChange = (tab) => {
        navigate(tab.link, {replace: false})
    }

    const handleCreate = () => {
        dispatch(startCreateGame())
        navigate('/game/creator',{replace: true})
    }
    return (
        <div className = {classes.container}>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kahoot_Logo.svg/1280px-Kahoot_Logo.svg.png'
                className = {classes.logo}/>
            <div className = {classes.menu}>
                {
                    tabs.map((item, index) => (
                        <TabItem isSelected = {selectedIndex == index}
                            key = {''+index}
                            label = {item.label}
                            onClick = {()=>handleTabChange(tabs[index])}/>
                    ))
                }
            </div>
            <Button variant = 'contained' onClick = {handleCreate}>
                Create
            </Button>
            <Avatar sx = {{mx: theme.spacing(2)}} 
                src = 'https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook.jpg'
                onClick = {handleClickAvatar}/>
            <Popover
                id = {id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                >
                <AvatarPopover/>
            </Popover>
            <NotificationsOutlined sx = {{fontSize: 25}}/>
        </div>
    )
}

export default HeaderBar
