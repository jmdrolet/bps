import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Facet from './Facet';
import PriceFacet from './PriceFacet';

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
        <Facet field="clothing_size" title="Clothing Size" />
        <Facet field="retailstoreinventory" title="Inventory" />
        <Facet field="color" title="Color" />
        <Facet field="type" title="Type" />
        <PriceFacet />
      </Box>
    </Box>
  );
};

export default FacetList;
