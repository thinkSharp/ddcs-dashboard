import React, { useState } from 'react';
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
import CatalogSearchByName from '../utils/CatalogSearchByName';


const useStyles = makeStyles(() => ({
  root: {}
}));

const ManagedDataCatalogProfile = ({ className, ...rest }) => {
    const classes = useStyles();

    const [displaySearchResult, setDisplaySearchResult] = useState(false)

    const initialValues = {
        searchResult: null,
        dataProducerName: '',
        dataProducerDepartment: '',
        dataProducerEmail: '',
        dataProducerApplicationName: '',
        datasetName: '',
        datasetType: '',
        databaseConnectionString: '',
        databaseSqlQuery: '',
        sftpHost: '',
        sftpPort: '',
        sftpUser: '',
        sftpPwd: '',
        sharepointPath: '',
        s3BucketUrl: '',
        fileName: '',
        datasetAccessValidationResult: false,
        datasetAccessValidationErrorMsg: '',
        datasetSource: '',
        datasetPollingCronJob: '',
        datasetGenerationFrequency: ''
    }
    const validationSchema = Yup.object().shape(
        {
            dataProducerName: Yup.string().required('Data Producer Name is required!'),
            dataProducerDepartment: Yup.string().required('Data Producer Department is required!'),
            dataProducerEmail: Yup.string().email('Invalid Email address!').required('Email address is required'),
            dataProducerApplicationName: Yup.string().required('required!'),
            datasetName: Yup.string().required('required!'),
            datasetType: Yup.string().required('required!'),
            databaseConnectionString: Yup.mixed().when('datasetType', {is: (val) => val ==='database', then: Yup.string().required('required!')}),
            databaseSqlQuery: Yup.mixed().when('datasetType',{is: (val) => val === 'database', then: Yup.string().required('required!')}),
            sftpHost: Yup.mixed().when('datasetType',{is: (val) => val === 'sftp', then: Yup.string().required('required!')}),
            sftpPort: Yup.mixed().when('datasetType',{is: (val) => val === 'sftp', then: Yup.string().required('required!')}),
            sftpUser: Yup.mixed().when('datasetType',{is: (val) => val === 'sftp', then: Yup.string().required('required!')}),
            sftpPwd: Yup.mixed().when('datasetType',{is: (val) => val === 'sftp', then: Yup.string().required('required!')}),
            sharepointPath: Yup.mixed().when('datasetType',{is: (val) => val === 'sharepoint', then: Yup.string().required('required!')}),
            s3BucketUrl: Yup.mixed().when('datasetType',{is: (val) => val === 's3', then: Yup.string().required('required!')}),
            datasetSource: Yup.string().required('required!'),
            datasetPollingCronJob: Yup.mixed().when('datasetSource', {is: (val) => val === 'ddcs', then: Yup.string().required('required!')}),
            datasetGenerationFrequency: Yup.mixed().when('datasetSource',{is: (val) => val === 'external', then: Yup.string().required('required!')})

        }
    )

    const onSubmit= (values) => {
        alert('Form data', values)
    }


    const searchResult = (result) => {
        let html;
        alert('Result Found', result)
        console.log('result', result)

        if(result.found)
        {
            console.log('found')
            html =
        <Formik 
         initialValues= {initialValues} validationSchema={validationSchema} onSubmit={onSubmit}
        >
            {
                (formik) => (
                    <>
                        <Form>
                        <Card>
                            <CardHeader subheader='Dataset Producer Info' />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.dataProducerName && formik.errors.dataProducerName)}
                                         helperText={formik.touched.dataProducerName && formik.errors.dataProducerName}
                                         label = 'Data Producer Name *'
                                         name = 'dataProducerName'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.dataProducerName}
                                         variant='outlined' />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.dataProducerDepartment && formik.errors.dataProducerDepartment)}
                                         helperText={formik.touched.dataProducerDepartment && formik.errors.dataProducerDepartment}
                                         label = 'Data Producer Department *'
                                         name = 'dataProducerDepartment'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.dataProducerDepartment}
                                         variant='outlined' />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.dataProducerEmail && formik.errors.dataProducerEmail)}
                                         helperText={formik.touched.dataProducerEmail && formik.errors.dataProducerEmail}
                                         label = 'Data Producer Email *'
                                         name = 'dataProducerEmail'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.dataProducerEmail}
                                         variant='outlined' />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.dataProducerApplicationName && formik.errors.dataProducerApplicationName)}
                                         helperText={formik.touched.dataProducerApplicationName && formik.errors.dataProducerApplicationName}
                                         label = 'Data Producer Application Name *'
                                         name = 'dataProducerApplicationName'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.dataProducerApplicationName}
                                         variant='outlined' />
                                    </Grid>
                                </Grid>
                                &nbsp;<br />
                                <Divider />

                                
                            </CardContent>
                        </Card>
                    </Form>
                    
                    </>
                )
            }
        </Formik>
        
        }
        console.log('html', html)
        setDisplaySearchResult(html)
    }

    return (
        <>
        
        <CatalogSearchByName title='View Data Profile for selected Data Catalog' onResult={searchResult}/>
        {displaySearchResult}
        </>
    )

};

ManagedDataCatalogProfile.propTypes = {
  className: PropTypes.string
};

export default ManagedDataCatalogProfile;

