import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

const answer = document.querySelector("[data-answer]")
const quiz = document.querySelector("[data-quiz]")
const board = document.querySelector("[data-board]")
const btnContinue = document.querySelector("[data-continue]")
const pos = document.querySelector("[data-pos]")
const btnLight = document.querySelector("[data-btn-light]")
const btnDark = document.querySelector("[data-btn-dark]")
const timerEl = document.querySelector("[data-timer]")

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
const length = getComputedStyle(board).getPropertyValue('--length');
let randomSquareObj = {}
let randomSquareValue = ""
let timerId = ""

function countdown(seconds = 30, diff = 1000) {
  let id
  timerEl.innerText = `time left: ${seconds}`
  function start() {
    const id = setInterval(() => {
      console.log()
      seconds -= 1
      timerEl.innerText = `time left: ${seconds}`
      if (seconds <= 0) {
        clearInterval(timerId)
        vizibilityToggle()

        highlightSquare(randomSquareObj)
      }
    }, diff)
    timerId = id

  }
  return start
}

countdown(3, 1000)()

const drawBoard = (width) => {
  const widthMinusOne = width - 1
  let squares = ""
  let color = ["dark", "light"]
  board.style.gridTemplateRows = `repeat(${width}, ${length})`
  board.style.gridTemplateColumns = `repeat(${width}, ${length})`

  let i = 0
  for (let rank = widthMinusOne; rank >= 0; rank--) {
    for (let file = 0; file < width; file++) {
      i += 1
      if (i >= 2) {
        i = 0
      }
      squares += `
        <div class="square ${color[i]}" data-file=${file} data-rank=${rank}></div>
      `
      if (file % widthMinusOne === 0 && file !== 0) {
        [color[0], color[1]] = [color[1], color[0]]
      }
    }
  }
  board.innerHTML = squares
}

drawBoard(8)

const checkSquareColor = ({ file, rank }, color) => {
  let c;
  if (file % 2 === 0) {
    if (rank % 2 === 0) {
      c = "dark"
    } else {
      c = "light"
    }
  } else {
    if (rank % 2 === 0) {
      c = "light"
    } else {
      c = "dark"
    }
  }

  if (color === c) return true
  return false
}

const random = (num) => Math.floor(Math.random() * num)

const randomSquare = () => {
  return {
    file: random(8),
    rank: random(8)
  }
}

const notation = ({ file, rank }) => `${letters[file]}${++rank}`

randomSquareObj = randomSquare()
randomSquareValue = notation(randomSquareObj)
console.log(randomSquareObj, randomSquareValue)
pos.innerText = randomSquareValue
console.log(randomSquareObj, randomSquareValue)

const highlightSquare = ({ file, rank }, color = "red" ) => {
  const el = document.querySelector(`[data-file="${file}"][data-rank="${rank}"]`)
  el.classList.add("flex", "justify-center", "align-center", "h-full")
  // el.innerHTML = "<div></div>"
  el.style.backgroundColor = color
}

const vizibilityToggle = () => {
  console.log('toggled')
  answer.classList.toggle('hidden')

  quiz.classList.toggle('hidden')
  // const s = randomSquare()
  // pos.innerText = notation(s)
}

let userSelectedColor;

btnDark.addEventListener("click", () => {
  console.log('Dark button clicked')
  userSelectedColor = "dark"
  clearInterval(timerId)
  const result = checkSquareColor(randomSquareObj, userSelectedColor)
  const color = (result) ? "green" : "red"
  console.log(randomSquareObj, randomSquareValue)
  highlightSquare(randomSquareObj, color)
  vizibilityToggle()
})


btnLight.addEventListener("click", () => {
  console.log('light button clicked')
  userSelectedColor = "light"
  clearInterval(timerId)
  const result = checkSquareColor(randomSquareObj, userSelectedColor)
  const color = (result) ? "green" : "red"
  console.log(randomSquareObj, randomSquareValue)
  highlightSquare(randomSquareObj, color)
  vizibilityToggle()
})


const checkSquareColorAndLog = () => {
    if (checkSquareColor(s, userSelectedColor)) {
        console.log("true");
    } else {
        console.log("false");
    }
}


btnContinue.addEventListener("click", () => {
  countdown(3, 1000)()
  vizibilityToggle()
  randomSquareObj = randomSquare()
  randomSquareValue = notation(randomSquareObj)
  pos.innerText = randomSquareValue
})



// const intervalManager = (flag, callback, time, intervalId = null) => {
//   if (flag) {
//     intervalId = setInterval(callback, time);
//   } else {
//     clearInterval(intervalId)
//   }
// }


// const timerCallback = () => {
//   timerEl.innerText = `time left: ${seconds}`
//
//   seconds -= 1
//   if (seconds < 0) {
//     intervalManager(timerId)
//     vizibilityToggle()
//   }
// }

// const timerId = intervalManager(true, timerCallback, 1000)






// checkSquareColor

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector('#counter'))
