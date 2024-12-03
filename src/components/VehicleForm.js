// src/components/VehicleForm.js

import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VehicleForm = ({ onSubmit }) => {
  const [vehicleData, setVehicleData] = useState({
    license_plate: '',
    make: '',
    model: '',
    year: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vehicleData);
    navigate("/add-issue")
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Add New Vehicle
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="License Plate"
              name="license_plate"
              value={vehicleData.license_plate}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Make"
              name="make"
              value={vehicleData.make}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Model"
              name="model"
              value={vehicleData.model}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Year"
              name="year"
              value={vehicleData.year}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Vehicle
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default VehicleForm;
