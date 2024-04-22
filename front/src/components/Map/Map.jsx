import * as d3 from "d3"; // we will need d3.js

// type MapProps = {
//   width: number;
//   height: number;
//   data: GeoJsonData;
// };

export const Map = ({ width, height, data, numData }) => {

    const colorScale = d3
    .scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeReds[7]);

    // read the data
    // create a geoPath generator with the proper projection
    // build the paths
    const projection = d3
        .geoMercator()
        .scale(width / 2 / Math.PI - 40)
        .center([-10, 55]);

    const geoPathGenerator = d3.geoPath().projection(projection);

    const allSvgPaths = data.features
        .filter((shape) => shape.id !== 'ATA')
        .map((shape) => {
            const regionData = numData.find((region) => region.country_code === shape.id);
            const color = regionData ? colorScale(regionData?.confirmed) : 'lightgrey';

            return (
                <path
                key={shape.id}
                d={geoPathGenerator(shape)}
                stroke="lightGrey"
                strokeWidth={0.5}
                fill={color}
                fillOpacity={0.7}
                />
            );
        });

    return (
        <svg width={width} height={height}>
            {allSvgPaths}
        </svg>
  );
};

export default Map;