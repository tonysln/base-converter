// Converter
function convert(from, to, value, allowed) {
  if (!value) {
    return '';
  }

  // Check if input is correct
  for (c of value) {
    if (!allowed.includes(c)) {
      document.activeElement.classList.add('wrong-input');
      return '';
    }
  }

  // BIN -> BIN, DEC -> DEC, HEX -> HEX, OCT -> OCT
  if (from === to) {
    return value;
  }

  // TODO refactor; cover multiple ways in a single function
  // BIN -> DEC
  if (from === 'bin' && to === 'dec') {
    return binToDec(value);
  }
  // DEC -> BIN
  if (from === 'dec' && to === 'bin') {
    return decToBin(value);
  }
  return '';
}

// BIN -> DEC
function binToDec(value) {
  let total = 0;
  for (c of [...value]) {
    total *= 2;
    total += parseInt(c);
  }
  return total;
}

// DEC -> BIN
function decToBin(value) {
  let total = [];
  let divResult = parseInt(value);
  while (divResult > 0) {
    total.push(divResult % 2);
    divResult = parseInt(divResult / 2);
  }
  return total.reverse().join('');
}
