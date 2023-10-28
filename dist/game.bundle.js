/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayWinner: () => (/* binding */ displayWinner),
/* harmony export */   renderBoard: () => (/* binding */ renderBoard)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");


const container = document.getElementById("container");
function renderBoard(arr) {
  const table = document.createElement("table");
  const player = container.childNodes.length;
  table.classList.add(`player-${player + 1}`);

  container.appendChild(table);

  for (let i = 0; i < arr.length; i += 1) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < arr.length; j += 1) {
      const td = document.createElement("td");
      td.dataset.cords = `${i}${j}`;
      if (arr[i][j] instanceof ___WEBPACK_IMPORTED_MODULE_0__["default"]) td.classList.add("ship");
      // if (arr[i][j] === "hit") td.classList.add("hit");
      // if (arr[i][j] === "miss") td.classList.add("miss");
      tr.appendChild(td);
    }
  }
}

function displayWinner(winner) {
  const winMessage = document.querySelector(".winner-display");
  winMessage.textContent = `${winner.name} is the Winner!`;
}



// export function takeinput(player, enemy) {
//   container.addEventListener(
//     "click",
//     (event) => {
//       console.log(event.target.tagName);
//       if (event.target.tagName === "TD") {
//         player.attack(
//           event.target.dataset.x,
//           event.target.dataset.y,
//           enemy.playerBoard,
//         );
//         console.log("attack");
//         console.log(enemy.playerBoard);
//       }
//     },
//     { once: true },
//   );
// }


/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");


class Gameboard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i += 1) {
      this.board[i] = [];
      for (let j = 0; j < 10; j += 1) {
        this.board[i][j] = j;
      }
    }
  }

  placeShip(x, y, direction, length) {
    const ship = new ___WEBPACK_IMPORTED_MODULE_0__["default"](length);
    this.board[x][y] = ship;
    for (let i = 0; i < length; i += 1) {
      if (direction === "vertical") {
        this.board[x - i][y] = ship;
      } else if (direction === "horizontal") this.board[x][y + i] = ship;
    }
    return ship;
  }

  receiveAttack(x, y) {
    if (this.board[x][y] instanceof ___WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this.board[x][y].hit();
      this.board[x][y] = "hit";
    } else {
      this.board[x][y] = "miss";
    }
  }

  allSunk() {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (
          this.board[i][j] instanceof ___WEBPACK_IMPORTED_MODULE_0__["default"] &&
          this.board[i][j].isSunk() === false
        )
          return false;
      }
    }
    return true;
  }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(length) {
    this.length = length;
    this.noOfHits = 0;
  }

  hit() {
    this.noOfHits += 1;
  }

  isSunk() {
    if (this.length === this.noOfHits) return true;
    return false;
  }
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");


class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  attack(x, y, enemyBoard) {
    enemyBoard.receiveAttack(x, y);
  }

  randomMove(opponent) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (opponent.board[x][y] === "hit" || opponent.board[x][y] === "miss") {
      this.randomMove(opponent);
    }
    this.attack(x, y, opponent);
    return [x, y];
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computer: () => (/* binding */ computer),
/* harmony export */   gameController: () => (/* binding */ gameController),
/* harmony export */   isGameOver: () => (/* binding */ isGameOver),
/* harmony export */   playerOne: () => (/* binding */ playerOne)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



const playerOne = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("Amr");
const computer = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("Computer");
const playerOneBoard = playerOne.playerBoard;
const computerBoard = computer.playerBoard;
let winnerFound = false;

computerBoard.placeShip(0, 0, "horizontal", 3);
computerBoard.placeShip(3, 8, "horizontal", 5);
computerBoard.placeShip(7, 2, "horizontal", 6);
computerBoard.placeShip(1, 4, "horizontal", 1);

playerOneBoard.placeShip(5, 3, "horizontal", 3);
playerOneBoard.placeShip(2, 3, "horizontal", 5);
playerOneBoard.placeShip(8, 7, "horizontal", 1);
playerOneBoard.placeShip(3, 3, "horizontal", 6);

function isGameOver() {
  if (playerOne.playerBoard.allSunk() === true) {
    winnerFound = computer;
    return true;
  }
  if (computer.playerBoard.allSunk() === true) {
    winnerFound = playerOne;
    console.log(winnerFound);
    return true;
  }
  return false;
}

function gameController() {
  const computerGrid = document.querySelector(".player-2");
  computerGrid.addEventListener("click", (event) => {
    if (event.target.tagName === "TD") {
      playerOne.attack(
        event.target.dataset.cords[0],
        event.target.dataset.cords[1],
        computer.playerBoard,
      );
      event.target.classList.add(
        `${
          computerBoard.board[event.target.dataset.cords[0]][
            event.target.dataset.cords[1]
          ]
        }`,
      );
      console.log(`Computer: ${computer.playerBoard}`);
    }
    setTimeout(() => {
      const attackedCoords = computer.randomMove(playerOne.playerBoard);
      console.log(`Player 1: ${playerOne.playerBoard}`);
      const attackedCell = document.querySelector(
        `[data-cords="${attackedCoords[0]}${attackedCoords[1]}"]`,
      );
      attackedCell.classList.add(
        `${playerOneBoard.board[attackedCoords[0]][attackedCoords[1]]}`,
      );
    }, 1000);
    if (isGameOver() === true) {
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayWinner)(winnerFound);
    }
  });
}



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsV0FBVzs7QUFFM0M7O0FBRUEsa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBLDRCQUE0QixFQUFFLEVBQUUsRUFBRTtBQUNsQywrQkFBK0IseUNBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsYUFBYTtBQUMzQzs7QUFFc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsU0FBUyxZQUFZO0FBQ3JCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRHFCOztBQUVOO0FBQ2Y7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIseUNBQUk7QUFDekI7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyx5Q0FBSTtBQUN4QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0Esc0NBQXNDLHlDQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzdDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDZG9DOztBQUVyQjtBQUNmO0FBQ0E7QUFDQSwyQkFBMkIsa0RBQVM7QUFDcEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDckJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQ1E7O0FBRXRDLHNCQUFzQiwrQ0FBTTtBQUM1QixxQkFBcUIsK0NBQU07QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0JBQStCLHFCQUFxQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isc0JBQXNCO0FBQ3JEO0FBQ0Esd0JBQXdCLGtCQUFrQixFQUFFLGtCQUFrQjtBQUM5RDtBQUNBO0FBQ0EsV0FBVywyREFBMkQ7QUFDdEU7QUFDQSxLQUFLO0FBQ0w7QUFDQSxNQUFNLG1EQUFhO0FBQ25CO0FBQ0EsR0FBRztBQUNIOztBQUUyRCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLlwiO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcbmZ1bmN0aW9uIHJlbmRlckJvYXJkKGFycikge1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgcGxheWVyID0gY29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoO1xuICB0YWJsZS5jbGFzc0xpc3QuYWRkKGBwbGF5ZXItJHtwbGF5ZXIgKyAxfWApO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICB0YWJsZS5hcHBlbmRDaGlsZCh0cik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgdGQuZGF0YXNldC5jb3JkcyA9IGAke2l9JHtqfWA7XG4gICAgICBpZiAoYXJyW2ldW2pdIGluc3RhbmNlb2YgU2hpcCkgdGQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAvLyBpZiAoYXJyW2ldW2pdID09PSBcImhpdFwiKSB0ZC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgLy8gaWYgKGFycltpXVtqXSA9PT0gXCJtaXNzXCIpIHRkLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5V2lubmVyKHdpbm5lcikge1xuICBjb25zdCB3aW5NZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItZGlzcGxheVwiKTtcbiAgd2luTWVzc2FnZS50ZXh0Q29udGVudCA9IGAke3dpbm5lci5uYW1lfSBpcyB0aGUgV2lubmVyIWA7XG59XG5cbmV4cG9ydCB7IHJlbmRlckJvYXJkLCBkaXNwbGF5V2lubmVyIH07XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiB0YWtlaW5wdXQocGxheWVyLCBlbmVteSkge1xuLy8gICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbi8vICAgICBcImNsaWNrXCIsXG4vLyAgICAgKGV2ZW50KSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQudGFnTmFtZSk7XG4vLyAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiVERcIikge1xuLy8gICAgICAgICBwbGF5ZXIuYXR0YWNrKFxuLy8gICAgICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LngsXG4vLyAgICAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQueSxcbi8vICAgICAgICAgICBlbmVteS5wbGF5ZXJCb2FyZCxcbi8vICAgICAgICAgKTtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJhdHRhY2tcIik7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGVuZW15LnBsYXllckJvYXJkKTtcbi8vICAgICAgIH1cbi8vICAgICB9LFxuLy8gICAgIHsgb25jZTogdHJ1ZSB9LFxuLy8gICApO1xuLy8gfVxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSBqO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcCh4LCB5LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICB0aGlzLmJvYXJkW3ggLSBpXVt5XSA9IHNoaXA7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcDtcbiAgICB9XG4gICAgcmV0dXJuIHNoaXA7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSBpbnN0YW5jZW9mIFNoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IFwibWlzc1wiO1xuICAgIH1cbiAgfVxuXG4gIGFsbFN1bmsoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0gaW5zdGFuY2VvZiBTaGlwICYmXG4gICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXS5pc1N1bmsoKSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLm5vT2ZIaXRzID0gMDtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLm5vT2ZIaXRzICs9IDE7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSB0aGlzLm5vT2ZIaXRzKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIH1cblxuICBhdHRhY2soeCwgeSwgZW5lbXlCb2FyZCkge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgfVxuXG4gIHJhbmRvbU1vdmUob3Bwb25lbnQpIHtcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgaWYgKG9wcG9uZW50LmJvYXJkW3hdW3ldID09PSBcImhpdFwiIHx8IG9wcG9uZW50LmJvYXJkW3hdW3ldID09PSBcIm1pc3NcIikge1xuICAgICAgdGhpcy5yYW5kb21Nb3ZlKG9wcG9uZW50KTtcbiAgICB9XG4gICAgdGhpcy5hdHRhY2soeCwgeSwgb3Bwb25lbnQpO1xuICAgIHJldHVybiBbeCwgeV07XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGRpc3BsYXlXaW5uZXIgfSBmcm9tIFwiLi9kb21cIjtcblxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcihcIkFtclwiKTtcbmNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcIkNvbXB1dGVyXCIpO1xuY29uc3QgcGxheWVyT25lQm9hcmQgPSBwbGF5ZXJPbmUucGxheWVyQm9hcmQ7XG5jb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXIucGxheWVyQm9hcmQ7XG5sZXQgd2lubmVyRm91bmQgPSBmYWxzZTtcblxuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMCwgMCwgXCJob3Jpem9udGFsXCIsIDMpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgOCwgXCJob3Jpem9udGFsXCIsIDUpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNywgMiwgXCJob3Jpem9udGFsXCIsIDYpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgNCwgXCJob3Jpem9udGFsXCIsIDEpO1xuXG5wbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoNSwgMywgXCJob3Jpem9udGFsXCIsIDMpO1xucGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDIsIDMsIFwiaG9yaXpvbnRhbFwiLCA1KTtcbnBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCg4LCA3LCBcImhvcml6b250YWxcIiwgMSk7XG5wbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoMywgMywgXCJob3Jpem9udGFsXCIsIDYpO1xuXG5mdW5jdGlvbiBpc0dhbWVPdmVyKCkge1xuICBpZiAocGxheWVyT25lLnBsYXllckJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgIHdpbm5lckZvdW5kID0gY29tcHV0ZXI7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGNvbXB1dGVyLnBsYXllckJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgIHdpbm5lckZvdW5kID0gcGxheWVyT25lO1xuICAgIGNvbnNvbGUubG9nKHdpbm5lckZvdW5kKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdhbWVDb250cm9sbGVyKCkge1xuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci0yXCIpO1xuICBjb21wdXRlckdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJURFwiKSB7XG4gICAgICBwbGF5ZXJPbmUuYXR0YWNrKFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC5jb3Jkc1swXSxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMV0sXG4gICAgICAgIGNvbXB1dGVyLnBsYXllckJvYXJkLFxuICAgICAgKTtcbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICBgJHtcbiAgICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkW2V2ZW50LnRhcmdldC5kYXRhc2V0LmNvcmRzWzBdXVtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvcmRzWzFdXG4gICAgICAgICAgXVxuICAgICAgICB9YCxcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhgQ29tcHV0ZXI6ICR7Y29tcHV0ZXIucGxheWVyQm9hcmR9YCk7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0YWNrZWRDb29yZHMgPSBjb21wdXRlci5yYW5kb21Nb3ZlKHBsYXllck9uZS5wbGF5ZXJCb2FyZCk7XG4gICAgICBjb25zb2xlLmxvZyhgUGxheWVyIDE6ICR7cGxheWVyT25lLnBsYXllckJvYXJkfWApO1xuICAgICAgY29uc3QgYXR0YWNrZWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLWNvcmRzPVwiJHthdHRhY2tlZENvb3Jkc1swXX0ke2F0dGFja2VkQ29vcmRzWzFdfVwiXWAsXG4gICAgICApO1xuICAgICAgYXR0YWNrZWRDZWxsLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgIGAke3BsYXllck9uZUJvYXJkLmJvYXJkW2F0dGFja2VkQ29vcmRzWzBdXVthdHRhY2tlZENvb3Jkc1sxXV19YCxcbiAgICAgICk7XG4gICAgfSwgMTAwMCk7XG4gICAgaWYgKGlzR2FtZU92ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgZGlzcGxheVdpbm5lcih3aW5uZXJGb3VuZCk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IHsgcGxheWVyT25lLCBjb21wdXRlciwgZ2FtZUNvbnRyb2xsZXIsIGlzR2FtZU92ZXIgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==