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
    require('./appAuthCheck.js');
    require('./services/authService.js');
    require('./services/userService.js');

    require('./pages/public/home/homeCtrl.js');
    require('./pages/public/login/loginCtrl.js');
    require('./pages/public/registration/registrationCtrl.js');

    require('./pages/private/dashboard/dashboardCtrl.js');
    require('./pages/private/profile/profileCtrl.js');

})();