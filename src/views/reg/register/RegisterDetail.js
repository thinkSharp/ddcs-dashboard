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
import axios from 'axios';


const api_gateway = 'https://ec12jexz30.execute-api.us-east-1.amazonaws.com/poc_v2/catalog/register'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

const RegisterDetails = ({ className, ...rest }) => {
    const classes = useStyles();

    
    const initialValues = {
        dataProducerName: '',
        dataProducerDepartment: '',
        dataProducerEmail: '',
        dataProducerContact: '',
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
        datasetGenerationFrequency: '',
        sampleFile: ''
    }
    const validationSchema = Yup.object().shape(
        {
            dataProducerName: Yup.string().required('Data Producer Name is required!'),
            dataProducerDepartment: Yup.string().required('Data Producer Department is required!'),
            dataProducerEmail: Yup.string().email('Invalid Email address!').required('Email address is required'),
            dataProducerContact: Yup.string().required('required!'),
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
        console.log(values)
        var header = {
            headers: { 'Content-Type': 'multipart/form-data' }
          };
        axios.post(api_gateway, values, header)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    const datasetTypeRandering = (formik) =>{
        let html;
        const select = formik.values.datasetType
        if (select === 'database'){
            html = <>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField fullWidth
                 error={Boolean(formik.touched.databaseConnectionString && formik.errors.databaseConnectionString)}
                 helperText={formik.touched.databaseConnectionString && formik.errors.databaseConnectionString}
                 label = 'Db Connection String *'
                 name = 'databaseConnectionString'
                 onChange = {formik.handleChange}
                 onBlur ={formik.handleBlur}
                 margin='normal'
                 value={formik.values.databaseConnectionString}
                 variant='outlined' />
                 </Grid>
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField fullWidth
                 error={Boolean(formik.touched.databaseSqlQuery && formik.errors.databaseSqlQuery)}
                 helperText={formik.touched.databaseSqlQuery && formik.errors.databaseSqlQuery}
                 label = 'SQL query *'
                 name = 'databaseSqlQuery'
                 onChange = {formik.handleChange}
                 onBlur ={formik.handleBlur}
                 margin='normal'
                 value={formik.values.databaseSqlQuery}
                 variant='outlined' />
            </Grid>
            </Grid>
            <Grid container spacing={3}>
    <Grid item  xs={12}>
                <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Test sftp connection
          </Button>
        </Box>
                </Grid>
    </Grid>
            </>
        }
        else if (select === 'sftp'){
            html = <><Grid container spacing={3}>
            <Grid item md={6} xs={12}>
                <TextField fullWidth
                 error={Boolean(formik.touched.sftpHost && formik.errors.sftpHost)}
                 helperText={formik.touched.sftpHost && formik.errors.sftpHost}
                 label = 'SFTP Host *'
                 name = 'sftpHost'
                 onChange = {formik.handleChange}
                 onBlur ={formik.handleBlur}
                 margin='normal'
                 value={formik.values.sftpHost}
                 variant='outlined' />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField fullWidth
                 error={Boolean(formik.touched.sftpPort && formik.errors.sftpPort)}
                 helperText={formik.touched.sftpPort && formik.errors.sftpPort}
                 label = 'SFTP Port *'
                 name = 'sftpPort'
                 onChange = {formik.handleChange}
                 onBlur ={formik.handleBlur}
                 margin='normal'
                 value={formik.values.sftpPort}
                 variant='outlined' />
            </Grid>
        </Grid>
        <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
            <TextField fullWidth
             error={Boolean(formik.touched.sftpUser && formik.errors.sftpUser)}
             helperText={formik.touched.sftpUser && formik.errors.sftpUser}
             label = 'SFTP User *'
             name = 'sftpUser'
             onChange = {formik.handleChange}
             onBlur ={formik.handleBlur}
             margin='normal'
             value={formik.values.sftpUser}
             variant='outlined' />
        </Grid>
        <Grid item md={6} xs={12}>
            <TextField fullWidth
             error={Boolean(formik.touched.sftpPwd && formik.errors.sftpPwd)}
             helperText={formik.touched.sftpPwd && formik.errors.sftpPwd}
             label = 'SFTP Password *'
             name = 'sftpPwd'
             onChange = {formik.handleChange}
             onBlur ={formik.handleBlur}
             margin='normal'
             value={formik.values.sftpPwd}
             variant='outlined' />
        </Grid>
    </Grid>
    <Grid container spacing={3}>
    <Grid item md={6} xs={12}>
                <Box
                                display="flex"
                                justifyContent="flex-end"
                                p={2}
                                >

                                    <TextField
                                        error={Boolean(formik.sampleFile && formik.errors.sampleFile)}
                                        helperText={formik.sampleFile && formik.errors.sampleFile}
                                        name='sampleFile'
                                        onChange={formik.handleChange}
                                        onBlur ={formik.handleBlur}
                                        value={formik.values.sampleFile}
                                        className={classes.input}
                                        id="contained-button-file"
                                        
                                        type="file"
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span">
                                        Select a file for extracting schema info 
                                        </Button>
                                    </label>
                                    <label>{formik.values.sampleFile}</label>
                                </Box>
                </Grid>
    <Grid item md={6} xs={12}>
                <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Test sftp connection
          </Button>
        </Box>
                </Grid>
    </Grid>
    </>
        }
        else if (select === 'sharepoint') {
            html = <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField fullWidth
                    error={Boolean(formik.touched.sharepointPath && formik.errors.sharepointPath)}
                    helperText={formik.touched.sharepointPath && formik.errors.sharepointPath}
                    label = 'Sharepoint Path *'
                    name = 'sharepointPath'
                    onChange = {formik.handleChange}
                    onBlur ={formik.handleBlur}
                    margin='normal'
                    value={formik.values.sharepointPath}
                    variant='outlined' />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
                <Box
                                display="flex"
                                justifyContent="flex-end"
                                p={2}
                                >

                                    <input
                                        
                                        className={classes.input}
                                        id="contained-button-file"
                                        
                                        type="file"
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span">
                                        Upload Sample File to Extract Schema 
                                        </Button>
                                    </label>
                                </Box>
                </Grid>
    <Grid item md={6} xs={12}>
                <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Test Sharepoint connection
          </Button>
        </Box>
                </Grid>
    </Grid>
            </>
        }
        else if (select === 's3') {
            html = <>
            <Grid container spacing={3}>
                <Grid item  xs={12}>
                    <TextField fullWidth
                    error={Boolean(formik.touched.s3BucketUrl && formik.errors.s3BucketUrl)}
                    helperText={formik.touched.s3BucketUrl && formik.errors.s3BucketUrl}
                    label = 'S3 bucket URL *'
                    name = 's3BucketUrl'
                    onChange = {formik.handleChange}
                    onBlur ={formik.handleBlur}
                    margin='normal'
                    value={formik.values.s3BucketUrl}
                    variant='outlined' />
                </Grid>
                </Grid>
                
            <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                <Box
                                display="flex"
                                justifyContent="flex-end"
                                p={2}
                                >

                                    <input
                                        
                                        className={classes.input}
                                        id="contained-button-file"
                                        
                                        type="file"
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span">
                                        Upload Sample File to Extract Schema 
                                        </Button>
                                    </label>
                                </Box>
                </Grid>
    <Grid item md={6} xs={12}>
                <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Test S3 Bucket connection
          </Button>
        </Box>
                </Grid>
    </Grid>   
            </>
        }
        return html
    }

    const datasetSourceRandering = (formik) => {
        let html;
        const select = formik.values.datasetSource
        if (select === 'ddcs') {
            html = <>
            <Grid item md={6} xs={12}>
                    <TextField fullWidth
                    error={Boolean(formik.touched.datasetPollingCronJob && formik.errors.datasetPollingCronJob)}
                    helperText={formik.touched.datasetPollingCronJob && formik.errors.datasetPollingCronJob}
                    label = 'Dataset Polling Cron job *'
                    name = 'datasetPollingCronJob'
                    onChange = {formik.handleChange}
                    onBlur ={formik.handleBlur}
                    margin='normal'
                    value={formik.values.datasetPollingCronJob}
                    variant='outlined' />
                </Grid>
            </>
        }
        else if (select === 'external') {
            html = <>
            <Grid item md={6} xs={12}>
                    <TextField fullWidth
                    error={Boolean(formik.touched.datasetGenerationFrequency && formik.errors.datasetGenerationFrequency)}
                    helperText={formik.touched.datasetGenerationFrequency && formik.errors.datasetGenerationFrequency}
                    label = 'Dataset Generation Frequency *'
                    name = 'datasetGenerationFrequency'
                    onChange = {formik.handleChange}
                    onBlur ={formik.handleBlur}
                    margin='normal'
                    value={formik.values.datasetGenerationFrequency}
                    variant='outlined' />
                </Grid>
            </>
        }
        return html
    }

    return (
        <Formik 
         initialValues= {initialValues} validationSchema={validationSchema} onSubmit={onSubmit}
        >
            {
                (formik) => (
                    <Form>
                        <Card>
                            <CardHeader title='Dataset Registration Form' />
                            <Divider />
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
                                         error={Boolean(formik.touched.dataProducerContact && formik.errors.dataProducerContact)}
                                         helperText={formik.touched.dataProducerContact && formik.errors.dataProducerContact}
                                         label = 'Data Producer Contact No *'
                                         name = 'dataProducerContact'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.dataProducerContact}
                                         variant='outlined' />
                                    </Grid>
                                </Grid>
                                &nbsp;<br />
                                <Divider />
                                <CardHeader subheader='Dataset Info' />
                                <Divider />
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.datasetName && formik.errors.datasetName)}
                                         helperText={formik.touched.datasetName && formik.errors.datasetName}
                                         label = 'Dataset Name *'
                                         name = 'datasetName'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.datasetName}
                                         variant='outlined' />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.datasetType && formik.errors.datasetType)}
                                         helperText={formik.touched.datasetType && formik.errors.datasetType}
                                         label = 'Select Dataset Type *'
                                         name = 'datasetType'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         value={formik.values.datasetType}
                                         select
                                         margin='normal'
                                         SelectProps={{native: true}}
                                         variant='outlined'>
                                             <option key='' value=''>Select Dataset Type *</option>
                                             <option key='db' value='database'>Database</option>
                                             <option key='sftp' value='sftp'>SFTP</option>
                                             <option key='sharepoint' value='sharepoint'>Sharepoint</option>
                                             <option key='s3' value='s3'>S3</option>

                                         </TextField>
                                    </Grid>
                                </Grid>
                                {
                                    datasetTypeRandering(formik)
                                }
                                &nbsp;<br />
                                <Divider />
                                <CardHeader subheader='Dataset Management' />
                                <Divider />
                                <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.datasetSource && formik.errors.datasetSource)}
                                         helperText={formik.touched.datasetSource && formik.errors.datasetSource}
                                         label = 'Select Dataset Source *'
                                         name = 'datasetSource'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         value={formik.values.datasetSource}
                                         select
                                         margin='normal'
                                         SelectProps={{native: true}}
                                         variant='outlined'>
                                             <option key='' value=''>Select Dataset Source *</option>
                                             <option key='ddcs' value='ddcs'>DDCS</option>
                                             <option key='external' value='external'>External</option>
                                             <option key='reference' value='reference'>Reference</option>

                                         </TextField>
                                    </Grid>
                                    
                                    {
                                    datasetSourceRandering(formik)
                                    }
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
                                    Save details
                                </Button>
                                </Box>
                        </Card>
                    </Form>
                )
            }
        </Formik>
    )

};

RegisterDetails.propTypes = {
  className: PropTypes.string
};

export default RegisterDetails;
