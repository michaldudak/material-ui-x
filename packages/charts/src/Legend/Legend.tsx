import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import ChartContext from '../ChartContext';
import { getSymbolIndex } from '../utils';

function Legend(props) {
  const {
    dimensions: { boundedHeight, boundedWidth },
    invertMarkers,
    seriesMeta,
  } = useContext(ChartContext) as any;

  const {
    labelColor = '#777',
    labelFontSize = 12,
    markerSize = 30,
    spacing = 50,
    position = 'top',
  } = props;

  return (
    <g
      transform={`translate(${boundedWidth / 2 - (Object.keys(seriesMeta).length * spacing) / 2}, ${
        position === 'top' ? 0 : boundedHeight + 68
      })`}
      style={{ pointerEvents: 'none' }}
    >
      {seriesMeta &&
        Object.keys(seriesMeta).map((series) => {
          const { label, stroke } = seriesMeta[series];
          let { fill, markerShape } = seriesMeta[series];

          if (!markerShape || markerShape === 'none') {
            markerShape = 'circle';
          }

          // fill is not always defined for line charts
          if (!fill || fill === 'none') {
            fill = stroke;
          }

          return (
            <React.Fragment key={series}>
              <path
                // @ts-ignore TODO: Fix me
                d={d3.symbol(d3.symbols[getSymbolIndex(markerShape, series)], markerSize)()}
                fill={invertMarkers ? stroke : fill}
                stroke={invertMarkers ? fill : stroke}
                // @ts-ignore TODO: Fix me
                transform={`translate(${series * spacing - markerSize / 5}, -4)`}
              />
              <text
                fill={labelColor}
                // @ts-ignore TODO: Fix me
                transform={`translate(${series * spacing}, 0)`}
                fontSize={labelFontSize}
                // textAnchor="middle"
              >
                {label}
              </text>
            </React.Fragment>
          );
        })}
    </g>
  );
}

Legend.propTypes /* remove-proptypes */ = {
  /**
   * The color of the label.
   */
  labelColor: PropTypes.string,
  /**
   * The font size of the label.
   */
  labelFontSize: PropTypes.number,
  /**
   * The size of the markers in the legend.
   */
  markerSize: PropTypes.number,
  /**
   * The position of the legend in the chart.
   * @default 'top'
   */
  position: PropTypes.oneOf(['top', 'bottom']),
  /**
   * The spacing between the legend items.
   * @default 50
   */
  spacing: PropTypes.number,
};

export default Legend;
