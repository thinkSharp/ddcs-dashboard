import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import RetireAcquisitationComponent from './RetireAcquisitationComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const DeleteAcquisition = () => {
    const classes = useStyles();
    const { catalogId } = useParams();


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
              <RetireAcquisitationComponent catalogId={catalogId} />

            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  };

export default DeleteAcquisition
