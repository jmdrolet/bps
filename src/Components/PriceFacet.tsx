import {useEffect, useState, FunctionComponent, useContext} from 'react';
import {
  buildNumericFacet,
  buildNumericRange,
  NumericFacet as HeadlessNumericFacet,
  NumericFacetValue,
} from '@coveo/headless';
import EngineContext from '../common/engineContext';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import { Divider, ListItem, ListItemText, Typography } from '@material-ui/core';
 
interface NumericFacetProps {
  controller: HeadlessNumericFacet;
}
 
export const NumericFacetRenderer: FunctionComponent<NumericFacetProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);
 
  useEffect(() => controller.subscribe(() => setState(controller.state)), [
    controller,
  ]);

  if (!state.values.length) {
    return <div>No facet values</div>;
  }
 
  return (
    <Box mb={5} mr={3} p={1}>
      <Box pb={1}>
        <Typography variant="h6" component="h6">
          Price
        </Typography>
      </Box>
      <Divider />
      <List dense>
        {state.values.map((value: NumericFacetValue) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              style={{padding: 0}}
              key={value.start}
              role={undefined}
              button
              onClick={() => controller.toggleSelect(value)}
            >
              <Checkbox
                size="small"
                edge="start"
                checked={controller.isValueSelected(value)}
                tabIndex={-1}
                disableRipple
                inputProps={{'aria-labelledby': labelId}}
              />
              <ListItemText
                className="truncate inline"
                primary={`${value.start} - ${value.end}`}
                secondary={`(${value.numberOfResults})`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
 
const PriceFacet = () => {

  const engine = useContext(EngineContext)!;
  const controller: HeadlessNumericFacet  = buildNumericFacet(engine, {
    options: {
      field: 'ec_price',
      generateAutomaticRanges: false,
      currentValues: [ // Must be specified when `generateAutomaticRanges` is false.
        buildNumericRange({start: 0, end: 10}),
        buildNumericRange({start: 10, end: 50}),
        buildNumericRange({start: 50 , end: 1000}),
      ],
    },
  });
  return <NumericFacetRenderer controller={controller} />;
};

 export default PriceFacet;