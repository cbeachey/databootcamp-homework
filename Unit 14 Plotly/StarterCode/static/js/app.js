// Read in samples.json
function buildPlot() {
    d3.json("samples.json").then((data) => {
        console.log(data)
    })
};
