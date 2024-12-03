import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Box, Button, Typography, Grid } from '@mui/material';
import { createComponent, createVehicle, createIssue, getRevenueData, createTransaction } from './utils/api';
import { RevenueGraph } from './components/RevenueGraph';
import { ComponentForm } from './components/ComponentForm';
import VehicleForm from './components/VehicleForm';
import IssueForm from './components/IssueForm';
import ComponentList from './components/ComponentList';
import TransactionForm from './components/TransactionForm';

const App = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const response = await getRevenueData();
      setRevenueData(response.data);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  const handleCreateComponent = async (data) => {
    try {
      await createComponent(data);
    } catch (error) {
      console.log(error)
      console.error('Error creating component:', error);
    }
  };

  const handleCreateVehicle = async (data) => {
    try {
      await createVehicle(data);
    } catch (error) {
      console.error('Error creating vehicle:', error);
    }
  };

  const handleCreateIssue = async (data) => {
    try {
      await createIssue(data);
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  const handleTransactionSubmit = async (transactionData) => {
    try {
      await createTransaction(transactionData);

      const updatedRevenue = await fetchRevenueData();
      setRevenueData(updatedRevenue);

      alert('Transaction successfully created!');
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <Router>
      <Container maxWidth="lg">
        <Box sx={{ padding: 2 }}>
          <Typography variant="h3" gutterBottom>
            Vehicle Repair Management
          </Typography>

          <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
              <Button variant="contained" color="secondary" fullWidth component="a" href="/components">
                Component List
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="contained" color="primary" fullWidth component="a" href="/revenue">
                View Revenue
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="contained" color="secondary" fullWidth component="a" href="/add-component">
                Add Component
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="contained" color="primary" fullWidth component="a" href="/add-vehicle">
                Add Vehicle
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="contained" color="secondary" fullWidth component="a" href="/add-issue">
                Add Issue
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="contained" color="secondary" fullWidth component="a" href="/create-transaction">
                Transaction Form
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 3 }}>
            <Routes>
              <Route path="/revenue" element={<RevenueGraph data={revenueData} />} />
              <Route path="/add-component" element={<ComponentForm onSubmit={handleCreateComponent} />} />
              <Route path="/components" element={<ComponentList />} />
              <Route path="/add-vehicle" element={<VehicleForm onSubmit={handleCreateVehicle} />} />
              <Route path="/add-issue" element={<IssueForm onSubmit={handleCreateIssue} />} />
              <Route path="/create-transaction" element={<TransactionForm onSubmit={handleTransactionSubmit} />} />
            </Routes>
          </Box>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
