
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { API } from 'aws-amplify';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

const RegistrySearch = ({ className, ...rest }) => {
    const classes = useStyles();


    const initialValues = {
        datasetName: '',
        datasetVersion: '',
    }
    const validationSchema = Yup.object().shape(
        {
            datasetName: Yup.string().required('required!')
        }
    )

    async function makeAPICall(values) {
        const apiName = 'DDCS'; // replace this with your api name.
        const path = '/registry/view'; //replace this with the path you have configured on your API
        const myInit = {
            body: { values }, // replace this with attributes you need
            headers: {"Access-Control-Allow-Origin" : "*" }
            //headers: {'Content-Type':'multipart/form-data', 'Accept':'*/*'}, // OPTIONAL
        };
        
        return API
                .get(apiName, path, myInit)
                .then(response => {
                console.log(response)
                })
                .catch(error => {
                console.log(error.response);
                });
    }

    const onSubmit= (values) => {
        console.log(values)

        //const promise = makeAPICall(values);
        //promise.then(response => console.log(response)).catch(error => console.log(error))
        var axios = require('axios');

        var config = {
        method: 'get',
        url: 'https://ec12jexz30.execute-api.us-east-1.amazonaws.com/poc_v2/registry/view',
        //headers: { 'Accept':'**','Cache-Control':'no-cache' }
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
            console.log(JSON.stringify(error));
        });

        
    }

    return (
        <Formik 
         initialValues= {initialValues} validationSchema={validationSchema} onSubmit={onSubmit}
        >
            {
                (formik) => (
                    <Form>
                        <Card>
                            <CardHeader title='Search Catalog Registry' />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                    <TextField fullWidth
                                         error={Boolean(formik.touched.datasetName && formik.errors.datasetName)}
                                         helperText={formik.touched.datasetName && formik.errors.datasetName}
                                         label = 'Select Dataset Name *'
                                         name = 'datasetName'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         value={formik.values.datasetName}
                                         select
                                         margin='normal'
                                         SelectProps={{native: true}}
                                         variant='outlined'>
                                            <option key='' value=''>Select Dataset Name *</option>
                                            <option key='1' value='1'>One</option>
                                         </TextField>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <TextField fullWidth
                                         label = 'Select Dataset Version *'
                                         name = 'datasetVersion'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         value={formik.values.datasetVersion}
                                         select
                                         margin='normal'
                                         SelectProps={{native: true}}
                                         variant='outlined'>
                                             <option key='' value=''>Select Dataset Version *</option>
                                             <option key='2' value='2'>Two</option>

                                         </TextField>
                                    </Grid>
                                </Grid>
                                
                            </CardContent>
                            <Divider />
                                <Box
                                display="flex"
                                justifyContent="flex-end"
                                p={2}
                                >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Search
                                </Button>
                                </Box>
                        </Card>
                    </Form>
                )
            }
        </Formik>
    )

};

RegistrySearch.propTypes = {
  className: PropTypes.string
};

export default RegistrySearch;
