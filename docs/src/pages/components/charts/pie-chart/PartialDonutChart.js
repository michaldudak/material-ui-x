import React from 'react';
import { teal } from '@mui/material/colors';
import PieChart from '@mui/charts/PieChart';

const data = [
  {
    value: 2,
    fill: teal[100],
  },
  {
    value: 1,
    fill: 'transparent',
  },
];

export default function PartialDonutChart() {
  return (
    <PieChart
      data={data}
      innerRadiusPercent={60}
      cornerRadius={8}
      startAngle={-120}
      endAngle={120}
      fill="rgba(128, 128, 128, 0.2)"
      innerLabel="66%"
    />
  );
}
