 var moment = require('moment');
module.exports = function(){
  var callCostSet = 2;
  var smsCostSet = 1;
  var warningLevelSet =5;
  var criticalLevelSet = 10;

// create a variables that will keep track of all three totals.
  var totalCall = 0;
  var totalSms = 0;
  var totally = 0;
  var color = "";
  //Setting values
  var timestamp =[];


function costcallSet(value){
    callCostSet = value;
   }
   function costsmsSet(value){

      smsCostSet = parseFloat(value);
    }
    function costwarnSet(value){
   warningLevelSet = parseFloat(value);
   }
   function costcritSet(value){
    criticalLevelSet = parseFloat(value);
   }

//get the values
function updateSettings(items){
    if(totally < criticalLevelSet ){
    if(items === "call"){
     totalCall += callCostSet;
  }
  else if(items === "sms"){
      totalSms += smsCostSet;
      // totally += smsCostSet;
 }
    billsTotal();
  }
}
function getCall(){
     return callCostSet.toFixed(2);
  }
  function getSms(){
    return smsCostSet.toFixed(2);
  }

  function getWarning(){
    return warningLevelSet.toFixed(2);
  }

  function getCritical(){
    return criticalLevelSet.toFixed(2);
  }
//calcualte and return total bill
function billsTotal(){
    totally = totalCall + totalSms;
  }
//totals
function callTotals(){
  return totalCall;
}
function smsTotals(){
  return totalSms;
}
function grandTotal(){
    return totally.toFixed(2);
}
  //returns true if the critical is reached
 function passesCritical(){
     return (billsTotal()>= criticalLevelSet);
}
  //returns true if the warning is reached
  function passesWarning(){
    return (billsTotal() >=  warningLevelSet);
  }

  function myColor(){
    if(totally >= criticalLevelSet){
      //let color= "danger"
      return "danger";
    }
    else if(totally >= warningLevelSet){
      //let color= "warning"
       return "warning";
    }
  }
function times(values){
   let myDate = new Date();
   if (values === "call"){
    timestamp.unshift({
      type: values,
      price: getCall(),
      when: myDate,
    })
  }
else if (values === "sms"){
    timestamp.unshift({
      type: values,
      price: getSms(),
      when: myDate,
   })
  }
}
function Stamps(){

for(var i = 0; i< timestamp.length; i++){
  let mome = moment(timestamp[i].when).fromNow()
  timestamp[i].ago = mome;
}
return timestamp;
}
//filtering my values
function filtering(output){
  let temp = []
  for(var i = 0; i < timestamp.length; i++){
  if(timestamp[i].type === output){
    temp.push(timestamp[i]);
  }
}
return temp;
}

  return {
        setCall : costcallSet,
         setSMS :  costsmsSet,
         setWarn : costwarnSet,
         setCrit : costcritSet,
         warning :getWarning,
         critical :getCritical,

        callTotals,
        smsTotals,

        calculate : updateSettings,
        getCALL : getCall,
        getSMS : getSms,
        getTotal : billsTotal,
         passesWarning,
        passesCritical,
        grandTotal,
        times,
        Stamps,
        filtering,
         myColor,

    }
}
