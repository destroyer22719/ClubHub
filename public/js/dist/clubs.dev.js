"use strict";

(function _callee2() {
  var clubList, searchForm, searchValue, clubResultsCount, clubsRes, clubsResJSON, clubsJSON, clubsCount, displayClubs;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          clubList = $("#clubs");
          searchForm = $("form");
          searchValue = $("input");
          clubResultsCount = $("#count"); // console.log(clubResultsCount.);

          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch("/api/clubs"));

        case 6:
          clubsRes = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(clubsRes.json());

        case 9:
          clubsResJSON = _context2.sent;
          clubsJSON = clubsResJSON.clubs;
          clubsCount = clubsResJSON.count;

          displayClubs = function displayClubs(clubs, count) {
            if (count === 0) {
              return clubList.html("<h2>No Clubs Found</h2>");
            }

            console.log(count);
            clubResultsCount.text("".concat(count, " ").concat(count > 1 ? "Results" : "Result"));
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
            var searchRes, searchResult, clubResult, clubCount;
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
                    clubResult = searchResult.clubs;
                    clubCount = searchResult.count;
                    displayClubs(clubResultsCount, clubCount);

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          displayClubs(clubsJSON, clubsCount);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
})();