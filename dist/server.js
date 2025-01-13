"use strict";

var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const port = process.env.PORT || 3004;
_app.default.listen(port, () => {
  console.log("Server running on port 3004");
});