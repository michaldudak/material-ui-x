import * as d3 from 'd3';

/**
 * Given an array of arrays, return an array with the min value for each element in the array.
 * @example [ [1,6,8], [2,4,9], [3,5,7] ] => [1,4,7]
 */
export function minFromArray(array: number[][]) {
  return array[0].map((_, index) => d3.min(array.map((row) => row[index])));
}

/**
 * Given an array of arrays, return an array with the max value for each element in the array.
 * @example [ [1,6,8], [2,4,9], [3,5,7] ] => [3,6,9]
 */
export function maxFromArray(array: number[][]) {
  return array[0].map((_, index) => d3.max(array.map((row) => row[index])));
}

export function getMaxDataSetLength(data: unknown[] | unknown[][]) {
  if (Array.isArray(data[0])) {
    return d3.max(data as unknown[][], (dataSet: unknown[]) => dataSet.length) ?? 0;
  }

  return data.length;
}

/**
 * Finds objects in an array or nested arrays that match the given key/value
 */
export function findObjects(array, key, value) {
  if (Array.isArray(array[0])) {
    // eslint-disable-next-line prefer-spread
    array = [].concat.apply([], array);
  }
  return array.filter((obj) => obj[key].toString() === value.toString());
}
