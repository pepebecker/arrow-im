const textarea = document.querySelector('textarea')

const keys = Array.from(document.querySelectorAll('.key'))

let inputCode = ''
let uppercase = false

const clear = () => {
  inputCode = ''
  uppercase = false
  Array.from(document.querySelectorAll('.key.active')).forEach(key => {
    key.classList.remove('active')
  })
}

for (const key of keys) {
  key.addEventListener('mousedown', ev => {
    const value = key.dataset.value

    if (typeof window.navigator.vibrate === 'function') {
      window.navigator.vibrate(100)
    }

    // Shift
    if (value === 'shift') {
      uppercase = !uppercase
      if (uppercase) key.classList.add('active')
      else key.classList.remove('active')
      return
    }

    // Backspace
    if (value === 'bs') {
      if (inputCode.length == 0) {
        textarea.textContent = textarea.textContent.slice(0, -1)
      }
      clear()
      return
    }

    // Return
    if (value === 'return') {
      clear()
      textarea.textContent += '\n'
      return
    }

    // Numbers and special characters
    if (!isNaN(value) || ',.?!'.includes(value)) {
      clear()
      textarea.textContent += value
      return
    }

    // Space
    if (value === 's' && inputCode === '') {
      clear()
      textarea.textContent += ' '
      return
    }

    inputCode += value

    if (inputCode.length >= 2) {
      processCode(inputCode, uppercase)
      clear()
    } else {
      key.classList.add('active')
    }
  })
}

const table = {
  uh: 'a',
  oo: 'b',
  ls: 'c',
  vr: 'd',
  ll: 'e',
  lh: 'e',
  lv: 'f',
  lu: 'g',
  du: 'h',
  vs: 'i',
  vv: 'i',
  hd: 'j',
  vl: 'k',
  vh: 'l',
  uu: 'm',
  uv: 'n',
  vd: 'n',
  vu: 'n',
  os: 'o',
  vo: 'p',
  ov: 'q',
  ou: 'r',
  lr: 's',
  hv: 't',
  dh: 'u',
  ds: 'v',
  dd: 'w',
  rl: 'x',
  dv: 'y',
  rh: 'z',
}

function processCode(code, uppercase = false) {
  let value = table[code]
  if (!value) {
    value = code.replace(/u/g, 'ᐱ')
      .replace(/l/g, 'ᐸ')
      .replace(/r/g, 'ᐳ')
      .replace(/d/g, 'ᐯ')
      .replace(/h/g, '―')
      .replace(/v/g, '❘')
  } else if (uppercase) {
    value = value.toUpperCase()
  }
  textarea.textContent += value
}
