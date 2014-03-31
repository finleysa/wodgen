(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('.row').on('click','.record', record);
    $('#wodselect').change(graph);
  }

  function record(){
    var email = $('#email').text();
    var wodName = $(this).closest('.workout').children('h3').text();
    var date = $(this).closest('.workout').children('h5').text();
    var score = $(this).closest('.row').children('.small-5').children('input').val();
    console.log(score);

    var url = window.location.origin + '/users/finishedWod';
    var data = 'email='+email+'&wodName='+wodName+'&date='+date+'&score='+score;
    var type = 'POST';
    var success = console.log('cool');
    $.ajax({url:url, type:type, data:data, success:success});
  }

  function graph(){
    var wod = $('#wodselect').val();
    window.location.href = '/users/graph/' + wod;
  }
})();

