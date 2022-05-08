export const orderByLabel = (array) =>
  array.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });

export const normalizeCurrency = (num) => {
  if (num) {
    num = num.toString();
    const regex = /\d{1,3}(?:\.\d{3})*([,.]\d*|)/;
    const numLength = num.length;
    const hasSymbol = num.match(/[$€]/);
    const hasDot = num.search('\\.');
    const hasComma = num.search(',');
    if (hasSymbol) {
      num = num.match(regex) ? num.match(regex)[0] : num;
    }
    if (
      !(
        hasDot === numLength - 3 ||
        hasDot === numLength - 2 ||
        hasComma === -1
      ) ||
      hasSymbol
    ) {
      num = parseFloat(num.split('.').join('').replace(',', '.')).toFixed(2);
    } else {
      num = parseFloat(num).toFixed(2);
    }
    return Number(num);
  }
  return null;
};
