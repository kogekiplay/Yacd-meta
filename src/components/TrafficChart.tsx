import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { State } from '~/store/types';

import { fetchData } from '../api/traffic';
import useLineChart from '../hooks/useLineChart';
import { chartJSResource, chartStyles, commonDataSetProps } from '../misc/chart';
import { getClashAPIConfig, getSelectedChartStyleIndex } from '../store/app';
import { connect } from './StateProvider';

const { useMemo } = React;

const chartWrapperStyle: React.CSSProperties = {
  // make chartjs chart responsive
  justifySelf: 'center',
  position: 'relative',
  width: '100%',
  height: '200px',
  borderTop: '2px solid #fafafa',
};

const canvasWrapperStyle = {
  width: '100%',
  height: '100%',
  padding: '10px',
  backgroundColor: 'rgb(26 26 26)',
};

const mapState = (s: State) => ({
  apiConfig: getClashAPIConfig(s),
  selectedChartStyleIndex: getSelectedChartStyleIndex(s),
});

export default connect(mapState)(TrafficChart);

function TrafficChart({ apiConfig, selectedChartStyleIndex }) {
  const ChartMod = chartJSResource.read();
  const traffic = fetchData(apiConfig);
  const { t } = useTranslation();
  const data = useMemo(
    () => ({
      labels: traffic.labels,
      datasets: [
        {
          ...commonDataSetProps,
          ...chartStyles[selectedChartStyleIndex].up,
          label: t('Up'),
          data: traffic.up,
        },
        {
          ...commonDataSetProps,
          ...chartStyles[selectedChartStyleIndex].down,
          label: t('Down'),
          data: traffic.down,
        },
      ],
    }),
    [traffic, selectedChartStyleIndex, t]
  );

  useLineChart(ChartMod.Chart, 'trafficChart', data, traffic);

  return (
    <div style={chartWrapperStyle}>
      <canvas id="trafficChart" style={canvasWrapperStyle} />
    </div>
  );
}
