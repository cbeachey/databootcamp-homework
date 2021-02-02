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

  // Create scale functions
  var xLinearScale = d3.scaleLinear()
      .domain([25, d3.max(healthData, d => d.age)])
      .range([0, width]);

  var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.smokes)])
      .range([height, 0]);

  // Create axis functions    
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  
  // Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Create Circles  
  var circlesGroup = chartGroup.selectAll(".stateCircle")
      .data(healthData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.age))
      .attr("cy", d => yLinearScale(d.smokes))
      .attr("class", "stateCircle")
      .attr("r", 15)
      .attr("opacity", ".75");

  // Append state text to circles
   var textGroup = chartGroup.selectAll(".stateText")
      .data(healthData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.age))
      .attr("y", d => yLinearScale(d.smokes*.98))
      .text(d => (d.abbr))
      .attr("class", "stateText")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("fill", "white");

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>Age: ${d.age}<br>Smokes (%): ${d.smokes}`);
    });

  chartGroup.call(toolTip);

  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

// Axis labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 05)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("Age (Median)");

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "aText")
.text("Smokes (%)");
}).catch(function(error) {
  console.log(error);
});


