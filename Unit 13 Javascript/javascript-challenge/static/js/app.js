// from data.js
var tableData = data;

// reference to table body
var tbody = d3.select("tbody");

// check console
console.log(data);

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
 
    