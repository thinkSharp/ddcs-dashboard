
import React, { useState, useEffect } from 'react';
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
    const [datasets, setDatasets] = useState({});
    const [datasetNames, setDatasetNames] = useState([])

    useEffect(() => {
        console.log('displaying data')
        queryDb('', '', 'ScanForNameAndVersion')
        .then(function (response) {
            console.log("In useEffect" + response);
            setDatasets(response);
            
            console.log(datasets);
            for (const item of datasets.entries()) {
                console.log(item)
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log(JSON.stringify(error));
        });
    }, [datasetNames])

    const initialValues = {
        datasetName: '',
        datasetVersion: '',
    }

    const loadValues = {
        datasetName: '',
        datasetVersion: ''
    }
    const validationSchema = Yup.object().shape(
        {
            datasetName: Yup.string().required('required!')
        }
    )

    const queryDb = (datasetName, version, queryType) => {
        const url = 'https://ec12jexz30.execute-api.us-east-1.amazonaws.com/poc_v2/registry/view'
        let config = {
            method: 'get',
            url: url,
            params: {
                datasetName: datasetName,
                version: version,
                queryType: queryType
            }
        };

        return axios(config)
            .then(function (response) {
            const data = JSON.stringify(response.data)
            console.log("From queryDb" + data);
            return data;
        })
    }

    const onSubmit= (values) => {
        console.log(values)

        const queryType = values.datasetVersion == '' ? 'QueryByName' : 'QueryByNameAndVersion';
        const data = queryDb(values.dataSetNames, values.datasetVersion, queryType)

        console.log(data)
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
