import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
const useStyles = makeStyles((theme) => ({
}))

const DropdownSelect = (props) => {
    const classes = useStyles()
    const {title, list, value} = props
    const handleChange = (e) => {
        let value = e.target.value
        if (props.onChange) {
            props.onChange(value)
        }
    }
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
                {
                    title
                }
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value == null ?'':value}
                defaultValue={''}
                label="Age"
                onChange={handleChange}
            >
                {
                    list != undefined &&
                    list.map((item, index) => (
                        <MenuItem value={item.value}   key = {''+index}>
                            {item.label }
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default DropdownSelect