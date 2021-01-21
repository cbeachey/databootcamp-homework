// Read in samples.json
function getData(sample) {
    d3.json("samples.json").then((data) => {
       
        // Get values from data json object
        var names = data.samples.names


        console.log(names)
    })
};

