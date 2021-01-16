// from data.js
var tableData = data;

// reference to table body
var tbody = d3.select("tbody");

// check console
// console.log(data);

// For Each statement to append the data
    data.forEach((ufoSightings) => {
    // console.log(ufoSightings);
        var row = tbody.append("tr");
        Object.entries(ufoSightings).forEach(([key, value]) => {
     // Append a cell to the row for each value
     var cell = row.append("td");
     cell.text(value);
   });
 });

// date form
var dateForm = d3.select("#datetime")
    function handleChange(event) {
    var inputDate = d3.event.target.value;
};
dateForm.on("change",handleChange);


// filter the date
var button = d3.select("#filter-btn");


//Event Handler
button.on("click", runEnter);    


//define RunEnter
function runEnter() {
    var inputDate = dateForm.property("value");
    var filteredData = data.filter(ufoSightings => ufoSightings.datetime == inputDate);
    if(filteredData.length !== 0) {
        d3.select("tbody").selectAll("tr").remove();
        filteredData.forEach((ufoSightings) => {
            var row = tbody.append("tr");
            Object.entries(ufoSightings).forEach(([key, value]) => {
              var cell = row.append("td");
              cell.text(value)
            });
        });
    };
};


