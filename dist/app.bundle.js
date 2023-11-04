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

// const cells = document.querySelector(".player 1 TD");
// console.log(cells);
// function drop(e) {
//   const id = e.dataTransfer.getData("text/plain");
//   const draggable = document.getElementById(id);
//   e.target.replaceWith(draggable);
// }

// function dragOver(e) {
//   e.preventDefault();
// }

// function dragEnter(e) {
//   e.preventDefault();
//   console.log("enter");
// }
// cells.forEach((cell) => {
//   cell.addEventListener("dragEnter", dragEnter);
//   cell.addEventListener("dragOver", dragOver);
//   cell.addEventListener("drop", drop);
// });




/***/ }),

/***/ "./src/drag.js":
/*!*********************!*\
  !*** ./src/drag.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Drag = () => {
  const dragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.classList.add("dragging");
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

  const drop = (e, arr) => {
    for (const num of arr) {
      let cord = String(Number(e.target.dataset.cords) + num);
      cord = cord.length === 1 ? `0${cord}` : cord;
      const cell = document.querySelector(`[data-cords="${cord}"]`);
      cell.classList.add("ship");
    }
    e.target.classList.add("ship");
  };

  return {
    dragEnter,
    dragOver,
    dragStart,
    getDropTargetsHorizontalPosition,
    getDropTargetsVerticalPosition,
    drop,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ Drag });


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

// playerOneBoard.placeShip(9, 1, "horizontal", 4);
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
/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drag */ "./src/drag.js");




(0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.playerOne.playerBoard.board);
// renderBoard(computer.playerBoard.board);

function getDraggedOverElements(element, x) {
  const result = [];
  const box = element.getBoundingClientRect();
  const elementWidth = box.width;
  const numberOfBoxes = Math.floor(elementWidth / 25);
  console.log(numberOfBoxes);
  const mousePosition = x - box.x;
  console.log(elementWidth);
  console.log(mousePosition);
  const boxNumber = Math.ceil(mousePosition / 25);
  console.log(boxNumber);
  for (let i = 1; i < numberOfBoxes + 1; i += 1) {
    if (i !== boxNumber) {
      result.push(i - boxNumber);
    }
  }
  return result;
}

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
  console.log(result);
  return result;
};
const draggable = document.querySelector(".draggable");
let result;
draggable.addEventListener("mousedown", (e) => {
  result = getDropTargetsVerticalPosition(draggable, e.clientY);
});

const cells = document.querySelectorAll(".player-1 TD");
console.log(cells);
function drop(e) {
  for (const num of result) {
    let cord = String(Number(e.target.dataset.cords) + num);
    cord = cord.length === 1 ? `0${cord}` : cord;
    const cell = document.querySelector(`[data-cords="${cord}"]`);
    cell.classList.add("ship");
  }
  e.target.classList.add("ship");
  const min =
    result[0] < 0
      ? String(result[0] + Number(e.target.dataset.cords))
      : e.target.dataset.cords;
  _game__WEBPACK_IMPORTED_MODULE_1__.playerOne.playerBoard.placeShip(
    Number(min[0]),
    Number(min[1]),
    "horizontal",
    result.length + 1,
  );
  console.log(_game__WEBPACK_IMPORTED_MODULE_1__.playerOne.playerBoard.board);
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.classList.add("dragging");
  //   setTimeout(() => {
  //     e.target.classList.add("hide");
  //   }, 0);
  const draggable = document.querySelector(".draggable");
  // draggable.addEventListener("mousedown", (event) => {
  //   getDraggedOverElements(draggable, event.clientX);
  // });
}

const item = document.getElementById("submarine");

console.log(item);
item.addEventListener("dragstart", dragStart);
item.addEventListener("dragend", item.classList.remove("dragging"));

function dragOver(e) {
  e.preventDefault();
  // const draggable = document.querySelector(".dragging");
  //   const box = draggable.getBoundingClientRect();
  //   console.log(box);

  // console.log("e.target");

  // console.log(e.target.getBoundingClientRect());
  e.target.classList.add("drag-over");
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
  // const draggable = document.querySelector(".dragging");
  // const box = draggable.getBoundingClientRect();
  // console.log(box);
  console.log("enter");
}

cells.forEach((cell) => {
  cell.addEventListener("dragenter", dragEnter);

  cell.addEventListener("dragover", dragOver);
  cell.addEventListener("drop", drop);
});

// gameController();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLlwiO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcbmZ1bmN0aW9uIHJlbmRlckJvYXJkKGFycikge1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgY29uc3QgcGxheWVyID0gY29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoO1xuICB0YWJsZS5jbGFzc0xpc3QuYWRkKGBwbGF5ZXItJHtwbGF5ZXIgKyAxfWApO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICB0YWJsZS5hcHBlbmRDaGlsZCh0cik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgdGQuZGF0YXNldC5jb3JkcyA9IGAke2l9JHtqfWA7XG4gICAgICBpZiAoYXJyW2ldW2pdIGluc3RhbmNlb2YgU2hpcCkgdGQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAvLyBpZiAoYXJyW2ldW2pdID09PSBcImhpdFwiKSB0ZC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgLy8gaWYgKGFycltpXVtqXSA9PT0gXCJtaXNzXCIpIHRkLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5V2lubmVyKHdpbm5lcikge1xuICBjb25zdCB3aW5NZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXItZGlzcGxheVwiKTtcbiAgd2luTWVzc2FnZS50ZXh0Q29udGVudCA9IGAke3dpbm5lci5uYW1lfSBpcyB0aGUgV2lubmVyIWA7XG59XG5cbi8vIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIgMSBURFwiKTtcbi8vIGNvbnNvbGUubG9nKGNlbGxzKTtcbi8vIGZ1bmN0aW9uIGRyb3AoZSkge1xuLy8gICBjb25zdCBpZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpO1xuLy8gICBjb25zdCBkcmFnZ2FibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4vLyAgIGUudGFyZ2V0LnJlcGxhY2VXaXRoKGRyYWdnYWJsZSk7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcbi8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBkcmFnRW50ZXIoZSkge1xuLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XG4vLyAgIGNvbnNvbGUubG9nKFwiZW50ZXJcIik7XG4vLyB9XG4vLyBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4vLyAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdFbnRlclwiLCBkcmFnRW50ZXIpO1xuLy8gICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnT3ZlclwiLCBkcmFnT3Zlcik7XG4vLyAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcCk7XG4vLyB9KTtcblxuZXhwb3J0IHsgcmVuZGVyQm9hcmQsIGRpc3BsYXlXaW5uZXIgfTtcbiIsImNvbnN0IERyYWcgPSAoKSA9PiB7XG4gIGNvbnN0IGRyYWdTdGFydCA9IChlKSA9PiB7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgZS50YXJnZXQuaWQpO1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcbiAgfTtcblxuICBjb25zdCBkcmFnT3ZlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcmFnLW92ZXJcIik7XG4gIH07XG5cbiAgY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyYWctb3ZlclwiKTtcbiAgfTtcblxuICBjb25zdCBnZXREcm9wVGFyZ2V0c0hvcml6b250YWxQb3NpdGlvbiA9IChlbGVtZW50LCB4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3QgYm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBlbGVtZW50V2lkdGggPSBib3gud2lkdGg7XG4gICAgY29uc3QgbnVtYmVyT2ZCb3hlcyA9IE1hdGguZmxvb3IoZWxlbWVudFdpZHRoIC8gMjUpO1xuICAgIGNvbnN0IG1vdXNlUG9zaXRpb24gPSB4IC0gYm94Lng7XG4gICAgY29uc3QgYm94TnVtYmVyID0gTWF0aC5jZWlsKG1vdXNlUG9zaXRpb24gLyAyNSk7XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51bWJlck9mQm94ZXMgKyAxOyBpICs9IDEpIHtcbiAgICAgIGlmIChpICE9PSBib3hOdW1iZXIpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goaSAtIGJveE51bWJlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgY29uc3QgZ2V0RHJvcFRhcmdldHNWZXJ0aWNhbFBvc2l0aW9uID0gKGVsZW1lbnQsIHkpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBib3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSBib3guaGVpZ2h0O1xuICAgIGNvbnN0IG51bWJlck9mQm94ZXMgPSBNYXRoLmZsb29yKGVsZW1lbnRIZWlnaHQgLyAyNSk7XG4gICAgY29uc3QgbW91c2VQb3NpdGlvbiA9IHkgLSBib3gueTtcbiAgICBjb25zdCBib3hOdW1iZXIgPSBNYXRoLmNlaWwobW91c2VQb3NpdGlvbiAvIDI1KTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG51bWJlck9mQm94ZXMgKyAxOyBpICs9IDEpIHtcbiAgICAgIGlmIChpICE9PSBib3hOdW1iZXIpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goMTAgKiAoaSAtIGJveE51bWJlcikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vICAgY29uc3QgZ2V0RHJvcENvb3JkaW5hdGVzXG5cbiAgY29uc3QgZHJvcCA9IChlLCBhcnIpID0+IHtcbiAgICBmb3IgKGNvbnN0IG51bSBvZiBhcnIpIHtcbiAgICAgIGxldCBjb3JkID0gU3RyaW5nKE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmNvcmRzKSArIG51bSk7XG4gICAgICBjb3JkID0gY29yZC5sZW5ndGggPT09IDEgPyBgMCR7Y29yZH1gIDogY29yZDtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb3Jkcz1cIiR7Y29yZH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgfVxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZHJhZ0VudGVyLFxuICAgIGRyYWdPdmVyLFxuICAgIGRyYWdTdGFydCxcbiAgICBnZXREcm9wVGFyZ2V0c0hvcml6b250YWxQb3NpdGlvbixcbiAgICBnZXREcm9wVGFyZ2V0c1ZlcnRpY2FsUG9zaXRpb24sXG4gICAgZHJvcCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHsgRHJhZyB9O1xuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGRpc3BsYXlXaW5uZXIgfSBmcm9tIFwiLi9kb21cIjtcblxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcihcIkFtclwiKTtcbmNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcIkNvbXB1dGVyXCIpO1xuY29uc3QgcGxheWVyT25lQm9hcmQgPSBwbGF5ZXJPbmUucGxheWVyQm9hcmQ7XG5jb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXIucGxheWVyQm9hcmQ7XG5sZXQgd2lubmVyRm91bmQgPSBmYWxzZTtcblxuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMCwgMCwgXCJob3Jpem9udGFsXCIsIDMpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMywgOCwgXCJob3Jpem9udGFsXCIsIDUpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoNywgMiwgXCJob3Jpem9udGFsXCIsIDYpO1xuY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoMSwgNCwgXCJob3Jpem9udGFsXCIsIDEpO1xuXG4vLyBwbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoOSwgMSwgXCJob3Jpem9udGFsXCIsIDQpO1xuLy8gcGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDIsIDMsIFwiaG9yaXpvbnRhbFwiLCA1KTtcbi8vIHBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCg4LCA3LCBcImhvcml6b250YWxcIiwgMSk7XG4vLyBwbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoMywgMywgXCJob3Jpem9udGFsXCIsIDYpO1xuXG5mdW5jdGlvbiBpc0dhbWVPdmVyKCkge1xuICBpZiAocGxheWVyT25lLnBsYXllckJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgIHdpbm5lckZvdW5kID0gY29tcHV0ZXI7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGNvbXB1dGVyLnBsYXllckJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgIHdpbm5lckZvdW5kID0gcGxheWVyT25lO1xuICAgIGNvbnNvbGUubG9nKHdpbm5lckZvdW5kKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdhbWVDb250cm9sbGVyKCkge1xuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci0yXCIpO1xuICBjb21wdXRlckdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJURFwiKSB7XG4gICAgICBwbGF5ZXJPbmUuYXR0YWNrKFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC5jb3Jkc1swXSxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMV0sXG4gICAgICAgIGNvbXB1dGVyLnBsYXllckJvYXJkLFxuICAgICAgKTtcbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICBgJHtcbiAgICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkW2V2ZW50LnRhcmdldC5kYXRhc2V0LmNvcmRzWzBdXVtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvcmRzWzFdXG4gICAgICAgICAgXVxuICAgICAgICB9YCxcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhgQ29tcHV0ZXI6ICR7Y29tcHV0ZXIucGxheWVyQm9hcmR9YCk7XG4gICAgICBpZiAoaXNHYW1lT3ZlcigpID09PSB0cnVlKSB7XG4gICAgICAgIGRpc3BsYXlXaW5uZXIod2lubmVyRm91bmQpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dGFja2VkQ29vcmRzID0gY29tcHV0ZXIucmFuZG9tTW92ZShwbGF5ZXJPbmUucGxheWVyQm9hcmQpO1xuICAgICAgY29uc29sZS5sb2cocGxheWVyT25lQm9hcmQuYm9hcmRbYXR0YWNrZWRDb29yZHNbMF1dW2F0dGFja2VkQ29vcmRzWzFdXSk7XG4gICAgICBjb25zb2xlLmxvZyhhdHRhY2tlZENvb3Jkcyk7XG4gICAgICBjb25zdCBhdHRhY2tlZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtY29yZHM9XCIke2F0dGFja2VkQ29vcmRzWzBdfSR7YXR0YWNrZWRDb29yZHNbMV19XCJdYCxcbiAgICAgICk7XG4gICAgICBhdHRhY2tlZENlbGwuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgYCR7cGxheWVyT25lQm9hcmQuYm9hcmRbYXR0YWNrZWRDb29yZHNbMF1dW2F0dGFja2VkQ29vcmRzWzFdXX1gLFxuICAgICAgKTtcbiAgICB9LCAxMDAwKTtcbiAgICBpZiAoaXNHYW1lT3ZlcigpID09PSB0cnVlKSB7XG4gICAgICBkaXNwbGF5V2lubmVyKHdpbm5lckZvdW5kKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgeyBwbGF5ZXJPbmUsIGNvbXB1dGVyLCBnYW1lQ29udHJvbGxlciwgaXNHYW1lT3ZlciB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSBqO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcCh4LCB5LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICB0aGlzLmJvYXJkW3ggLSBpXVt5XSA9IHNoaXA7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcDtcbiAgICB9XG4gICAgcmV0dXJuIHNoaXA7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSBpbnN0YW5jZW9mIFNoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IFwibWlzc1wiO1xuICAgIH1cbiAgfVxuXG4gIGFsbFN1bmsoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0gaW5zdGFuY2VvZiBTaGlwICYmXG4gICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXS5pc1N1bmsoKSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLm5vT2ZIaXRzID0gMDtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLm5vT2ZIaXRzICs9IDE7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSB0aGlzLm5vT2ZIaXRzKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgYXR0YWNrKHgsIHksIGVuZW15Qm9hcmQpIHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gIH1cblxuICByYW5kb21Nb3ZlKG9wcG9uZW50KSB7XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgd2hpbGUgKG9wcG9uZW50LmJvYXJkW3hdW3ldID09PSBcImhpdFwiIHx8IG9wcG9uZW50LmJvYXJkW3hdW3ldID09PSBcIm1pc3NcIikge1xuICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfVxuICAgIHRoaXMuYXR0YWNrKHgsIHksIG9wcG9uZW50KTtcbiAgICByZXR1cm4gW3gsIHldO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlckJvYXJkIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgeyBjb21wdXRlciwgcGxheWVyT25lLCBnYW1lQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCBkcmFnIGZyb20gXCIuL2RyYWdcIjtcblxucmVuZGVyQm9hcmQocGxheWVyT25lLnBsYXllckJvYXJkLmJvYXJkKTtcbi8vIHJlbmRlckJvYXJkKGNvbXB1dGVyLnBsYXllckJvYXJkLmJvYXJkKTtcblxuZnVuY3Rpb24gZ2V0RHJhZ2dlZE92ZXJFbGVtZW50cyhlbGVtZW50LCB4KSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBib3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBlbGVtZW50V2lkdGggPSBib3gud2lkdGg7XG4gIGNvbnN0IG51bWJlck9mQm94ZXMgPSBNYXRoLmZsb29yKGVsZW1lbnRXaWR0aCAvIDI1KTtcbiAgY29uc29sZS5sb2cobnVtYmVyT2ZCb3hlcyk7XG4gIGNvbnN0IG1vdXNlUG9zaXRpb24gPSB4IC0gYm94Lng7XG4gIGNvbnNvbGUubG9nKGVsZW1lbnRXaWR0aCk7XG4gIGNvbnNvbGUubG9nKG1vdXNlUG9zaXRpb24pO1xuICBjb25zdCBib3hOdW1iZXIgPSBNYXRoLmNlaWwobW91c2VQb3NpdGlvbiAvIDI1KTtcbiAgY29uc29sZS5sb2coYm94TnVtYmVyKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBudW1iZXJPZkJveGVzICsgMTsgaSArPSAxKSB7XG4gICAgaWYgKGkgIT09IGJveE51bWJlcikge1xuICAgICAgcmVzdWx0LnB1c2goaSAtIGJveE51bWJlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmNvbnN0IGdldERyb3BUYXJnZXRzVmVydGljYWxQb3NpdGlvbiA9IChlbGVtZW50LCB5KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBib3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gYm94LmhlaWdodDtcbiAgY29uc3QgbnVtYmVyT2ZCb3hlcyA9IE1hdGguZmxvb3IoZWxlbWVudEhlaWdodCAvIDI1KTtcbiAgY29uc29sZS5sb2cobnVtYmVyT2ZCb3hlcyk7XG4gIGNvbnN0IG1vdXNlUG9zaXRpb24gPSB5IC0gYm94Lnk7XG4gIGNvbnN0IGJveE51bWJlciA9IE1hdGguY2VpbChtb3VzZVBvc2l0aW9uIC8gMjUpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG51bWJlck9mQm94ZXMgKyAxOyBpICs9IDEpIHtcbiAgICBpZiAoaSAhPT0gYm94TnVtYmVyKSB7XG4gICAgICByZXN1bHQucHVzaCgxMCAqIChpIC0gYm94TnVtYmVyKSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuY29uc3QgZHJhZ2dhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcmFnZ2FibGVcIik7XG5sZXQgcmVzdWx0O1xuZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgcmVzdWx0ID0gZ2V0RHJvcFRhcmdldHNWZXJ0aWNhbFBvc2l0aW9uKGRyYWdnYWJsZSwgZS5jbGllbnRZKTtcbn0pO1xuXG5jb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxheWVyLTEgVERcIik7XG5jb25zb2xlLmxvZyhjZWxscyk7XG5mdW5jdGlvbiBkcm9wKGUpIHtcbiAgZm9yIChjb25zdCBudW0gb2YgcmVzdWx0KSB7XG4gICAgbGV0IGNvcmQgPSBTdHJpbmcoTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuY29yZHMpICsgbnVtKTtcbiAgICBjb3JkID0gY29yZC5sZW5ndGggPT09IDEgPyBgMCR7Y29yZH1gIDogY29yZDtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29yZHM9XCIke2NvcmR9XCJdYCk7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgfVxuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgY29uc3QgbWluID1cbiAgICByZXN1bHRbMF0gPCAwXG4gICAgICA/IFN0cmluZyhyZXN1bHRbMF0gKyBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5jb3JkcykpXG4gICAgICA6IGUudGFyZ2V0LmRhdGFzZXQuY29yZHM7XG4gIHBsYXllck9uZS5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXG4gICAgTnVtYmVyKG1pblswXSksXG4gICAgTnVtYmVyKG1pblsxXSksXG4gICAgXCJob3Jpem9udGFsXCIsXG4gICAgcmVzdWx0Lmxlbmd0aCArIDEsXG4gICk7XG4gIGNvbnNvbGUubG9nKHBsYXllck9uZS5wbGF5ZXJCb2FyZC5ib2FyZCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG4gIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIGUudGFyZ2V0LmlkKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyYWdnaW5nXCIpO1xuICAvLyAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAvLyAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gIC8vICAgfSwgMCk7XG4gIGNvbnN0IGRyYWdnYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJhZ2dhYmxlXCIpO1xuICAvLyBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZlbnQpID0+IHtcbiAgLy8gICBnZXREcmFnZ2VkT3ZlckVsZW1lbnRzKGRyYWdnYWJsZSwgZXZlbnQuY2xpZW50WCk7XG4gIC8vIH0pO1xufVxuXG5jb25zdCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtYXJpbmVcIik7XG5cbmNvbnNvbGUubG9nKGl0ZW0pO1xuaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XG5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpKTtcblxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vIGNvbnN0IGRyYWdnYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJhZ2dpbmdcIik7XG4gIC8vICAgY29uc3QgYm94ID0gZHJhZ2dhYmxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAvLyAgIGNvbnNvbGUubG9nKGJveCk7XG5cbiAgLy8gY29uc29sZS5sb2coXCJlLnRhcmdldFwiKTtcblxuICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcmFnLW92ZXJcIik7XG59XG5cbmZ1bmN0aW9uIGRyYWdFbnRlcihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyYWctb3ZlclwiKTtcbiAgLy8gY29uc3QgZHJhZ2dhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcmFnZ2luZ1wiKTtcbiAgLy8gY29uc3QgYm94ID0gZHJhZ2dhYmxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAvLyBjb25zb2xlLmxvZyhib3gpO1xuICBjb25zb2xlLmxvZyhcImVudGVyXCIpO1xufVxuXG5jZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCBkcmFnRW50ZXIpO1xuXG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKTtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wKTtcbn0pO1xuXG4vLyBnYW1lQ29udHJvbGxlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9