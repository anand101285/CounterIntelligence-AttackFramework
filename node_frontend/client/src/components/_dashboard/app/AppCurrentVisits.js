import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function AppCurrentVisits({ docx, excel }) {
  const CHART_DATA = [docx, excel];
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.primary.main,
      theme.palette.error.main
    ],
    labels: ['Recon', 'Macro'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          value: {
            show: true,
            formatter: (val) => val
          },
          total: {
            show: true,
            label: 'TOTAL',
            formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b)
          }
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Recents" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
