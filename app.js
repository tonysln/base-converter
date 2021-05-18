// Converter
function convert(from, to, value) {
  if (!value) {
    return '';
  }
  // BIN -> BIN, DEC -> DEC, HEX -> HEX, OCT -> OCT
  // TODO check for incorrect input still
  if (from === to) {
    return value;
  }
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

// Check if given value is strictly in [0-9]
function filterInt(value) {
  return /^(\d+)$/.test(value) ? Number(value) : NaN;
}

// BIN -> DEC
function binToDec(value) {
  let total = 0;

  for (c of [...value]) {
    if (c !== '0' && c !== '1') {
      document.activeElement.classList.add('wrong-input');
      return '';
    }

    total *= 2;
    total += parseInt(c);
  }

  return total;
}

// DEC -> BIN
function decToBin(value) {
  let total = [];
  let divResult = parseInt(value);

  if (isNaN(filterInt(value))) {
    document.activeElement.classList.add('wrong-input');
    return '';
  }

  while (divResult > 0) {
    total.push(divResult % 2);
    divResult = parseInt(divResult / 2);
  }
  return total.reverse().join('');
}


// TODO split into 2 files (conversion logic & DOM stuff)
// DOM elements
const fromInput = document.getElementById('from');
const fromChooser = document.getElementById('from-chooser');
const toInput = document.getElementById('to');
const toChooser = document.getElementById('to-chooser');
let from = 'bin';
let to = 'dec';

// Change format of 'from' field
// TODO refactor
fromChooser.childNodes.forEach(node => {
  node.addEventListener('click', (e) => {
    from = node.textContent.toLowerCase();
    node.classList.add('hl-mono');

    let nextSibling = node.nextElementSibling;
    while (nextSibling) {
      nextSibling.classList.remove('hl-mono');
      nextSibling = nextSibling.nextElementSibling;
    }
    let prevSibling = node.previousElementSibling;
    while (prevSibling) {
      prevSibling.classList.remove('hl-mono');
      prevSibling = prevSibling.previousElementSibling;
    }
  });
});

// Change format of 'to' field
// TODO refactor
toChooser.childNodes.forEach(node => {
  node.addEventListener('click', (e) => {
    to = node.textContent.toLowerCase();
    node.classList.add('hl-mono');

    let nextSibling = node.nextElementSibling;
    while (nextSibling) {
      nextSibling.classList.remove('hl-mono');
      nextSibling = nextSibling.nextElementSibling;
    }
    let prevSibling = node.previousElementSibling;
    while (prevSibling) {
      prevSibling.classList.remove('hl-mono');
      prevSibling = prevSibling.previousElementSibling;
    }
  });
});

// Handle 'from' input 
fromInput.addEventListener('input', (e) => {
  if (fromInput.classList.contains('wrong-input')) {
    fromInput.classList.remove('wrong-input');
  }

  let val = fromInput.value;
  toInput.value = convert(from, to, val);
});

// Handle 'to' input
toInput.addEventListener('input', (e) => {
  if (toInput.classList.contains('wrong-input')) {
    toInput.classList.remove('wrong-input');
  }

  let val = toInput.value;
  fromInput.value = convert(to, from, val);
});
