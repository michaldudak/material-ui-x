import * as d3 from 'd3';
import { Scale } from '../Scale';

// TODO: handle point scales

function getScale<DomainType extends d3.NumberValue, RangeType>(
  scaleType: Exclude<Scale, 'point'>,
  domain: [DomainType] | [DomainType, DomainType],
  range: [RangeType] | [RangeType, RangeType],
) {
  switch (scaleType) {
    case 'log':
      return d3.scaleLog(domain, range);
    case 'pow':
      return d3.scalePow(domain, range);
    case 'sqrt':
      return d3.scaleSqrt(domain, range);
    case 'time':
      return d3.scaleTime(domain, range);
    case 'utc':
      return d3.scaleUtc(domain, range);
    case 'linear':
      return d3.scaleLinear(domain, range);
    default:
      throw new Error(`Unsupported scale type: ${scaleType}`);
  }
}

export default getScale;
