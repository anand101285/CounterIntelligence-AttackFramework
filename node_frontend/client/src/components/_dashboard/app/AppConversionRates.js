import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [6, 10, 50, 30, 63, 57, 95, 50, 59, 45, 12] }];

export default function AppConversionRates() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    stroke: {
      dashArray: 10
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        '01/01/2022',
        '02/01/2022',
        '03/01/2022',
        '04/01/2022',
        '05/01/2022',
        '06/01/2022',
        '07/01/2022',
        '08/01/2022',
        '09/01/2022',
        '10/01/2022',
        '11/01/2022'
      ]
    }
  });

  return (
    <Card sx={{ width: 734 }}>
      <CardHeader title="Attack Summary" subheader="" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
