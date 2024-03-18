import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

const board = document.querySelector("[data-board]")
const pos = document.querySelector("[data-pos]")
const btnLight = document.querySelector("[data-btn-light]")
const btnDark = document.querySelector("[data-btn-dark]")

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
const length = getComputedStyle(board).getPropertyValue('--length');

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

const s = randomSquare()
console.log(s, notation(s))
pos.innerText = notation(s)

const highlightSquare = ({ file, rank }, color = "red" ) => {
  const el = document.querySelector(`[data-file="${file}"][data-rank="${rank}"]`)
  el.classList.add("flex", "justify-center", "align-center", "h-full")
  // el.innerHTML = "<div></div>"
  el.style.backgroundColor = color
}

let userSelectedColor;

btnDark.addEventListener("click", () => {
  userSelectedColor = "dark"
  const result = checkSquareColor(s, userSelectedColor)
  const color = (result) ? "green" : "red"
  highlightSquare(s, color)
})


btnLight.addEventListener("click", () => {
  userSelectedColor = "light"
  const result = checkSquareColor(s, userSelectedColor)
  const color = (result) ? "green" : "red"
  highlightSquare(s, color)
})


const checkSquareColorAndLog = () => {
    if (checkSquareColor(s, userSelectedColor)) {
        console.log("true");
    } else {
        console.log("false");
    }
}




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
