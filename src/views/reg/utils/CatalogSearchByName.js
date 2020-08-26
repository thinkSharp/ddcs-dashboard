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

const CatalogSearchByName = ({ className, title, onResult, ...rest }) => {
    const classes = useStyles();


    const initialValues = {
        dataCatalogName: '',
    }

    const validationSchema = Yup.object().shape(
        {
            dataCatalogName: Yup.string().required('Data Catalog Name is required!'),
        }
    )

    const onSubmit= (values) => {
        onResult ({found: true, key: values.dataCatalogName, description: 'hello testing 123'})
    }

    return (
        <Formik 
         initialValues= {initialValues} validationSchema={validationSchema} onSubmit={onSubmit}
        >
            {
                (formik) => (
                    <Form>
                        <Card>
                            <CardHeader title={title} />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                    <TextField fullWidth
                                         error={Boolean(formik.touched.dataCatalogName && formik.errors.dataCatalogName)}
                                         helperText={formik.touched.dataCatalogName && formik.errors.dataCatalogName}
                                         label = 'Select Data Catalog *'
                                         name = 'dataCatalogName'
                                         onChange = {formik.handleChange}
                                         onBlur ={formik.handleBlur}
                                         value={formik.values.dataCatalogName}
                                         select
                                         margin='normal'
                                         SelectProps={{native: true}}
                                         variant='outlined'>
                                             <option key='' value=''>Select Data Catalog *</option>
                                             <option key='db' value='database'>Database</option>
                                             <option key='sftp' value='sftp'>SFTP</option>
                                             <option key='sharepoint' value='sharepoint'>Sharepoint</option>
                                             <option key='s3' value='s3'>S3</option>

                                         </TextField>
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
                                            type='submit' 
                                            disabled={!formik.isValid}
                                        >
                                            Submit
                                        </Button>
                                        </Box>
                                                </Grid>
                                    </Grid>
                            </CardContent>
                            <Divider />
                        </Card>
                    </Form>
                )
            }
        </Formik>
    )

};

CatalogSearchByName.propTypes = {
  className: PropTypes.string
};

export default CatalogSearchByName;
