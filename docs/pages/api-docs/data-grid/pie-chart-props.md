# PieChartProps Interface

<p class="description"></p>

## Import

```js
import { PieChartProps } from '@mui/x-data-grid-pro';
// or
import { PieChartProps } from '@mui/x-data-grid';
```

## Properties

| Name                                                                                                   | Type                                                   | Default                                                | Description                                                           |
| :----------------------------------------------------------------------------------------------------- | :----------------------------------------------------- | :----------------------------------------------------- | :-------------------------------------------------------------------- |
| <span class="prop-name">data</span>                                                                    | <span class="prop-type">ChartData[]</span>             |                                                        | The data to use for the chart.                                        |
| <span class="prop-name optional">expandOnHover<sup><abbr title="optional">?</abbr></sup></span>        | <span class="prop-type">boolean</span>                 | <span class="prop-default">false<br /></span>          | If true, the segment will expand when hovered                         |
| <span class="prop-name optional">innerRadius<sup><abbr title="optional">?</abbr></sup></span>          | <span class="prop-type">number</span>                  |                                                        | The radius at which to start the inside of the segment.               |
| <span class="prop-name optional">label<sup><abbr title="optional">?</abbr></sup></span>                | <span class="prop-type">string</span>                  |                                                        | The label to display above the chart.                                 |
| <span class="prop-name optional">labelColor<sup><abbr title="optional">?</abbr></sup></span>           | <span class="prop-type">string</span>                  | <span class="prop-default">'currentColor'<br /></span> | The color of the label.                                               |
| <span class="prop-name optional">labelFontSize<sup><abbr title="optional">?</abbr></sup></span>        | <span class="prop-type">number</span>                  | <span class="prop-default">18<br /></span>             | The font size of the label.                                           |
| <span class="prop-name optional">margin<sup><abbr title="optional">?</abbr></sup></span>               | <span class="prop-type">Margin</span>                  |                                                        | The margin to use around the chart.                                   |
| <span class="prop-name optional">radius<sup><abbr title="optional">?</abbr></sup></span>               | <span class="prop-type">number</span>                  |                                                        | The radius of the pie chart.                                          |
| <span class="prop-name optional">segmentLabelColor<sup><abbr title="optional">?</abbr></sup></span>    | <span class="prop-type">string</span>                  | <span class="prop-default">'currentColor'<br /></span> | The color of the segment labels.                                      |
| <span class="prop-name optional">segmentLabelFontSize<sup><abbr title="optional">?</abbr></sup></span> | <span class="prop-type">number</span>                  | <span class="prop-default">'12'<br /></span>           | The font size of the segment labels.                                  |
| <span class="prop-name optional">segmentLabelRadius<sup><abbr title="optional">?</abbr></sup></span>   | <span class="prop-type">number</span>                  |                                                        | The radius at which to place the segment label.                       |
| <span class="prop-name optional">sort<sup><abbr title="optional">?</abbr></sup></span>                 | <span class="prop-type">ascending \| descending</span> |                                                        | The sort order for the segments.                                      |
| <span class="prop-name optional">startAngle<sup><abbr title="optional">?</abbr></sup></span>           | <span class="prop-type">number</span>                  |                                                        | The angle in degrees from which to start rendering the first segment. |
