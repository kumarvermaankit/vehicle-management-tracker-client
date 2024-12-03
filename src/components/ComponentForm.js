import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ComponentForm = ({ onSubmit }) => {
  const [componentData, setComponentData] = useState({
    name: '',
    price: '',
    component_type: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComponentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(componentData);
    navigate("/components")

  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Add New Component
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Component Name"
              name="name"
              value={componentData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              value={componentData.price}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              name="description"
              value={componentData.description}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="component-type-label">Component Type</InputLabel>
              <Select
                labelId="component-type-label"
                label="Component Type"
                name="component_type"
                value={componentData.component_type}
                onChange={handleChange}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="repair">Repair</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Component
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
