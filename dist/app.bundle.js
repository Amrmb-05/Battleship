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
  startBtn.classList.toggle("hide");
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(_game__WEBPACK_IMPORTED_MODULE_1__.computer.playerBoard.board);
  (0,_game__WEBPACK_IMPORTED_MODULE_1__.gameController)();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3pCLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLEVBQUUsaURBQVcsQ0FBQywyQ0FBUTtBQUN0QixFQUFFLHFEQUFjO0FBQ2hCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RyYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuXCI7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xuZnVuY3Rpb24gcmVuZGVyQm9hcmQoYXJyKSB7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBjb25zdCBwbGF5ZXIgPSBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGg7XG4gIHRhYmxlLmNsYXNzTGlzdC5hZGQoYHBsYXllci0ke3BsYXllciArIDF9YCk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRhYmxlKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICB0ZC5kYXRhc2V0LmNvcmRzID0gYCR7aX0ke2p9YDtcbiAgICAgIGlmIChhcnJbaV1bal0gaW5zdGFuY2VvZiBTaGlwKSB0ZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIC8vIGlmIChhcnJbaV1bal0gPT09IFwiaGl0XCIpIHRkLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAvLyBpZiAoYXJyW2ldW2pdID09PSBcIm1pc3NcIikgdGQuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlXaW5uZXIod2lubmVyKSB7XG4gIGNvbnN0IHdpbk1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lci1kaXNwbGF5XCIpO1xuICB3aW5NZXNzYWdlLnRleHRDb250ZW50ID0gYCR7d2lubmVyLm5hbWV9IGlzIHRoZSBXaW5uZXIhYDtcbn1cbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcmFnZ2FibGVcIik7XG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoXCJ2ZXJ0aWNhbFwiKTtcbiAgfSk7XG59KTtcbmV4cG9ydCB7IHJlbmRlckJvYXJkLCBkaXNwbGF5V2lubmVyIH07XG4iLCJjb25zdCBkcmFnU3RhcnQgPSAoZSkgPT4ge1xuICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBlLnRhcmdldC5pZCk7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcbn07XG5cbmNvbnN0IGRyYWdFbmQgPSAoZSkgPT4ge1xuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIik7XG59O1xuXG5jb25zdCBkcmFnT3ZlciA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyYWctb3ZlclwiKTtcbn07XG5cbmNvbnN0IGRyYWdFbnRlciA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyYWctb3ZlclwiKTtcbn07XG5cbmNvbnN0IGdldERyb3BUYXJnZXRzSG9yaXpvbnRhbFBvc2l0aW9uID0gKGVsZW1lbnQsIHgpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGNvbnN0IGJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IGVsZW1lbnRXaWR0aCA9IGJveC53aWR0aDtcbiAgY29uc3QgbnVtYmVyT2ZCb3hlcyA9IE1hdGguZmxvb3IoZWxlbWVudFdpZHRoIC8gMjUpO1xuICBjb25zb2xlLmxvZyhudW1iZXJPZkJveGVzKTtcbiAgY29uc3QgbW91c2VQb3NpdGlvbiA9IHggLSBib3gueDtcbiAgY29uc3QgYm94TnVtYmVyID0gTWF0aC5jZWlsKG1vdXNlUG9zaXRpb24gLyAyNSk7XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBudW1iZXJPZkJveGVzICsgMTsgaSArPSAxKSB7XG4gICAgaWYgKGkgIT09IGJveE51bWJlcikge1xuICAgICAgcmVzdWx0LnB1c2goaSAtIGJveE51bWJlcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IGdldERyb3BUYXJnZXRzVmVydGljYWxQb3NpdGlvbiA9IChlbGVtZW50LCB5KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBjb25zdCBib3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gYm94LmhlaWdodDtcbiAgY29uc3QgbnVtYmVyT2ZCb3hlcyA9IE1hdGguZmxvb3IoZWxlbWVudEhlaWdodCAvIDI1KTtcbiAgY29uc29sZS5sb2cobnVtYmVyT2ZCb3hlcyk7XG4gIGNvbnN0IG1vdXNlUG9zaXRpb24gPSB5IC0gYm94Lnk7XG4gIGNvbnN0IGJveE51bWJlciA9IE1hdGguY2VpbChtb3VzZVBvc2l0aW9uIC8gMjUpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG51bWJlck9mQm94ZXMgKyAxOyBpICs9IDEpIHtcbiAgICBpZiAoaSAhPT0gYm94TnVtYmVyKSB7XG4gICAgICByZXN1bHQucHVzaCgxMCAqIChpIC0gYm94TnVtYmVyKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAgIGNvbnN0IGdldERyb3BDb29yZGluYXRlc1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzXG5jb25zdCBkcm9wID0gKGUsIGFycikgPT4ge1xuICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcmFnZ2luZ1wiKTtcbiAgZm9yIChjb25zdCBudW0gb2YgYXJyKSB7XG4gICAgbGV0IGNvcmQgPSBTdHJpbmcoTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuY29yZHMpICsgbnVtKTtcbiAgICBjb3JkID0gY29yZC5sZW5ndGggPT09IDEgPyBgMCR7Y29yZH1gIDogY29yZDtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY29yZHM9XCIke2NvcmR9XCJdYCk7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgfVxuICBzaGlwLnJlbW92ZSgpO1xuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbn07XG5cbmV4cG9ydCB7XG4gIGRyYWdFbnRlcixcbiAgZHJhZ092ZXIsXG4gIGRyYWdTdGFydCxcbiAgZHJvcCxcbiAgZ2V0RHJvcFRhcmdldHNIb3Jpem9udGFsUG9zaXRpb24sXG4gIGdldERyb3BUYXJnZXRzVmVydGljYWxQb3NpdGlvbixcbiAgZHJhZ0VuZCxcbn07XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgZGlzcGxheVdpbm5lciB9IGZyb20gXCIuL2RvbVwiO1xuXG5jb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKFwiQW1yXCIpO1xuY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiQ29tcHV0ZXJcIik7XG5jb25zdCBwbGF5ZXJPbmVCb2FyZCA9IHBsYXllck9uZS5wbGF5ZXJCb2FyZDtcbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlci5wbGF5ZXJCb2FyZDtcbmxldCB3aW5uZXJGb3VuZCA9IGZhbHNlO1xuXG5jb21wdXRlckJvYXJkLnBvcHVsYXRlKCk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgwLCAwLCBcImhvcml6b250YWxcIiwgMyk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgzLCA4LCBcImhvcml6b250YWxcIiwgNSk7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCg3LCAyLCBcImhvcml6b250YWxcIiwgNik7XG4vLyBjb21wdXRlckJvYXJkLnBsYWNlU2hpcCgxLCA0LCBcImhvcml6b250YWxcIiwgMSk7XG5cbi8vIHBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCgwLCAwLCBcInZlcnRpY2FsXCIsIDQpO1xuLy8gcGxheWVyT25lQm9hcmQucGxhY2VTaGlwKDIsIDMsIFwiaG9yaXpvbnRhbFwiLCA1KTtcbi8vIHBsYXllck9uZUJvYXJkLnBsYWNlU2hpcCg4LCA3LCBcImhvcml6b250YWxcIiwgMSk7XG4vLyBwbGF5ZXJPbmVCb2FyZC5wbGFjZVNoaXAoMywgMywgXCJob3Jpem9udGFsXCIsIDYpO1xuXG5mdW5jdGlvbiBpc0dhbWVPdmVyKCkge1xuICBpZiAocGxheWVyT25lLnBsYXllckJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgIHdpbm5lckZvdW5kID0gY29tcHV0ZXI7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGNvbXB1dGVyLnBsYXllckJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgIHdpbm5lckZvdW5kID0gcGxheWVyT25lO1xuICAgIGNvbnNvbGUubG9nKHdpbm5lckZvdW5kKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdhbWVMb29wKGV2ZW50KSB7XG4gIGNvbnN0IGNvbXB1dGVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLTJcIik7XG5cbiAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIlREXCIpIHtcbiAgICBwbGF5ZXJPbmUuYXR0YWNrKFxuICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMF0sXG4gICAgICBldmVudC50YXJnZXQuZGF0YXNldC5jb3Jkc1sxXSxcbiAgICAgIGNvbXB1dGVyLnBsYXllckJvYXJkLFxuICAgICk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXG4gICAgICBgJHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5ib2FyZFtldmVudC50YXJnZXQuZGF0YXNldC5jb3Jkc1swXV1bXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29yZHNbMV1cbiAgICAgICAgXVxuICAgICAgfWAsXG4gICAgKTtcbiAgICBpZiAoaXNHYW1lT3ZlcigpID09PSB0cnVlKSB7XG4gICAgICBkaXNwbGF5V2lubmVyKHdpbm5lckZvdW5kKTtcbiAgICAgIGNvbXB1dGVyR3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2FtZUxvb3ApO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgQ29tcHV0ZXI6ICR7Y29tcHV0ZXIucGxheWVyQm9hcmR9YCk7XG4gIH1cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29uc3QgYXR0YWNrZWRDb29yZHMgPSBjb21wdXRlci5yYW5kb21Nb3ZlKHBsYXllck9uZS5wbGF5ZXJCb2FyZCk7XG4gICAgY29uc29sZS5sb2cocGxheWVyT25lQm9hcmQuYm9hcmRbYXR0YWNrZWRDb29yZHNbMF1dW2F0dGFja2VkQ29vcmRzWzFdXSk7XG4gICAgY29uc29sZS5sb2coYXR0YWNrZWRDb29yZHMpO1xuICAgIGNvbnN0IGF0dGFja2VkQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtY29yZHM9XCIke2F0dGFja2VkQ29vcmRzWzBdfSR7YXR0YWNrZWRDb29yZHNbMV19XCJdYCxcbiAgICApO1xuICAgIGF0dGFja2VkQ2VsbC5jbGFzc0xpc3QuYWRkKFxuICAgICAgYCR7cGxheWVyT25lQm9hcmQuYm9hcmRbYXR0YWNrZWRDb29yZHNbMF1dW2F0dGFja2VkQ29vcmRzWzFdXX1gLFxuICAgICk7XG4gICAgaWYgKGlzR2FtZU92ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgZGlzcGxheVdpbm5lcih3aW5uZXJGb3VuZCk7XG4gICAgICBjb21wdXRlckdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdhbWVMb29wKTtcbiAgICB9XG4gIH0sIDEwMDApO1xufVxuZnVuY3Rpb24gZ2FtZUNvbnRyb2xsZXIoKSB7XG4gIGNvbnN0IGNvbXB1dGVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLTJcIik7XG5cbiAgY29tcHV0ZXJHcmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnYW1lTG9vcCk7XG59XG5cbmV4cG9ydCB7IHBsYXllck9uZSwgY29tcHV0ZXIsIGdhbWVDb250cm9sbGVyLCBpc0dhbWVPdmVyIH07XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICB0aGlzLmJvYXJkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IGo7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGxhY2VTaGlwKHgsIHksIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCk7XG4gICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbeCArIGldW3ldID0gc2hpcDtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikgdGhpcy5ib2FyZFt4XVt5ICsgaV0gPSBzaGlwO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcDtcbiAgfVxuXG4gIHJhbmRvbVNoaXBQbGFjZW1lbnQobGVuZ3RoKSB7XG4gICAgbGV0IHg7XG4gICAgbGV0IHk7XG5cbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXCJob3Jpem9udGFsXCIsIFwidmVydGljYWxcIl07XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NpdGlvbnMubGVuZ3RoKTtcbiAgICBpZiAocG9zaXRpb25zW2luZGV4XSA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB4ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB5ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB0aGlzLmJvYXJkW3ggKyBpXVt5XSBpbnN0YW5jZW9mIFNoaXBcbiAgICAgICAgKSB7XG4gICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIGxlbmd0aCArIDEpKTtcbiAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beSArIGldIGluc3RhbmNlb2YgU2hpcFxuICAgICAgICApIHtcbiAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBsZW5ndGggKyAxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wbGFjZVNoaXAoeCwgeSwgcG9zaXRpb25zW2luZGV4XSwgbGVuZ3RoKTtcbiAgICByZXR1cm4gW3gsIHldO1xuICB9XG5cbiAgcG9wdWxhdGUoKSB7XG4gICAgdGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KDUpO1xuICAgIHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCg0KTtcbiAgICB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoMyk7XG4gICAgdGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KDMpO1xuICAgIHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgyKTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldIGluc3RhbmNlb2YgU2hpcCkge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKTtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBcImhpdFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gXCJtaXNzXCI7XG4gICAgfVxuICB9XG5cbiAgYWxsU3VuaygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSBpbnN0YW5jZW9mIFNoaXAgJiZcbiAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdLmlzU3VuaygpID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMubm9PZkhpdHMgPSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMubm9PZkhpdHMgKz0gMTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IHRoaXMubm9PZkhpdHMpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL2luZGV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIH1cblxuICBhdHRhY2soeCwgeSwgZW5lbXlCb2FyZCkge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgfVxuXG4gIHJhbmRvbU1vdmUob3Bwb25lbnQpIHtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB3aGlsZSAob3Bwb25lbnQuYm9hcmRbeF1beV0gPT09IFwiaGl0XCIgfHwgb3Bwb25lbnQuYm9hcmRbeF1beV0gPT09IFwibWlzc1wiKSB7XG4gICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG4gICAgdGhpcy5hdHRhY2soeCwgeSwgb3Bwb25lbnQpO1xuICAgIHJldHVybiBbeCwgeV07XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyQm9hcmQgfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7IGNvbXB1dGVyLCBwbGF5ZXJPbmUsIGdhbWVDb250cm9sbGVyIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0ICogYXMgZHJhZyBmcm9tIFwiLi9kcmFnXCI7XG5cbnJlbmRlckJvYXJkKHBsYXllck9uZS5wbGF5ZXJCb2FyZC5ib2FyZCk7XG5cbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcmFnZ2FibGVcIik7XG5sZXQgcmVzdWx0O1xuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICByZXN1bHQgPSBzaGlwLmNsYXNzTGlzdC5jb250YWlucyhcInZlcnRpY2FsXCIpXG4gICAgICA/IGRyYWcuZ2V0RHJvcFRhcmdldHNWZXJ0aWNhbFBvc2l0aW9uKHNoaXAsIGUuY2xpZW50WSlcbiAgICAgIDogZHJhZy5nZXREcm9wVGFyZ2V0c0hvcml6b250YWxQb3NpdGlvbihzaGlwLCBlLmNsaWVudFgpO1xuICB9KTtcbn0pO1xuXG5jb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxheWVyLTEgVERcIik7XG5cbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWcuZHJhZ1N0YXJ0KTtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnLmRyYWdFbmQpO1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2luZ1wiKTtcbiAgfSk7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGUpID0+IHtcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnZ2luZ1wiKTtcbiAgfSk7XG59KTtcbmNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGRyYWcuZHJhZ0VudGVyKTtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZy5kcmFnT3Zlcik7XG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICBkcmFnLmRyb3AoZSwgcmVzdWx0KTtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHRbMF0pO1xuICAgIGxldCBwb3NpdGlvbjtcbiAgICBpZiAocmVzdWx0WzBdID49IDEwKSB7XG4gICAgICBwb3NpdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zaXRpb24gPSBcImhvcml6b250YWxcIjtcbiAgICB9XG4gICAgY29uc3QgbWluID1cbiAgICAgIHJlc3VsdFswXSA8IDBcbiAgICAgICAgPyBTdHJpbmcocmVzdWx0WzBdICsgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuY29yZHMpKVxuICAgICAgICA6IGUudGFyZ2V0LmRhdGFzZXQuY29yZHM7XG4gICAgcGxheWVyT25lLnBsYXllckJvYXJkLnBsYWNlU2hpcChcbiAgICAgIE51bWJlcihtaW5bMF0pLFxuICAgICAgTnVtYmVyKG1pblsxXSksXG4gICAgICBwb3NpdGlvbixcbiAgICAgIHJlc3VsdC5sZW5ndGggKyAxLFxuICAgICk7XG4gICAgY29uc29sZS5sb2cocGxheWVyT25lLnBsYXllckJvYXJkLmJvYXJkKTtcbiAgfSk7XG59KTtcblxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWdhbWVcIik7XG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBzdGFydEJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbiAgcmVuZGVyQm9hcmQoY29tcHV0ZXIucGxheWVyQm9hcmQuYm9hcmQpO1xuICBnYW1lQ29udHJvbGxlcigpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=