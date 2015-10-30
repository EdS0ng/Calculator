$(document).ready(function(){
  $('.container').click(event,mainFunction);
});


function mainFunction(e){
  var displayValue =$('#display').text();
  if ($(e.target).hasClass('operator')){
    displayValue = displayValue + ' '+ e.target.id+' ';
    if ($('#display').hasClass('enterPressed')){
      $('#display').removeClass('enterPressed');
    }
  }else{
    if ($('#display').hasClass('enterPressed')){
      $('#display').empty();
      $('#display').removeClass('enterPressed');
      displayValue = e.target.id;
    }else{
      displayValue = displayValue+e.target.id;
    }
  }
 
  if ($(e.target).hasClass('equal')){
    $('#display').text(equal());
    return;
  }
  if ($(e.target).hasClass('clear')){
    clear();
    return;
  }
  $('#display').text(displayValue);
}

function clear(){
  $('#display').empty();
}

function multiply (a,b){
  return a*b;
}

function divide(a,b){
  return a/b;
}

function addition(a,b){
  return a+b;
}

function subtraction(a,b){
  return a-b;
}

function toNumber(tempArray){
  var temp = tempArray.map(function(val){
    var tempval = val.trim();
    var number = parseInt(tempval);
    if (isNaN(number)){
      return tempval;
    }
    return number;
  });
  return temp;
}

function operationCheck1(temp1){
  var startIndex = 0;
  var copy = [];
  var currentVal;
  for (var i = 0;i<temp1.length;i++){
    if (temp1[i]==="*"){
      currentVal = multiply(temp1[i-1],temp1[i+1]);
      temp1.splice(i-1,3,currentVal);
      return temp1;
    }
    if (temp1[i] ==="/"){
      currentVal = divide(temp1[i-1],temp1[i+1]);
      temp1.splice(i-1,3,currentVal);
      return temp1;
    }
  }
}

function operationCheck2(temp1){
  var startIndex = 0;
  var copy = [];
  var currentVal;
  for (var i = 0;i<temp1.length;i++){
    if (temp1[i]==="+"){
      currentVal = addition(temp1[i-1],temp1[i+1]);
      temp1.splice(i-1,3,currentVal);
      return temp1;
    }
    if (temp1[i] ==="-"){
      currentVal = subtraction(temp1[i-1],temp1[i+1]);
      temp1.splice(i-1,3,currentVal);
      return temp1;
    }
  }
}

function equal(){
  //var reg = /^[0-9.%\^]
  // var currentVal = displayValue.match(/\d\*\d/g);

  var displayValue = $('#display').text();
  if ((/[\*|\/]/g).test(displayValue)){
    var numberOfMultDiv = displayValue.match(/[\*|\/]/g).length;
  }
  if ((/[-|\+]/g).test(displayValue)){
    var numberOfPlusMinus = displayValue.match(/[-|\+]/g).length;
  }
  var temp = displayValue.split(' ');
  var temp1 = toNumber(temp);
  console.log(temp1);
  for (var i =0;i<numberOfMultDiv;i++){
    temp1 = operationCheck1(temp1);
  }
  for (var i =0;i<numberOfPlusMinus;i++){
    temp1 = operationCheck2(temp1);
  }
  $('#display').text(temp1);
  $('#display').addClass('enterPressed');
}