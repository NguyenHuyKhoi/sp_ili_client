import { ArrowDropDown, ArrowLeft } from '@mui/icons-material'
import { Switch, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useState, useContext} from 'react'
import { MATCH_SETTINGS } from '..'
import DropdownSelect from '../../../../../component/DropdownSelect'
import { updateMatch } from '../../../../../context/match/play/actions'
import { MatchPlayContext } from '../../../../../context/match/play/context'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(10)
    },
    itemContainer: {
        marginBottom: theme.spacing(0.5)
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1.5),
    },
    infor: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        backgroundColor: 'white',
        marginBottom: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    options: {
        width: theme.spacing(20)
    }
}))

const OptionItem = (props) => {
    const classes = useStyles()
    const {item, value} = props 
    const {title, description, key, values } = item

    const handleChange = (key, value) => {
        if (props.onChange) props.onChange(key, value)
    }

    return (
        <div className = {classes.item}>
            <div className = {classes.infor}>
                <Typography variant = 'h6' sx = {{color: 'white', fontWeight: 'bold'}}>
                    {title}
                </Typography>
                {
                    description &&
                    <Typography variant = 'subtitle2' sx = {{color: 'white'}}>
                        {description}
                    </Typography>
                }
               
            </div>
            <div className = {classes.options} >
                <DropdownSelect 
                    title = ''
                    list = {values}
                    value = {value}
                    color = {'white'}
                    onChange = {(v)=>handleChange(key,v)}/>
            </div>
           
        </div>
    )
}

const MatchSetting = () => {
    const classes = useStyles()
    const [showOptions, setShowOptions] = useState(false)
    const {dispatch, match} = useContext(MatchPlayContext)
    const handleShowOptions = () => {
        setShowOptions(!showOptions)
    }

    const handleChange = (key, value) => {
        console.log("Update match: ", key, value)
        dispatch(updateMatch({
            ...match,
            [key]: value
        }))
    }
    return (
        <div className = {classes.container}>
            <div className = {classes.header} onClick = {handleShowOptions}>
                <Typography variant = 'h6' sx = {{color: 'black', fontWeight: 'bold', flex: 1}}>
                    Setting
                </Typography>
                {
                    !showOptions? 
                    <ArrowLeft   sx = {{color: 'black', fontSize: 30}}/>
                    :
                    <ArrowDropDown  sx = {{color: 'black', fontSize: 30}}/>
                }
                
            </div>
            {
                showOptions && 
                MATCH_SETTINGS.map((item, index) => (
                    <div className = {classes.itemContainer}   key = {''+index}>
                        <OptionItem 
                            item = {item} 
                            onChange = {(key, value) => handleChange(key, value)}
                            value = {match[item.key]}/>
                    </div>
                ))
            }
        </div>
    )
}

export default MatchSetting
