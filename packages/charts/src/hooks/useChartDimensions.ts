import { ResizeObserver } from '@juggle/resize-observer';
import * as React from 'react';

interface ChartDimensions {
  width?: number;
  height?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}

interface CombinedChartDimensions extends Required<ChartDimensions> {
  boundedHeight: number;
  boundedWidth: number;
}

const combineChartDimensions = (dimensions: ChartDimensions) => {
  const parsedDimensions = {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    width: 0,
    height: 0,
    ...dimensions,
  };

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom,
      0,
    ),
    boundedWidth: Math.max(
      parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight,
      0,
    ),
  } as CombinedChartDimensions;
};

function useChartDimensions(
  settings: ChartDimensions,
): [React.MutableRefObject<Element | null>, CombinedChartDimensions] {
  const ref = React.useRef<Element | null>(null);
  const dimensions = combineChartDimensions(settings);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (dimensions.width && dimensions.height) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (Array.isArray(entries) && entries.length) {
        const entry = entries[entries.length - 1];
        setWidth(entry.contentRect.width);
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(element);

    /* eslint-disable-next-line consistent-return */
    return () => {
      resizeObserver.disconnect();
    };

    // TODO: Prevent this from running too frequently
  }, [dimensions, height, width]);

  if (dimensions.width && dimensions.height) {
    return [ref, dimensions];
  }

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
}

export default useChartDimensions;
