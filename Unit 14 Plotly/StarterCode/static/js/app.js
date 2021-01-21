// Read in samples.json
function getData(sample) {
    d3.json("samples.json").then((data) => {
        console.log(data)
    })
};

getData();