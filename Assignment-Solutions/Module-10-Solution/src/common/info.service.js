(function () {
  "use strict";

  angular.module("common").service("UserInfoService", UserInfoService);

  function UserInfoService() {
    var service = this;
    var user;

    service.register = function (userInfo) {
      user = userInfo;
    };

    service.isRegistered = function () {
      if (user) {
        return true;
      }
      return false;
    };

    service.getUserInfo = function () {
      return user;
    };
  }
})();
