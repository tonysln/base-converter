// Converter
function convert(from, to, value, fromAllowed, toAllowed) {
  if (!value) {
    return '';
  }

  // Special hex case with 0x
  if (from === 'hex' && value[0] === '0' && value[1] === 'x') {
    value = value.slice(2);
  }

  // Check if input is valid
  for (c of value) {
    const tooManyDots = (value.split('.').length - 1) > 1;

    // Current char is illegal (except a single dot on index > 0)
    // TODO probably refactor this
    if (!fromAllowed.concat(['.']).includes(c) || tooManyDots || value[0] === '.') {
      document.activeElement.classList.add('wrong-input');
      return '';
    }
  }

  // BIN -> BIN
  // DEC -> DEC
  // HEX -> HEX
  // OCT -> OCT
  if (from === to) {
    return value;
  }

  // DEC -> BIN, HEX, OCT
  if (from === 'dec') {
    return convertFromDecimal(value, [...toAllowed]);
  }

  // BIN -> DEC, HEX, OCT
  // HEX -> DEC, BIN, OCT
  // OCT -> DEC, BIN, HEX
  if (['bin', 'hex', 'oct'].includes(from)) {
    return convertFromBinHexOct(value, [...fromAllowed], [...toAllowed]);
  }

  // Unknown
  return '';
}

// DEC -> BIN, HEX, OCT
function convertFromDecimal(value, chars) {
  value = value.toString();
  const base = chars.length;

  // Check if value contains a fraction
  let fraction = null;
  if (value.includes('.')) {
    let parts = value.split('.');
    value = parts[0];
    fraction = '.' + parts[1];
  }

  let total = [];

  // Main part
  let divResult = parseInt(value);
  while (divResult > 0) {
    total.push(chars[divResult % base]);
    divResult = parseInt(divResult / base);
  }
  let result = total.reverse().join('');

  // Fraction part (if present)
  if (fraction) {
    let multResult = parseFloat(fraction);
    if (multResult) {
      result += '.';
      // Do the opposite of main part - mult instead of div
      for (let i = 0; i < fraction.length; i++) {
        multResult *= base;
        const resultInt = parseInt(multResult);
        result += chars[resultInt];
        // Subtract the int part to avoid growth
        multResult -= resultInt;
      }
    }
  }

  return result;
}

// BIN -> DEC, HEX, OCT
// HEX -> DEC, BIN, OCT
// OCT -> DEC, BIN, HEX
function convertFromBinHexOct(value, inChars, outChars) {
  value = value.toString();
  const inBase = inChars.length;
  const outBase = outChars.length;

  // Check if value contains a fraction
  let fraction = null;
  if (value.includes('.')) {
    let parts = value.split('.');
    value = parts[0];
    fraction = parts[1];
  }

  // Main part
  let total = 0;
  for ([i, c] of [...value].entries()) {
    total += inChars.indexOf(c) * (inBase ** (value.length - i - 1));
  }

  // Fraction part (if present)
  if (fraction) {
    for ([i, c] of [...fraction].entries()) {
      total += inChars.indexOf(c) * (inBase ** -(i + 1));
    }
  }

  return outBase === 10
    ? total
    : convertFromDecimal(total, outChars);
}
