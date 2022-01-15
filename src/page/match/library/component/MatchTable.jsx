import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { selectMatch } from '../../../../context/match/other/actions';
import { MatchContext } from '../../../../context/match/other/context';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { printDate } from '../../../../util/helper';
import { theme } from '../../../../theme';
const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1
    }
}))


const columns = [
	{ field: 'id', headerName: 'Id', hidden: true},
	{ field: 'title', headerName: 'Name', flex: 3 },
	{ field: 'date', headerName: 'Date', flex: 1 },
	{ field: 'mode',headerName: 'Game Mode',flex: 1},
	{ field: 'playerNums',	headerName: 'No. of Players',flex: 1},
];

const getRows = (matches) => {
	return matches.map((match, index) => {
		return {
			id: index,
			title: match.game.title,
			date: printDate(new Date(match.finishAt)),
			mode: 'Live',
			playerNums: match.players.length
		}
	})
}
  
const MatchTable = () => {
	const classes = useStyles()
	const navigate = useNavigate()
	const {matches, dispatch} = useContext(MatchContext)
	const handleSelectRows = (indexes) => {
		console.log(" indexes: ", indexes)
		if (indexes.length == 0 ) return 
		let match = matches[indexes[0]]
		dispatch(selectMatch(match))
		navigate('/match/detail/'+match._id, {replace: false})
	}
	return (
		<div style={{ height: theme.spacing(60), width: '100%', backgroundColor: 'white' }}>
			<DataGrid
				rows={getRows(matches)}
				columns={columns.filter((col) => col.hidden != true)}
				pageSize={Math.min(10, matches.length)}
				onSelectionModelChange={handleSelectRows}
				// checkboxSelection
			/>
		</div>
	);
}

export default MatchTable