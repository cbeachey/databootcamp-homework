// Read in samples.json
function getData(sample) {

    d3.json("samples.json").then((data) => {
       
        // Get values from data json object
       // var wfreq = data.metadata.map(d => d.wfreq)
       // console.log(wfreq);

        var sampleValues = data.metadata.sample_values;
        var otu_ids = data.otu_ids;
        var otuLabels = data.otu_labels;
        
        var trace1 = {
            x: data.otu_ids,
            y: data.sampleValues,
            text: otuLabels,
            name: "",
            type: "bar"
          };
        
          Plotly.newPlot("bar", trace1);
          
    })
};

getData();