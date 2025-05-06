(function () {
  "use strict";

  angular.module("public").controller("SignupController", SignupController);

  SignupController.$inject = ["UserInfoService", "MenuService"];
  function SignupController(UserInfoService, MenuService) {
    var ctrl = this;
    ctrl.register = function () {
      var parsed = parseMenuItemCode(ctrl.item);
      if (!parsed) {
        ctrl.itemNotFound = true;
        ctrl.isRegistered = false;
        return;
      }

      MenuService.getMenuItems(parsed.url).then(function (response) {
        console.log("register response:", response);
        if (response) {
          UserInfoService.register({
            firstName: ctrl.firstname,
            lastName: ctrl.lastname,
            email: ctrl.email,
            phone: ctrl.number,
            item: ctrl.item,
          });
          ctrl.isRegistered = true;
          ctrl.itemNotFound = false;
        } else {
          ctrl.itemNotFound = true;
          ctrl.isRegistered = false;
        }
      });
    };

    ctrl.validateItem = function () {
      var parsed = parseMenuItemCode(ctrl.item);
      if (!parsed) {
        ctrl.itemNotFound = true;
        return;
      }

      MenuService.getMenuItems(parsed.url).then(function (response) {
        ctrl.itemNotFound = !response;
      });
    };

    function parseMenuItemCode(code) {
      if (!code) return null;

      var match = /^([A-Za-z]+)(\d+)$/.exec(code);
      if (!match) return null;

      var category = match[1].toUpperCase();
      var itemIndex = parseInt(match[2]) - 1;
      if (itemIndex < 0) return null;

      var url = category + "/menu_items/" + itemIndex;
      return { category, itemIndex, url };
    }
  }
})();
