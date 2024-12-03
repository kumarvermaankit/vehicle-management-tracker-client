import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { getVehicles, getComponents } from '../utils/api';

const IssueForm = ({ onSubmit }) => {
  const [issueData, setIssueData] = useState({
    vehicle: '',
    component: '',
    description: '',
    is_repair_needed: false,
  });

  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesData, componentsData] = await Promise.all([getVehicles(), getComponents()]);
        setVehicles(vehiclesData.data);
        setComponents(componentsData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles or components:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'component') {
      const selectedComponent = components.find(comp => comp.id === value);
      setIssueData((prev) => ({
        ...prev,
        component: value,
        is_repair_needed: selectedComponent?.component_type === 'repair',
      }));
    } else {
      setIssueData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(issueData);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create Issue
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Vehicle</InputLabel>
              <Select
                label="Vehicle"
                name="vehicle"
                value={issueData.vehicle}
                onChange={handleChange}
              >
                {vehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.make + " " + vehicle.model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Component</InputLabel>
              <Select
                label="Component"
                name="component"
                value={issueData.component}
                onChange={handleChange}
              >
                {components.map((component) => (
                  <MenuItem key={component.id} value={component.id}>
                    {`${component.name} (${component.component_type})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={issueData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit Issue
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default IssueForm;
