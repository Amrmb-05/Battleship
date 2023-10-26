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
/* harmony export */   renderBoard: () => (/* binding */ renderBoard),
/* harmony export */   takeinput: () => (/* binding */ takeinput)
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
      td.dataset.x = i;
      td.dataset.y = j;
      if (arr[i][j] instanceof ___WEBPACK_IMPORTED_MODULE_0__["default"]) td.innerText = "ship";
      tr.appendChild(td);
    }
  }
}

function takeinput(player, enemy) {
  container.addEventListener(
    "click",
    (event) => {
      console.log(event.target.tagName);
      if (event.target.tagName === "TD") {
        player.attack(event.target.dataset.x, event.target.dataset.y, enemy);
        console.log("attack");
        console.log(enemy.playerBoard);
      }
    },
    { once: true },
  );
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


class Player {
  constructor() {
    this.playerBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  attack(x, y, enemyBoard) {
    enemyBoard.receiveAttack(x, y);
  }

  randomMove(opponent) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
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
/* harmony export */   playerOne: () => (/* binding */ playerOne)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



const playerOne = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]();
const computer = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]();

const playerOneBoard = playerOne.playerBoard;
const computerBoard = computer.playerBoard;

computerBoard.placeShip(0, 0, "horizontal", 3);
computerBoard.placeShip(3, 8, "horizontal", 5);
computerBoard.placeShip(7, 2, "horizontal", 6);
computerBoard.placeShip(1, 4, "horizontal", 1);

playerOneBoard.placeShip(5, 3, "horizontal", 3);
playerOneBoard.placeShip(8, 3, "horizontal", 5);
playerOneBoard.placeShip(8, 7, "horizontal", 1);
playerOneBoard.placeShip(3, 3, "horizontal", 6);

let turnsPlayed = 0;
const currentPlayer = playerOneBoard;
while (turnsPlayed < 6) {
  (0,_dom__WEBPACK_IMPORTED_MODULE_1__["default"])(currentPlayer);
  setTimeout(() => {
    computer.randomMove();
  }, 2000);
  turnsPlayed += 1;
}



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFxQjs7QUFFckI7QUFDTztBQUNQO0FBQ0E7QUFDQSxnQ0FBZ0MsV0FBVzs7QUFFM0M7O0FBRUEsa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSwrQkFBK0IseUNBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsTUFBTSxZQUFZO0FBQ2xCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ3FCOztBQUVOO0FBQ2Y7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIseUNBQUk7QUFDekI7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyx5Q0FBSTtBQUN4QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0Esc0NBQXNDLHlDQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzdDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDZG9DOztBQUVyQjtBQUNmO0FBQ0EsMkJBQTJCLGtEQUFTO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOOEI7QUFDQTs7QUFFOUIsc0JBQXNCLCtDQUFNO0FBQzVCLHFCQUFxQiwrQ0FBTTs7QUFFM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGdEQUFTO0FBQ1g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUUrQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLlwiO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJCb2FyZChhcnIpIHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIGNvbnN0IHBsYXllciA9IGNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgdGFibGUuY2xhc3NMaXN0LmFkZChgcGxheWVyLSR7cGxheWVyICsgMX1gKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgdGFibGUuYXBwZW5kQ2hpbGQodHIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIHRkLmRhdGFzZXQueCA9IGk7XG4gICAgICB0ZC5kYXRhc2V0LnkgPSBqO1xuICAgICAgaWYgKGFycltpXVtqXSBpbnN0YW5jZW9mIFNoaXApIHRkLmlubmVyVGV4dCA9IFwic2hpcFwiO1xuICAgICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFrZWlucHV0KHBsYXllciwgZW5lbXkpIHtcbiAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChldmVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LnRhZ05hbWUpO1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIlREXCIpIHtcbiAgICAgICAgcGxheWVyLmF0dGFjayhldmVudC50YXJnZXQuZGF0YXNldC54LCBldmVudC50YXJnZXQuZGF0YXNldC55LCBlbmVteSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXR0YWNrXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlbmVteS5wbGF5ZXJCb2FyZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfSxcbiAgKTtcbn1cbiIsImltcG9ydCBTaGlwIGZyb20gXCIuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0gajtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAoeCwgeSwgZGlyZWN0aW9uLCBsZW5ndGgpIHtcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgdGhpcy5ib2FyZFt4IC0gaV1beV0gPSBzaGlwO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHNoaXA7XG4gICAgfVxuICAgIHJldHVybiBzaGlwO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gaW5zdGFuY2VvZiBTaGlwKSB7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IFwiaGl0XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBcIm1pc3NcIjtcbiAgICB9XG4gIH1cblxuICBhbGxTdW5rKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdIGluc3RhbmNlb2YgU2hpcCAmJlxuICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0uaXNTdW5rKCkgPT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5ub09mSGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5ub09mSGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gdGhpcy5ub09mSGl0cykgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgYXR0YWNrKHgsIHksIGVuZW15Qm9hcmQpIHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gIH1cblxuICByYW5kb21Nb3ZlKG9wcG9uZW50KSB7XG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHRoaXMuYXR0YWNrKHgsIHksIG9wcG9uZW50KTtcbiAgICByZXR1cm4gW3gsIHldO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgdGFrZWlucHV0IGZyb20gXCIuL2RvbVwiO1xuXG5jb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKCk7XG5jb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoKTtcblxuY29uc3QgcGxheWVyT25lQm9hcmQgPSBwbGF5ZXJPbmUucGxheWVyQm9hcmQ7XG5jb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXIucGxheWVyQm9hcmQ7XG5cbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDAsIDAsIFwiaG9yaXpvbnRhbFwiLCAzKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDMsIDgsIFwiaG9yaXpvbnRhbFwiLCA1KTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDcsIDIsIFwiaG9yaXpvbnRhbFwiLCA2KTtcbmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDQsIFwiaG9yaXpvbnRhbFwiLCAxKTtcblxucGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDUsIDMsIFwiaG9yaXpvbnRhbFwiLCAzKTtcbnBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCg4LCAzLCBcImhvcml6b250YWxcIiwgNSk7XG5wbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoOCwgNywgXCJob3Jpem9udGFsXCIsIDEpO1xucGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDMsIDMsIFwiaG9yaXpvbnRhbFwiLCA2KTtcblxubGV0IHR1cm5zUGxheWVkID0gMDtcbmNvbnN0IGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmVCb2FyZDtcbndoaWxlICh0dXJuc1BsYXllZCA8IDYpIHtcbiAgdGFrZWlucHV0KGN1cnJlbnRQbGF5ZXIpO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb21wdXRlci5yYW5kb21Nb3ZlKCk7XG4gIH0sIDIwMDApO1xuICB0dXJuc1BsYXllZCArPSAxO1xufVxuXG5leHBvcnQgeyBwbGF5ZXJPbmUsIGNvbXB1dGVyIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=