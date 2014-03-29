(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('.row').on('click','.record', record);
  }

  //single=Single&multiple=Multiple&multiple=Multiple3&check=check2&radio=radio1
  //var name = $(this).closest('tr').children('td:nth-child(6)').children('select').val();

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
})();

