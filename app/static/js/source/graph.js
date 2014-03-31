/* global google:true */

'use strict';

function drawVisualization() {
  var url = window.location.origin + '/users/returnFinished';
  $.getJSON(url, function(wods) {

    // Create and populate the data table.
    var htmlWod = $('#wodName').val();
    console.log(wods);

    var myArray = [];
    for(var i=wods.length-9; i<wods.length; i++){
      if(wods[i].name === htmlWod){
        myArray.push([wods[i].date, wods[i].score *1]);
        console.log(myArray);
      }
    }
    
    myArray.unshift(['x', htmlWod]);
    var data = google.visualization.arrayToDataTable(myArray);
      
    // Create and draw the visualization.
    new google.visualization.LineChart(document.getElementById('visualization')).
        draw(data, {curveType: 'function',
                    width: 930, height: 400,
                    vAxis: {maxValue: 200}}
            );
  });
}
      

google.setOnLoadCallback(drawVisualization);
