import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const Graph = (props) => {
  const title = props.json.title;
  var data = props.json.data;
  let ref = useRef(null);

  const margin = 100;

  useEffect(() => {
    d3.select('g').remove();
    let svg = d3.select(ref.current);
    let g = svg.append('g').attr('transform', 'translate(' + 50 + ',' + 50 + ')');
    let w = svg.attr('width') - margin;
    let h = svg.attr('height') - margin;
    svg
      .append('text')
      .attr('x', w / 2)
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .text(title);

    let xScale = d3
      .scaleBand()
      .range([0, w])
      .padding(0.2)
      .domain(data.map((d) => d.year));

    // defines y scale
    let yMax = Math.ceil(Math.max(...data.map((d) => d.population)) * 1.1);
    let yScale = d3.scaleLinear().range([h, 0]).domain([0, yMax]);

    //x axis properties
    g.append('g')
      .attr('transform', 'translate(0,' + h + ')')
      .call(d3.axisBottom(xScale));

    //y axis properties
    g.append('g').call(d3.axisLeft(yScale).ticks(20));

    //iterates through array and creates bar graph based on data
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .style('fill', '#2296F3')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.year))
      .attr('y', (d) => yScale(d.population))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => h - yScale(d.population));

    g.exit().remove();
  });
  const columns = [
    {
      field: 'year',
      headerName: 'Year',
      width: 150
    },
    {
      field: 'population',
      headerName: 'Population',
      width: 150
    },
    {
      field: 'id',
      headerName: 'id',
      width: 150
    }
  ];
  // adds id to data
  data.map((row, i) => {
    return (row['id'] = i);
  });

  const displayItem = (item) => {
    props.setSelected(item);
    //console.log(item);
  };

  return (
    <div>
      <svg id="svg" ref={ref} height="500" width="600"></svg>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(item) => displayItem(item)}
        />
      </Box>
    </div>
  );
};

/*
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
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell component="th">{row.year}</TableCell>
                <TableCell align="right">{row.population}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
*/
export default Graph;
