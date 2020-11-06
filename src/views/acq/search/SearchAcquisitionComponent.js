import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

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

const SearchAcquisitionComponent = ({ className, ...rest }) => {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [test, setTest] = useState('');

    useEffect(() =>{
        axios
        .get(`https://ec12jexz30.execute-api.us-east-1.amazonaws.com/poc_v2/catalog/view`)
        .then( res => {
            console.log("Received data from api gateway")
            console.log(res)
            setRows(res.data)
            console.log(rows)
            setTest('Hello World')

            console.log('Hey; ' + test)
        })
        .catch(err =>{
            console.log(err)
        })
    },[])
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

  const columns = ([
    { id: 'acquire', label: 'Acquire', minWidth: 75, href: '/acq/edit'},
    { id: 'retire', label: 'Retire', midWidth: 75, href: '/acq/retire'},
    { id: 'data_catalog', label: 'Catalog', minWidth: 150, href: '' },
    {
        id: 'version',
        label: 'Version',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toFixed(2),
        href: ''
    },
    { id: 'producer', label: 'Producer', minWidth: 10, href: '' },
    { id: 'access', label: 'Access Modality', minWidth: 100, href: ''},
    { id: 'frequency', label: 'Frequency', midWidth: 100, href: ''},
    { id: 'created', label: 'Created On', midWidth: 100, href: ''}

  ]);
  
  return (
      <React.Fragment>
    <Card>
    <CardHeader title='Search Catalog for Acquisition' />
    </Card>
    <Paper className={classes.root}>
        
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const data_catalog = row['data_catalog'];
                const retire = '/acq/retire/' + data_catalog;
                const acquire = '/acq/edit/' + data_catalog;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                  {
                    columns.map((column) => {
                    const value = row[column.id];
                        
                    {return (
                        column.href === ''  ?
                            <TableCell align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell> 
                            :
                            <TableCell align={column.align} component='a' href = {column.href === '/acq/retire' ? retire : acquire}>
                                {column.id}
                            </TableCell> 
                    );}
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </React.Fragment>
  );


};

SearchAcquisitionComponent.propTypes = {
  className: PropTypes.string
};

export default SearchAcquisitionComponent;

