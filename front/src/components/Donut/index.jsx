import { useMemo } from "react";
import * as d3 from "d3";


const MARGIN = 30;

const DonutChart = ({ width, height, data }) => {
  const radius = Math.min(width, height) / 2 - MARGIN;  

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcs = useMemo(() => {
    const arcPathGenerator = d3.arc();
    return pie.map((p) =>
      arcPathGenerator({
        innerRadius: 70,
        outerRadius: radius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      })
    );
  }, [radius, pie]);

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {arcs.map((arc, i) => {
          return <path key={i} d={arc} fill={data[i].color} />;
        })}
      </g>
    </svg>
  );
};

export default DonutChart;
