import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import './PieChart.css';

const PieChart = props => {
  //sets graph title
  //const title = props.json.title;
  let data = props.json.data;
  let ref = useRef(null);

  const margin = 100;
  //gets key names for x and y axis
  const key1 = Object.keys(data[0])[0];
  const key2 = Object.keys(data[0])[1]; //population
  useEffect(() => {
    //clears during render
    d3.select('#pieChart').remove();
    // init svg with height and width
    let svg = d3.select(ref.current);
    let w = svg.attr('width') - margin;
    let h = svg.attr('height') - margin;
    let g = svg
      .append('g')
      .attr('id', 'pieChart')
      .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');
    let radius = 200;

    // sets x axis title
    g.append('text')
      .attr('x', 0)
      .attr('y', h / 2 + 30)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .text(key1);

    // sets y axis title
    g.append('text')
      .attr('x', 0)
      .attr('y', -w / 2 + 40)
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .text(key2);

    // sets pie chart
    let pie = d3.pie().value(d => d[key2]);
    let arc = g.selectAll('arc').data(pie(data)).enter();
    let p = d3.arc().outerRadius(radius).innerRadius(0);

    // sets color based on selection
    const selectColor = i => {
      // sets bar to red if selected
      if (props.selection.includes(i)) {
        return '#FF0000';
      }
      // default color
      return '#2296F3';
    };
    // append pie
    arc
      .append('path')
      .attr('d', p)
      .attr('fill', (d, i) => selectColor(i));

    let l = d3.arc().outerRadius(radius).innerRadius(0);
    arc
      .append('text')
      .attr('transform', d => {
        return 'translate(' + l.centroid(d) + ')';
      })
      .text(d => d.data[key1])
      .style('font-size', '14px');
    g.exit().remove();
  });

  // adds id to data
  data.map((row, i) => {
    return (row['id'] = i);
  });

  PieChart.propTypes = {
    json: PropTypes.object,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    selection: PropTypes.array,
    setSelection: PropTypes.func
  };

  return (
    <div>
      <svg ref={ref} height="500" width="600"></svg>
    </div>
  );
};

export default PieChart;
