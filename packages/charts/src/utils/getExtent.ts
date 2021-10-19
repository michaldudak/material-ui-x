import * as d3 from 'd3';

/**
 * Returns the extend (min and max values) of a data set.
 * If more than one set of data (nested arrays, or objects with an accessor),
 * merge them to find extent across all sets.
 * const mydata=[{data: [1,2,3]},{data: [4,5,6]}];
 * getExtent(mydata, d => d.data.length);
 * => [1, 6]
 * getExtent(mydata, d => d.data.length, [3, 4]);
 * => [3, 4]
 * getExtent(mydata, d => d.data.length, [0]);
 * => [0, 6]
 * If a yDomain with two values is passed in, return it.
 * If a yDomain with one value is passed in, use the value as the start of the extent.
 * This is useful to allow the scale to start at zero (or some arbitrary value)
 */
export function getExtent<TRecord = unknown, T extends d3.Numeric = number>(
  data: TRecord[] | TRecord[][],
  accessor: (d: TRecord) => T,
  yDomain?: [T] | [T, T],
): [T, T] | [undefined, undefined] {
  if (yDomain && yDomain.length === 2) {
    return yDomain;
  }

  // eslint-disable-next-line prefer-spread
  const extent = d3.extent<TRecord, T>(data.flat() as TRecord[], accessor);
  if (yDomain && yDomain.length === 1) {
    extent[0] = yDomain[0];
  }

  return extent;
}
