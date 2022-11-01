import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const Graph = (props) => {
  //sets graph title
  const title = props.json.title;
  let data = props.json.data;
  let ref = useRef(null);

  const margin = 100;
  //gets key names for x and y axis
  const key1 = Object.keys(data[0])[0];
  const key2 = Object.keys(data[0])[1]; //population

  useEffect(() => {
    // init svg with height and width
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

    // defines x scale
    let xScale = d3
      .scaleBand()
      .range([0, w])
      .padding(0.2)
      .domain(data.map((d) => d[key1]));

    // defines y scale
    let yMax = Math.ceil(Math.max(...data.map((d) => d[key2])) * 1.1);
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
      .attr('x', (d) => xScale(d[key1]))
      .attr('y', (d) => yScale(d[key2]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => h - yScale(d[key2]));

    g.exit().remove();
  });
  // header info for table
  const header = [
    {
      field: key1,
      headerName: key1,
      width: 150
    },
    {
      field: key2,
      headerName: key2,
      width: 150
    }
  ];
  // adds id to data
  data.map((row, i) => {
    return (row['id'] = i);
  });

  //gets array of selected based on id
  const select = (item) => {
    props.setSelected(item);
  };

  return (
    <div>
      <svg id="svg" ref={ref} height="500" width="600"></svg>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={header}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(item) => select(item)}
        />
      </Box>
    </div>
  );
};

export default Graph;
