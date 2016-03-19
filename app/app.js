(function(){
    "use strict";

    let config = require('./appConfig.js');

    require(`../${config.path3dParty}/bootstrap/dist/css/bootstrap.min.css`);
    require('../styles/scss/global.scss');

    require(`../${config.path3dParty}/angular/angular.min.js`);
    require(`../${config.path3dParty}/angular-ui-router/release/angular-ui-router.min.js`);
    require(`../${config.path3dParty}/angular-animate/angular-animate.min.js`);

    angular.module(config.appName, [
        'ui.router',
        'ngAnimate'
    ]);

    require('./appRouting.js');
    require('./pages/home/homeCtrl.js');
    require('./pages/page1/page1Ctrl.js');
    require('./pages/page2/page2Ctrl.js');

})();