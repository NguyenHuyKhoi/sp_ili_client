import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../../component/Button'
import { UserContext } from '../../../../../context/user/context'
import { theme } from '../../../../../theme'
import { createUrl } from '../../../../../util/helper'
const useStyles = makeStyles((theme) => ({
    container: {
        flex:1,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'white',
        padding: theme.spacing(0.5),
        border: 'solid 1px #000000',
        overflow: 'hidden',
        borderRadius: '255px 20px 225px 20px/20px 225px 20px 255px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    left: {
        position: 'relative'
    },
    img: {
        aspectRatio: 1.6,
        width: 180,
        objectFit: 'center'
    },
    right: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rightTop: {
        flex:1,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: theme.spacing(2)
    },
    rightBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.neutral.main,
        padding: theme.spacing(0.6),
        paddingLeft: theme.spacing(2)
    }
}))
 
export const UserRowItem = (props) => {
    const navigate = useNavigate()
    const {dispatch} = useContext(UserContext)
    const classes = useStyles()
    const {user} = props
    const {avatar, username, email} = user
    const handleView = () => {
        return navigate(`/profiles/${user._id}`, {replace: false})
    }

    const handleBan = () => {
        console.log("Banned");
    }

    return (
        <div className = {classes.container} style={{backgroundColor: props.selected ? grey[100]:'white'}}
            onClick={handleView}>
            <div className = {classes.left}>
                <img className = {classes.img} src = {createUrl(avatar)} alt = 'Cover'/>
            </div>
            <div className = {classes.right}>
                <div className = {classes.rightTop}>
                    <Typography variant = 'btnLabel' sx = {{color: 'black', flex: 1}}> 
                        {username}
                    </Typography>
                </div>
                <div className = {classes.rightBottom}>
                    <Typography variant = 'label' sx = {{color: '#000', flex: 1, ml: theme.spacing(1)}}>
                        {email}
                    </Typography>
                    <Button 
                        variant = 'primary' 
                        size = 'small' 
                        label = 'Ban'
                        style = {{marginLeft: theme.spacing(2)}}
                        onClick = {handleBan}/>
              
                </div>
            </div>
        </div>
    )
}

export default UserRowItem
