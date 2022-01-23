import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// ----------------------------------------------------------------------

export default function User() {
  const [tokendata, settokendata] = useState([]);
  const dataArray = [];

  const getTokendata = () => {
    try {
      console.log('sending');
      axios({
        url: 'http://localhost:5000/api/database/tokens/all',
        method: 'GET'
      }).then((response) => {
        console.log(response.data);
        response.data.map((data) => {
          const { type, ext, createdAt } = data;
          dataArray.push({
            name: 'Worddoc',
            type,
            ext,
            date: createdAt,
            UploadedOn: createdAt,
            accessed: 'Accessed'
          });
          return 0;
        });
        settokendata(dataArray);
        // console.log(comp);
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    getTokendata();
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">File Type</TableCell>
            <TableCell align="right">Extension</TableCell>
            <TableCell align="right">Uploaded on</TableCell>
            <TableCell align="right">Compromised</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokendata.map((data) => (
            <TableRow key={data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell align="right">{data.type}</TableCell>
              <TableCell align="right">{data.ext}</TableCell>
              <TableCell align="right">{data.UploadedOn}</TableCell>
              <TableCell align="right">{data.accessed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
