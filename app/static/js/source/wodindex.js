(function(){

  'use strict';
  $(document).ready(initialize);

  var wods = [];
  var filtered = [];

  function initialize(){
    getWods();
    $('#filterBy').change(change);
    $('.movement').click(category);
    $('#pages').on('click', '.page', showPage);
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

  function showPage(){
    var page = this.textContent;
    var index = page * 5;
    console.log(index);
    $('#wods').empty();
    for(var i=5; i > 0; i--){
      if(filtered[index - i]){
        showWod(filtered[index - i]);
      }
    }
  }

  function change(){
    console.log('change');
    $('#wods').empty();
    var filters = $('#filterBy').val().replace(/\s/g,'').toLowerCase().split(',');
    console.log(filters);
    for (var i = 0; i < wods.length; i++) {
      for (var j = 0; j < filters.length; j++) {
        for (var k = 0; k < wods[i].movement.length; k++) {
          if (wods[i].movement[k] === filters[j]) {
            showWod(wods[i]);
          }
        }
      }
    }
  }
  
  // On category button click
  function category(){
    $('#wods').empty();
    $('#pages').empty();

    var $firstPage = $('<label>').text('1');
    $firstPage.addClass('page left space');
    $('#pages').append($firstPage);

    var filters = $(this).text().replace(/\s/g,'').toLowerCase().split(',');
    var count = 1;
    var page = 1;
    filtered = [];
    for (var i = 0; i < wods.length; i++) {
      for (var j = 0; j < filters.length; j++) {
        for (var k = 0; k < wods[i].movement.length; k++) {
          if (wods[i].movement[k] === filters[j]) {
            if(count <= 5){
              showWod(wods[i]);
            }
            filtered.push(wods[i]);
            console.log(wods[i].movement[k] +'boobs'+ filters[j]);
            count++;
            console.log(count-1);
            if(count % 5 === 0){
              console.log(count);
              page++;
              var $pages = $('<label>').text(page + ' ');
              $pages.addClass('page left space');
              $('#pages').append($pages);
              break;
            }
          }

        }
      }
    }
    if(page > 0){
      var $pagesLabel = $('<label>').text('Pages: ');
      $pagesLabel.addClass('left space');
      $('#pages').prepend($pagesLabel);
    }
  }
  
  // show wod information
  
  function showWod(wod) {
    var $container = $('<div>');
    var $name = $('<a>');
    var $instructions = $('<div>');
    var $summary = $('<div>');
    var $a = $('<a>');

    $name.text(wod.name);
    $instructions.text(wod.instructions);
    $summary.text(wod.summary);
    $a.text('Do This Wod');

    $container.addClass('createWodForm space');

    $name.attr('href','http://www.youtube.com/results?search_query='+wod.name+'%20crossfit%20demo');
    $a.attr('href','/users/addwod/' + wod.name);

    $container.append($name, $instructions, $summary, $a);
    $('#wods').append($container);
  }

  // Initial wod query added to wods array
  function getWods() {
    var url = window.location.origin + '/wods/all';
    $.getJSON(url, function(allWods) {
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
