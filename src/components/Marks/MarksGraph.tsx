import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Store from '../../models/store';
import Paper from '../Styled/Paper';

const Graph = styled(Paper)`
  height: 40vh;
  position: relative;
  max-width: 100%;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.12);
`;

const MarksGraph = () => {
  const subjects = useSelector((store: Store) => store.student.subjects).filter(
    (s) => s.avg
  );

  const data = {
    labels: subjects.map((s) => s.name),
    datasets: [
      {
        label: 'Totale',
        data: subjects.map((s) => (s.avg.total !== 0 ? s.avg.total : null)),
        fill: false,
        pointBorderWidth: 5,
        spanGaps: true,
        borderWidth: 2,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: '#ff5050',
      },
      {
        label: 'Primo Periodo',
        data: subjects.map((s) => (s.avg.first !== 0 ? s.avg.first : null)),
        fill: false,
        pointBorderWidth: 2,
        spanGaps: true,
        borderWidth: 1,
        backgroundColor: 'rgba(225, 99, 132, 0.1)',
        borderColor: '#FFCE50',
      },
      {
        label: 'Secondo Periodo',
        data: subjects.map((s) => (s.avg.second !== 0 ? s.avg.second : null)),
        fill: false,
        pointBorderWidth: 2,
        spanGaps: true,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: '#FF8F50',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: { display: false },
        },
      ],
      yAxes: [
        {
          gridLines: { color: 'rgba(141, 141, 141, 0.3)' },
          ticks: {
            max: 10,
            stepSize: 1,
          },
        },
      ],
    },
  };

  return (
    <Graph>
      <Line data={data} options={options} />
    </Graph>
  );
};

export default MarksGraph;
