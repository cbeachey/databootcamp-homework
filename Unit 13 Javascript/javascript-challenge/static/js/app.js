// from data.js
var tableData = data;

// reference to table body
var tbody = d3.select("tbody");

// check console
console.log(data);


//data.forEach(function(ufoSightings) {
  //  console.log(ufoSightings);
  //  });

// append


data.forEach(function(ufoSightings) {
    console.log(ufoSightings);
        var row = tbody.append("tr");
            Object.entries(ufoSightings).forEach(function([key, value]) {
            console.log(key, value);
     // Append a cell to the row for each value
    // in the weather report object
     var cell = row.append("td");
     cell.text(value);
   });
 });
 
    