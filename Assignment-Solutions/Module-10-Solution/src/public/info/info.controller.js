(function () {
  "use strict";

  angular.module("public").controller("InfoController", InfoController);

  InfoController.$inject = ["UserInfoService", "MenuService"];
  function InfoController(UserInfoService, MenuService) {
    var ctrl = this;

    ctrl.isRegistered = UserInfoService.isRegistered();
    ctrl.user = UserInfoService.getUserInfo();

    if (ctrl.isRegistered) {
      var item = ctrl.user.item;
      var category = item[0].toUpperCase();
      var itemIndex = parseInt(item[1]) - 1;
      var url = category + "/menu_items/" + itemIndex;

      MenuService.getMenuItems(url).then(function (response) {
        ctrl.menuItem = response;
        ctrl.menuItem.image_url =
          "images/menu/" + category + "/" + ctrl.user.item + ".jpg";
      });
    }
  }
})();
