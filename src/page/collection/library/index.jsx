import { Button, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import HeaderBar from '../../../component/HeaderBar'
import SideMenu from '../../game/library/component/SideMenu'
import CollectionCreateModal from './component/CollectionCreateModal'
import CollectionList from './component/CollectionList'


const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing(4)
    }
}))

const CollectionLibraryPage = () => {
    const classes = useStyles()
    const [modal, setModal] = useState({})
    const handleModalChange = (modal) => {
        setModal(modal)
    }

    return (
        <div className = {classes.container}>
            <CollectionCreateModal 
                open =  {modal.state === 'collection_create'}     
                onClose = {() => handleModalChange({})}
                onDone = {() => {
                    handleModalChange({})
                }}/>
            <HeaderBar selectedIndex = {2}/>
            <Grid container>
                <Grid item sm={2} >
                    <SideMenu selectedIndex = {1}/>
                </Grid>
                <Grid item sm={10}>
                    <div className= {classes.body}>
                        <div className= {classes.header} >
                            <Typography variant= 'h5' sx = {{fontWeight: 'bold'}}>
                                Collections
                            </Typography>
                            <Button variant= 'contained' onClick = {() => handleModalChange({state: 'collection_create'})}>
                                Create
                            </Button>
                        </div>
                        <CollectionList/>
                    </div>
                
                </Grid>
            </Grid>
        </div>
    )
}

export default CollectionLibraryPage