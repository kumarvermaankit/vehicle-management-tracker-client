import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

export const RevenueGraph = ({ data }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const allMonthsData = monthNames.map(month => ({
    date__month: month,
    total_revenue: 0,
  }));

  data.forEach(item => {
    const monthIndex = item.date__month - 1;
    allMonthsData[monthIndex].total_revenue = item.total_revenue;
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Revenue Graph
      </Typography>
      <Box sx={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={allMonthsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date__month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
