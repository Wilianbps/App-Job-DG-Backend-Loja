export function arrayToObject(arr) {
  return arr.reduce(function (obj, element, index) {
    obj[index] = element;
    return obj;
  }, {});
}
