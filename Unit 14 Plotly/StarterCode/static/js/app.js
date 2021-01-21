// Read in samples.json
function getData(sample) {

    d3.json("samples.json").then((data) => {
       
        var data2 = data;
        var sampleData = data2.samples;
        // Get values from data json object
       // var wfreq = data.metadata.map(d => d.wfreq)
       // console.log(wfreq);
       console.log(sampleData);
    })
};

getData();