/**
 * Returns true if `num` is within `range` of `target`
 */
export function isInRange(num: number, target: number, range: number) {
  return Math.abs(num - target) <= range;
}

/**
 * Converts a ratio of string type to number
 * @example "1:2" => 0.5
 */
export function stringRatioToNumber(stringRatio: string) {
  const arr = stringRatio.split(':').map((value) => Number(value.trim()));
  const res = arr[0] / arr[1];
  return arr.length === 2 && typeof res === 'number' ? res : 0.5;
}
