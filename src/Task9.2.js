const data = [
    { b_land: 'BaWü', score: 4.99 },
    { b_land: 'Bayern', score: 6.65 },
    { b_land: 'Berlin', score: 1.41 },
    { b_land: 'Brandenburg', score: 1.10 },
    { b_land: 'Bremen', score: 0.3 },
    { b_land: 'Hamburg', score: 0.8 },
    { b_land: 'Hessen', score: 2.879 },
    { b_land: 'MeckPom', score: 0.7 },
    { b_land: 'Nieder-S.', score: 3.8 },
    { b_land: 'NRW', score: 7.89 },
    { b_land: 'RLP', score: 1.738 },
    { b_land: 'Saarland', score: 0.483 },
    { b_land: 'Sachsen', score: 1.942 },
    { b_land: 'Sachsen-A.', score: 0.95 },
    { b_land: 'Schlesw.Hol.', score: 1.165 },
    { b_land: 'Thüringen', score: 0.877 }
];

const width = 1300;
const height = 800;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#bar-chart')
    .append('svg')
    .attr('height', height - margin.top - margin.bottom)
    .attr('width', width - margin.left - margin.right)
    .attr('viewBox', [0, 0, width, height]);

const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, 9])
    .range([height - margin.bottom, margin.top]);

    svg
    .append('g')
    .attr('fill', 'royalblue')
    .selectAll('rect')
    .data(data.sort((a, b) => d3.descending(a.score, b.score)))
    .join('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', height - margin.bottom)
    .attr('height', 0)
    .attr('width', x.bandwidth())
    .attr('class', 'rectangle')
    .transition()
    .duration(1000)
    .attr('y', (d) => y(d.score))
    .attr('height', d => y(0) - y(d.score));
        
function xAxis(g) {
    g.attr('transform', 'translate(0, +770)')
        .call(d3.axisBottom(x).tickFormat(i => data[i].b_land))
        .attr('font-size', '12px')
}

function yAxis(g) {
    g.attr('transform', 'translate(30)')
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr('font-size', '14px')
}
svg.append('g').call(yAxis)
svg.append('g').call(xAxis) 
svg.node();