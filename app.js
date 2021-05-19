// Switch the highlighted format in the chooser
function moveHighlight(node) {
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
}

function clearErrors() {
  fromInput.classList.remove('wrong-input');
  toInput.classList.remove('wrong-input');
}

// DOM elements
const fromInput = document.getElementById('from');
const fromChooser = document.getElementById('from-chooser');
const toInput = document.getElementById('to');
const toChooser = document.getElementById('to-chooser');

// Init allowed chars for each format
let allowedChars = new Map();
allowedChars.set('bin', '01');
allowedChars.set('dec', '0123456789');
allowedChars.set('oct', '01234567');
allowedChars.set('hex', '0123456789abcdef');

let from = 'bin';
let fromAllowed = allowedChars.get(from);
let to = 'dec';
let toAllowed = allowedChars.get(to);

// TODO convert on format change

// Change format of 'from' field
fromChooser.childNodes.forEach(node => {
  node.addEventListener('click', (e) => {
    from = node.textContent.toLowerCase();
    fromAllowed = allowedChars.get(from);
    moveHighlight(node);
  });
});

// Change format of 'to' field
toChooser.childNodes.forEach(node => {
  node.addEventListener('click', (e) => {
    to = node.textContent.toLowerCase();
    toAllowed = allowedChars.get(to);
    moveHighlight(node);
  });
});

// Handle 'from' input 
fromInput.addEventListener('input', (e) => {
  clearErrors();
  let val = fromInput.value.toLowerCase().trim();

  if (e.target === document.activeElement) {
    toInput.value = convert(from, to, val, fromAllowed, toAllowed);
  }
});

// Handle 'to' input
toInput.addEventListener('input', (e) => {
  clearErrors();
  let val = toInput.value.toLowerCase().trim();

  if (e.target === document.activeElement) {
    fromInput.value = convert(to, from, val, toAllowed, fromAllowed);
  }
});
