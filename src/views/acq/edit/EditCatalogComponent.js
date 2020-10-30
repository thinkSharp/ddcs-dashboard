import React, {useState} from 'react';
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


const EditCatalogComponent = ({ initVals, className, ...rest }) => {
    const classes = useStyles();
    const [resp, setResponse] = useState({});
    
    const initialValues = {
        producerName: initVals.producerName,
        producerDepartment: initVals.producerDepartment,
        producerEmail: initVals.producerEmail,
        producerContact: initVals.producerContact,
        catalogName: initVals.datasetName,
        catalogDescription: initVals.catalogDescription,
        accessModality: initVals.accessModality,
        dataFrequency: initVals.dataFrequency,
    }
    const validationSchema = Yup.object().shape(
        {
            producerName: Yup.string().required('Data Producer Name is required!'),
            producerDepartment: Yup.string().required('Data Producer Department is required!'),
            producerEmail: Yup.string().email('Invalid Email address!').required('Email address is required'),
            producerContact: Yup.string().required('required!'),
            catalogName: Yup.string().required('required!'),
            catalogDescription: Yup.string().required('required!'),
            accessModality: Yup.string().required('required!'),
            dataFrequency: Yup.string().required('required!'),

        }
    )

    const onSubmit= (values) => {

        console.log(values)

        
        const url = 'https://ec12jexz30.execute-api.us-east-1.amazonaws.com/poc_v2/catalog/register'
        axios.post(url, JSON.stringify(values))
        .then(function (response) {
            setResponse(response.data)
            console.log(resp);
        })
        .catch(function (error) {
            setResponse({respMsg:true, success:false, message:error})
            console.log(resp);
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
                            {resp.respMsg && <CardHeader title={resp.message} />}
                            <CardHeader title='Update Catalog' />
                            <Divider />
                            <CardHeader subheader='Catalog Producer Info : ' />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.producerName && formik.errors.producerName)}
                                         helperText={formik.touched.producerName && formik.errors.producerName}
                                         label = 'Producer Name *'
                                         name = 'producerName'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.producerName}
                                         variant='outlined' />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.producerDepartment && formik.errors.producerDepartment)}
                                         helperText={formik.touched.producerDepartment && formik.errors.producerDepartment}
                                         label = 'Producer Department *'
                                         name = 'producerDepartment'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.producerDepartment}
                                         variant='outlined' />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.producerEmail && formik.errors.producerEmail)}
                                         helperText={formik.touched.producerEmail && formik.errors.producerEmail}
                                         label = 'Producer Email *'
                                         name = 'producerEmail'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.producerEmail}
                                         variant='outlined' />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.producerContact && formik.errors.producerContact)}
                                         helperText={formik.touched.producerContact && formik.errors.producerContact}
                                         label = 'Producer Contact No *'
                                         name = 'producerContact'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.producerContact}
                                         variant='outlined' />
                                    </Grid>
                                </Grid>
                                &nbsp;<br />
                                <Divider />
                                <CardHeader subheader='Catalog Info' />
                                <Divider />
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.catalogName && formik.errors.catalogName)}
                                         helperText={formik.touched.catalogName && formik.errors.catalogName}
                                         label = 'Catalog Name *'
                                         name = 'catalogName'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         margin='normal'
                                         value={formik.values.catalogName}
                                         variant='outlined' />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <TextField fullWidth multiline
                                            error={Boolean(formik.touched.catalogDescription && formik.errors.catalogDescription)}
                                            helperText={formik.touched.catalogDescription && formik.errors.catalogDescription} 
                                            rows={2}
                                            variant='outlined'
                                            label='Catalog Description *'
                                            name='catalogDescription'
                                            margin='normal'
                                            onChange = {formik.handleChange}
                                            onBlur ={formik.handleBlur}
                                            value={formik.values.catalogDescription}/>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.accessModality && formik.errors.accessModality)}
                                         helperText={formik.touched.accessModality && formik.errors.accessModality}
                                         label = 'Access Modality *'
                                         name = 'accessModality'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         value={formik.values.accessModality}
                                         select
                                         margin='normal'
                                         SelectProps={{native: true}}
                                         variant='outlined'>
                                             <option key='' value=''></option>
                                             <option key='db' value='database'>Database</option>
                                             <option key='sftp' value='sftp'>SFTP</option>
                                             <option key='network' value='network'>Network Folder</option>
                                             <option key='s3' value='s3'>S3</option>

                                         </TextField>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <TextField fullWidth
                                         error={Boolean(formik.touched.dataFrequency && formik.errors.dataFrequency)}
                                         helperText={formik.touched.dataFrequency && formik.errors.dataFrequency}
                                         label = 'Data Frequency *'
                                         name = 'dataFrequency'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         value={formik.values.dataFrequency}
                                         select
                                         margin='normal'
                                         SelectProps={{native: true}}
                                         variant='outlined'>
                                            <option key='' value=''></option>
                                            <option key='oneTime' value='oneTime'>One Time</option>
                                             <option key='daily' value='daily'>Daily</option>
                                             <option key='weekly' value='weekly'>Weekly</option>
                                             <option key='monthly' value='monthly'>Montly</option>
                                             <option key='yearly' value='yearly'>Yearly</option>

                                         </TextField>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
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

EditCatalogComponent.propTypes = {
  className: PropTypes.string
};

export default EditCatalogComponent;

