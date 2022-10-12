import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { TableSortLabel } from '@mui/material';

const Rankings = ({data, switchPosition}) => {
	
    const [rowData, setRowData] = useState(data);
    const [orderDirection, setOrderDirection] = useState("desc");

    const sortArray = (arr, orderBy, prop) => {
        switch (orderBy) {
          case "asc":
          default:
            return arr.sort((a, b) =>
              a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0
            );
          case "desc":
            return arr.sort((a, b) =>
              a[prop] < b[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
            );
        }
      };
       
    const handleSortRequest = (prop) => {
        setRowData(sortArray(data, orderDirection, prop));
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };


    const dataProp = switchPosition ? 'driver' : 'team';
    const imageProp = switchPosition ? 'image' : 'logo';

    return (
        <>
            {data && 
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" onClick={() => handleSortRequest('position')}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    Position
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Logo</TableCell>
                            <TableCell align="center" onClick={() => handleSortRequest('points')}>
                                <TableSortLabel active={true} direction={orderDirection}>
                                    Points
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.position}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{row.position}</TableCell>
                            {row[dataProp] && <TableCell align="right">{row[dataProp].name}</TableCell>}
                            {row[dataProp] && <TableCell align="right"><img src={row[dataProp][imageProp]} alt="team"/></TableCell>}
                            <TableCell align="right">{row.points}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            }
        </>
    )
}

export default Rankings;