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

function fromInputEventHandler(e) {
  clearErrors();
  let val = fromInput.value.toLowerCase().trim();
  toInput.value = convert(from, to, val, fromAllowed, toAllowed);

  // Also handle ASCII in case the block is open
  asciiHandler(e);
}

function toInputEventHandler(e) {
  clearErrors();
  let val = toInput.value.toLowerCase().trim();
  fromInput.value = convert(to, from, val, toAllowed, fromAllowed);
}

function asciiHandler(e) {
  if (asciiBlock.open) {
    const vals = fromInput.value.split(' ');
    for (val of vals) {
      if (val) {
        // TODO: make sure val is in decimal
        // asciiResult.textContent += String.fromCharCode(parseInt(val));
      }
    }
  } else {
    asciiResult.textContent = '';
  }
}


// DOM elements
const fromInput = document.getElementById('from');
const fromChooser = document.getElementById('from-chooser');
const toInput = document.getElementById('to');
const toChooser = document.getElementById('to-chooser');
const asciiBlock = document.getElementById('ascii-block');
let asciiResult = document.getElementById('ascii-result');

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

// Change format of 'from' field
fromChooser.childNodes.forEach(node => {
  node.addEventListener('click', (e) => {
    from = node.textContent.toLowerCase();
    fromAllowed = allowedChars.get(from);
    moveHighlight(node);
    fromInputEventHandler();
    toInputEventHandler();
  });
});

// Change format of 'to' field
toChooser.childNodes.forEach(node => {
  node.addEventListener('click', (e) => {
    to = node.textContent.toLowerCase();
    toAllowed = allowedChars.get(to);
    moveHighlight(node);
    fromInputEventHandler();
    toInputEventHandler();
  });
});

// Handle 'from' input 
fromInput.addEventListener('input', fromInputEventHandler);
// Handle 'to' input
toInput.addEventListener('input', toInputEventHandler);
// Decode ASCII
asciiBlock.addEventListener('toggle', asciiHandler);
