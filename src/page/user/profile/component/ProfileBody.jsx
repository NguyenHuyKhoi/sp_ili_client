import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import Tabbar from '../../../../component/Tabbar'
import { AuthContext } from '../../../../context/auth/context'
import CollectionList from './CollectionList'
import GameList from './GameList'

const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        maxHeight: '100vh',
        display: 'flex',
        flexDirection:'column',
        backgroundColor: theme.palette.background.main
    },
    body: {
        display:'flex',
        flexDirection:'column'
    },
}))

const ProfileBody = () => {
    const classes = useStyles()
    const {token} = useContext(AuthContext)
    const [selectedIndex, setSelectedIndex] = useState(0)
    return (
        <div className = {classes.container}>
            <div className = {classes.tabsContainer}>
                <Tabbar tabs = {['Games', 'Collections']}
                    onClickTab = {(index) => setSelectedIndex(index)}
                    />
            </div>
            <div className = {classes.body} >
            {
                selectedIndex == 0?  <GameList/>
                : selectedIndex == 1?  <CollectionList/>
                : null
            }
            </div>
        </div>
    )
}

export default ProfileBody
