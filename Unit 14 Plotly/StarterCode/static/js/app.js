// Read in samples.json
function getData(sample) {
    d3.json("samples.json").then((data) => {
       
        // Get values from data json object
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(wfreq)

        
    })
};

getData();