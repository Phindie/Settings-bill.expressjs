let assert = require("assert");
let settingBill = require("../setting-bill");

describe('SettingsBill Expressjs DOM function', function(){

  it('Should return the total cost of the calls ', function(){
         var setBill = settingBill();

         setBill.callTotals("call");
         setBill.callTotals("call");

        assert.equal(setBill.getCALL(), 2.00);


    });

    it('Should return the total cost of the sms ', function(){
            var setting = settingBill();
            // setting.sms(1.00);

            setting.smsTotals('sms');
            setting.smsTotals('sms');
            setting.smsTotals('sms');
            setting.smsTotals('sms');

            assert.equal(setting.passesWarning(), false);
            assert.equal(setting.passesCritical(), false);

});

it('Should return the number of calls that are made ', function(){
  var setting = settingBill();

    setting.times('sms');
    setting.times('sms');

  assert.equal(setting.Stamps().length,2)

   });
it('Should return the time stamp of calls that are made ', function(){
     var setting = settingBill();

     setting.calculate('call');
     setting.times('call');
     let myDate = new Date();
     assert.deepEqual(setting.Stamps(),[
       {
         type: 'call',
         price: 2,
         when: myDate,
         ago : "a few seconds ago"
       }
     ]);
});
});
