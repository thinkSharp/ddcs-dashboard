
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

    const onSubmit= (values) => {
        alert('Form data', values)
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
