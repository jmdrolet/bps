import {FunctionComponent, useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {ListItem, Box, Typography, ListItemProps} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {
  buildResultList,
  Result,
  buildResultTemplatesManager,
  ResultTemplatesManager,
  ResultList as HeadlessResultList,
} from '@coveo/headless';
import './ResultList.css';
import EngineContext from '../common/engineContext';
import {ResultLink} from './ResultLink';
import { ProductThumbnail } from './ProductThumbnail';

type Template = (result: Result) => React.ReactNode;

interface FieldValueInterface {
  value: string;
  caption: string;
}


interface ResultListProps {
  controller: HeadlessResultList;
}
function ListItemLink(props: ListItemProps<'a'>) {
  return (
    <ListItem {...props} button component="a">
      <Typography variant="body1" color="primary">
        {props.title}
      </Typography>
    </ListItem>
  );
}

function FieldValue(props: FieldValueInterface) {
  return (
    <Box>
      <Typography
        color="textSecondary"
        style={{fontWeight: 'bold'}}
        variant="caption"
      >
        {props.caption}:&nbsp;
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {props.value}
      </Typography>
    </Box>
  );
}

const ResultListRenderer: FunctionComponent<ResultListProps> = (props) => {
  const {controller} = props;
  const engine = useContext(EngineContext)!;
  const [state, setState] = useState(controller.state);

  const headlessResultTemplateManager: ResultTemplatesManager<Template> = buildResultTemplatesManager(
    engine
  );

  headlessResultTemplateManager.registerTemplates({
    conditions: [],
    content: (result: any) => (

      <Grid item xs={6} spacing={4} sm={3}>
        <Box my={2}>
          <ProductThumbnail result={result}/>
  
          <Box pb={1}>
            <ResultLink result={result}/> 
          </Box>

      
          <Box pb={1}>
            {result.raw.ec_price && (
              <span className="product_price">${result.raw.ec_price}</span>
            )}
          </Box>

          <Box pb={1}>
          {result.raw.currentoffers && result.raw.currentoffers == "New" && (
            <span className="copy-badge">{result.raw.currentoffers}!</span>
          )}
          </Box>
          

          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="disabled" className="rating" value={result.raw.ec_rating} precision={0.5} disabled /><span>{result.raw.bvavgrating}</span>
          </Box>


        </Box>
      </Grid>
    ),
  });

  useEffect(() => controller.subscribe(() => setState(controller.state)), [
    controller,
  ]);

  return (
    <Grid container spacing={2}>
      {state.results.map((result: Result) => {
        const template = headlessResultTemplateManager.selectTemplate(result);
        return template ? template(result) : null;
      })}
    </Grid>
  );
};

const ResultList = () => {
  const engine = useContext(EngineContext)!;
  const controller = buildResultList(engine, {
    options: {
      fieldsToInclude: ['ec_thumbnails', 'ec_price', 'currentoffers', 'ec_rating', 'product_color', 'product_color_image'],
    }
  });
  return <ResultListRenderer controller={controller} />;
};

export default ResultList;
