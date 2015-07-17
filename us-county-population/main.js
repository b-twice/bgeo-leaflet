var width = 960;
var height = 600;

var projection = d3.geo.albersUsa()
    .scale(1280)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg= d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/counties.topo.json", function(error, counties) {
    if (error) {return console.error(error)}

    svg.append("path")
        .datum(topojson.mesh(counties))
        .attr("d", path);
});