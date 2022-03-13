import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// components
import Page from '../components/Page';
import {
  AppBugReports,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates
} from '../components/_dashboard/app';

import { AuthContext } from '../context/auth-context';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [comp, setcomp] = useState('');
  const [accessed, setaccessed] = useState('');
  const [generated, setgenerated] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [docx, setdocx] = useState(0);
  const [xlsm, setexcel] = useState(0);

  const auth = useContext(AuthContext);
  const { userId } = auth;

  useEffect(() => {
    gettokendata();
    // getgenerated();
    // getaccessed();
  }, [userId]);

  const gettokendata = async () => {
    setisLoading(true);
    try {
      const tokens = await axios({
        url: `http://localhost:5000/api/database/tokens/stats/${userId}`,
        method: 'GET'
      });
      setcomp(tokens.data);
      const compromised = await axios({
        url: `http://localhost:5000/api/database/token/generated/${userId}`,
        method: 'GET'
      });
      setaccessed(compromised.data.num_of_access);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
    }
  };

  // const getaccessed = async () => {
  //   setisLoading(true);
  //   try {

  //     setisLoading(false);
  //   } catch (err) {
  //     setisLoading(false);
  //     console.error(err);
  //   }
  // };

  // const getgenerated = async () => {
  //   console.log('Hello there');
  //   setisLoading(true);
  //   try {
  //     console.log('sending');
  //     const GeneratedToken = await axios({
  //       url: `http://localhost:5000/api/database/token/generated/${userId}`,
  //       method: 'GET'
  //     });
  //     console.log('I am here !!!!');
  //     console.log('generated', GeneratedToken.data);
  //     setgenerated(GeneratedToken.data);
  //     setisLoading(false);
  //   } catch (err) {
  //     setisLoading(false);
  //     console.error(err);
  //   }
  // };

  // const getaccessed = async () => {
  //   setisLoading(true);
  //   try {
  //     console.log('sending accessed request ');
  //     const response = await axios({
  //       url: `http://localhost:5000/api/database/tokenaccess/count`,
  //       method: 'GET'
  //     });
  //     console.log('accessed', response.data);
  //     setaccessed(response.data.num_of_access);
  //     setisLoading(false);
  //   } catch (err) {
  //     setisLoading(false);
  //     console.error(err);
  //   }
  // };

  const setdocsState = () => {
    setdocx(comp.docx);
  };

  const setexcelState = () => {
    setexcel(comp.xlsm);
  };

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits docx={comp.docx || 0} excel={comp.xlsm || 0} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports num={accessed || 0} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
