import * as d3 from 'd3';
import { Scale } from '../Scale';

function getScale<DomainType extends d3.NumberValue>(
  scaleType: Scale,
  domain: [DomainType] | [DomainType, DomainType],
  range: [number] | [number, number],
) {
  switch (scaleType) {
    case 'linear':
      return d3.scaleLinear(domain, range);
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
    case 'point':
      return d3.scalePoint(domain, range);
    default:
      throw new Error(`Unsupported scale type: ${scaleType}`);
  }
}

export default getScale;
