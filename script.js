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
  }else if (e.target.id==="toggle_pos"){
    var splittedString = displayValue.split(' ');
    var indexLast = splittedString.length-1;
    if (isNaN(splittedString[indexLast])){
      return;
    }
    var last = togglePositive(splittedString[indexLast]);
    splittedString[indexLast] = last;
    displayValue=splittedString.join(' ');
  }else if($(e.target).hasClass('equal')){
    $('#display').text(equal(displayValue));
    return;
  }else if ($(e.target).hasClass('clear')){
    clear();
    return;
  }else if ($('#display').hasClass('enterPressed')){
    $('#display').empty();
    $('#display').removeClass('enterPressed');
    displayValue = e.target.id;
  }else{
    displayValue = displayValue+e.target.id;
  }
  $('#display').text(displayValue);

}


function togglePositive(value){
  if (value[0]==='-'){
    return value.slice(1);
  }
  return '-'+value;
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
    var number = parseFloat(val);
    if (isNaN(number)){
      return val;
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

function equal(displayValue){
  if ((/[\*\/]/g).test(displayValue)){
    var numberOfMultDiv = displayValue.match(/[\*|\/]/g).length;
  }
  if ((/\s[-\+]\s/g).test(displayValue)){
    var numberOfPlusMinus = displayValue.match(/\s[-|\+]\s/g).length;
  }
  var percentTest = (/%/g).test(displayValue);
  var temp = displayValue.split(' ');

  if (percentTest){
    for (var i =0;i<temp.length;i++){
      if ((/%/g).test(temp[i]) && (temp[i-1]==='+'||temp[i-1]==='-')){
        $('#display').text('Invalid Expression');
        return;
      }else if ((/%/g).test(temp[i])){
        temp[i] = parseFloat(temp[i])/100;
      }else{
        continue;
      }
    }
  }

  var temp1 = toNumber(temp);
  for (var i =0;i<numberOfMultDiv;i++){
    temp1 = operationCheck1(temp1);
  }
  for (var i =0;i<numberOfPlusMinus;i++){
    temp1 = operationCheck2(temp1);
  }
  temp1=Math.round(temp1*100)/100;
  if (isNaN(temp1)){
    temp1 = 'Invalid Expression'
  }else if (temp1 ===Infinity){
    temp1 = 'Err Divide By Zero';
  }
  $('#display').text(temp1);
  $('#display').addClass('enterPressed');
}