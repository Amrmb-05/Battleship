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
(0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.computer.playerBoard.board);

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
// function drop(e) {
//   for (const num of result) {
//     let cord = String(Number(e.target.dataset.cords) + num);
//     cord = cord.length === 1 ? `0${cord}` : cord;
//     const cell = document.querySelector(`[data-cords="${cord}"]`);
//     cell.classList.add("ship");
//   }
//   e.target.classList.add("ship");
//   const min =
//     result[0] < 0
//       ? String(result[0] + Number(e.target.dataset.cords))
//       : e.target.dataset.cords;
//   playerOne.playerBoard.placeShip(
//     Number(min[0]),
//     Number(min[1]),
//     "horizontal",
//     result.length + 1,
//   );
//   console.log(playerOne.playerBoard.board);
// }

// const ships = document.querySelectorAll(".draggable");
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
  });
});

// gameController();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxJQUFJLHVDQUFTO0FBQ2IsR0FBRztBQUNILENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RyYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuXCI7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xuZnVuY3Rpb24gcmVuZGVyQm9hcmQoYXJyKSB7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBjb25zdCBwbGF5ZXIgPSBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGg7XG4gIHRhYmxlLmNsYXNzTGlzdC5hZGQoYHBsYXllci0ke3BsYXllciArIDF9YCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRhYmxlKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICB0ZC5kYXRhc2V0LmNvcmRzID0gYCR7aX0ke2p9YDtcbiAgICAgIGlmIChhcnJbaV1bal0gaW5zdGFuY2VvZiBTaGlwKSB0ZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIC8vIGlmIChhcnJbaV1bal0gPT09IFwiaGl0XCIpIHRkLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAvLyBpZiAoYXJyW2ldW2pdID09PSBcIm1pc3NcIikgdGQuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlXaW5uZXIod2lubmVyKSB7XG4gIGNvbnN0IHdpbk1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1kaXNwbGF5XCIpO1xuICB3aW5NZXNzYWdlLnRleHRDb250ZW50ID0gYCR7d2lubmVyLm5hbWV9IGlzIHRoZSBXaW5uZXIhYDtcbn1cbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcmFnZ2FibGVcIik7XG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoXCJ2ZXJ0aWNhbFwiKTtcbiAgfSk7XG59KTtcbmV4cG9ydCB7IHJlbmRlckJvYXJkLCBkaXNwbGF5V2lubmVyIH07XG4iLCJjb25zdCBkcmFnU3RhcnQgPSAoZSkgPT4ge1xuICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBlLnRhcmdldC5pZCk7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcbn07XG5cbmNvbnN0IGRyYWdFbmQgPSAoZSkgPT4ge1xuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59O1xuXG5jb25zdCBkcmFnT3ZlciA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyYWctb3ZlclwiKTtcbn07XG5cbmNvbnN0IGRyYWdFbnRlciA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyYWctb3ZlclwiKTtcbn07XG5cbmNvbnN0IGdldERyb3BUYXJnZXRzSG9yaXpvbnRhbFBvc2l0aW9uID0gKGVsZW1lbnQsIHgpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGNvbnN0IGJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IGVsZW1lbnRXaWR0aCA9IGJveC53aWR0aDtcbiAgY29uc3QgbnVtYmVyT2ZCb3hlcyA9IE1hdGguZmxvb3IoZWxlbWVudFdpZHRoIC8gMjUpO1xuICBjb25zb2xlLmxvZyhudW1iZXJPZkJveGVzKTtcbiAgY29uc3QgbW91c2VQb3NpdGlvbiA9IHggLSBib3gueDtcbiAgY29uc3QgYm94TnVtYmVyID0gTWF0aC5jZWlsKG1vdXNlUG9zaXRpb24gLyAyNSk7XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBudW1iZXJPZkJveGVzICsgMTsgaSArPSAxKSB7XG4gICAgaWYgKGkgIT09IGJveE51bWJlcikge1xuICAgICAgcmVzdWx0LnB1c2goaSAtIGJveE51bWJlcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IGdldERyb3BUYXJnZXRzVmVydGljYWxQb3NpdGlvbiA9IChlbGVtZW50LCB5KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBib3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gYm94LmhlaWdodDtcbiAgY29uc3QgbnVtYmVyT2ZCb3hlcyA9IE1hdGguZmxvb3IoZWxlbWVudEhlaWdodCAvIDI1KTtcbiAgY29uc29sZS5sb2cobnVtYmVyT2ZCb3hlcyk7XG4gIGNvbnN0IG1vdXNlUG9zaXRpb24gPSB5IC0gYm94Lnk7XG4gIGNvbnN0IGJveE51bWJlciA9IE1hdGguY2VpbChtb3VzZVBvc2l0aW9uIC8gMjUpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG51bWJlck9mQm94ZXMgKyAxOyBpICs9IDEpIHtcbiAgICBpZiAoaSAhPT0gYm94TnVtYmVyKSB7XG4gICAgICByZXN1bHQucHVzaCgxMCAqIChpIC0gYm94TnVtYmVyKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAgIGNvbnN0IGdldERyb3BDb29yZGluYXRlc1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzXG5jb25zdCBkcm9wID0gKGUsIGFycikgPT4ge1xuICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcmFnZ2luZ1wiKTtcbiAgZm9yIChjb25zdCBudW0gb2YgYXJyKSB7XG4gICAgbGV0IGNvcmQgPSBTdHJpbmcoTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuY29yZHMpICsgbnVtKTtcbiAgICBjb3JkID0gY29yZC5sZW5ndGggPT09IDEgPyBgMCR7Y29yZH1gIDogY29yZDtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29yZHM9XCIke2NvcmR9XCJdYCk7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgfVxuICBzaGlwLnJlbW92ZSgpO1xuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbn07XG5cbmV4cG9ydCB7XG4gIGRyYWdFbnRlcixcbiAgZHJhZ092ZXIsXG4gIGRyYWdTdGFydCxcbiAgZHJvcCxcbiAgZ2V0RHJvcFRhcmdldHNIb3Jpem9udGFsUG9zaXRpb24sXG4gIGdldERyb3BUYXJnZXRzVmVydGljYWxQb3NpdGlvbixcbiAgZHJhZ0VuZCxcbn07XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgZGlzcGxheVdpbm5lciB9IGZyb20gXCIuL2RvbVwiO1xuXG5jb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKFwiQW1yXCIpO1xuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiQ29tcHV0ZXJcIik7XG5jb25zdCBwbGF5ZXJPbmVCb2FyZCA9IHBsYXllck9uZS5wbGF5ZXJCb2FyZDtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlci5wbGF5ZXJCb2FyZDtcbmxldCB3aW5uZXJGb3VuZCA9IGZhbHNlO1xuXG5jb21wdXRlckJvYXJkLnBvcHVsYXRlKCk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgwLCAwLCBcImhvcml6b250YWxcIiwgMyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCA4LCBcImhvcml6b250YWxcIiwgNSk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3LCAyLCBcImhvcml6b250YWxcIiwgNik7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCA0LCBcImhvcml6b250YWxcIiwgMSk7XG5cbi8vIHBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCgwLCAwLCBcInZlcnRpY2FsXCIsIDQpO1xuLy8gcGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDIsIDMsIFwiaG9yaXpvbnRhbFwiLCA1KTtcbi8vIHBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCg4LCA3LCBcImhvcml6b250YWxcIiwgMSk7XG4vLyBwbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoMywgMywgXCJob3Jpem9udGFsXCIsIDYpO1xuXG5mdW5jdGlvbiBpc0dhbWVPdmVyKCkge1xuICBpZiAocGxheWVyT25lLnBsYXllckJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgIHdpbm5lckZvdW5kID0gY29tcHV0ZXI7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGNvbXB1dGVyLnBsYXllckJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgIHdpbm5lckZvdW5kID0gcGxheWVyT25lO1xuICAgIGNvbnNvbGUubG9nKHdpbm5lckZvdW5kKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdhbWVDb250cm9sbGVyKCkge1xuICBjb25zdCBjb21wdXRlckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci0yXCIpO1xuICBjb21wdXRlckdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJURFwiKSB7XG4gICAgICBwbGF5ZXJPbmUuYXR0YWNrKFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC5jb3Jkc1swXSxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMV0sXG4gICAgICAgIGNvbXB1dGVyLnBsYXllckJvYXJkLFxuICAgICAgKTtcbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICBgJHtcbiAgICAgICAgICBjb21wdXRlckJvYXJkLmJvYXJkW2V2ZW50LnRhcmdldC5kYXRhc2V0LmNvcmRzWzBdXVtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvcmRzWzFdXG4gICAgICAgICAgXVxuICAgICAgICB9YCxcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhgQ29tcHV0ZXI6ICR7Y29tcHV0ZXIucGxheWVyQm9hcmR9YCk7XG4gICAgICBpZiAoaXNHYW1lT3ZlcigpID09PSB0cnVlKSB7XG4gICAgICAgIGRpc3BsYXlXaW5uZXIod2lubmVyRm91bmQpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dGFja2VkQ29vcmRzID0gY29tcHV0ZXIucmFuZG9tTW92ZShwbGF5ZXJPbmUucGxheWVyQm9hcmQpO1xuICAgICAgY29uc29sZS5sb2cocGxheWVyT25lQm9hcmQuYm9hcmRbYXR0YWNrZWRDb29yZHNbMF1dW2F0dGFja2VkQ29vcmRzWzFdXSk7XG4gICAgICBjb25zb2xlLmxvZyhhdHRhY2tlZENvb3Jkcyk7XG4gICAgICBjb25zdCBhdHRhY2tlZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtY29yZHM9XCIke2F0dGFja2VkQ29vcmRzWzBdfSR7YXR0YWNrZWRDb29yZHNbMV19XCJdYCxcbiAgICAgICk7XG4gICAgICBhdHRhY2tlZENlbGwuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgYCR7cGxheWVyT25lQm9hcmQuYm9hcmRbYXR0YWNrZWRDb29yZHNbMF1dW2F0dGFja2VkQ29vcmRzWzFdXX1gLFxuICAgICAgKTtcbiAgICB9LCAxMDAwKTtcbiAgICBpZiAoaXNHYW1lT3ZlcigpID09PSB0cnVlKSB7XG4gICAgICBkaXNwbGF5V2lubmVyKHdpbm5lckZvdW5kKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgeyBwbGF5ZXJPbmUsIGNvbXB1dGVyLCBnYW1lQ29udHJvbGxlciwgaXNHYW1lT3ZlciB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgdGhpcy5ib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSBqO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcCh4LCB5LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICB0aGlzLmJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcDtcbiAgICB9XG4gICAgcmV0dXJuIHNoaXA7XG4gIH1cblxuICByYW5kb21TaGlwUGxhY2VtZW50KGxlbmd0aCkge1xuICAgIGxldCB4O1xuICAgIGxldCB5O1xuXG4gICAgY29uc3QgcG9zaXRpb25zID0gW1wiaG9yaXpvbnRhbFwiLCBcInZlcnRpY2FsXCJdO1xuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zaXRpb25zLmxlbmd0aCk7XG4gICAgaWYgKHBvc2l0aW9uc1tpbmRleF0gPT09IFwidmVydGljYWxcIikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgeCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgeSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdGhpcy5ib2FyZFt4ICsgaV1beV0gaW5zdGFuY2VvZiBTaGlwXG4gICAgICAgICkge1xuICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBsZW5ndGggKyAxKSk7XG4gICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB4ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB5ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB0aGlzLmJvYXJkW3hdW3kgKyBpXSBpbnN0YW5jZW9mIFNoaXBcbiAgICAgICAgKSB7XG4gICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gbGVuZ3RoICsgMSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGxhY2VTaGlwKHgsIHksIHBvc2l0aW9uc1tpbmRleF0sIGxlbmd0aCk7XG4gICAgcmV0dXJuIFt4LCB5XTtcbiAgfVxuXG4gIHBvcHVsYXRlKCkge1xuICAgIHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCg1KTtcbiAgICB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoNCk7XG4gICAgdGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KDMpO1xuICAgIHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgzKTtcbiAgICB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoMik7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSBpbnN0YW5jZW9mIFNoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gXCJoaXRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IFwibWlzc1wiO1xuICAgIH1cbiAgfVxuXG4gIGFsbFN1bmsoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0gaW5zdGFuY2VvZiBTaGlwICYmXG4gICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXS5pc1N1bmsoKSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLm5vT2ZIaXRzID0gMDtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLm5vT2ZIaXRzICs9IDE7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSB0aGlzLm5vT2ZIaXRzKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgYXR0YWNrKHgsIHksIGVuZW15Qm9hcmQpIHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gIH1cblxuICByYW5kb21Nb3ZlKG9wcG9uZW50KSB7XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgd2hpbGUgKG9wcG9uZW50LmJvYXJkW3hdW3ldID09PSBcImhpdFwiIHx8IG9wcG9uZW50LmJvYXJkW3hdW3ldID09PSBcIm1pc3NcIikge1xuICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfVxuICAgIHRoaXMuYXR0YWNrKHgsIHksIG9wcG9uZW50KTtcbiAgICByZXR1cm4gW3gsIHldO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlckJvYXJkIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgeyBjb21wdXRlciwgcGxheWVyT25lLCBnYW1lQ29udHJvbGxlciB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCAqIGFzIGRyYWcgZnJvbSBcIi4vZHJhZ1wiO1xuXG5yZW5kZXJCb2FyZChwbGF5ZXJPbmUucGxheWVyQm9hcmQuYm9hcmQpO1xucmVuZGVyQm9hcmQoY29tcHV0ZXIucGxheWVyQm9hcmQuYm9hcmQpO1xuXG5jb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJhZ2dhYmxlXCIpO1xubGV0IHJlc3VsdDtcbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XG4gICAgcmVzdWx0ID0gc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbFwiKVxuICAgICAgPyBkcmFnLmdldERyb3BUYXJnZXRzVmVydGljYWxQb3NpdGlvbihzaGlwLCBlLmNsaWVudFkpXG4gICAgICA6IGRyYWcuZ2V0RHJvcFRhcmdldHNIb3Jpem9udGFsUG9zaXRpb24oc2hpcCwgZS5jbGllbnRYKTtcbiAgfSk7XG59KTtcblxuY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYXllci0xIFREXCIpO1xuLy8gZnVuY3Rpb24gZHJvcChlKSB7XG4vLyAgIGZvciAoY29uc3QgbnVtIG9mIHJlc3VsdCkge1xuLy8gICAgIGxldCBjb3JkID0gU3RyaW5nKE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmNvcmRzKSArIG51bSk7XG4vLyAgICAgY29yZCA9IGNvcmQubGVuZ3RoID09PSAxID8gYDAke2NvcmR9YCA6IGNvcmQ7XG4vLyAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvcmRzPVwiJHtjb3JkfVwiXWApO1xuLy8gICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4vLyAgIH1cbi8vICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4vLyAgIGNvbnN0IG1pbiA9XG4vLyAgICAgcmVzdWx0WzBdIDwgMFxuLy8gICAgICAgPyBTdHJpbmcocmVzdWx0WzBdICsgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuY29yZHMpKVxuLy8gICAgICAgOiBlLnRhcmdldC5kYXRhc2V0LmNvcmRzO1xuLy8gICBwbGF5ZXJPbmUucGxheWVyQm9hcmQucGxhY2VTaGlwKFxuLy8gICAgIE51bWJlcihtaW5bMF0pLFxuLy8gICAgIE51bWJlcihtaW5bMV0pLFxuLy8gICAgIFwiaG9yaXpvbnRhbFwiLFxuLy8gICAgIHJlc3VsdC5sZW5ndGggKyAxLFxuLy8gICApO1xuLy8gICBjb25zb2xlLmxvZyhwbGF5ZXJPbmUucGxheWVyQm9hcmQuYm9hcmQpO1xuLy8gfVxuXG4vLyBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJhZ2dhYmxlXCIpO1xuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZy5kcmFnU3RhcnQpO1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWcuZHJhZ0VuZCk7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChcImRyYWdnaW5nXCIpO1xuICB9KTtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpO1xuICB9KTtcbn0pO1xuY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZHJhZy5kcmFnRW50ZXIpO1xuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBkcmFnLmRyYWdPdmVyKTtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4ge1xuICAgIGRyYWcuZHJvcChlLCByZXN1bHQpO1xuICB9KTtcbn0pO1xuXG4vLyBnYW1lQ29udHJvbGxlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9