export type ChartSymbol = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

const symbolNames = 'circle cross diamond square star triangle wye'.split(/ /);

/**
 * Returns a either a defined shape, or based on the series if 'auto'
 */
export function getSymbolIndex(shape: ChartSymbol | 'auto', series = 0) {
  if (shape === 'auto') {
    return series % symbolNames.length;
  }

  return symbolNames.indexOf(shape) || 0;
}
