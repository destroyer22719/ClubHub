"use strict";

(function _callee2() {
  var clubList, clubsRes, searchForm, searchValue, clubsJSON, displayClubs;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          clubList = $("#clubs");
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/clubs"));

        case 3:
          clubsRes = _context2.sent;
          searchForm = $("form");
          searchValue = $("input");
          _context2.next = 8;
          return regeneratorRuntime.awrap(clubsRes.json());

        case 8:
          clubsJSON = _context2.sent;

          displayClubs = function displayClubs(clubs) {
            if (clubs.length === 0) {
              clubList.html("<h2>No Clubs Found</h2>");
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = clubs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                club = _step.value;
                clubList.html("");
                clubList.append("\n                <a target=\"_blank\" href=\"club.html?id=".concat(club._id, "\">\n                    <div>\n                        <p>").concat(club.name, "</p>\n                        <p>").concat(club.location.city, ", ").concat(club.location.province, ", ").concat(club.location.country, "<p>\n                        <p>").concat(club.desc, "</p>\n                        <p>Members: ").concat(club.members.length, "</p>\n                    </div>\n                </a>\n            "));
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          };

          searchForm.on("submit", function _callee(e) {
            var searchRes, searchResult;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    e.preventDefault();
                    _context.next = 3;
                    return regeneratorRuntime.awrap(fetch("/api/clubs?search=".concat(searchValue.val())));

                  case 3:
                    searchRes = _context.sent;
                    _context.next = 6;
                    return regeneratorRuntime.awrap(searchRes.json());

                  case 6:
                    searchResult = _context.sent;
                    displayClubs(searchResult);

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          displayClubs(clubsJSON);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
})();