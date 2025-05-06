describe("MenuService", function () {
  var MenuService, $httpBackend;
  var baseUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";

  beforeEach(function () {
    module("public");

    inject(function ($injector) {
      MenuService = $injector.get("MenuService");
      $httpBackend = $injector.get("$httpBackend");
    });
  });

  it("should return data when the menu item exists", function () {
    var url = "L/menu_items/0";
    var expected = {
      name: "Orange Chicken",
      description:
        "chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
    };

    $httpBackend.whenGET(baseUrl + url + ".json").respond(expected);
    MenuService.getMenuItems(url).then(function (response) {
      expect(response).toEqual(expected);
    });

    $httpBackend.flush();
  });

  it("should return null when the menu item does not exist", function () {
    var url = "L/menu_items/999";

    $httpBackend.whenGET(baseUrl + url + ".json").respond(null); // null means "not found" in Firebase
    MenuService.getMenuItems(url).then(function (response) {
      expect(response).toBeNull();
    });

    $httpBackend.flush();
  });
});
