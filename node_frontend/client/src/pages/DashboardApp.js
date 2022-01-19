import axios from 'axios';
import { useEffect, useState } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [comp, setcomp] = useState('');

  useEffect(() => {
    getComp();
  }, []);

  const getComp = () => {
    try {
      console.log('sending');
      axios({
        url: 'http://localhost:5000/api/database/tokenaccess/count',
        method: 'GET'
      }).then((response) => {
        // console.log(response.data.num_of_access);
        setcomp(response.data);
        // console.log(comp);
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports num={comp} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
