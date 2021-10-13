---
title: Pie chart
---

# Pie chart

<p class="description">Grab a slice!</p>

## Basic pie chart

{{"demo": "pages/components/charts/pie-chart/BasicPieChart.js"}}

## Expanding pie chart

Use the `expandOnHover` prop to allow a segment to expand when hovered.
The `labelRadius` prop can be used to adjust the label position. Remember to allow sufficient margin for the expanded segment and/or the label.

{{"demo": "pages/components/charts/pie-chart/ExpandingPieChart.js"}}

## Donut chart

You can use the `innerRadius` prop to create a donut.

{{"demo": "pages/components/charts/pie-chart/DonutChart.js"}}

## Partial donut chart

You can use the `startAngle`, `endAngle` and `fill` props to creat a dial.

{{"demo": "pages/components/charts/pie-chart/PartialDonutChart.js"}}

## API

- [PieChart](/api/data-grid/pie-chart-props/)
