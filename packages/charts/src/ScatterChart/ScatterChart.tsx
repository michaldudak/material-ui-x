import React from 'react';
import { useForkRef } from '@mui/material/utils';
import ChartContext from '../ChartContext';
import useChartDimensions from '../hooks/useChartDimensions';
import useTicks from '../hooks/useTicks';
import getScale from '../utils/getScale';
import { getExtent, getMaxDataSetLength, stringRatioToNumber } from '../utils';

interface ChartData<X, Y> {
  x: X;
  y: Y;
}

interface Margin {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}

export interface ScatterChartProps<X = unknown, Y = unknown> {
  /**
   * The content of the component.
   */
  children: React.ReactNode;
  /**
   * The data to use for the chart.
   */
  data: ChartData<X, Y>[] | ChartData<X, Y>[][];
  /**
   * The fill color to use for the chart area.
   */
  fill?: string;
  /**
   * The height of the chart.
   */
  height?: number;
  /**
   * If true, the markers will be highlighted when the mouse is over them.
   */
  highlightMarkers?: boolean;
  /**
   * Invert the line and fill colors of the point markers.
   */
  invertMarkers?: boolean;
  /**
   * The label to display above the chart.
   */
  label?: string;
  /**
   * The color of the label.
   * @default 'currentColor'
   */
  labelColor?: string;
  /**
   * The font size of the label.
   * @default 18
   */
  labelFontSize?: number;
  /**
   * The margin to use.
   * Labels and axes fall within these margins.
   */
  margin?: Margin;
  /**
   * The shape of the markers.
   * If auto, the shape will be based on the data series.
   */
  markerShape?:
    | 'auto'
    | 'circle'
    | 'cross'
    | 'diamond'
    | 'square'
    | 'star'
    | 'triangle'
    | 'wye'
    | 'none';
  /**
   * The size of the markers.
   */
  markerSize?: number;
  /**
   * The ratio of the height to the width of the chart.
   * @default 0.5
   */
  ratio?: string | number;
  /**
   * The maximum number of pixels per tick.
   */
  tickSpacing?: number;
  /**
   * Override the calculated domain of the x axis.
   */
  xDomain?: string[];
  /**
   * The key to use for the x axis.
   * @default 'x'
   */
  xKey?: string;
  /**
   * The scale type to use for the x axis.
   * @default 'linear'
   */
  xScaleType?: 'linear' | 'time' | 'log' | 'point' | 'pow' | 'sqrt' | 'utc';
  /**
   * Override the calculated domain of the y axis.
   */
  yDomain?: string[];
  /**
   * The key to use for the y axis.
   * @default 'y'
   */
  yKey?: string;
  /**
   * The scale type to use for the y axis.
   * @default 'linear'
   */
  yScaleType?: 'linear' | 'time' | 'log' | 'point' | 'pow' | 'sqrt' | 'utc';
  /**
   * Override the calculated domain of the z axis.
   */
  zDomain?: string[];
  /**
   * The key to use for the z axis.
   * If `null`, the z axis will not be displayed.
   * @default 'z'
   */
  zKey?: string;
}

type ScatterChartComponent = <X, Y>(
  props: ScatterChartProps<X, Y> & React.RefAttributes<SVGSVGElement>,
) => JSX.Element;

const ScatterChart = React.forwardRef(function ScatterChart<X = unknown, Y = unknown>(
  props: ScatterChartProps<X, Y>,
  ref: React.Ref<SVGSVGElement>,
) {
  const {
    children,
    data,
    fill = 'none',
    height: heightProp,
    invertMarkers = false,
    label,
    labelColor = 'currentColor',
    labelFontSize = 18,
    margin: marginProp,
    markerShape = 'circle',
    ratio: ratioProp,
    tickSpacing = 50,
    xDomain: xDomainProp,
    xKey = 'x',
    xScaleType = 'linear',
    yDomain: yDomainProp = [0],
    yKey = 'y',
    yScaleType = 'linear',
    zDomain: zDomainProp,
    zKey = 'z',
    ...other
  } = props;

  const margin = { top: 40, bottom: 40, left: 50, right: 30, ...marginProp };
  const ratio = typeof ratioProp === 'string' ? stringRatioToNumber(ratioProp) : ratioProp || 0.5;
  const chartSettings = {
    marginTop: margin.top,
    marginBottom: margin.bottom,
    marginLeft: margin.left,
    marginRight: margin.right,
  };

  const [chartRef, dimensions] = useChartDimensions(chartSettings);
  const handleRef = useForkRef(chartRef, ref);
  const { width, height, boundedWidth, boundedHeight, marginLeft, marginTop } = dimensions;

  // TODO: handle cases for stacked data (extract into a different component?)
  // @ts-ignore
  const xDomain = getExtent(data, (d) => d[xKey], xDomainProp);
  // @ts-ignore
  const yDomain = getExtent(data, (d) => d[yKey], yDomainProp);
  // @ts-ignore
  const zDomain = getExtent(data, (d) => d[zKey], zDomainProp);
  const xRange = [0, boundedWidth];
  const yRange = [0, boundedHeight];
  const maxXTicks = getMaxDataSetLength(data) - 1;

  // TODO: handle cases where xDomain / yDomain are [undefined, undefined]
  // @ts-ignore
  const xScale = getScale(xScaleType, xDomain, xRange);
  // @ts-ignore
  const yScale = getScale(yScaleType, yDomain, yRange);
  const xTicks = useTicks({
    maxTicks: maxXTicks,
    tickSpacing,
    scale: xScale,
  });
  const yTicks = useTicks({
    scale: yScale,
    tickSpacing,
    maxTicks: 999,
  });
  const chartHeight = heightProp || width * ratio;

  return (
    <ChartContext.Provider
      value={{
        data,
        dimensions,
        invertMarkers,
        markerShape,
        xScale,
        yScale,
        zDomain,
        xKey,
        xTicks,
        yKey,
        yTicks,
        zKey,
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        ref={handleRef}
        {...other}
        style={{ width: '100%', height: chartHeight }}
      >
        <rect width={width} height={height} fill={fill} rx="4" />
        <g transform={`translate(${[marginLeft, marginTop].join(',')})`}>
          <g>{children}</g>
        </g>
        {label && (
          <text
            fill={labelColor}
            transform={`translate(${width / 2}, ${50 - labelFontSize})`}
            fontSize={labelFontSize}
            textAnchor="middle"
          >
            {label}
          </text>
        )}
      </svg>
    </ChartContext.Provider>
  );
}) as ScatterChartComponent;

export default ScatterChart;
