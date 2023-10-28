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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
      if (isGameOver() === true) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayWinner)(winnerFound);
      }
    }
    setTimeout(() => {
      const attackedCoords = computer.randomMove(playerOne.playerBoard);
      console.log(playerOneBoard.board[attackedCoords[0]][attackedCoords[1]]);
      console.log(attackedCoords);
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
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");



class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  attack(x, y, enemyBoard) {
    enemyBoard.receiveAttack(x, y);
  }

  randomMove(opponent) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (opponent.board[x][y] === "hit" || opponent.board[x][y] === "miss") {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
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
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");



(0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.playerOne.playerBoard.board);
(0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.computer.playerBoard.board);

(0,_game__WEBPACK_IMPORTED_MODULE_1__.gameController)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi5cIjtcblxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIik7XG5mdW5jdGlvbiByZW5kZXJCb2FyZChhcnIpIHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIGNvbnN0IHBsYXllciA9IGNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgdGFibGUuY2xhc3NMaXN0LmFkZChgcGxheWVyLSR7cGxheWVyICsgMX1gKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgdGFibGUuYXBwZW5kQ2hpbGQodHIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIHRkLmRhdGFzZXQuY29yZHMgPSBgJHtpfSR7an1gO1xuICAgICAgaWYgKGFycltpXVtqXSBpbnN0YW5jZW9mIFNoaXApIHRkLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgLy8gaWYgKGFycltpXVtqXSA9PT0gXCJoaXRcIikgdGQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgIC8vIGlmIChhcnJbaV1bal0gPT09IFwibWlzc1wiKSB0ZC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheVdpbm5lcih3aW5uZXIpIHtcbiAgY29uc3Qgd2luTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyLWRpc3BsYXlcIik7XG4gIHdpbk1lc3NhZ2UudGV4dENvbnRlbnQgPSBgJHt3aW5uZXIubmFtZX0gaXMgdGhlIFdpbm5lciFgO1xufVxuXG5leHBvcnQgeyByZW5kZXJCb2FyZCwgZGlzcGxheVdpbm5lciB9O1xuXG4vLyBleHBvcnQgZnVuY3Rpb24gdGFrZWlucHV0KHBsYXllciwgZW5lbXkpIHtcbi8vICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4vLyAgICAgXCJjbGlja1wiLFxuLy8gICAgIChldmVudCkgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LnRhZ05hbWUpO1xuLy8gICAgICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIlREXCIpIHtcbi8vICAgICAgICAgcGxheWVyLmF0dGFjayhcbi8vICAgICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC54LFxuLy8gICAgICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LnksXG4vLyAgICAgICAgICAgZW5lbXkucGxheWVyQm9hcmQsXG4vLyAgICAgICAgICk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiYXR0YWNrXCIpO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhlbmVteS5wbGF5ZXJCb2FyZCk7XG4vLyAgICAgICB9XG4vLyAgICAgfSxcbi8vICAgICB7IG9uY2U6IHRydWUgfSxcbi8vICAgKTtcbi8vIH1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBkaXNwbGF5V2lubmVyIH0gZnJvbSBcIi4vZG9tXCI7XG5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoXCJBbXJcIik7XG5jb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJDb21wdXRlclwiKTtcbmNvbnN0IHBsYXllck9uZUJvYXJkID0gcGxheWVyT25lLnBsYXllckJvYXJkO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyLnBsYXllckJvYXJkO1xubGV0IHdpbm5lckZvdW5kID0gZmFsc2U7XG5cbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDAsIDAsIFwiaG9yaXpvbnRhbFwiLCAzKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDMsIDgsIFwiaG9yaXpvbnRhbFwiLCA1KTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDcsIDIsIFwiaG9yaXpvbnRhbFwiLCA2KTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDQsIFwiaG9yaXpvbnRhbFwiLCAxKTtcblxucGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDUsIDMsIFwiaG9yaXpvbnRhbFwiLCAzKTtcbnBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCgyLCAzLCBcImhvcml6b250YWxcIiwgNSk7XG5wbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoOCwgNywgXCJob3Jpem9udGFsXCIsIDEpO1xucGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDMsIDMsIFwiaG9yaXpvbnRhbFwiLCA2KTtcblxuZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgaWYgKHBsYXllck9uZS5wbGF5ZXJCb2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICB3aW5uZXJGb3VuZCA9IGNvbXB1dGVyO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChjb21wdXRlci5wbGF5ZXJCb2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICB3aW5uZXJGb3VuZCA9IHBsYXllck9uZTtcbiAgICBjb25zb2xlLmxvZyh3aW5uZXJGb3VuZCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnYW1lQ29udHJvbGxlcigpIHtcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItMlwiKTtcbiAgY29tcHV0ZXJHcmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiVERcIikge1xuICAgICAgcGxheWVyT25lLmF0dGFjayhcbiAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMF0sXG4gICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvcmRzWzFdLFxuICAgICAgICBjb21wdXRlci5wbGF5ZXJCb2FyZCxcbiAgICAgICk7XG4gICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgYCR7XG4gICAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZFtldmVudC50YXJnZXQuZGF0YXNldC5jb3Jkc1swXV1bXG4gICAgICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC5jb3Jkc1sxXVxuICAgICAgICAgIF1cbiAgICAgICAgfWAsXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coYENvbXB1dGVyOiAke2NvbXB1dGVyLnBsYXllckJvYXJkfWApO1xuICAgICAgaWYgKGlzR2FtZU92ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBkaXNwbGF5V2lubmVyKHdpbm5lckZvdW5kKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBhdHRhY2tlZENvb3JkcyA9IGNvbXB1dGVyLnJhbmRvbU1vdmUocGxheWVyT25lLnBsYXllckJvYXJkKTtcbiAgICAgIGNvbnNvbGUubG9nKHBsYXllck9uZUJvYXJkLmJvYXJkW2F0dGFja2VkQ29vcmRzWzBdXVthdHRhY2tlZENvb3Jkc1sxXV0pO1xuICAgICAgY29uc29sZS5sb2coYXR0YWNrZWRDb29yZHMpO1xuICAgICAgY29uc3QgYXR0YWNrZWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLWNvcmRzPVwiJHthdHRhY2tlZENvb3Jkc1swXX0ke2F0dGFja2VkQ29vcmRzWzFdfVwiXWAsXG4gICAgICApO1xuICAgICAgYXR0YWNrZWRDZWxsLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgIGAke3BsYXllck9uZUJvYXJkLmJvYXJkW2F0dGFja2VkQ29vcmRzWzBdXVthdHRhY2tlZENvb3Jkc1sxXV19YCxcbiAgICAgICk7XG4gICAgfSwgMTAwMCk7XG4gICAgaWYgKGlzR2FtZU92ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgZGlzcGxheVdpbm5lcih3aW5uZXJGb3VuZCk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IHsgcGxheWVyT25lLCBjb21wdXRlciwgZ2FtZUNvbnRyb2xsZXIsIGlzR2FtZU92ZXIgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0gajtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAoeCwgeSwgZGlyZWN0aW9uLCBsZW5ndGgpIHtcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgdGhpcy5ib2FyZFt4IC0gaV1beV0gPSBzaGlwO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHNoaXA7XG4gICAgfVxuICAgIHJldHVybiBzaGlwO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gaW5zdGFuY2VvZiBTaGlwKSB7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IFwiaGl0XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBcIm1pc3NcIjtcbiAgICB9XG4gIH1cblxuICBhbGxTdW5rKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdIGluc3RhbmNlb2YgU2hpcCAmJlxuICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0uaXNTdW5rKCkgPT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5ub09mSGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5ub09mSGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gdGhpcy5ub09mSGl0cykgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vaW5kZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGF0dGFjayh4LCB5LCBlbmVteUJvYXJkKSB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICB9XG5cbiAgcmFuZG9tTW92ZShvcHBvbmVudCkge1xuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHdoaWxlIChvcHBvbmVudC5ib2FyZFt4XVt5XSA9PT0gXCJoaXRcIiB8fCBvcHBvbmVudC5ib2FyZFt4XVt5XSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cbiAgICB0aGlzLmF0dGFjayh4LCB5LCBvcHBvbmVudCk7XG4gICAgcmV0dXJuIFt4LCB5XTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByZW5kZXJCb2FyZCB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgY29tcHV0ZXIsIHBsYXllck9uZSwgZ2FtZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbnJlbmRlckJvYXJkKHBsYXllck9uZS5wbGF5ZXJCb2FyZC5ib2FyZCk7XG5yZW5kZXJCb2FyZChjb21wdXRlci5wbGF5ZXJCb2FyZC5ib2FyZCk7XG5cbmdhbWVDb250cm9sbGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=