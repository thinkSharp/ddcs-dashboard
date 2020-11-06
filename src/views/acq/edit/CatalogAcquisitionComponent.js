import React, {useState, useEffect} from 'react';
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
  makeStyles,
  Typography
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
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



const AcquireCatalogComponent = ({ className,catalogId, ...rest }) => {
    const classes = useStyles();
    const [resp, setResponse] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [defaultValues, setDefaultValues] = useState({
        catalogName: '',
        accessModility: '',
        databaseConnectionString: '',
        databaseSqlQuery: '',
        sftpHost: '',
        sftpPort: '',
        sftpUser: '',
        sftpPwd: '',
        networkPath: '',
        s3BucketUrl: '',
        fileName: '',
        datasetAccessValidationResult: false,
        datasetAccessValidationErrorMsg: '',
        sampleFile: ''
    });
    const [rows, setRows] = useState([])
    

    const onSubmitLoadData = () => {
        console.log("Printing initial value:")
            console.log(rows)
        setInitialValues(
            {
                producerName: initialValues.producer,
                producerDepartment: initialValues.department,
                producerEmail: initialValues.email,
                producerContact: initialValues.contact,
                catalogName: initialValues.data_catalog,
                catalogDescription: initialValues.description,
                accessModality: initialValues.access,
                dataFrequency: initialValues.frequency,
            }
        )

        setDefaultValues({ ...defaultValues, catalogName: catalogId})
    }

    const datasetTypeRandering = (formik) =>{
        let html;
        const select = formik.values.accessModility
        if (select === 'database'){
            html = <CardContent>
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
                        Test Database connection
                    </Button>
                    </Box>
                </Grid>
            </Grid>
            </CardContent>
        }
        else if (select === 'sftp'){
            html = <CardContent>
                <Grid container spacing={3}>
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
            </CardContent>
        }
        else if (select === 'network') {
            html = <CardContent>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField fullWidth
                    error={Boolean(formik.touched.networkPath && formik.errors.networkPath)}
                    helperText={formik.touched.networkPath && formik.errors.networkPath}
                    label = 'Network Path *'
                    name = 'networkPath'
                    onChange = {formik.handleChange}
                    onBlur ={formik.handleBlur}
                    margin='normal'
                    value={formik.values.networkPath}
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
                        Test Network connection
                    </Button>
                    </Box>
                </Grid>
            </Grid>
            </CardContent>
        }
        else if (select === 's3') {
            html = <CardContent>
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
            </CardContent>
        }
        return html
    }

    useEffect(() =>{
        axios
        .get(`https://ec12jexz30.execute-api.us-east-1.amazonaws.com/poc_v2/catalog/view?queryType=QueryByName&&catalog_name=` + catalogId)
        .then( res => {
            console.log("Received data from api gateway")
            console.log(res.data)
            let temp = res.data
            console.log("temp:" )
            console.log(temp)
            let temp2 = temp[0]
            console.log(temp2)
            const catalog = {
                producerName: temp2.producer,
                producerDepartment: temp2.department,
                producerEmail: temp2.email,
                producerContact: temp2.contact,
                catalogName: temp2.data_catalog,
                catalogDescription: temp2.description,
                accessModality: temp2.access,
                dataFrequency: temp2.frequency,
            }
            console.log(catalog)
            setInitialValues(res.data[0])
            setRows([catalog])
            console.log("Printing initial value:")
            //console.log(rows)
        })
        .catch(err =>{
            console.log(err)
        })

    },[])


    console.log("In Edit:" + catalogId);


    

    const validationSchema = Yup.object().shape(
        {
            accessModility: Yup.string().required('required!'),
            databaseConnectionString: Yup.mixed().when('accessModility', {is: (val) => val ==='database', then: Yup.string().required('required!')}),
            databaseSqlQuery: Yup.mixed().when('accessModility',{is: (val) => val === 'database', then: Yup.string().required('required!')}),
            sftpHost: Yup.mixed().when('accessModility',{is: (val) => val === 'sftp', then: Yup.string().required('required!')}),
            sftpPort: Yup.mixed().when('accessModility',{is: (val) => val === 'sftp', then: Yup.string().required('required!')}),
            sftpUser: Yup.mixed().when('accessModility',{is: (val) => val === 'sftp', then: Yup.string().required('required!')}),
            sftpPwd: Yup.mixed().when('accessModility',{is: (val) => val === 'sftp', then: Yup.string().required('required!')}),
            networkPath: Yup.mixed().when('accessModility',{is: (val) => val === 'sharepoint', then: Yup.string().required('required!')}),
            s3BucketUrl: Yup.mixed().when('accessModility',{is: (val) => val === 's3', then: Yup.string().required('required!')})
        })

    const onSubmit= (values) => {

        console.log(values)
       
        const url = 'https://ec12jexz30.execute-api.us-east-1.amazonaws.com/poc_v2/catalog/update'
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
     <>
        <Card>
            <CardHeader title={'Setup Data Acquisition Catalog: ' + catalogId} />
            <Divider ></Divider>
            <CardHeader subheader='Catalog Info' />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <Typography>Producer Name: <b>{initialValues.producerName}</b></Typography>

                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Typography>Catalog Name: <b>{initialValues.catalogName}</b></Typography>
                                    </Grid>
                                </Grid>
                                
                                    &nbsp;<br />
                                <Divider />

                                <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                <Typography>Access Modality: <b>{initialValues.accessModality}</b></Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <Typography>Data Frequency: <b>{initialValues.dataFrequency}</b></Typography>
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
                                    type="submit" onClick={onSubmitLoadData}
                                >
                                    Load Data
                                </Button> &nbsp;
                            
                                </Box>
        </Card>
        <Formik 
         initialValues= {defaultValues} validationSchema={validationSchema} onSubmit={onSubmit}
         enableReinitialize={true}
        >
            {
                (formik) => (
                    <Form>
                        <Card>
                            <CardHeader title={'Catalog Acquisition Info: ' } />

                                <Divider />
                                <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField fullWidth
                                         error={Boolean(formik.touched.accessModility && formik.errors.accessModility)}
                                         helperText={formik.touched.accessModility && formik.errors.accessModility}
                                         label = 'Select Dataset Type *'
                                         name = 'accessModility'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         value={formik.values.accessModility}
                                         select
                                         margin='normal'
                                         SelectProps={{native: true}}
                                         variant='outlined'>
                                             <option key='' value=''>Select Dataset Type *</option>
                                             <option key='db' value='database'>Database</option>
                                             <option key='sftp' value='sftp'>SFTP</option>
                                             <option key='network' value='network'>Network Path</option>
                                             <option key='s3' value='s3'>S3</option>

                                         </TextField>
                                    </Grid>
                                </Grid>
                                </CardContent>
                            
                            {
                                    datasetTypeRandering(formik)
                            }
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
    </>
    )
};

AcquireCatalogComponent.propTypes = {
  className: PropTypes.string
};

export default AcquireCatalogComponent;

