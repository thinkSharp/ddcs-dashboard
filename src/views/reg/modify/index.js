import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import ModifyDetails from './ModifyDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));




const Modification = () => {
    const classes = useStyles();

    return (
      <Page
        className={classes.root}
        title="Account"
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={10}
              md={12}
              xs={12}
            >
              <ModifyDetails />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  };

export default Modification
