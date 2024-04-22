import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";


const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };


const BarPlot = ({width, height, data}) => {
    const axesRef = useRef(null);
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const allGroups = data.map((d) => String(d.month));
    const allSubgroups = ["confirmed", "death", "recovered"]; // todo

    // Data Wrangling: stack the data
    const stackSeries = d3.stack().keys(allSubgroups).order(d3.stackOrderNone);
    //.offset(d3.stackOffsetNone);
    const series = stackSeries(data);

    // Y axis
    //const max = 10000200; // todo
    let max = 0
    const values = Object.values(data);
    values.map((el) => {
      const valueFromObject = el.confirmed + el.death + el.recovered;
      max = Math.max(max, valueFromObject);
    })

    const yScale = useMemo(() => {
        return d3
        .scaleLinear()
        .domain([0, max || 0])
        .range([boundsHeight, 0]);
    }, [data, height]);

    // X axis
    const xScale = useMemo(() => {
        return d3
        .scaleBand()
        .domain(allGroups)
        .range([0, boundsWidth])
        .padding(0.05);
    }, [data, width]);

    // Color Scale
    var colorScale = d3
        .scaleOrdinal()
        .domain(allGroups)
        .range(["#e0ac2b", "#e85252", "#97c829"]);

    // Render the X and Y axis using d3.js, not react
    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = d3.axisBottom(xScale);
        svgElement
          .append("g")
          .attr("transform", "translate(0," + boundsHeight + ")")
          .call(xAxisGenerator);
    
        const yAxisGenerator = d3.axisLeft(yScale);
        svgElement.append("g").call(yAxisGenerator);
      }, [xScale, yScale, boundsHeight]);
    
      const rectangles = series.map((subgroup, i) => {
        return (
          <g key={i}>
            {subgroup.map((group, j) => {
              return (
                <rect
                  key={j}
                  x={xScale(group.data.month)}
                  y={yScale(group[1])}
                  height={yScale(group[0]) - yScale(group[1])}
                  width={xScale.bandwidth()}
                  fill={colorScale(subgroup.key)}
                  opacity={0.9}
                ></rect>
              );
            })}
          </g>
        );
      });

    return (
        <div>
            <svg width={width} height={height}>
                <g
                width={boundsWidth}
                height={boundsHeight}
                transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                {rectangles}
                </g>
                <g
                width={boundsWidth}
                height={boundsHeight}
                ref={axesRef}
                transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                />
            </svg>
        </div>
    )
};

export default BarPlot;