/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   computerBoard: () => (/* binding */ computerBoard),\n/* harmony export */   playerOneBoard: () => (/* binding */ playerOneBoard)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\nconst playerOne = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst computer = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst computerBoard = playerOne.enemyBoard;\n// computerBoard.placeShip(1, 5, \"horizontal\", 3);\n// computerBoard.placeShip(3, 8, \"horizontal\", 5);\n// computerBoard.placeShip(7, 2, \"horizontal\", 6);\n// computerBoard.placeShip(1, 4, \"horizontal\", 1);\n\nconst playerOneBoard = computer.enemyBoard;\n// playerOneBoard.placeShip(5, 3, \"horizontal\", 3);\n// playerOneBoard.placeShip(8, 3, \"horizontal\", 5);\n// playerOneBoard.placeShip(8, 7, \"horizontal\", 1);\n// playerOneBoard.placeShip(3, 3, \"horizontal\", 6);\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.board = [];\n    for (let i = 0; i < 10; i += 1) {\n      this.board[i] = [];\n      for (let j = 0; j < 10; j += 1) {\n        this.board[i][j] = j;\n      }\n    }\n  }\n\n  placeShip(x, y, direction, length) {\n    const ship = new ___WEBPACK_IMPORTED_MODULE_0__[\"default\"](length);\n    this.board[x][y] = ship;\n    for (let i = 0; i < length; i += 1) {\n      if (direction === \"horizontal\") {\n        this.board[x - i][y] = ship;\n      } else if (direction === \"vertical\") this.board[x][y + i] = ship;\n    }\n    return ship;\n  }\n\n  receiveAttack(x, y) {\n    if (this.board[x][y] instanceof ___WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      this.board[x][y].hit();\n      this.board[x][y] = \"hit\";\n    } else {\n      this.board[x][y] = \"miss\";\n    }\n  }\n\n  allSunk() {\n    for (let i = 0; i < 10; i += 1) {\n      for (let j = 0; j < 10; j += 1) {\n        if (\n          this.board[i][j] instanceof ___WEBPACK_IMPORTED_MODULE_0__[\"default\"] &&\n          this.board[i][j].isSunk() === false\n        )\n          return false;\n      }\n    }\n    return true;\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.noOfHits = 0;\n  }\n\n  hit() {\n    this.noOfHits += 1;\n  }\n\n  isSunk() {\n    if (this.length === this.noOfHits) return true;\n    return false;\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n\n\nclass Player {\n  enemyBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n  attack(x, y) {\n    this.enemyBoard.receiveAttack(x, y);\n  }\n\n  randomMove() {\n    const x = Math.floor(Math.random() * 10);\n    const y = Math.floor(Math.random() * 10);\n    this.attack(x, y);\n    return [x, y];\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.js");
/******/ 	
/******/ })()
;