import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';
import { api } from '../utils/api';

const ComponentList = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('components/')
      .then(response => {
        setComponents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching components:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Components List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="component table">
          <TableHead>
            <TableRow>
              <TableCell>Component Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.id}>
                <TableCell component="th" scope="row">
                  {component.name}
                </TableCell>
                <TableCell align="right">₹{component.price}</TableCell>
                <TableCell align="right">{component.component_type}</TableCell>
                <TableCell align="right">{component.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={() => window.location.href = '/add-component'}>
          Add New Component
        </Button>
      </Box>
    </Box>
  );
};

export default ComponentList;
