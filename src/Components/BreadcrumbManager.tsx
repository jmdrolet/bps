import {useEffect, useState, FunctionComponent, useContext} from 'react';
import {BreadcrumbManager as HeadlessBreadcrumbManager, buildBreadcrumbManager} from '@coveo/headless';
import EngineContext from '../common/engineContext';  
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import './BreadcrumbManager.css';
import { makeStyles } from '@material-ui/core';
 
interface BreadcrumbManagerProps {
  controller: HeadlessBreadcrumbManager;
}
 
const useStyles = makeStyles({
    root: {
      background: '#213629',
      "&:hover, &:focus": {
        background: '#213629'
      },
      marginRight: 3,
      marginBottom: 3,
      borderRadius: 22,
      fontSize: 14,
      border: 0,
      color: 'white',
    },
    label: {
        textTransform: 'none',
    }
  });

const BreadcrumbManagerRenderer: FunctionComponent<BreadcrumbManagerProps> = (
  props
) => {
  const classes = useStyles();
  const {controller} = props;
  const [state, setState] = useState(controller.state);
 
  useEffect(() => controller.subscribe(() => setState(controller.state)), []);
 
  if (!state?.hasBreadcrumbs) {
    return null;
  }
 
  return (
    <Box>
      {state.facetBreadcrumbs.map((facet) => (
        <Box key={facet.facetId}>
          {facet.values.map((breadcrumb) => (
            <Button
            variant="contained"
            color="secondary"
            classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            onClick={() => breadcrumb.deselect()}
            endIcon={<ClearIcon />}
          >
            {breadcrumb.value.value}
          </Button>

            // <button
            //   key={breadcrumb.value.value}
            //   onClick={() => breadcrumb.deselect()}
            // >
            //   {breadcrumb.value.value}
            // </button>
          ))}
        </Box>
      ))}
    </Box>
  );
};
 
const BreadcrumbManager = () => {
    const engine = useContext(EngineContext)!;
    const controller = buildBreadcrumbManager(engine);
    return <BreadcrumbManagerRenderer controller={controller} />;
};
export default BreadcrumbManager;