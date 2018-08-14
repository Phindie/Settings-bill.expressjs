describe('SettingsBill Expressjs DOM function', function(){

  it('Should return the total cost of the calls ', function(){
          var setting = settingCost();
          setting.call('call');

          assert.equal(settings.callCost(), 2.75);

    });
});
