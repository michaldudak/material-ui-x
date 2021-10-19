import * as React from 'react';
import * as d3 from 'd3';
import { useForkRef } from '@mui/material/utils';
import ChartContext from '../ChartContext';
import useChartDimensions from '../hooks/useChartDimensions';
import useStackedArrays from '../hooks/useStackedArrays';
import useTicks from '../hooks/useTicks';
import getScale from '../utils/getScale';
import useThrottle from '../hooks/useThrottle';
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

export interface BarChartProps<X = unknown, Y = unknown> {
  /**
   * The content of the component.
   */
  children: React.ReactNode;
  /**
   * The data to use for the chart.
   */
  data: ChartData<X, Y>[] | ChartData<X, Y>[][];
  /**
   * The fill color to use for the bar.
   */
  fill?: string;
  /**
   * The height of the chart.
   */
  height?: number;
  /**
   * The keys to use when stacking the data.
   */
  keys?: string[];
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
   * The ratio of the height to the width of the chart.
   * @default 0.5
   */
  ratio?: string | number;
  /**
   * The maximum number of pixels between tick marks.
   */
  tickSpacing?: number;
  /**
   * The series labels. Used in the tooltip.
   */
  seriesLabels?: string[];
  /**
   * If `true`, the data will be stacked.
   * @default false
   */
  stacked?: boolean;
  /**
   * Override the calculated domain of the x axis.
   */
  xDomain?: string[];
  /**
   * The padding between the bars.
   * @default 10
   */
  padding: number;
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
   *  @default 'linear'
   */
  yScaleType?: 'linear' | 'time' | 'log' | 'point' | 'pow' | 'sqrt' | 'utc';
}

type BarChartComponent = <X, Y>(
  props: BarChartProps<X, Y> & React.RefAttributes<SVGSVGElement>,
) => JSX.Element;

const BarChart = React.forwardRef(function BarChart<X = unknown, Y = unknown>(
  props: BarChartProps<X, Y>,
  ref: React.Ref<SVGSVGElement>,
) {
  const {
    keys,
    children,
    data: dataProp,
    fill = 'none',
    height: heightProp,
    label,
    labelColor = 'currentColor',
    labelFontSize = 18,
    margin: marginProp,
    ratio: ratioProp,
    tickSpacing = 40,
    seriesLabels = [],
    stacked = false,
    xDomain: xDomainProp,
    xKey = 'x',
    xScaleType = 'linear',
    yDomain: yDomainProp = [0],
    yKey = 'y',
    yScaleType = 'linear',
    padding = 10,
    ...other
  } = props;

  let data = dataProp;

  // TODO: Correct types and remove `any`
  const stackedData = useStackedArrays(dataProp as any);
  if (stacked) {
    if (keys) {
      const stackGen = d3.stack().keys(keys);
      // @ts-ignore TODO: Fix me
      data = stackGen(dataProp);
    } else {
      // @ts-ignore TODO: Fix me
      data = stackedData;
    }
  }

  const margin = { top: 40, bottom: 40, left: 50, right: 30, ...marginProp };
  const ratio = typeof ratioProp === 'string' ? stringRatioToNumber(ratioProp) : ratioProp || 0.5;

  const chartSettings = {
    marginTop: margin.top,
    marginRight: margin.right,
    marginBottom: margin.bottom,
    marginLeft: margin.left,
  };
  const [chartRef, dimensions] = useChartDimensions(chartSettings);
  const handleRef = useForkRef(chartRef, ref);
  const [seriesMeta, setSeriesMeta] = React.useState([]);
  const { width, height, boundedWidth, boundedHeight, marginLeft, marginTop } = dimensions;

  // TODO: handle cases for stacked data (extract into a different component?)
  // @ts-ignore
  const xDomain = getExtent(data, (d) => d[xKey], xDomainProp);
  // @ts-ignore
  const yDomain = getExtent(data, (d) => d[yKey], yDomainProp);
  const xRange = [padding * 4, boundedWidth - 4 * padding];
  const yRange = [0, boundedHeight];
  const maxXTicks = getMaxDataSetLength(data) - 1;

  // TODO: handle cases where xDomain / yDomain are [undefined, undefined]
  // @ts-ignore
  const xScale = getScale(xScaleType, xDomain, xRange);
  // @ts-ignore
  const yScale = getScale(yScaleType, yDomain, yRange);

  const xTicks = useTicks({
    scale: xScale,
    tickSpacing,
    maxTicks: maxXTicks,
  });
  const yTicks = useTicks({
    scale: yScale,
    tickSpacing,
    maxTicks: 999,
  });

  const [mousePosition, setMousePosition] = React.useState({
    x: -1,
    y: -1,
  });

  const handleMouseMove = useThrottle((event) => {
    setMousePosition({
      x: event.nativeEvent.offsetX - marginLeft,
      y: event.nativeEvent.offsetY - marginTop,
    });
  });

  const handleMouseOut = () => {
    setMousePosition({
      x: -1,
      y: -1,
    });
  };
  const chartHeight = heightProp || width * ratio;

  return (
    <ChartContext.Provider
      value={{
        keys,
        data,
        dimensions,
        seriesLabels,
        stacked,
        mousePosition,
        padding,
        xKey,
        xScale,
        xScaleType,
        xTicks,
        yKey,
        yScale,
        yScaleType,
        yTicks,
        seriesMeta,
        setSeriesMeta,
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        ref={handleRef}
        {...other}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
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
}) as BarChartComponent;

export default BarChart;
