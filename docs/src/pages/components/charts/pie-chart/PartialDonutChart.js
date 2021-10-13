import React from 'react';
import * as d3 from 'd3';
import { teal } from '@mui/material/colors';
import PieChart from '@mui/charts/PieChart';

const labels = ['Ford', 'Tesla'];

function generateData() {
  return [0, 1].map((i) => ({
    value: Math.abs(d3.randomNormal()()),
    fill: teal[Object.keys(teal)[i + 1]],
    stroke: 'white',
    label: labels[i],
  }));
}

export default function PartialDonutChart() {
  const data = generateData();

  return (
    <div style={{ width: '100%', height: 350 }}>
      <PieChart data={data} innerRadius={110} startAngle={-90} endAngle={90} />
    </div>
  );
}
