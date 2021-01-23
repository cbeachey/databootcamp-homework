//Metadata and connection
function buildMetadata(sample) {
  //Build connection with D3  
  d3.json("samples.json").then((data) => {
      
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
   
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }

//Build Horizontal Bar Chart
function buildCharts(sample) {
  // Connection to json
  d3.json("samples.json").then((data) => {
    // Assign data to variables  
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    
    //Set x and y values for bar graph
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    var barLayout = {
      margin: { t: 20, l: 130 }
    };

  Plotly.newPlot("bar", barData, barLayout);

  // Build Bubble graph
  var bubbleData = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: "Earth"
    }
  }];

  // Bubble layout adjustments to x-axis label and title
  var bubbleLayout = {
    title: "Bacteria Cultures",
    xaxis: { title: "OTU ID" },
    hovermode: "closest"
  }

  Plotly.newPlot("bubble", bubbleData, bubbleLayout)
  });
};

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }

// Fetch selected data when new sample is selected
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
  };

  //Initialize
init();