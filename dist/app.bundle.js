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
const ships = document.querySelectorAll(".draggable");
ships.forEach((ship) => {
  ship.addEventListener("click", () => {
    ship.classList.toggle("vertical");
  });
});




/***/ }),

/***/ "./src/drag.js":
/*!*********************!*\
  !*** ./src/drag.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dragEnd: () => (/* binding */ dragEnd),
/* harmony export */   dragEnter: () => (/* binding */ dragEnter),
/* harmony export */   dragOver: () => (/* binding */ dragOver),
/* harmony export */   dragStart: () => (/* binding */ dragStart),
/* harmony export */   drop: () => (/* binding */ drop),
/* harmony export */   getDropTargetsHorizontalPosition: () => (/* binding */ getDropTargetsHorizontalPosition),
/* harmony export */   getDropTargetsVerticalPosition: () => (/* binding */ getDropTargetsVerticalPosition)
/* harmony export */ });
const dragStart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.classList.add("dragging");
};

const dragEnd = (e) => {
  e.target.classList.remove("dragging");
};

const dragOver = (e) => {
  e.preventDefault();
  e.target.classList.add("drag-over");
};

const dragEnter = (e) => {
  e.preventDefault();
  e.target.classList.add("drag-over");
};

const getDropTargetsHorizontalPosition = (element, x) => {
  const result = [];
  const box = element.getBoundingClientRect();
  const elementWidth = box.width;
  const numberOfBoxes = Math.floor(elementWidth / 25);
  console.log(numberOfBoxes);
  const mousePosition = x - box.x;
  const boxNumber = Math.ceil(mousePosition / 25);

  for (let i = 1; i < numberOfBoxes + 1; i += 1) {
    if (i !== boxNumber) {
      result.push(i - boxNumber);
    }
  }

  return result;
};

const getDropTargetsVerticalPosition = (element, y) => {
  const result = [];
  const box = element.getBoundingClientRect();
  const elementHeight = box.height;
  const numberOfBoxes = Math.floor(elementHeight / 25);
  console.log(numberOfBoxes);
  const mousePosition = y - box.y;
  const boxNumber = Math.ceil(mousePosition / 25);
  for (let i = 1; i < numberOfBoxes + 1; i += 1) {
    if (i !== boxNumber) {
      result.push(10 * (i - boxNumber));
    }
  }
  return result;
};

//   const getDropCoordinates

// eslint-disable-next-line no-restricted-globals
const drop = (e, arr) => {
  const ship = document.querySelector(".dragging");
  for (const num of arr) {
    let cord = String(Number(e.target.dataset.cords) + num);
    cord = cord.length === 1 ? `0${cord}` : cord;
    const cell = document.querySelector(`[data-cords="${cord}"]`);
    cell.classList.add("ship");
  }
  ship.remove();
  e.target.classList.add("ship");
};




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

computerBoard.populate();
// computerBoard.placeShip(0, 0, "horizontal", 3);
// computerBoard.placeShip(3, 8, "horizontal", 5);
// computerBoard.placeShip(7, 2, "horizontal", 6);
// computerBoard.placeShip(1, 4, "horizontal", 1);

// playerOneBoard.placeShip(0, 0, "vertical", 4);
// playerOneBoard.placeShip(2, 3, "horizontal", 5);
// playerOneBoard.placeShip(8, 7, "horizontal", 1);
// playerOneBoard.placeShip(3, 3, "horizontal", 6);

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

function gameLoop(event) {
  const computerGrid = document.querySelector(".player-2");
  const restartBtn = document.querySelector(".restart");
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
    if (isGameOver() === true) {
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayWinner)(winnerFound);
      computerGrid.removeEventListener("click", gameLoop);
      restartBtn.classList.toggle("hide");
      return;
    }
    console.log(`Computer: ${computer.playerBoard}`);
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
    if (isGameOver() === true) {
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.displayWinner)(winnerFound);
      computerGrid.removeEventListener("click", gameLoop);
      restartBtn.classList.toggle("hide");
    }
  }, 1000);
}
function gameController() {
  const computerGrid = document.querySelector(".player-2");

  computerGrid.addEventListener("click", gameLoop);
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
        this.board[x + i][y] = ship;
      } else if (direction === "horizontal") this.board[x][y + i] = ship;
    }
    return ship;
  }

  randomShipPlacement(length) {
    let x;
    let y;

    const positions = ["horizontal", "vertical"];
    const index = Math.floor(Math.random() * positions.length);
    if (positions[index] === "vertical") {
      for (let i = 0; i < length; i += 1) {
        if (
          x === undefined ||
          y === undefined ||
          this.board[x + i][y] instanceof ___WEBPACK_IMPORTED_MODULE_0__["default"]
        ) {
          x = Math.floor(Math.random() * (10 - length + 1));
          y = Math.floor(Math.random() * 10);
        }
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        if (
          x === undefined ||
          y === undefined ||
          this.board[x][y + i] instanceof ___WEBPACK_IMPORTED_MODULE_0__["default"]
        ) {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * (10 - length + 1));
        }
      }
    }
    this.placeShip(x, y, positions[index], length);
    return [x, y];
  }

  populate() {
    this.randomShipPlacement(5);
    this.randomShipPlacement(4);
    this.randomShipPlacement(3);
    this.randomShipPlacement(3);
    this.randomShipPlacement(2);
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
/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drag */ "./src/drag.js");




(0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.playerOne.playerBoard.board);

const startBtn = document.querySelector(".start-game");
startBtn.addEventListener("click", () => {
  startBtn.classList.toggle("hide");
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.computer.playerBoard.board);
  (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameController)();
});

const ships = document.querySelectorAll(".draggable");
let result;
ships.forEach((ship) => {
  ship.addEventListener("mousedown", (e) => {
    result = ship.classList.contains("vertical")
      ? _drag__WEBPACK_IMPORTED_MODULE_2__.getDropTargetsVerticalPosition(ship, e.clientY)
      : _drag__WEBPACK_IMPORTED_MODULE_2__.getDropTargetsHorizontalPosition(ship, e.clientX);
  });
});

const cells = document.querySelectorAll(".player-1 TD");

ships.forEach((ship) => {
  ship.addEventListener("dragstart", _drag__WEBPACK_IMPORTED_MODULE_2__.dragStart);
  ship.addEventListener("dragend", _drag__WEBPACK_IMPORTED_MODULE_2__.dragEnd);
  ship.addEventListener("mousedown", (e) => {
    e.target.parentNode.classList.add("dragging");
  });
  ship.addEventListener("mouseup", (e) => {
    e.target.parentNode.classList.remove("dragging");
  });
});
cells.forEach((cell) => {
  cell.addEventListener("dragenter", _drag__WEBPACK_IMPORTED_MODULE_2__.dragEnter);
  cell.addEventListener("dragover", _drag__WEBPACK_IMPORTED_MODULE_2__.dragOver);
  cell.addEventListener("drop", (e) => {
    _drag__WEBPACK_IMPORTED_MODULE_2__.drop(e, result);
    console.log(result[0]);
    let position;
    if (result[0] >= 10) {
      position = "vertical";
    } else {
      position = "horizontal";
    }
    const min =
      result[0] < 0
        ? String(result[0] + Number(e.target.dataset.cords))
        : e.target.dataset.cords;
    _game__WEBPACK_IMPORTED_MODULE_1__.playerOne.playerBoard.placeShip(
      Number(min[0]),
      Number(min[1]),
      position,
      result.length + 1,
    );
    const ships = document.querySelectorAll(".draggable");
    if (ships.length === 0) {
      startBtn.disabled = false;
    }
    console.log(ships);
  });
});

const restartBtn = document.querySelector(".restart");
// eslint-disable-next-line no-restricted-globals
restartBtn.addEventListener("click", () => location.reload());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxXQUFXOztBQUUzQzs7QUFFQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0EsNEJBQTRCLEVBQUUsRUFBRSxFQUFFO0FBQ2xDLCtCQUErQix5Q0FBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixhQUFhO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFcUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHVCQUF1QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsdUJBQXVCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLEtBQUs7QUFDeEMsd0RBQXdELEtBQUs7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFVRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RTRCO0FBQ1E7O0FBRXRDLHNCQUFzQiwrQ0FBTTtBQUM1QixxQkFBcUIsK0NBQU07QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU0sbURBQWE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIscUJBQXFCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrQkFBa0IsRUFBRSxrQkFBa0I7QUFDNUQ7QUFDQTtBQUNBLFNBQVMsMkRBQTJEO0FBQ3BFO0FBQ0E7QUFDQSxNQUFNLG1EQUFhO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFMkQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRnRDOztBQUVOO0FBQ2Y7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIseUNBQUk7QUFDekI7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlDQUFJO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlDQUFJO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyx5Q0FBSTtBQUN4QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0Esc0NBQXNDLHlDQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RGZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2RvQztBQUNUOztBQUVaO0FBQ2Y7QUFDQTtBQUNBLDJCQUEyQixrREFBUztBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOb0M7QUFDeUI7QUFDOUI7O0FBRS9CLGlEQUFXLENBQUMsNENBQVM7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBLEVBQUUsaURBQVcsQ0FBQywyQ0FBUTtBQUN0QixFQUFFLHFEQUFjO0FBQ2hCLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQW1DO0FBQzNDLFFBQVEsbUVBQXFDO0FBQzdDLEdBQUc7QUFDSCxDQUFDOztBQUVEOztBQUVBO0FBQ0EscUNBQXFDLDRDQUFjO0FBQ25ELG1DQUFtQywwQ0FBWTtBQUMvQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EscUNBQXFDLDRDQUFjO0FBQ25ELG9DQUFvQywyQ0FBYTtBQUNqRDtBQUNBLElBQUksdUNBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDRDQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RyYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuXCI7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xuZnVuY3Rpb24gcmVuZGVyQm9hcmQoYXJyKSB7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBjb25zdCBwbGF5ZXIgPSBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGg7XG4gIHRhYmxlLmNsYXNzTGlzdC5hZGQoYHBsYXllci0ke3BsYXllciArIDF9YCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRhYmxlKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICB0ZC5kYXRhc2V0LmNvcmRzID0gYCR7aX0ke2p9YDtcbiAgICAgIGlmIChhcnJbaV1bal0gaW5zdGFuY2VvZiBTaGlwKSB0ZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIC8vIGlmIChhcnJbaV1bal0gPT09IFwiaGl0XCIpIHRkLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAvLyBpZiAoYXJyW2ldW2pdID09PSBcIm1pc3NcIikgdGQuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlXaW5uZXIod2lubmVyKSB7XG4gIGNvbnN0IHdpbk1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1kaXNwbGF5XCIpO1xuICB3aW5NZXNzYWdlLnRleHRDb250ZW50ID0gYCR7d2lubmVyLm5hbWV9IGlzIHRoZSBXaW5uZXIhYDtcbn1cbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcmFnZ2FibGVcIik7XG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoXCJ2ZXJ0aWNhbFwiKTtcbiAgfSk7XG59KTtcblxuZXhwb3J0IHsgcmVuZGVyQm9hcmQsIGRpc3BsYXlXaW5uZXIgfTtcbiIsImNvbnN0IGRyYWdTdGFydCA9IChlKSA9PiB7XG4gIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIGUudGFyZ2V0LmlkKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyYWdnaW5nXCIpO1xufTtcblxuY29uc3QgZHJhZ0VuZCA9IChlKSA9PiB7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbn07XG5cbmNvbnN0IGRyYWdPdmVyID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZHJhZy1vdmVyXCIpO1xufTtcblxuY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZHJhZy1vdmVyXCIpO1xufTtcblxuY29uc3QgZ2V0RHJvcFRhcmdldHNIb3Jpem9udGFsUG9zaXRpb24gPSAoZWxlbWVudCwgeCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgY29uc3QgYm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgZWxlbWVudFdpZHRoID0gYm94LndpZHRoO1xuICBjb25zdCBudW1iZXJPZkJveGVzID0gTWF0aC5mbG9vcihlbGVtZW50V2lkdGggLyAyNSk7XG4gIGNvbnNvbGUubG9nKG51bWJlck9mQm94ZXMpO1xuICBjb25zdCBtb3VzZVBvc2l0aW9uID0geCAtIGJveC54O1xuICBjb25zdCBib3hOdW1iZXIgPSBNYXRoLmNlaWwobW91c2VQb3NpdGlvbiAvIDI1KTtcblxuICBmb3IgKGxldCBpID0gMTsgaSA8IG51bWJlck9mQm94ZXMgKyAxOyBpICs9IDEpIHtcbiAgICBpZiAoaSAhPT0gYm94TnVtYmVyKSB7XG4gICAgICByZXN1bHQucHVzaChpIC0gYm94TnVtYmVyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgZ2V0RHJvcFRhcmdldHNWZXJ0aWNhbFBvc2l0aW9uID0gKGVsZW1lbnQsIHkpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGNvbnN0IGJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSBib3guaGVpZ2h0O1xuICBjb25zdCBudW1iZXJPZkJveGVzID0gTWF0aC5mbG9vcihlbGVtZW50SGVpZ2h0IC8gMjUpO1xuICBjb25zb2xlLmxvZyhudW1iZXJPZkJveGVzKTtcbiAgY29uc3QgbW91c2VQb3NpdGlvbiA9IHkgLSBib3gueTtcbiAgY29uc3QgYm94TnVtYmVyID0gTWF0aC5jZWlsKG1vdXNlUG9zaXRpb24gLyAyNSk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbnVtYmVyT2ZCb3hlcyArIDE7IGkgKz0gMSkge1xuICAgIGlmIChpICE9PSBib3hOdW1iZXIpIHtcbiAgICAgIHJlc3VsdC5wdXNoKDEwICogKGkgLSBib3hOdW1iZXIpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vICAgY29uc3QgZ2V0RHJvcENvb3JkaW5hdGVzXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHNcbmNvbnN0IGRyb3AgPSAoZSwgYXJyKSA9PiB7XG4gIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRyYWdnaW5nXCIpO1xuICBmb3IgKGNvbnN0IG51bSBvZiBhcnIpIHtcbiAgICBsZXQgY29yZCA9IFN0cmluZyhOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5jb3JkcykgKyBudW0pO1xuICAgIGNvcmQgPSBjb3JkLmxlbmd0aCA9PT0gMSA/IGAwJHtjb3JkfWAgOiBjb3JkO1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb3Jkcz1cIiR7Y29yZH1cIl1gKTtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICB9XG4gIHNoaXAucmVtb3ZlKCk7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xufTtcblxuZXhwb3J0IHtcbiAgZHJhZ0VudGVyLFxuICBkcmFnT3ZlcixcbiAgZHJhZ1N0YXJ0LFxuICBkcm9wLFxuICBnZXREcm9wVGFyZ2V0c0hvcml6b250YWxQb3NpdGlvbixcbiAgZ2V0RHJvcFRhcmdldHNWZXJ0aWNhbFBvc2l0aW9uLFxuICBkcmFnRW5kLFxufTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBkaXNwbGF5V2lubmVyIH0gZnJvbSBcIi4vZG9tXCI7XG5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoXCJBbXJcIik7XG5jb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJDb21wdXRlclwiKTtcbmNvbnN0IHBsYXllck9uZUJvYXJkID0gcGxheWVyT25lLnBsYXllckJvYXJkO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyLnBsYXllckJvYXJkO1xubGV0IHdpbm5lckZvdW5kID0gZmFsc2U7XG5cbmNvbXB1dGVyQm9hcmQucG9wdWxhdGUoKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDAsIDAsIFwiaG9yaXpvbnRhbFwiLCAzKTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDMsIDgsIFwiaG9yaXpvbnRhbFwiLCA1KTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDcsIDIsIFwiaG9yaXpvbnRhbFwiLCA2KTtcbi8vIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKDEsIDQsIFwiaG9yaXpvbnRhbFwiLCAxKTtcblxuLy8gcGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDAsIDAsIFwidmVydGljYWxcIiwgNCk7XG4vLyBwbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoMiwgMywgXCJob3Jpem9udGFsXCIsIDUpO1xuLy8gcGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDgsIDcsIFwiaG9yaXpvbnRhbFwiLCAxKTtcbi8vIHBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCgzLCAzLCBcImhvcml6b250YWxcIiwgNik7XG5cbmZ1bmN0aW9uIGlzR2FtZU92ZXIoKSB7XG4gIGlmIChwbGF5ZXJPbmUucGxheWVyQm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgd2lubmVyRm91bmQgPSBjb21wdXRlcjtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoY29tcHV0ZXIucGxheWVyQm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgd2lubmVyRm91bmQgPSBwbGF5ZXJPbmU7XG4gICAgY29uc29sZS5sb2cod2lubmVyRm91bmQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2FtZUxvb3AoZXZlbnQpIHtcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItMlwiKTtcbiAgY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdGFydFwiKTtcbiAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIlREXCIpIHtcbiAgICBwbGF5ZXJPbmUuYXR0YWNrKFxuICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMF0sXG4gICAgICBldmVudC50YXJnZXQuZGF0YXNldC5jb3Jkc1sxXSxcbiAgICAgIGNvbXB1dGVyLnBsYXllckJvYXJkLFxuICAgICk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXG4gICAgICBgJHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZFtldmVudC50YXJnZXQuZGF0YXNldC5jb3Jkc1swXV1bXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMV1cbiAgICAgICAgXVxuICAgICAgfWAsXG4gICAgKTtcbiAgICBpZiAoaXNHYW1lT3ZlcigpID09PSB0cnVlKSB7XG4gICAgICBkaXNwbGF5V2lubmVyKHdpbm5lckZvdW5kKTtcbiAgICAgIGNvbXB1dGVyR3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2FtZUxvb3ApO1xuICAgICAgcmVzdGFydEJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYENvbXB1dGVyOiAke2NvbXB1dGVyLnBsYXllckJvYXJkfWApO1xuICB9XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbnN0IGF0dGFja2VkQ29vcmRzID0gY29tcHV0ZXIucmFuZG9tTW92ZShwbGF5ZXJPbmUucGxheWVyQm9hcmQpO1xuICAgIGNvbnNvbGUubG9nKHBsYXllck9uZUJvYXJkLmJvYXJkW2F0dGFja2VkQ29vcmRzWzBdXVthdHRhY2tlZENvb3Jkc1sxXV0pO1xuICAgIGNvbnNvbGUubG9nKGF0dGFja2VkQ29vcmRzKTtcbiAgICBjb25zdCBhdHRhY2tlZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWNvcmRzPVwiJHthdHRhY2tlZENvb3Jkc1swXX0ke2F0dGFja2VkQ29vcmRzWzFdfVwiXWAsXG4gICAgKTtcbiAgICBhdHRhY2tlZENlbGwuY2xhc3NMaXN0LmFkZChcbiAgICAgIGAke3BsYXllck9uZUJvYXJkLmJvYXJkW2F0dGFja2VkQ29vcmRzWzBdXVthdHRhY2tlZENvb3Jkc1sxXV19YCxcbiAgICApO1xuICAgIGlmIChpc0dhbWVPdmVyKCkgPT09IHRydWUpIHtcbiAgICAgIGRpc3BsYXlXaW5uZXIod2lubmVyRm91bmQpO1xuICAgICAgY29tcHV0ZXJHcmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnYW1lTG9vcCk7XG4gICAgICByZXN0YXJ0QnRuLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuICAgIH1cbiAgfSwgMTAwMCk7XG59XG5mdW5jdGlvbiBnYW1lQ29udHJvbGxlcigpIHtcbiAgY29uc3QgY29tcHV0ZXJHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItMlwiKTtcblxuICBjb21wdXRlckdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdhbWVMb29wKTtcbn1cblxuZXhwb3J0IHsgcGxheWVyT25lLCBjb21wdXRlciwgZ2FtZUNvbnRyb2xsZXIsIGlzR2FtZU92ZXIgfTtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIHRoaXMuYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0gajtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAoeCwgeSwgZGlyZWN0aW9uLCBsZW5ndGgpIHtcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgdGhpcy5ib2FyZFt4ICsgaV1beV0gPSBzaGlwO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHNoaXA7XG4gICAgfVxuICAgIHJldHVybiBzaGlwO1xuICB9XG5cbiAgcmFuZG9tU2hpcFBsYWNlbWVudChsZW5ndGgpIHtcbiAgICBsZXQgeDtcbiAgICBsZXQgeTtcblxuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtcImhvcml6b250YWxcIiwgXCJ2ZXJ0aWNhbFwiXTtcbiAgICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc2l0aW9ucy5sZW5ndGgpO1xuICAgIGlmIChwb3NpdGlvbnNbaW5kZXhdID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHRoaXMuYm9hcmRbeCArIGldW3ldIGluc3RhbmNlb2YgU2hpcFxuICAgICAgICApIHtcbiAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gbGVuZ3RoICsgMSkpO1xuICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgeCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgeSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5ICsgaV0gaW5zdGFuY2VvZiBTaGlwXG4gICAgICAgICkge1xuICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIGxlbmd0aCArIDEpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBsYWNlU2hpcCh4LCB5LCBwb3NpdGlvbnNbaW5kZXhdLCBsZW5ndGgpO1xuICAgIHJldHVybiBbeCwgeV07XG4gIH1cblxuICBwb3B1bGF0ZSgpIHtcbiAgICB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoNSk7XG4gICAgdGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KDQpO1xuICAgIHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgzKTtcbiAgICB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoMyk7XG4gICAgdGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KDIpO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gaW5zdGFuY2VvZiBTaGlwKSB7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IFwiaGl0XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBcIm1pc3NcIjtcbiAgICB9XG4gIH1cblxuICBhbGxTdW5rKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdIGluc3RhbmNlb2YgU2hpcCAmJlxuICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0uaXNTdW5rKCkgPT09IGZhbHNlXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5ub09mSGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5ub09mSGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gdGhpcy5ub09mSGl0cykgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vaW5kZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGF0dGFjayh4LCB5LCBlbmVteUJvYXJkKSB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICB9XG5cbiAgcmFuZG9tTW92ZShvcHBvbmVudCkge1xuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHdoaWxlIChvcHBvbmVudC5ib2FyZFt4XVt5XSA9PT0gXCJoaXRcIiB8fCBvcHBvbmVudC5ib2FyZFt4XVt5XSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cbiAgICB0aGlzLmF0dGFjayh4LCB5LCBvcHBvbmVudCk7XG4gICAgcmV0dXJuIFt4LCB5XTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByZW5kZXJCb2FyZCB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgY29tcHV0ZXIsIHBsYXllck9uZSwgZ2FtZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgKiBhcyBkcmFnIGZyb20gXCIuL2RyYWdcIjtcblxucmVuZGVyQm9hcmQocGxheWVyT25lLnBsYXllckJvYXJkLmJvYXJkKTtcblxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWdhbWVcIik7XG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBzdGFydEJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbiAgcmVuZGVyQm9hcmQoY29tcHV0ZXIucGxheWVyQm9hcmQuYm9hcmQpO1xuICBnYW1lQ29udHJvbGxlcigpO1xufSk7XG5cbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcmFnZ2FibGVcIik7XG5sZXQgcmVzdWx0O1xuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICByZXN1bHQgPSBzaGlwLmNsYXNzTGlzdC5jb250YWlucyhcInZlcnRpY2FsXCIpXG4gICAgICA/IGRyYWcuZ2V0RHJvcFRhcmdldHNWZXJ0aWNhbFBvc2l0aW9uKHNoaXAsIGUuY2xpZW50WSlcbiAgICAgIDogZHJhZy5nZXREcm9wVGFyZ2V0c0hvcml6b250YWxQb3NpdGlvbihzaGlwLCBlLmNsaWVudFgpO1xuICB9KTtcbn0pO1xuXG5jb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxheWVyLTEgVERcIik7XG5cbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWcuZHJhZ1N0YXJ0KTtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnLmRyYWdFbmQpO1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcbiAgfSk7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGUpID0+IHtcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbiAgfSk7XG59KTtcbmNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGRyYWcuZHJhZ0VudGVyKTtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZy5kcmFnT3Zlcik7XG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICBkcmFnLmRyb3AoZSwgcmVzdWx0KTtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHRbMF0pO1xuICAgIGxldCBwb3NpdGlvbjtcbiAgICBpZiAocmVzdWx0WzBdID49IDEwKSB7XG4gICAgICBwb3NpdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zaXRpb24gPSBcImhvcml6b250YWxcIjtcbiAgICB9XG4gICAgY29uc3QgbWluID1cbiAgICAgIHJlc3VsdFswXSA8IDBcbiAgICAgICAgPyBTdHJpbmcocmVzdWx0WzBdICsgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuY29yZHMpKVxuICAgICAgICA6IGUudGFyZ2V0LmRhdGFzZXQuY29yZHM7XG4gICAgcGxheWVyT25lLnBsYXllckJvYXJkLnBsYWNlU2hpcChcbiAgICAgIE51bWJlcihtaW5bMF0pLFxuICAgICAgTnVtYmVyKG1pblsxXSksXG4gICAgICBwb3NpdGlvbixcbiAgICAgIHJlc3VsdC5sZW5ndGggKyAxLFxuICAgICk7XG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRyYWdnYWJsZVwiKTtcbiAgICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gIH0pO1xufSk7XG5cbmNvbnN0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3RhcnRcIik7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzXG5yZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBsb2NhdGlvbi5yZWxvYWQoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=