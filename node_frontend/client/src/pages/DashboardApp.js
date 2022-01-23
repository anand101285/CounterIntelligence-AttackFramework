import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
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
  const [isLoading, setisLoading] = useState(false);
  // const [docx, setdocx] = useState(0);
  // const [xlsm, setexcel] = useState(0);

  const auth = useContext(AuthContext);
  console.log('this is my userid', auth.userId);
  const { userId } = auth;

  useEffect(() => {
    getComp();
    // getaccessed();
  }, [userId]);

  const getComp = async () => {
    setisLoading(true);
    try {
      console.log('sending');
      const response = await axios({
        url: `http://localhost:5000/api/database/tokens/stats/${userId}`,
        method: 'GET'
      });
      console.log(response.data);
      setcomp(response.data);
      setisLoading(false);
      // console.log(comp);
    } catch (err) {
      setisLoading(false);
      console.error(err.response.data);
    }
  };

  // const getaccessed = async () => {
  //   setisLoading(true);
  //   try {
  //     console.log('sending');
  //     const response = await axios({
  //       url: `http://localhost:5000/api/database/token/compromised/${userId}`,
  //       method: 'GET'
  //     });
  //     console.log('accessed', response.data);
  //     setaccessed(response.data);
  //     setisLoading(false);
  //     // console.log(comp);
  //   } catch (err) {
  //     setisLoading(false);
  //     console.error(err.response.data);
  //   }
  // };

  // const setdocsState = () => {
  //   setdocx(comp.docx);
  // };

  // const setexcelState = () => {
  //   setexcel(comp.xlsm);
  // };

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        {isLoading === false && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits docx={comp.docx || 0} excel={comp.xlsm || 0} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports num={accessed.total || 0} />
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
