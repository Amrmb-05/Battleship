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
    console.log(_game__WEBPACK_IMPORTED_MODULE_1__.playerOne.playerBoard.board);
  });
});

const startBtn = document.querySelector(".start-game");
startBtn.addEventListener("click", () => {
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.computer.playerBoard.board);
  (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameController)();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3pCLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQSxFQUFFLGlEQUFXLENBQUMsMkNBQVE7QUFDdEIsRUFBRSxxREFBYztBQUNoQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLlwiO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcbmZ1bmN0aW9uIHJlbmRlckJvYXJkKGFycikge1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgcGxheWVyID0gY29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoO1xuICB0YWJsZS5jbGFzc0xpc3QuYWRkKGBwbGF5ZXItJHtwbGF5ZXIgKyAxfWApO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICB0YWJsZS5hcHBlbmRDaGlsZCh0cik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgdGQuZGF0YXNldC5jb3JkcyA9IGAke2l9JHtqfWA7XG4gICAgICBpZiAoYXJyW2ldW2pdIGluc3RhbmNlb2YgU2hpcCkgdGQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAvLyBpZiAoYXJyW2ldW2pdID09PSBcImhpdFwiKSB0ZC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgLy8gaWYgKGFycltpXVtqXSA9PT0gXCJtaXNzXCIpIHRkLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5V2lubmVyKHdpbm5lcikge1xuICBjb25zdCB3aW5NZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItZGlzcGxheVwiKTtcbiAgd2luTWVzc2FnZS50ZXh0Q29udGVudCA9IGAke3dpbm5lci5uYW1lfSBpcyB0aGUgV2lubmVyIWA7XG59XG5jb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJhZ2dhYmxlXCIpO1xuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKFwidmVydGljYWxcIik7XG4gIH0pO1xufSk7XG5leHBvcnQgeyByZW5kZXJCb2FyZCwgZGlzcGxheVdpbm5lciB9O1xuIiwiY29uc3QgZHJhZ1N0YXJ0ID0gKGUpID0+IHtcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgZS50YXJnZXQuaWQpO1xuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dpbmdcIik7XG59O1xuXG5jb25zdCBkcmFnRW5kID0gKGUpID0+IHtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpO1xufTtcblxuY29uc3QgZHJhZ092ZXIgPSAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcmFnLW92ZXJcIik7XG59O1xuXG5jb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcmFnLW92ZXJcIik7XG59O1xuXG5jb25zdCBnZXREcm9wVGFyZ2V0c0hvcml6b250YWxQb3NpdGlvbiA9IChlbGVtZW50LCB4KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBib3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBlbGVtZW50V2lkdGggPSBib3gud2lkdGg7XG4gIGNvbnN0IG51bWJlck9mQm94ZXMgPSBNYXRoLmZsb29yKGVsZW1lbnRXaWR0aCAvIDI1KTtcbiAgY29uc29sZS5sb2cobnVtYmVyT2ZCb3hlcyk7XG4gIGNvbnN0IG1vdXNlUG9zaXRpb24gPSB4IC0gYm94Lng7XG4gIGNvbnN0IGJveE51bWJlciA9IE1hdGguY2VpbChtb3VzZVBvc2l0aW9uIC8gMjUpO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbnVtYmVyT2ZCb3hlcyArIDE7IGkgKz0gMSkge1xuICAgIGlmIChpICE9PSBib3hOdW1iZXIpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGkgLSBib3hOdW1iZXIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBnZXREcm9wVGFyZ2V0c1ZlcnRpY2FsUG9zaXRpb24gPSAoZWxlbWVudCwgeSkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgY29uc3QgYm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgZWxlbWVudEhlaWdodCA9IGJveC5oZWlnaHQ7XG4gIGNvbnN0IG51bWJlck9mQm94ZXMgPSBNYXRoLmZsb29yKGVsZW1lbnRIZWlnaHQgLyAyNSk7XG4gIGNvbnNvbGUubG9nKG51bWJlck9mQm94ZXMpO1xuICBjb25zdCBtb3VzZVBvc2l0aW9uID0geSAtIGJveC55O1xuICBjb25zdCBib3hOdW1iZXIgPSBNYXRoLmNlaWwobW91c2VQb3NpdGlvbiAvIDI1KTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBudW1iZXJPZkJveGVzICsgMTsgaSArPSAxKSB7XG4gICAgaWYgKGkgIT09IGJveE51bWJlcikge1xuICAgICAgcmVzdWx0LnB1c2goMTAgKiAoaSAtIGJveE51bWJlcikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gICBjb25zdCBnZXREcm9wQ29vcmRpbmF0ZXNcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFsc1xuY29uc3QgZHJvcCA9IChlLCBhcnIpID0+IHtcbiAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJhZ2dpbmdcIik7XG4gIGZvciAoY29uc3QgbnVtIG9mIGFycikge1xuICAgIGxldCBjb3JkID0gU3RyaW5nKE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmNvcmRzKSArIG51bSk7XG4gICAgY29yZCA9IGNvcmQubGVuZ3RoID09PSAxID8gYDAke2NvcmR9YCA6IGNvcmQ7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvcmRzPVwiJHtjb3JkfVwiXWApO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gIH1cbiAgc2hpcC5yZW1vdmUoKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG59O1xuXG5leHBvcnQge1xuICBkcmFnRW50ZXIsXG4gIGRyYWdPdmVyLFxuICBkcmFnU3RhcnQsXG4gIGRyb3AsXG4gIGdldERyb3BUYXJnZXRzSG9yaXpvbnRhbFBvc2l0aW9uLFxuICBnZXREcm9wVGFyZ2V0c1ZlcnRpY2FsUG9zaXRpb24sXG4gIGRyYWdFbmQsXG59O1xuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGRpc3BsYXlXaW5uZXIgfSBmcm9tIFwiLi9kb21cIjtcblxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcihcIkFtclwiKTtcbmNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcIkNvbXB1dGVyXCIpO1xuY29uc3QgcGxheWVyT25lQm9hcmQgPSBwbGF5ZXJPbmUucGxheWVyQm9hcmQ7XG5jb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXIucGxheWVyQm9hcmQ7XG5sZXQgd2lubmVyRm91bmQgPSBmYWxzZTtcblxuY29tcHV0ZXJCb2FyZC5wb3B1bGF0ZSgpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMCwgMCwgXCJob3Jpem9udGFsXCIsIDMpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgOCwgXCJob3Jpem9udGFsXCIsIDUpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNywgMiwgXCJob3Jpem9udGFsXCIsIDYpO1xuLy8gY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgNCwgXCJob3Jpem9udGFsXCIsIDEpO1xuXG4vLyBwbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoMCwgMCwgXCJ2ZXJ0aWNhbFwiLCA0KTtcbi8vIHBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCgyLCAzLCBcImhvcml6b250YWxcIiwgNSk7XG4vLyBwbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoOCwgNywgXCJob3Jpem9udGFsXCIsIDEpO1xuLy8gcGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDMsIDMsIFwiaG9yaXpvbnRhbFwiLCA2KTtcblxuZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgaWYgKHBsYXllck9uZS5wbGF5ZXJCb2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICB3aW5uZXJGb3VuZCA9IGNvbXB1dGVyO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChjb21wdXRlci5wbGF5ZXJCb2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICB3aW5uZXJGb3VuZCA9IHBsYXllck9uZTtcbiAgICBjb25zb2xlLmxvZyh3aW5uZXJGb3VuZCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnYW1lTG9vcChldmVudCkge1xuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci0yXCIpO1xuXG4gIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJURFwiKSB7XG4gICAgcGxheWVyT25lLmF0dGFjayhcbiAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvcmRzWzBdLFxuICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMV0sXG4gICAgICBjb21wdXRlci5wbGF5ZXJCb2FyZCxcbiAgICApO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFxuICAgICAgYCR7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYm9hcmRbZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMF1dW1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvcmRzWzFdXG4gICAgICAgIF1cbiAgICAgIH1gLFxuICAgICk7XG4gICAgaWYgKGlzR2FtZU92ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgZGlzcGxheVdpbm5lcih3aW5uZXJGb3VuZCk7XG4gICAgICBjb21wdXRlckdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdhbWVMb29wKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYENvbXB1dGVyOiAke2NvbXB1dGVyLnBsYXllckJvYXJkfWApO1xuICB9XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbnN0IGF0dGFja2VkQ29vcmRzID0gY29tcHV0ZXIucmFuZG9tTW92ZShwbGF5ZXJPbmUucGxheWVyQm9hcmQpO1xuICAgIGNvbnNvbGUubG9nKHBsYXllck9uZUJvYXJkLmJvYXJkW2F0dGFja2VkQ29vcmRzWzBdXVthdHRhY2tlZENvb3Jkc1sxXV0pO1xuICAgIGNvbnNvbGUubG9nKGF0dGFja2VkQ29vcmRzKTtcbiAgICBjb25zdCBhdHRhY2tlZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWNvcmRzPVwiJHthdHRhY2tlZENvb3Jkc1swXX0ke2F0dGFja2VkQ29vcmRzWzFdfVwiXWAsXG4gICAgKTtcbiAgICBhdHRhY2tlZENlbGwuY2xhc3NMaXN0LmFkZChcbiAgICAgIGAke3BsYXllck9uZUJvYXJkLmJvYXJkW2F0dGFja2VkQ29vcmRzWzBdXVthdHRhY2tlZENvb3Jkc1sxXV19YCxcbiAgICApO1xuICAgIGlmIChpc0dhbWVPdmVyKCkgPT09IHRydWUpIHtcbiAgICAgIGRpc3BsYXlXaW5uZXIod2lubmVyRm91bmQpO1xuICAgICAgY29tcHV0ZXJHcmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnYW1lTG9vcCk7XG4gICAgfVxuICB9LCAxMDAwKTtcbn1cbmZ1bmN0aW9uIGdhbWVDb250cm9sbGVyKCkge1xuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci0yXCIpO1xuXG4gIGNvbXB1dGVyR3JpZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2FtZUxvb3ApO1xufVxuXG5leHBvcnQgeyBwbGF5ZXJPbmUsIGNvbXB1dGVyLCBnYW1lQ29udHJvbGxlciwgaXNHYW1lT3ZlciB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSBqO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcCh4LCB5LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICB0aGlzLmJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcDtcbiAgICB9XG4gICAgcmV0dXJuIHNoaXA7XG4gIH1cblxuICByYW5kb21TaGlwUGxhY2VtZW50KGxlbmd0aCkge1xuICAgIGxldCB4O1xuICAgIGxldCB5O1xuXG4gICAgY29uc3QgcG9zaXRpb25zID0gW1wiaG9yaXpvbnRhbFwiLCBcInZlcnRpY2FsXCJdO1xuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zaXRpb25zLmxlbmd0aCk7XG4gICAgaWYgKHBvc2l0aW9uc1tpbmRleF0gPT09IFwidmVydGljYWxcIikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgeCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgeSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdGhpcy5ib2FyZFt4ICsgaV1beV0gaW5zdGFuY2VvZiBTaGlwXG4gICAgICAgICkge1xuICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBsZW5ndGggKyAxKSk7XG4gICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB4ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB5ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB0aGlzLmJvYXJkW3hdW3kgKyBpXSBpbnN0YW5jZW9mIFNoaXBcbiAgICAgICAgKSB7XG4gICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gbGVuZ3RoICsgMSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGxhY2VTaGlwKHgsIHksIHBvc2l0aW9uc1tpbmRleF0sIGxlbmd0aCk7XG4gICAgcmV0dXJuIFt4LCB5XTtcbiAgfVxuXG4gIHBvcHVsYXRlKCkge1xuICAgIHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCg1KTtcbiAgICB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoNCk7XG4gICAgdGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KDMpO1xuICAgIHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgzKTtcbiAgICB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoMik7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSBpbnN0YW5jZW9mIFNoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IFwibWlzc1wiO1xuICAgIH1cbiAgfVxuXG4gIGFsbFN1bmsoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0gaW5zdGFuY2VvZiBTaGlwICYmXG4gICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXS5pc1N1bmsoKSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLm5vT2ZIaXRzID0gMDtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLm5vT2ZIaXRzICs9IDE7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSB0aGlzLm5vT2ZIaXRzKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgYXR0YWNrKHgsIHksIGVuZW15Qm9hcmQpIHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gIH1cblxuICByYW5kb21Nb3ZlKG9wcG9uZW50KSB7XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgd2hpbGUgKG9wcG9uZW50LmJvYXJkW3hdW3ldID09PSBcImhpdFwiIHx8IG9wcG9uZW50LmJvYXJkW3hdW3ldID09PSBcIm1pc3NcIikge1xuICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfVxuICAgIHRoaXMuYXR0YWNrKHgsIHksIG9wcG9uZW50KTtcbiAgICByZXR1cm4gW3gsIHldO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlckJvYXJkIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgeyBjb21wdXRlciwgcGxheWVyT25lLCBnYW1lQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCAqIGFzIGRyYWcgZnJvbSBcIi4vZHJhZ1wiO1xuXG5yZW5kZXJCb2FyZChwbGF5ZXJPbmUucGxheWVyQm9hcmQuYm9hcmQpO1xuXG5jb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJhZ2dhYmxlXCIpO1xubGV0IHJlc3VsdDtcbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XG4gICAgcmVzdWx0ID0gc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbFwiKVxuICAgICAgPyBkcmFnLmdldERyb3BUYXJnZXRzVmVydGljYWxQb3NpdGlvbihzaGlwLCBlLmNsaWVudFkpXG4gICAgICA6IGRyYWcuZ2V0RHJvcFRhcmdldHNIb3Jpem9udGFsUG9zaXRpb24oc2hpcCwgZS5jbGllbnRYKTtcbiAgfSk7XG59KTtcblxuY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYXllci0xIFREXCIpO1xuXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnLmRyYWdTdGFydCk7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZy5kcmFnRW5kKTtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XG4gICAgZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dpbmdcIik7XG4gIH0pO1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChlKSA9PiB7XG4gICAgZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG4gIH0pO1xufSk7XG5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCBkcmFnLmRyYWdFbnRlcik7XG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWcuZHJhZ092ZXIpO1xuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgZHJhZy5kcm9wKGUsIHJlc3VsdCk7XG4gICAgY29uc29sZS5sb2cocmVzdWx0WzBdKTtcbiAgICBsZXQgcG9zaXRpb247XG4gICAgaWYgKHJlc3VsdFswXSA+PSAxMCkge1xuICAgICAgcG9zaXRpb24gPSBcInZlcnRpY2FsXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc2l0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gICAgfVxuICAgIGNvbnN0IG1pbiA9XG4gICAgICByZXN1bHRbMF0gPCAwXG4gICAgICAgID8gU3RyaW5nKHJlc3VsdFswXSArIE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmNvcmRzKSlcbiAgICAgICAgOiBlLnRhcmdldC5kYXRhc2V0LmNvcmRzO1xuICAgIHBsYXllck9uZS5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXG4gICAgICBOdW1iZXIobWluWzBdKSxcbiAgICAgIE51bWJlcihtaW5bMV0pLFxuICAgICAgcG9zaXRpb24sXG4gICAgICByZXN1bHQubGVuZ3RoICsgMSxcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKHBsYXllck9uZS5wbGF5ZXJCb2FyZC5ib2FyZCk7XG4gIH0pO1xufSk7XG5cbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC1nYW1lXCIpO1xuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmVuZGVyQm9hcmQoY29tcHV0ZXIucGxheWVyQm9hcmQuYm9hcmQpO1xuICBnYW1lQ29udHJvbGxlcigpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=