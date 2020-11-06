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

const DeleteCatalogComponent = ({ className,catalogId, ...rest }) => {
    const [resp, setResponse] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [loadValues, setLoadValues] = useState({});
    const [rows, setRows] = useState(0)
    
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
            setLoadValues(res.data[0])
            setRows([...initialValues, catalog])
            
        })
        .catch(err =>{
            console.log(err)
        })

    },[])


    console.log("In Edit:" + catalogId);


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

    const onSubmit= () => {

        const msg = {  'catalog_name': catalogId}
        const url = 'https://ec12jexz30.execute-api.us-east-1.amazonaws.com/poc_v2/catalog/register/retire'
        axios.post(url, JSON.stringify(msg))
        .then(function (response) {
            setResponse(response.data)
            console.log(resp);
        })
        .catch(function (error) {
            setResponse({respMsg:true, success:false, message:error})
            console.log(resp);
        });
    }

    const onSubmitLoadData = () => {
        console.log("Printing initial value:")
            console.log(rows)
        setInitialValues(
            {
                producerName: loadValues.producer,
                producerDepartment: loadValues.department,
                producerEmail: loadValues.email,
                producerContact: loadValues.contact,
                catalogName: loadValues.data_catalog,
                catalogDescription: loadValues.description,
                accessModality: loadValues.access,
                dataFrequency: loadValues.frequency,
            }
        )
    }

    

    return (
     
        <Card>
            <CardHeader title={'Retire Catalog: ' + catalogId} />
            <Divider ></Divider>
            <CardHeader subheader='Catalog Producer Info' />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <Typography>Producer Name: </Typography>
    <Typography>{initialValues.producerName}</Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Typography>Producer Department: </Typography>
    <Typography>{initialValues.producerDepartment}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                    <Typography>Producer Email: </Typography>
    <Typography>{initialValues.producerEmail}</Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <Typography>Producer Contact: </Typography>
    <Typography>{initialValues.producerContact}</Typography>
                                    </Grid>
                                    </Grid>

                                    &nbsp;<br />
                                <Divider />
                                <CardHeader subheader='Catalog Info' />
                                <Divider />
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                    <Typography>Catalog Name: </Typography>
    <Typography>{initialValues.catalogName}</Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <Typography>Catalog Description: </Typography>
    <Typography>{initialValues.catalogDescription}</Typography>
                                    </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                <Typography>Access Modality: </Typography>
    <Typography>{initialValues.accessModality}</Typography>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <Typography>Data Frequency: </Typography>
    <Typography>{initialValues.dataFrequency}</Typography>
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
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit" onClick={onSubmit}
                                >
                                    Retire Catalog
                                </Button>

                                
                                </Box>
        </Card>

    )

};

DeleteCatalogComponent.propTypes = {
  className: PropTypes.string
};

export default DeleteCatalogComponent;

