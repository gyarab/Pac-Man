// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/easystarjs/bin/easystar-0.4.3.js":[function(require,module,exports) {
var EasyStar =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	*   EasyStar.js
	*   github.com/prettymuchbryce/EasyStarJS
	*   Licensed under the MIT license.
	*
	*   Implementation By Bryce Neal (@prettymuchbryce)
	**/

	var EasyStar = {};
	var Instance = __webpack_require__(1);
	var Node = __webpack_require__(2);
	var Heap = __webpack_require__(3);

	const CLOSED_LIST = 0;
	const OPEN_LIST = 1;

	module.exports = EasyStar;

	var nextInstanceId = 1;

	EasyStar.js = function () {
	    var STRAIGHT_COST = 1.0;
	    var DIAGONAL_COST = 1.4;
	    var syncEnabled = false;
	    var pointsToAvoid = {};
	    var collisionGrid;
	    var costMap = {};
	    var pointsToCost = {};
	    var directionalConditions = {};
	    var allowCornerCutting = true;
	    var iterationsSoFar;
	    var instances = {};
	    var instanceQueue = [];
	    var iterationsPerCalculation = Number.MAX_VALUE;
	    var acceptableTiles;
	    var diagonalsEnabled = false;

	    /**
	    * Sets the collision grid that EasyStar uses.
	    *
	    * @param {Array|Number} tiles An array of numbers that represent
	    * which tiles in your grid should be considered
	    * acceptable, or "walkable".
	    **/
	    this.setAcceptableTiles = function (tiles) {
	        if (tiles instanceof Array) {
	            // Array
	            acceptableTiles = tiles;
	        } else if (!isNaN(parseFloat(tiles)) && isFinite(tiles)) {
	            // Number
	            acceptableTiles = [tiles];
	        }
	    };

	    /**
	    * Enables sync mode for this EasyStar instance..
	    * if you're into that sort of thing.
	    **/
	    this.enableSync = function () {
	        syncEnabled = true;
	    };

	    /**
	    * Disables sync mode for this EasyStar instance.
	    **/
	    this.disableSync = function () {
	        syncEnabled = false;
	    };

	    /**
	     * Enable diagonal pathfinding.
	     */
	    this.enableDiagonals = function () {
	        diagonalsEnabled = true;
	    };

	    /**
	     * Disable diagonal pathfinding.
	     */
	    this.disableDiagonals = function () {
	        diagonalsEnabled = false;
	    };

	    /**
	    * Sets the collision grid that EasyStar uses.
	    *
	    * @param {Array} grid The collision grid that this EasyStar instance will read from.
	    * This should be a 2D Array of Numbers.
	    **/
	    this.setGrid = function (grid) {
	        collisionGrid = grid;

	        //Setup cost map
	        for (var y = 0; y < collisionGrid.length; y++) {
	            for (var x = 0; x < collisionGrid[0].length; x++) {
	                if (!costMap[collisionGrid[y][x]]) {
	                    costMap[collisionGrid[y][x]] = 1;
	                }
	            }
	        }
	    };

	    /**
	    * Sets the tile cost for a particular tile type.
	    *
	    * @param {Number} The tile type to set the cost for.
	    * @param {Number} The multiplicative cost associated with the given tile.
	    **/
	    this.setTileCost = function (tileType, cost) {
	        costMap[tileType] = cost;
	    };

	    /**
	    * Sets the an additional cost for a particular point.
	    * Overrides the cost from setTileCost.
	    *
	    * @param {Number} x The x value of the point to cost.
	    * @param {Number} y The y value of the point to cost.
	    * @param {Number} The multiplicative cost associated with the given point.
	    **/
	    this.setAdditionalPointCost = function (x, y, cost) {
	        if (pointsToCost[y] === undefined) {
	            pointsToCost[y] = {};
	        }
	        pointsToCost[y][x] = cost;
	    };

	    /**
	    * Remove the additional cost for a particular point.
	    *
	    * @param {Number} x The x value of the point to stop costing.
	    * @param {Number} y The y value of the point to stop costing.
	    **/
	    this.removeAdditionalPointCost = function (x, y) {
	        if (pointsToCost[y] !== undefined) {
	            delete pointsToCost[y][x];
	        }
	    };

	    /**
	    * Remove all additional point costs.
	    **/
	    this.removeAllAdditionalPointCosts = function () {
	        pointsToCost = {};
	    };

	    /**
	    * Sets a directional condition on a tile
	    *
	    * @param {Number} x The x value of the point.
	    * @param {Number} y The y value of the point.
	    * @param {Array.<String>} allowedDirections A list of all the allowed directions that can access
	    * the tile.
	    **/
	    this.setDirectionalCondition = function (x, y, allowedDirections) {
	        if (directionalConditions[y] === undefined) {
	            directionalConditions[y] = {};
	        }
	        directionalConditions[y][x] = allowedDirections;
	    };

	    /**
	    * Remove all directional conditions
	    **/
	    this.removeAllDirectionalConditions = function () {
	        directionalConditions = {};
	    };

	    /**
	    * Sets the number of search iterations per calculation.
	    * A lower number provides a slower result, but more practical if you
	    * have a large tile-map and don't want to block your thread while
	    * finding a path.
	    *
	    * @param {Number} iterations The number of searches to prefrom per calculate() call.
	    **/
	    this.setIterationsPerCalculation = function (iterations) {
	        iterationsPerCalculation = iterations;
	    };

	    /**
	    * Avoid a particular point on the grid,
	    * regardless of whether or not it is an acceptable tile.
	    *
	    * @param {Number} x The x value of the point to avoid.
	    * @param {Number} y The y value of the point to avoid.
	    **/
	    this.avoidAdditionalPoint = function (x, y) {
	        if (pointsToAvoid[y] === undefined) {
	            pointsToAvoid[y] = {};
	        }
	        pointsToAvoid[y][x] = 1;
	    };

	    /**
	    * Stop avoiding a particular point on the grid.
	    *
	    * @param {Number} x The x value of the point to stop avoiding.
	    * @param {Number} y The y value of the point to stop avoiding.
	    **/
	    this.stopAvoidingAdditionalPoint = function (x, y) {
	        if (pointsToAvoid[y] !== undefined) {
	            delete pointsToAvoid[y][x];
	        }
	    };

	    /**
	    * Enables corner cutting in diagonal movement.
	    **/
	    this.enableCornerCutting = function () {
	        allowCornerCutting = true;
	    };

	    /**
	    * Disables corner cutting in diagonal movement.
	    **/
	    this.disableCornerCutting = function () {
	        allowCornerCutting = false;
	    };

	    /**
	    * Stop avoiding all additional points on the grid.
	    **/
	    this.stopAvoidingAllAdditionalPoints = function () {
	        pointsToAvoid = {};
	    };

	    /**
	    * Find a path.
	    *
	    * @param {Number} startX The X position of the starting point.
	    * @param {Number} startY The Y position of the starting point.
	    * @param {Number} endX The X position of the ending point.
	    * @param {Number} endY The Y position of the ending point.
	    * @param {Function} callback A function that is called when your path
	    * is found, or no path is found.
	    * @return {Number} A numeric, non-zero value which identifies the created instance. This value can be passed to cancelPath to cancel the path calculation.
	    *
	    **/
	    this.findPath = function (startX, startY, endX, endY, callback) {
	        // Wraps the callback for sync vs async logic
	        var callbackWrapper = function (result) {
	            if (syncEnabled) {
	                callback(result);
	            } else {
	                setTimeout(function () {
	                    callback(result);
	                });
	            }
	        };

	        // No acceptable tiles were set
	        if (acceptableTiles === undefined) {
	            throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
	        }
	        // No grid was set
	        if (collisionGrid === undefined) {
	            throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
	        }

	        // Start or endpoint outside of scope.
	        if (startX < 0 || startY < 0 || endX < 0 || endY < 0 || startX > collisionGrid[0].length - 1 || startY > collisionGrid.length - 1 || endX > collisionGrid[0].length - 1 || endY > collisionGrid.length - 1) {
	            throw new Error("Your start or end point is outside the scope of your grid.");
	        }

	        // Start and end are the same tile.
	        if (startX === endX && startY === endY) {
	            callbackWrapper([]);
	            return;
	        }

	        // End point is not an acceptable tile.
	        var endTile = collisionGrid[endY][endX];
	        var isAcceptable = false;
	        for (var i = 0; i < acceptableTiles.length; i++) {
	            if (endTile === acceptableTiles[i]) {
	                isAcceptable = true;
	                break;
	            }
	        }

	        if (isAcceptable === false) {
	            callbackWrapper(null);
	            return;
	        }

	        // Create the instance
	        var instance = new Instance();
	        instance.openList = new Heap(function (nodeA, nodeB) {
	            return nodeA.bestGuessDistance() - nodeB.bestGuessDistance();
	        });
	        instance.isDoneCalculating = false;
	        instance.nodeHash = {};
	        instance.startX = startX;
	        instance.startY = startY;
	        instance.endX = endX;
	        instance.endY = endY;
	        instance.callback = callbackWrapper;

	        instance.openList.push(coordinateToNode(instance, instance.startX, instance.startY, null, STRAIGHT_COST));

	        var instanceId = nextInstanceId++;
	        instances[instanceId] = instance;
	        instanceQueue.push(instanceId);
	        return instanceId;
	    };

	    /**
	     * Cancel a path calculation.
	     *
	     * @param {Number} instanceId The instance ID of the path being calculated
	     * @return {Boolean} True if an instance was found and cancelled.
	     *
	     **/
	    this.cancelPath = function (instanceId) {
	        if (instanceId in instances) {
	            delete instances[instanceId];
	            // No need to remove it from instanceQueue
	            return true;
	        }
	        return false;
	    };

	    /**
	    * This method steps through the A* Algorithm in an attempt to
	    * find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
	    * You can change the number of calculations done in a call by using
	    * easystar.setIteratonsPerCalculation().
	    **/
	    this.calculate = function () {
	        if (instanceQueue.length === 0 || collisionGrid === undefined || acceptableTiles === undefined) {
	            return;
	        }
	        for (iterationsSoFar = 0; iterationsSoFar < iterationsPerCalculation; iterationsSoFar++) {
	            if (instanceQueue.length === 0) {
	                return;
	            }

	            if (syncEnabled) {
	                // If this is a sync instance, we want to make sure that it calculates synchronously.
	                iterationsSoFar = 0;
	            }

	            var instanceId = instanceQueue[0];
	            var instance = instances[instanceId];
	            if (typeof instance == 'undefined') {
	                // This instance was cancelled
	                instanceQueue.shift();
	                continue;
	            }

	            // Couldn't find a path.
	            if (instance.openList.size() === 0) {
	                instance.callback(null);
	                delete instances[instanceId];
	                instanceQueue.shift();
	                continue;
	            }

	            var searchNode = instance.openList.pop();

	            // Handles the case where we have found the destination
	            if (instance.endX === searchNode.x && instance.endY === searchNode.y) {
	                var path = [];
	                path.push({ x: searchNode.x, y: searchNode.y });
	                var parent = searchNode.parent;
	                while (parent != null) {
	                    path.push({ x: parent.x, y: parent.y });
	                    parent = parent.parent;
	                }
	                path.reverse();
	                var ip = path;
	                instance.callback(ip);
	                delete instances[instanceId];
	                instanceQueue.shift();
	                continue;
	            }

	            searchNode.list = CLOSED_LIST;

	            if (searchNode.y > 0) {
	                checkAdjacentNode(instance, searchNode, 0, -1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y - 1));
	            }
	            if (searchNode.x < collisionGrid[0].length - 1) {
	                checkAdjacentNode(instance, searchNode, 1, 0, STRAIGHT_COST * getTileCost(searchNode.x + 1, searchNode.y));
	            }
	            if (searchNode.y < collisionGrid.length - 1) {
	                checkAdjacentNode(instance, searchNode, 0, 1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y + 1));
	            }
	            if (searchNode.x > 0) {
	                checkAdjacentNode(instance, searchNode, -1, 0, STRAIGHT_COST * getTileCost(searchNode.x - 1, searchNode.y));
	            }
	            if (diagonalsEnabled) {
	                if (searchNode.x > 0 && searchNode.y > 0) {

	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y, searchNode)) {

	                        checkAdjacentNode(instance, searchNode, -1, -1, DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y - 1));
	                    }
	                }
	                if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y < collisionGrid.length - 1) {

	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y, searchNode)) {

	                        checkAdjacentNode(instance, searchNode, 1, 1, DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y + 1));
	                    }
	                }
	                if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y > 0) {

	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y, searchNode)) {

	                        checkAdjacentNode(instance, searchNode, 1, -1, DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y - 1));
	                    }
	                }
	                if (searchNode.x > 0 && searchNode.y < collisionGrid.length - 1) {

	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y, searchNode)) {

	                        checkAdjacentNode(instance, searchNode, -1, 1, DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y + 1));
	                    }
	                }
	            }
	        }
	    };

	    // Private methods follow
	    var checkAdjacentNode = function (instance, searchNode, x, y, cost) {
	        var adjacentCoordinateX = searchNode.x + x;
	        var adjacentCoordinateY = searchNode.y + y;

	        if ((pointsToAvoid[adjacentCoordinateY] === undefined || pointsToAvoid[adjacentCoordinateY][adjacentCoordinateX] === undefined) && isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY, searchNode)) {
	            var node = coordinateToNode(instance, adjacentCoordinateX, adjacentCoordinateY, searchNode, cost);

	            if (node.list === undefined) {
	                node.list = OPEN_LIST;
	                instance.openList.push(node);
	            } else if (searchNode.costSoFar + cost < node.costSoFar) {
	                node.costSoFar = searchNode.costSoFar + cost;
	                node.parent = searchNode;
	                instance.openList.updateItem(node);
	            }
	        }
	    };

	    // Helpers
	    var isTileWalkable = function (collisionGrid, acceptableTiles, x, y, sourceNode) {
	        var directionalCondition = directionalConditions[y] && directionalConditions[y][x];
	        if (directionalCondition) {
	            var direction = calculateDirection(sourceNode.x - x, sourceNode.y - y);
	            var directionIncluded = function () {
	                for (var i = 0; i < directionalCondition.length; i++) {
	                    if (directionalCondition[i] === direction) return true;
	                }
	                return false;
	            };
	            if (!directionIncluded()) return false;
	        }
	        for (var i = 0; i < acceptableTiles.length; i++) {
	            if (collisionGrid[y][x] === acceptableTiles[i]) {
	                return true;
	            }
	        }

	        return false;
	    };

	    /**
	     * -1, -1 | 0, -1  | 1, -1
	     * -1,  0 | SOURCE | 1,  0
	     * -1,  1 | 0,  1  | 1,  1
	     */
	    var calculateDirection = function (diffX, diffY) {
	        if (diffX === 0 && diffY === -1) return EasyStar.TOP;else if (diffX === 1 && diffY === -1) return EasyStar.TOP_RIGHT;else if (diffX === 1 && diffY === 0) return EasyStar.RIGHT;else if (diffX === 1 && diffY === 1) return EasyStar.BOTTOM_RIGHT;else if (diffX === 0 && diffY === 1) return EasyStar.BOTTOM;else if (diffX === -1 && diffY === 1) return EasyStar.BOTTOM_LEFT;else if (diffX === -1 && diffY === 0) return EasyStar.LEFT;else if (diffX === -1 && diffY === -1) return EasyStar.TOP_LEFT;
	        throw new Error('These differences are not valid: ' + diffX + ', ' + diffY);
	    };

	    var getTileCost = function (x, y) {
	        return pointsToCost[y] && pointsToCost[y][x] || costMap[collisionGrid[y][x]];
	    };

	    var coordinateToNode = function (instance, x, y, parent, cost) {
	        if (instance.nodeHash[y] !== undefined) {
	            if (instance.nodeHash[y][x] !== undefined) {
	                return instance.nodeHash[y][x];
	            }
	        } else {
	            instance.nodeHash[y] = {};
	        }
	        var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
	        if (parent !== null) {
	            var costSoFar = parent.costSoFar + cost;
	        } else {
	            costSoFar = 0;
	        }
	        var node = new Node(parent, x, y, costSoFar, simpleDistanceToTarget);
	        instance.nodeHash[y][x] = node;
	        return node;
	    };

	    var getDistance = function (x1, y1, x2, y2) {
	        if (diagonalsEnabled) {
	            // Octile distance
	            var dx = Math.abs(x1 - x2);
	            var dy = Math.abs(y1 - y2);
	            if (dx < dy) {
	                return DIAGONAL_COST * dx + dy;
	            } else {
	                return DIAGONAL_COST * dy + dx;
	            }
	        } else {
	            // Manhattan distance
	            var dx = Math.abs(x1 - x2);
	            var dy = Math.abs(y1 - y2);
	            return dx + dy;
	        }
	    };
	};

	EasyStar.TOP = 'TOP';
	EasyStar.TOP_RIGHT = 'TOP_RIGHT';
	EasyStar.RIGHT = 'RIGHT';
	EasyStar.BOTTOM_RIGHT = 'BOTTOM_RIGHT';
	EasyStar.BOTTOM = 'BOTTOM';
	EasyStar.BOTTOM_LEFT = 'BOTTOM_LEFT';
	EasyStar.LEFT = 'LEFT';
	EasyStar.TOP_LEFT = 'TOP_LEFT';

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/**
	 * Represents a single instance of EasyStar.
	 * A path that is in the queue to eventually be found.
	 */
	module.exports = function () {
	    this.pointsToAvoid = {};
	    this.startX;
	    this.callback;
	    this.startY;
	    this.endX;
	    this.endY;
	    this.nodeHash = {};
	    this.openList;
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	* A simple Node that represents a single tile on the grid.
	* @param {Object} parent The parent node.
	* @param {Number} x The x position on the grid.
	* @param {Number} y The y position on the grid.
	* @param {Number} costSoFar How far this node is in moves*cost from the start.
	* @param {Number} simpleDistanceToTarget Manhatten distance to the end point.
	**/
	module.exports = function (parent, x, y, costSoFar, simpleDistanceToTarget) {
	    this.parent = parent;
	    this.x = x;
	    this.y = y;
	    this.costSoFar = costSoFar;
	    this.simpleDistanceToTarget = simpleDistanceToTarget;

	    /**
	    * @return {Number} Best guess distance of a cost using this node.
	    **/
	    this.bestGuessDistance = function () {
	        return this.costSoFar + this.simpleDistanceToTarget;
	    };
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.8.0
	(function () {
	  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

	  floor = Math.floor, min = Math.min;

	  /*
	  Default comparison function to be used
	   */

	  defaultCmp = function (x, y) {
	    if (x < y) {
	      return -1;
	    }
	    if (x > y) {
	      return 1;
	    }
	    return 0;
	  };

	  /*
	  Insert item x in list a, and keep it sorted assuming a is sorted.
	  
	  If x is already in a, insert it to the right of the rightmost x.
	  
	  Optional args lo (default 0) and hi (default a.length) bound the slice
	  of a to be searched.
	   */

	  insort = function (a, x, lo, hi, cmp) {
	    var mid;
	    if (lo == null) {
	      lo = 0;
	    }
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (lo < 0) {
	      throw new Error('lo must be non-negative');
	    }
	    if (hi == null) {
	      hi = a.length;
	    }
	    while (lo < hi) {
	      mid = floor((lo + hi) / 2);
	      if (cmp(x, a[mid]) < 0) {
	        hi = mid;
	      } else {
	        lo = mid + 1;
	      }
	    }
	    return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
	  };

	  /*
	  Push item onto heap, maintaining the heap invariant.
	   */

	  heappush = function (array, item, cmp) {
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    array.push(item);
	    return _siftdown(array, 0, array.length - 1, cmp);
	  };

	  /*
	  Pop the smallest item off the heap, maintaining the heap invariant.
	   */

	  heappop = function (array, cmp) {
	    var lastelt, returnitem;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    lastelt = array.pop();
	    if (array.length) {
	      returnitem = array[0];
	      array[0] = lastelt;
	      _siftup(array, 0, cmp);
	    } else {
	      returnitem = lastelt;
	    }
	    return returnitem;
	  };

	  /*
	  Pop and return the current smallest value, and add the new item.
	  
	  This is more efficient than heappop() followed by heappush(), and can be
	  more appropriate when using a fixed size heap. Note that the value
	  returned may be larger than item! That constrains reasonable use of
	  this routine unless written as part of a conditional replacement:
	      if item > array[0]
	        item = heapreplace(array, item)
	   */

	  heapreplace = function (array, item, cmp) {
	    var returnitem;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    returnitem = array[0];
	    array[0] = item;
	    _siftup(array, 0, cmp);
	    return returnitem;
	  };

	  /*
	  Fast version of a heappush followed by a heappop.
	   */

	  heappushpop = function (array, item, cmp) {
	    var _ref;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (array.length && cmp(array[0], item) < 0) {
	      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
	      _siftup(array, 0, cmp);
	    }
	    return item;
	  };

	  /*
	  Transform list into a heap, in-place, in O(array.length) time.
	   */

	  heapify = function (array, cmp) {
	    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    _ref1 = function () {
	      _results1 = [];
	      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--) {
	        _results1.push(_j);
	      }
	      return _results1;
	    }.apply(this).reverse();
	    _results = [];
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	      i = _ref1[_i];
	      _results.push(_siftup(array, i, cmp));
	    }
	    return _results;
	  };

	  /*
	  Update the position of the given item in the heap.
	  This function should be called every time the item is being modified.
	   */

	  updateItem = function (array, item, cmp) {
	    var pos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    pos = array.indexOf(item);
	    if (pos === -1) {
	      return;
	    }
	    _siftdown(array, 0, pos, cmp);
	    return _siftup(array, pos, cmp);
	  };

	  /*
	  Find the n largest elements in a dataset.
	   */

	  nlargest = function (array, n, cmp) {
	    var elem, result, _i, _len, _ref;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    result = array.slice(0, n);
	    if (!result.length) {
	      return result;
	    }
	    heapify(result, cmp);
	    _ref = array.slice(n);
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      elem = _ref[_i];
	      heappushpop(result, elem, cmp);
	    }
	    return result.sort(cmp).reverse();
	  };

	  /*
	  Find the n smallest elements in a dataset.
	   */

	  nsmallest = function (array, n, cmp) {
	    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (n * 10 <= array.length) {
	      result = array.slice(0, n).sort(cmp);
	      if (!result.length) {
	        return result;
	      }
	      los = result[result.length - 1];
	      _ref = array.slice(n);
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        elem = _ref[_i];
	        if (cmp(elem, los) < 0) {
	          insort(result, elem, 0, null, cmp);
	          result.pop();
	          los = result[result.length - 1];
	        }
	      }
	      return result;
	    }
	    heapify(array, cmp);
	    _results = [];
	    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
	      _results.push(heappop(array, cmp));
	    }
	    return _results;
	  };

	  _siftdown = function (array, startpos, pos, cmp) {
	    var newitem, parent, parentpos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    newitem = array[pos];
	    while (pos > startpos) {
	      parentpos = pos - 1 >> 1;
	      parent = array[parentpos];
	      if (cmp(newitem, parent) < 0) {
	        array[pos] = parent;
	        pos = parentpos;
	        continue;
	      }
	      break;
	    }
	    return array[pos] = newitem;
	  };

	  _siftup = function (array, pos, cmp) {
	    var childpos, endpos, newitem, rightpos, startpos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    endpos = array.length;
	    startpos = pos;
	    newitem = array[pos];
	    childpos = 2 * pos + 1;
	    while (childpos < endpos) {
	      rightpos = childpos + 1;
	      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
	        childpos = rightpos;
	      }
	      array[pos] = array[childpos];
	      pos = childpos;
	      childpos = 2 * pos + 1;
	    }
	    array[pos] = newitem;
	    return _siftdown(array, startpos, pos, cmp);
	  };

	  Heap = function () {
	    Heap.push = heappush;

	    Heap.pop = heappop;

	    Heap.replace = heapreplace;

	    Heap.pushpop = heappushpop;

	    Heap.heapify = heapify;

	    Heap.updateItem = updateItem;

	    Heap.nlargest = nlargest;

	    Heap.nsmallest = nsmallest;

	    function Heap(cmp) {
	      this.cmp = cmp != null ? cmp : defaultCmp;
	      this.nodes = [];
	    }

	    Heap.prototype.push = function (x) {
	      return heappush(this.nodes, x, this.cmp);
	    };

	    Heap.prototype.pop = function () {
	      return heappop(this.nodes, this.cmp);
	    };

	    Heap.prototype.peek = function () {
	      return this.nodes[0];
	    };

	    Heap.prototype.contains = function (x) {
	      return this.nodes.indexOf(x) !== -1;
	    };

	    Heap.prototype.replace = function (x) {
	      return heapreplace(this.nodes, x, this.cmp);
	    };

	    Heap.prototype.pushpop = function (x) {
	      return heappushpop(this.nodes, x, this.cmp);
	    };

	    Heap.prototype.heapify = function () {
	      return heapify(this.nodes, this.cmp);
	    };

	    Heap.prototype.updateItem = function (x) {
	      return updateItem(this.nodes, x, this.cmp);
	    };

	    Heap.prototype.clear = function () {
	      return this.nodes = [];
	    };

	    Heap.prototype.empty = function () {
	      return this.nodes.length === 0;
	    };

	    Heap.prototype.size = function () {
	      return this.nodes.length;
	    };

	    Heap.prototype.clone = function () {
	      var heap;
	      heap = new Heap();
	      heap.nodes = this.nodes.slice(0);
	      return heap;
	    };

	    Heap.prototype.toArray = function () {
	      return this.nodes.slice(0);
	    };

	    Heap.prototype.insert = Heap.prototype.push;

	    Heap.prototype.top = Heap.prototype.peek;

	    Heap.prototype.front = Heap.prototype.peek;

	    Heap.prototype.has = Heap.prototype.contains;

	    Heap.prototype.copy = Heap.prototype.clone;

	    return Heap;
	  }();

	  (function (root, factory) {
	    if (true) {
	      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	      return module.exports = factory();
	    } else {
	      return root.Heap = factory();
	    }
	  })(this, function () {
	    return Heap;
	  });
	}).call(this);

/***/ })
/******/ ]);
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56963" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","node_modules/easystarjs/bin/easystar-0.4.3.js"], null)
//# sourceMappingURL=/easystar-0.4.3.4d87c99d.js.map