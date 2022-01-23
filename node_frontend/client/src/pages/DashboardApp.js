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
  const auth = useContext(AuthContext);
  console.log('this is my userid', auth.userId);
  const { userId } = auth;

  useEffect(() => {
    getComp();
  }, [userId]);

  const getComp = () => {
    try {
      console.log('sending');
      axios({
        url: `http://localhost:5000/api/database/tokens/${userId}`,
        method: 'GET'
      }).then((response) => {
        console.log(response.data);
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
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits docx={comp.length} excel={10} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports num={comp.length} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
