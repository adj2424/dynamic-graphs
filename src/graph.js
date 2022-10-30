import React, { useState } from 'react';
import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Graph = (props) => {
  const title = props.json.title;
  var data = props.json.data;
  console.log(title, data);

  return (
    <div>
      <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries valueField="population" argumentField="year" />
          <Title text={title} />
          <Animation />
        </Chart>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell align="right">Population</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow>
                <TableCell component="th">{row.year}</TableCell>
                <TableCell align="right">{row.population}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Graph;
