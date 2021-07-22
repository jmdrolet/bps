import React, {useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SearchBox from './SearchBox';
import QuerySummary from './QuerySummary';
import ResultList from './ResultList';
import Pager from './Pager';
import Sort from './Sort';
import FacetList from './FacetList';
import ResultsPerPage from './ResultsPerPage';
import DidYouMean from './DidYouMean';
import BreadcrumbManager from './BreadcrumbManager';
import {AnalyticsActions, SearchActions, Engine} from '@coveo/headless';
import {EngineProvider} from '../common/engineContext';
import { loadSearchConfigurationActions } from '@coveo/headless';
import { CardActions } from '@material-ui/core';
import { bindUrlManager } from './UrlManager';

interface ISearchPageProps {
  engine: Engine;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const {engine} = props;
  useEffect(() => {
    const {dispatch} = engine;
    const action = SearchActions.executeSearch(
      AnalyticsActions.logInterfaceLoad()
    );
    const searchConfigurationActionCreators = loadSearchConfigurationActions(engine); 
    const searchConfigurationAction = searchConfigurationActionCreators.updateSearchConfiguration({pipeline: 'BassPro', searchHub: 'BassPro'})
    bindUrlManager(engine);
    dispatch(searchConfigurationAction);
    dispatch(action);
   ;
  }, [engine]);

  return (
    <EngineProvider value={engine}>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item md={8}>
            <SearchBox />
          </Grid>
        </Grid>

        <Box my={4}>
          <Grid container>
            <Grid item md={3} sm={12}>
              <BreadcrumbManager/>
              <FacetList />
            </Grid>
            <Grid item md={9} sm={12}>
              <Box pl={3}>
                <Grid container alignItems="flex-end">
                  <Grid item md={10}>
                    <DidYouMean />
                    <QuerySummary />
                  </Grid>
                  <Grid item md={2}>
                    <Sort />
                  </Grid>
                </Grid>
                <ResultList />
              </Box>
              <Box my={4}>
                <Grid container>
                  <Grid item md={6}>
                    <Pager />
                  </Grid>
                  <Grid item md={6}>
                    <ResultsPerPage />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </EngineProvider>
  );
};

export default SearchPage;
