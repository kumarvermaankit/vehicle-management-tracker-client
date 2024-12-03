import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { getVehicles } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const TransactionForm = ({ onSubmit }) => {
  const [transactionData, setTransactionData] = useState({
    vehicle: '',
    total_price: '',
  });

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: vehiclesData } = await getVehicles();
        setVehicles(vehiclesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(transactionData);
    navigate("/")
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
        Create Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Vehicle</InputLabel>
              <Select
                label="Vehicle"
                name="vehicle"
                value={transactionData.vehicle}
                onChange={handleChange}
              >
                {vehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.model})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Amount"
              name="total_price"
              value={transactionData.total_price}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default TransactionForm;
