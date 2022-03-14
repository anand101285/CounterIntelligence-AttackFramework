import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { sentenceCase } from 'change-case';
import Label from '../components/Label';

import { AuthContext } from '../context/auth-context';
// ----------------------------------------------------------------------

export default function User() {
  const [tokendata, settokendata] = useState([]);
  const [accessed, setaccessed] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [tableData, settableData] = useState([]);
  const dataArray = [];

  const auth = useContext(AuthContext);
  const { userId } = auth;

  const getTokendata = async () => {
    try {
      setisLoading(true);
      const response = await axios({
        url: `http://localhost:5000/api/database/tokens/${userId}`,
        method: 'GET'
      });

      settokendata(response.data);
      console.log('token:  ', response.data);
      const compromised = await axios({
        url: `http://localhost:5000/api/database/token/compromised/${userId}`,
        method: 'GET'
      });
      setaccessed(compromised.data);
      console.log('accessed:  ', compromised.data);
      setisLoading(false);
    } catch (err) {
      console.error(err);
      setisLoading(false);
    }
  };

  // const getTokendata = async () => {
  //   try {
  //     console.log('sending');
  //     axios({
  //       url: `http://localhost:5000/api/database/tokens/${userId}`,
  //       method: 'GET'
  //     }).then((response) => {
  //       console.log(response.data);
  //       response.data.map((data) => {
  //         const { type, ext, createdAt } = data;
  //         dataArray.push({
  //           name: 'Worddoc',
  //           type,
  //           ext,
  //           date: createdAt,
  //           UploadedOn: createdAt,
  //           accessed: 'Accessed'
  //         });
  //         return 0;
  //       });
  //       settokendata(dataArray);
  //     });
  //   } catch (err) {
  //     console.error(err.response.data);
  //   }
  // };

  const data = () => {
    let id;
    let type;
    let ext;
    let date;
    let access;
    let ip;
    Promise.all(
      tokendata.map(async (data) => {
        console.log(data);
        id = data._id;
        type = data.type;
        if (type === 'worddoc') ext = '.docs';
        else ext = '.xlsm';
        date = data.created_at;
        for (let i = 0; i < accessed.length; i += 1) {
          console.log('id:', id, ' acc:', accessed[i].token_id);
          if (id === accessed[i].token_id) {
            access = 'Accessed';
            ip = accessed[i].ip;
            break;
          } else {
            access = 'Not Accessed';
            ip = '-';
          }
        }

        dataArray.push({ id, type, ext, date, access, ip });
        console.log(id, type, ext, date, access, ip);
        // console.log(dataArray);
        return 0;
      })
    ).then((re) => {
      settableData(dataArray);
    });
  };

  useEffect(() => {
    getTokendata();
    console.log('hello i am here?');
  }, [userId]);

  useEffect(() => {
    data();
  }, [accessed]);
  return (
    <>
      {isLoading === true && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
            // alignItems: 'center'
            // alignContent: 'center'
          }}
        >
          <CircularProgress size={55} thickness={3} />
          <Typography variant="h6" sx={{ mt: 8, ml: -8 }}>
            Loading...
          </Typography>
        </Box>
      )}
      {isLoading === false && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tokenid</TableCell>
                <TableCell align="center">File Type</TableCell>
                <TableCell align="center">Extension</TableCell>
                <TableCell align="center">Uploaded on</TableCell>
                <TableCell align="center">Accessed</TableCell>
                <TableCell align="center">Hacker's Ip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data) => (
                <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {data.id}
                  </TableCell>
                  <TableCell align="center">{data.type}</TableCell>
                  <TableCell align="center">{data.ext}</TableCell>
                  <TableCell align="center">
                    {moment(data.date).format('YYYY-MM-DD HH:mm')}
                  </TableCell>
                  <TableCell align="center">
                    <Label
                      variant="ghost"
                      color={(data.access === 'Accessed' && 'error') || 'success'}
                    >
                      {sentenceCase(data.access)}
                    </Label>
                  </TableCell>
                  <TableCell align="center">{data.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
