(function(){

  'use strict';
  $(document).ready(initialize);

  var wods = [];
  function initialize(){
    getWods();
    $('#filterBy').change(change);
    $('.movement').click(category);
    //$('.doIt').click(doWod);
  }

  /*
  function doWod {

    var url = window.location.origin + '/';
    var data = this.parent;
    var type = 'POST';
    var success = console.log('k');
    $.ajax({url:url, type:type, data:data, success:success});
  }
  */

  // On change of filter input text
  function change(){
    console.log('change');
    $('#wods').empty();
    var filters = $('#filterBy').val().replace(/\s/g,'').toLowerCase().split(',');
    console.log(filters);
    for (var i = 0; i < wods.length; i++) {
      for (var j = 0; j < filters.length; j++) {
        for (var k = 0; k < wods[i].movement.length; k++) {
          if (wods[i].movement[k] === filters[j]) {
            console.log(filters[j]);
            console.log(filters);
            showWod(wods[i]);
          }else{
            console.log('non-equal elements');
          }
        }
      }
    }
  }
  
  // On category button click
  function category(){
    console.log('change');
    $('#wods').empty();
    var filters = $(this).text().replace(/\s/g,'').toLowerCase().split(',');
    console.log(filters);
    for (var i = 0; i < wods.length; i++) {
      for (var j = 0; j < filters.length; j++) {
        for (var k = 0; k < wods[i].movement.length; k++) {
          if (wods[i].movement[k] === filters[j]) {
            console.log(filters[j]);
            console.log(filters);
            showWod(wods[i]);
          }else{
            console.log('non-equal elements');
          }
        }
      }
    }
  }
  
  // show wod information
  function showWod(wod){
    var $container = $('<div>');
    var $name = $('<div>');
    var $instructions = $('<div>');
    var $summary = $('<div>');
    var $button = $('<button>');
    var $a = $('<a>');
    
    $name.text(wod.name);
    $instructions.text(wod.instructions);
    $summary.text(wod.summary);
    $button.text('Do This Wod');
    $a.text('Do This Wod');
    
    $button.addClass('tiny radius doIt');
    $container.addClass('wod');

    $a.attr('href','/users/addwod/' + wod.name);

    $container.append($name, $instructions, $summary, $button, $a);
    $('#wods').append($container);
  }

  // Initial wod query added to wods array
  function getWods(){
    var url = window.location.origin + '/wods/all';
    $.getJSON(url, function(allWods){
      wods = allWods;
      console.log(wods);
    });
  }

  /*
  function filter(err){
    var results = $('#results').val();
    var filterBy = $('#filterBy').val();
    var url = window.location.origin + '/' + filterBy +'/' + results;
    var data = $('#submitArtist').serialize();
    var type = 'POST';
    var success = console.log;
    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault(err);
  }
  */

})();
