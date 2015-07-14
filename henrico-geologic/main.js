var map = L.map('map', {center: [37.53, -77.46], zoom:11})
    .addLayer(new L.TileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>",
    maxZoom: 18,
    id: '',
    accessToken: ''
}));

var svg = d3.select(map.getPanes().overlayPane).append('svg');
// g element used to translate SVG off layer origin
// zoom-hide class is needed for DOM elements added to map
var gGeology = svg.append('g').attr("class", "leaflet-zoom-hide");
var gBoundary= svg.append('g').attr('class', 'leaflet-zoom-hide');

// color scale for geologic features
var colorScale = d3.scale.category20c();

// Borrowed heavily from Mike Bostock's Leaflet and D3 guide, http://bost.ocks.org/mike/leaflet/
d3.json("data/henrico_geology.topo.json", function(collection) {
    var transform = d3.geo.transform({point:projectPoint});
    // stream the coordinates
    var path = d3.geo.path().projection(transform);

    var boundaryTopo = topojson.feature(collection, collection.objects['henrico']);
    var boundary = gBoundary.selectAll("path")
        .data(boundaryTopo.features)
        .enter()
        .append("path")
        .attr('class', 'boundary');

    var geologyTopo = topojson.feature(collection, collection.objects['geology']);
    var geology = gGeology.selectAll("path")
        .data(geologyTopo.features)
        .enter()
            .append("path")
            .attr('class', 'entity')
            .style("fill", function (d) {return colorScale(getRandomInt(0, 10)) });

    map.on("viewreset", reset);
    reset();

    function reset () {
        var b = path.bounds(topojson.feature(collection, collection.objects['henrico']));
        var topLeft = b[0];
        var point = map.latLngToLayerPoint(new L.LatLng(topLeft[0], topLeft[1]));
        var bottomRight = b[1];

        svg.attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("margin-left", topLeft[0] + "px")
            .style("margin-top", topLeft[1] + "px");

        gGeology.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
        geology.attr("d", path);
        gBoundary.attr("transform", "translate(" + -topLeft[0] + ", " + -topLeft[1] + ")");
        boundary.attr("d", path);
    }
    function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max-min +1)) + min;
    }
});