<meta />
<template>
  <div>
    <h1>a chart</h1>
    <svg width="600" height="400" ref="svgContainer"><rect x="10" y="10" width="40" height="40" fill="red"/></svg>
  </div>
</template>
<script>
import * as d3 from "https://unpkg.com/d3@7.8.5?module";

const ChartComponent = {
    template: template,
    data() {
	return {
	    data: [10, 20, 30, 40, 50]  // Example data
	};
    },
    mounted() {
	this.createChart();
	console.log("being mounted")
    },
    watch: {
	data() {
	    // this.updateChart();  // Update chart if data changes
	}
    },
    methods: {
	createChart() {
	    const svg = d3.select(this.$refs.svgContainer);
	    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
	    const width = +svg.attr("width") - margin.left - margin.right;
	    const height = +svg.attr("height") - margin.top - margin.bottom;

	    svg.selectAll("*").remove();
	    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

	    const x = d3.scaleBand().domain(d3.range(this.data.length)).range([0, width]).padding(0.1);
	    const y = d3.scaleLinear().domain([0, d3.max(this.data)]).nice().range([height, 0]);

	    g.append("g")
		.selectAll(".bar")
		.data(this.data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", (d, i) => x(i))
		.attr("y", d => y(d))
		.attr("width", x.bandwidth())
		.attr("height", d => height - y(d))
		.attr("fill", "steelblue")
		.on("mouseover", function() { d3.select(this).attr("fill", "orange"); })
		.on("mouseout", function() { d3.select(this).attr("fill", "steelblue"); });

	    g.append("g").attr("class", "x-axis").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
	    g.append("g").attr("class", "y-axis").call(d3.axisLeft(y));
	},
	updateChart() {
	    const svg = d3.select(this.$refs.svgContainer);
	    const g = svg.select("g");
	    const height = +svg.attr("height") - 40;
	    const y = d3.scaleLinear().domain([0, d3.max(this.data)]).nice().range([height, 0]);

	    const bars = g.selectAll(".bar").data(this.data);
	    bars.transition().duration(500).attr("y", d => y(d)).attr("height", d => height - y(d));
	    g.select(".y-axis").transition().duration(500).call(d3.axisLeft(y));
	}
    }
};

export default ChartComponent;
</script>
<style>
h1 { color: red }
h2 { color: blue }
</style>
