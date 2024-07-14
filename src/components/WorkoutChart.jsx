
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const WorkoutChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Set up SVG
    const svg = d3.select(svgRef.current)
      .attr('width', 500)
      .attr('height', 300)
      .style('background', '#f0f0f0')
      .style('overflow', 'visible');

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, 500])
      .padding(0.5);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.time)])
      .range([300, 0]);

    // Set up axes
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .attr('transform', 'translate(0, 300)')
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    // Draw bars
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d.time))
      .attr('width', xScale.bandwidth())
      .attr('height', d => 300 - yScale(d.time))
      .attr('fill', 'teal');

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default WorkoutChart;
