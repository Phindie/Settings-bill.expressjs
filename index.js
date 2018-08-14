const exphbs  = require('express-handlebars');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const SettingCost = require('./setting-bill')
const calc = SettingCost();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//bodyParser process or converting html data sent to the server
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('public'));

//accessesors
app.get('/', function (req, res) {
  let calls = calc.getCALL();
  let smss = calc.getSMS();
  let criticals = calc.critical();
  let warnings = calc.warning();

//getTotals
  let callTotals = calc.callTotals();
  let smsTotals = calc.smsTotals();
  let grandTotal = calc.grandTotal();
  let color = calc.myColor();

  res.render('home',{grandTotal,callTotals,smsTotals,criticals,warnings,calls,smss,color});

});

//bill type
 app.post('/action/', function (req, res){
   //action = values of
   let value = req.body.actionType;
   calc.calculate(value);
   calc.times(value);
 res.redirect('/');

 // console.log(action)
});

//displaying the timestamp

//Modifiers
app.post('/settings', function(req, res){
  let calls = parseFloat(req.body.callCost);
  let smss = parseFloat(req.body.smsCost);
  let warnings = parseFloat(req.body.warningLevel);
  let criticals = parseFloat(req.body.criticalLevel);
  calc.setWarn(warnings);
  calc.setCrit(criticals);
  calc.setCall(calls);
  calc.setSMS(smss);
  // console.log(calc.getCALL());
  res.redirect('/');


});

app.get('/actions', function (req, res){

res.render('actions', {timestamp:calc.Stamps()});
});

app.get('/actions/:type', function (req, res){
  let type = req.params.type;
  calc.Stamps();

res.render('actions', {timestamp:calc.filtering(type)});
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
