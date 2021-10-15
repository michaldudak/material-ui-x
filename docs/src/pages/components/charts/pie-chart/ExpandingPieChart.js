import React from 'react';
import * as d3 from 'd3';
import { deepPurple } from '@mui/material/colors';
import PieChart from '@mui/charts/PieChart';

const labels = 'Ford Tesla GM VW BMW Audi'.split(' ');

function generateData() {
  const numSegments = d3.randomInt(3, 7)();

  return d3.range(numSegments).map((i) => ({
    value: d3.randomNormal(numSegments, 2)(),
    fill: deepPurple[Object.keys(deepPurple)[i]],
    stroke: deepPurple[Object.keys(deepPurple)[i + 1]],
    label: labels[i],
  }));
}

export default function ExpaindingPieChart() {
  const data = generateData();

  return (
    <PieChart
      data={data}
      cornerRadius={8}
      expandOnHover
      label="Car sales"
      margin={{ top: 80, bottom: 40 }}
      segmentLabelRadiusPercent={110}
      innerRadiusPercent={4}
      sort="ascending"
      padAngle={1}
    />
  );
}
