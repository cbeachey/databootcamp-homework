var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
d3.csv("assets/data/data.csv").then(function(healthData) {

  console.log(healthData);

  // Parse Data/Cast as numbers
  healthData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
  });


  var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(healthData, d => d.age)])
      .range([0, width]);

  var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.smokes)])
      .range([height, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.rockband}<br>Hair length: ${d.age}<br>Hits: ${d.smokes}`);
    });

  chartGroup.call(toolTip);

  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });



}).catch(function(error) {
  console.log(error);
});

