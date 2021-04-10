import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { Subject } from '../../../models/Student';
import { orderArrayByDate } from '../../../util/dates';
import Paper from '../../Styled/Paper';
import { ThemeType } from '../../Styled/Theme';

const Graph = styled(Paper)<{ theme: ThemeType }>`
  height: 40%;
  position: relative;
  max-width: 100%;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.12);
  z-index: 6;
  pointer-events: all;
  margin: 0 1rem;
  background: ${(props) => props.theme.paper2};
  cursor: default;
`;

const MSDGraph = ({ subject }: { subject: Subject }) => {
  const marks = {
    values: orderArrayByDate(subject.marks)
      .reverse()
      .map((mark) => mark.value),
    dates: orderArrayByDate(subject.marks)
      .reverse()
      .map((mark) => mark.date?.toLocaleDateString()),
  };
  const data = {
    labels: marks.dates,
    datasets: [
      {
        data: marks.values,
        fill: false,
        pointBorderWidth: 5,
        spanGaps: true,
        borderWidth: 2,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: '#ff5050',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
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

export default MSDGraph;
