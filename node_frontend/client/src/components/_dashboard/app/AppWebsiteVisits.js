import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Total Tokens',
    type: 'column',
    data: [50, 45, 200, 90, 85, 100, 120, 110, 145, 67]
  },
  {
    name: 'Recon Token',
    type: 'area',
    data: [44, 35, 100, 60, 22, 43, 25, 60, 56, 27, 28]
  },
  {
    name: 'Macro Embedded Tokens',
    type: 'area',
    data: [6, 10, 100, 30, 63, 57, 95, 50, 59, 118, 39]
  }
];

export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'gradient'] },
    labels: [
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
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} created`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Token Summary" subheader="" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
