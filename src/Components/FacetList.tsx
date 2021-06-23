import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Facet from './Facet';

const FacetList = () => {
  return (
    <Box>
      <Box px={1} pb={1}>
        <Typography variant="overline">FILTER BY</Typography>
        <Facet field="category" title="Categories" />
        <Facet field="currentoffers" title="Current Offers" />
        <Facet field="type" title="Type" />
        <Facet field="brand" title="Brand" />
        <Facet field="shoe_size" title="Shoe size" />
        
      </Box>
    </Box>
  );
};

export default FacetList;
