import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import caution from '@iconify/icons-ant-design/exception-outlined';
// material
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: 'white',
  backgroundColor: '#ad2222'
  // color: theme.palette.error.darker,
  // backgroundColor: theme.palette.error.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundColor: '#ad0a0a',
  backgroundImage: 'white'
  // backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
  //   theme.palette.error.dark,
  //   0.24
  // )} 100%)`
}));

// ----------------------------------------------------------------------

// const TOTAL = 12;

const AppBugReports = ({ num }) => (
  <RootStyle>
    <IconWrapperStyle>
      <Icon icon={caution} width={24} height={24} />
    </IconWrapperStyle>
    <Typography variant="h3">{num}</Typography>

    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      Compromised Beacons
    </Typography>
  </RootStyle>
);

AppBugReports.propTypes = {
  num: PropTypes.number
};

export default AppBugReports;
