import { createAsset } from 'use-asset';

import prettyBytes from './pretty-bytes';
export const chartJSResource = createAsset(() => {
  return import('~/misc/chart-lib');
});

export const commonDataSetProps = { borderWidth: 1, pointRadius: 0, tension: 0.2, fill: true };

export const commonChartOptions: import('chart.js').ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { labels: { boxWidth: 20 } },
  },
  scales: {
    x: { display: false, type: 'category' },
    y: {
      type: 'linear',
      display: true,
      grid: {
        display: true,
        color: '#555',
        drawTicks: false,
      },
      border: {
        dash: [3, 6],
      },
      ticks: {
        maxTicksLimit: 5,
        callback(value: number) {
          return prettyBytes(value) + '/s ';
        },
      },
    },
  },
};

export const chartStyles = [
  {
    down: {
      backgroundColor: 'rgba(251, 138, 170, 0.8)',
      borderColor: 'rgb(251, 138, 170)',
    },
    up: {
      backgroundColor: 'rgba(138, 251, 219, 0.8)',
      borderColor: 'rgb(138, 251, 219)',
    },
  },
  {
    up: {
      backgroundColor: 'rgba(245,78,162,0.6)',
      borderColor: 'rgba(245,78,162,1)',
    },
    down: {
      backgroundColor: 'rgba(123,59,140,0.6)',
      borderColor: 'rgba(66,33,142,1)',
    },
  },
  {
    up: {
      backgroundColor: 'rgba(94, 175, 223, 0.3)',
      borderColor: 'rgb(94, 175, 223)',
    },
    down: {
      backgroundColor: 'rgba(139, 227, 195, 0.3)',
      borderColor: 'rgb(139, 227, 195)',
    },
  },
  {
    up: {
      backgroundColor: 'rgba(242, 174, 62, 0.3)',
      borderColor: 'rgb(242, 174, 62)',
    },
    down: {
      backgroundColor: 'rgba(69, 154, 248, 0.3)',
      borderColor: 'rgb(69, 154, 248)',
    },
  },
];
