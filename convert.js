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
    if (!fromAllowed.includes(c)) {
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
  const base = chars.length;
  let total = [];
  let divResult = parseInt(value);
  while (divResult > 0) {
    total.push(chars[divResult % base]);
    divResult = parseInt(divResult / base);
  }
  return total.reverse().join('');
}

// BIN -> DEC, HEX, OCT
// HEX -> DEC, BIN, OCT
// OCT -> DEC, BIN, HEX
function convertFromBinHexOct(value, inChars, outChars) {
  const inBase = inChars.length;
  const outBase = outChars.length;

  let total = 0;
  for ([i, c] of [...value].entries()) {
    total += inChars.indexOf(c) * (inBase ** (value.length - i - 1));
  }

  return outBase === 10
    ? total
    : convertFromDecimal(total, outChars);
}
