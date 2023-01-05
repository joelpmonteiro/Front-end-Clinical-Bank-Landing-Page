/* eslint-disable prettier/prettier */
/* eslint-disable no-redeclare */

export const formatNumber = (value) => {
  value = convertToFloatNumber(value);
  console.log('func 01: ', value)
  return value.formatMoney(2, ",", ".");
};
//transforma a entrada em número float
const convertToFloatNumber = function (value) {
  value = value.toString();
  console.log('teste00:', value)
  if (value.indexOf(".") !== -1 && value.indexOf(",") !== -1) {
    if (value.indexOf(".") < value.indexOf(",")) {
      console.log('teste 01: ', parseFloat(value.replace(/,/gi, "")))
      return parseFloat(value.replace(/,/gi, ""));
    } else {
      console.log('teste 02: ', parseFloat(value.replace(/,/gi, "")))

      return parseFloat(value.replace(/\./gi, "").replace(/,/gi, "."));
    }
  } else {
    return parseFloat(value);
  }
};
//prototype para formatar a saída
Number.prototype.formatMoney = function (c, d, t) {
  var n = this,
    c = isNaN((c = Math.abs(c))) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
      Math.abs(n - i)
        .toFixed(c)
        .slice(2)
      : "")
  );
};
