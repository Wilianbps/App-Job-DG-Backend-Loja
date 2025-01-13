"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayToObject = arrayToObject;
function arrayToObject(arr) {
  return arr.reduce(function (obj, element, index) {
    obj[index] = element;
    return obj;
  }, {});
}