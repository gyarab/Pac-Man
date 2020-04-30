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
})({"src/scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// inicializace promennych (kdyz se inicializuji v create, tak to nefunguje)
var background;
var playbutton;
var title;
var Menu = -1;
var leaderboardbutton;
var playerName;
var rules;
var continuebutton; // trida scena, rozsiruje PhaserScene a musi se exportovat

var MenuScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);

  function MenuScene() {
    _classCallCheck(this, MenuScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuScene).call(this, {
      key: "MenuScene",
      active: true // vstupni data

    }));
  }

  _createClass(MenuScene, [{
    key: "init",
    value: function init(data) {}
  }, {
    key: "preload",
    value: function preload() {
      // funkce ve ktere se nactou obrazky a zvuky ze souboru assets pro vsechny sceny
      this.load.image("title", "./assets/title.png");
      this.load.image("menuBackground", "./assets/MenuBackground.jpg");
      this.load.image("menu", "./assets/Menu.png");
      this.load.image("resume", "./assets/Resume.png");
      this.load.image("play", "./assets/Play.png");
      this.load.image("leaderboard", "./assets/Leaderboard.png");
      this.load.image("PacMan", "./assets/Pacman.png");
      this.load.image("PacMan2", "./assets/PacMan2.png");
      this.load.image("RedGhost", "./assets/RedGhost.png");
      this.load.image("GreenGhost", "./assets/GreenGhost.png");
      this.load.image("PurpleGhost", "./assets/PurpleGhost.png");
      this.load.image("GreyGhost", "./assets/GreyGhost.png");
      this.load.image("BlackGhost", "./assets/BlackGhost.png");
      this.load.image("Srdce", "./assets/Srdce2.png");
      this.load.image("coin", "assets/Point.png");
      this.load.image("bonus", "assets/BonusPoint.png");
      this.load.image("rules", "./assets/Rules.png");
      this.load.image("background", "./assets/RedBackground.png");
      this.load.image("continue", "./assets/Continue.png");
    }
  }, {
    key: "create",
    value: function create() {
      // souradnice x, y  a nazev obrazku, co se do toho da
      Menu = 0;
      background = this.add.image(640, 448, "background");
      title = this.add.image(640, 100, 'title');
      playbutton = this.add.image(640, 250, 'play');
      leaderboardbutton = this.add.image(640, 320, 'leaderboard');
      playbutton.setInteractive();
      leaderboardbutton.setInteractive();
      playbutton.on('pointerdown', function (pointer) {
        Menu = 1;
        playerName = prompt("Please enter your nickname", "Pacman");

        if (playerName === null) {
          playerName = "Pacman";
        } else {
          while (playerName.length > 20) {
            alert('Please enter a shorter name');
            playerName = prompt("Please enter your nickname", "Pacman");
          }

          localStorage.setItem("playerName", playerName);
        }
      });
      leaderboardbutton.on('pointerup', function (pointer) {
        Menu = 2;
      });
    }
  }, {
    key: "update",
    value: function update() {
      if (Menu === 1) {
        background.destroy();
        title.destroy();
        playbutton.destroy();
        leaderboardbutton.destroy();
        rules = this.add.image(640, 448, "rules");
        continuebutton = this.add.image(1100, 828, 'continue');
        continuebutton.setInteractive();
        Menu = 0;
        continuebutton.on('pointerdown', function (pointer) {
          Menu = 3;
        });
      }

      if (Menu === 3) {
        this.scene.stop();
        this.scene.start("PlayScene");
        Menu = 0;
      }

      if (Menu === 2) {
        this.scene.start("LeaderBoardScene");
        Menu = 0;
      }
    }
  }]);

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{}],"node_modules/easystarjs/src/instance.js":[function(require,module,exports) {
/**
 * Represents a single instance of EasyStar.
 * A path that is in the queue to eventually be found.
 */
module.exports = function() {
    this.pointsToAvoid = {};
    this.startX;
    this.callback;
    this.startY;
    this.endX;
    this.endY;
    this.nodeHash = {};
    this.openList;
};
},{}],"node_modules/easystarjs/src/node.js":[function(require,module,exports) {
/**
* A simple Node that represents a single tile on the grid.
* @param {Object} parent The parent node.
* @param {Number} x The x position on the grid.
* @param {Number} y The y position on the grid.
* @param {Number} costSoFar How far this node is in moves*cost from the start.
* @param {Number} simpleDistanceToTarget Manhatten distance to the end point.
**/
module.exports = function(parent, x, y, costSoFar, simpleDistanceToTarget) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.costSoFar = costSoFar;
    this.simpleDistanceToTarget = simpleDistanceToTarget;

    /**
    * @return {Number} Best guess distance of a cost using this node.
    **/
    this.bestGuessDistance = function() {
        return this.costSoFar + this.simpleDistanceToTarget;
    }
};
},{}],"node_modules/heap/lib/heap.js":[function(require,module,exports) {
var define;
// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
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

  insort = function(a, x, lo, hi, cmp) {
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
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
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

  heapreplace = function(array, item, cmp) {
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

  heappushpop = function(array, item, cmp) {
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

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
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

  updateItem = function(array, item, cmp) {
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

  nlargest = function(array, n, cmp) {
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

  nsmallest = function(array, n, cmp) {
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

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
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

  _siftup = function(array, pos, cmp) {
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

  Heap = (function() {
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

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory();
    } else {
      return root.Heap = factory();
    }
  })(this, function() {
    return Heap;
  });

}).call(this);

},{}],"node_modules/heap/index.js":[function(require,module,exports) {
module.exports = require('./lib/heap');

},{"./lib/heap":"node_modules/heap/lib/heap.js"}],"node_modules/easystarjs/src/easystar.js":[function(require,module,exports) {
/**
*   EasyStar.js
*   github.com/prettymuchbryce/EasyStarJS
*   Licensed under the MIT license.
*
*   Implementation By Bryce Neal (@prettymuchbryce)
**/

var EasyStar = {}
var Instance = require('./instance');
var Node = require('./node');
var Heap = require('heap');

const CLOSED_LIST = 0;
const OPEN_LIST = 1;

module.exports = EasyStar;

var nextInstanceId = 1;

EasyStar.js = function() {
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
    this.setAcceptableTiles = function(tiles) {
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
    this.enableSync = function() {
        syncEnabled = true;
    };

    /**
    * Disables sync mode for this EasyStar instance.
    **/
    this.disableSync = function() {
        syncEnabled = false;
    };

    /**
     * Enable diagonal pathfinding.
     */
    this.enableDiagonals = function() {
        diagonalsEnabled = true;
    }

    /**
     * Disable diagonal pathfinding.
     */
    this.disableDiagonals = function() {
        diagonalsEnabled = false;
    }

    /**
    * Sets the collision grid that EasyStar uses.
    *
    * @param {Array} grid The collision grid that this EasyStar instance will read from.
    * This should be a 2D Array of Numbers.
    **/
    this.setGrid = function(grid) {
        collisionGrid = grid;

        //Setup cost map
        for (var y = 0; y < collisionGrid.length; y++) {
            for (var x = 0; x < collisionGrid[0].length; x++) {
                if (!costMap[collisionGrid[y][x]]) {
                    costMap[collisionGrid[y][x]] = 1
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
    this.setTileCost = function(tileType, cost) {
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
    this.setAdditionalPointCost = function(x, y, cost) {
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
    this.removeAdditionalPointCost = function(x, y) {
        if (pointsToCost[y] !== undefined) {
            delete pointsToCost[y][x];
        }
    }

    /**
    * Remove all additional point costs.
    **/
    this.removeAllAdditionalPointCosts = function() {
        pointsToCost = {};
    }

    /**
    * Sets a directional condition on a tile
    *
    * @param {Number} x The x value of the point.
    * @param {Number} y The y value of the point.
    * @param {Array.<String>} allowedDirections A list of all the allowed directions that can access
    * the tile.
    **/
    this.setDirectionalCondition = function(x, y, allowedDirections) {
        if (directionalConditions[y] === undefined) {
            directionalConditions[y] = {};
        }
        directionalConditions[y][x] = allowedDirections;
    };

    /**
    * Remove all directional conditions
    **/
    this.removeAllDirectionalConditions = function() {
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
    this.setIterationsPerCalculation = function(iterations) {
        iterationsPerCalculation = iterations;
    };

    /**
    * Avoid a particular point on the grid,
    * regardless of whether or not it is an acceptable tile.
    *
    * @param {Number} x The x value of the point to avoid.
    * @param {Number} y The y value of the point to avoid.
    **/
    this.avoidAdditionalPoint = function(x, y) {
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
    this.stopAvoidingAdditionalPoint = function(x, y) {
        if (pointsToAvoid[y] !== undefined) {
            delete pointsToAvoid[y][x];
        }
    };

    /**
    * Enables corner cutting in diagonal movement.
    **/
    this.enableCornerCutting = function() {
        allowCornerCutting = true;
    };

    /**
    * Disables corner cutting in diagonal movement.
    **/
    this.disableCornerCutting = function() {
        allowCornerCutting = false;
    };

    /**
    * Stop avoiding all additional points on the grid.
    **/
    this.stopAvoidingAllAdditionalPoints = function() {
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
    this.findPath = function(startX, startY, endX, endY, callback) {
        // Wraps the callback for sync vs async logic
        var callbackWrapper = function(result) {
            if (syncEnabled) {
                callback(result);
            } else {
                setTimeout(function() {
                    callback(result);
                });
            }
        }

        // No acceptable tiles were set
        if (acceptableTiles === undefined) {
            throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
        }
        // No grid was set
        if (collisionGrid === undefined) {
            throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
        }

        // Start or endpoint outside of scope.
        if (startX < 0 || startY < 0 || endX < 0 || endY < 0 ||
        startX > collisionGrid[0].length-1 || startY > collisionGrid.length-1 ||
        endX > collisionGrid[0].length-1 || endY > collisionGrid.length-1) {
            throw new Error("Your start or end point is outside the scope of your grid.");
        }

        // Start and end are the same tile.
        if (startX===endX && startY===endY) {
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
        instance.openList = new Heap(function(nodeA, nodeB) {
            return nodeA.bestGuessDistance() - nodeB.bestGuessDistance();
        });
        instance.isDoneCalculating = false;
        instance.nodeHash = {};
        instance.startX = startX;
        instance.startY = startY;
        instance.endX = endX;
        instance.endY = endY;
        instance.callback = callbackWrapper;

        instance.openList.push(coordinateToNode(instance, instance.startX,
            instance.startY, null, STRAIGHT_COST));

        var instanceId = nextInstanceId ++;
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
    this.cancelPath = function(instanceId) {
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
    this.calculate = function() {
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
                path.push({x: searchNode.x, y: searchNode.y});
                var parent = searchNode.parent;
                while (parent!=null) {
                    path.push({x: parent.x, y:parent.y});
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
                checkAdjacentNode(instance, searchNode,
                    0, -1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y-1));
            }
            if (searchNode.x < collisionGrid[0].length-1) {
                checkAdjacentNode(instance, searchNode,
                    1, 0, STRAIGHT_COST * getTileCost(searchNode.x+1, searchNode.y));
            }
            if (searchNode.y < collisionGrid.length-1) {
                checkAdjacentNode(instance, searchNode,
                    0, 1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y+1));
            }
            if (searchNode.x > 0) {
                checkAdjacentNode(instance, searchNode,
                    -1, 0, STRAIGHT_COST * getTileCost(searchNode.x-1, searchNode.y));
            }
            if (diagonalsEnabled) {
                if (searchNode.x > 0 && searchNode.y > 0) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1, searchNode) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y, searchNode))) {

                        checkAdjacentNode(instance, searchNode,
                            -1, -1, DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y-1));
                    }
                }
                if (searchNode.x < collisionGrid[0].length-1 && searchNode.y < collisionGrid.length-1) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1, searchNode) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y, searchNode))) {

                        checkAdjacentNode(instance, searchNode,
                            1, 1, DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y+1));
                    }
                }
                if (searchNode.x < collisionGrid[0].length-1 && searchNode.y > 0) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1, searchNode) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y, searchNode))) {

                        checkAdjacentNode(instance, searchNode,
                            1, -1, DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y-1));
                    }
                }
                if (searchNode.x > 0 && searchNode.y < collisionGrid.length-1) {

                    if (allowCornerCutting ||
                        (isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1, searchNode) &&
                        isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y, searchNode))) {

                        checkAdjacentNode(instance, searchNode,
                            -1, 1, DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y+1));
                    }
                }
            }

        }
    };

    // Private methods follow
    var checkAdjacentNode = function(instance, searchNode, x, y, cost) {
        var adjacentCoordinateX = searchNode.x+x;
        var adjacentCoordinateY = searchNode.y+y;

        if ((pointsToAvoid[adjacentCoordinateY] === undefined ||
             pointsToAvoid[adjacentCoordinateY][adjacentCoordinateX] === undefined) &&
            isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY, searchNode)) {
            var node = coordinateToNode(instance, adjacentCoordinateX,
                adjacentCoordinateY, searchNode, cost);

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
    var isTileWalkable = function(collisionGrid, acceptableTiles, x, y, sourceNode) {
        var directionalCondition = directionalConditions[y] && directionalConditions[y][x];
        if (directionalCondition) {
            var direction = calculateDirection(sourceNode.x - x, sourceNode.y - y)
            var directionIncluded = function () {
                for (var i = 0; i < directionalCondition.length; i++) {
                    if (directionalCondition[i] === direction) return true
                }
                return false
            }
            if (!directionIncluded()) return false
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
        if (diffX === 0 && diffY === -1) return EasyStar.TOP
        else if (diffX === 1 && diffY === -1) return EasyStar.TOP_RIGHT
        else if (diffX === 1 && diffY === 0) return EasyStar.RIGHT
        else if (diffX === 1 && diffY === 1) return EasyStar.BOTTOM_RIGHT
        else if (diffX === 0 && diffY === 1) return EasyStar.BOTTOM
        else if (diffX === -1 && diffY === 1) return EasyStar.BOTTOM_LEFT
        else if (diffX === -1 && diffY === 0) return EasyStar.LEFT
        else if (diffX === -1 && diffY === -1) return EasyStar.TOP_LEFT
        throw new Error('These differences are not valid: ' + diffX + ', ' + diffY)
    };

    var getTileCost = function(x, y) {
        return (pointsToCost[y] && pointsToCost[y][x]) || costMap[collisionGrid[y][x]]
    };

    var coordinateToNode = function(instance, x, y, parent, cost) {
        if (instance.nodeHash[y] !== undefined) {
            if (instance.nodeHash[y][x] !== undefined) {
                return instance.nodeHash[y][x];
            }
        } else {
            instance.nodeHash[y] = {};
        }
        var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
        if (parent!==null) {
            var costSoFar = parent.costSoFar + cost;
        } else {
            costSoFar = 0;
        }
        var node = new Node(parent,x,y,costSoFar,simpleDistanceToTarget);
        instance.nodeHash[y][x] = node;
        return node;
    };

    var getDistance = function(x1,y1,x2,y2) {
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
            return (dx + dy);
        }
    };
}

EasyStar.TOP = 'TOP'
EasyStar.TOP_RIGHT = 'TOP_RIGHT'
EasyStar.RIGHT = 'RIGHT'
EasyStar.BOTTOM_RIGHT = 'BOTTOM_RIGHT'
EasyStar.BOTTOM = 'BOTTOM'
EasyStar.BOTTOM_LEFT = 'BOTTOM_LEFT'
EasyStar.LEFT = 'LEFT'
EasyStar.TOP_LEFT = 'TOP_LEFT'

},{"./instance":"node_modules/easystarjs/src/instance.js","./node":"node_modules/easystarjs/src/node.js","heap":"node_modules/heap/index.js"}],"src/scenes/PlayScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// inicializace promennych 
var keys;
var PacMan;
var RedGhost;
var GreenGhost;
var PurpleGhost;
var GreyGhost;
var CoinLayer;
var BonusLayer;
var coins;
var bonus;
var coinScore = 0;
var totalScore;
var level = 1;
var topLayer;
var map;
var terrain;
var bonusF;
var text;
var tileset;
var properties;
var acceptableTiles = [];
var bonusFCheck;
var esc;
var resume;
var lives = 3;
var speed = 320;
var Srdce1;
var Srdce2;
var Srdce3;
var timedEvent;
var scoreField = [];
var spawn = 0; // promenne se souradnicemi znovuobjeveni duchu a PacMana v případě kolize a ubrání života

var PacManRespawnX = 656;
var PacManRespawnY = 592;
var RedGhostRespawnX = 656;
var RedGhostRespawnY = 336;
var RedGhostDeadX = 640;
var RedGhostDeadY = 432;
var GreenGhostRespawnX = 1232;
var GreenGhostRespawnY = 464;
var GreenGhostDeadX = 658;
var GreenGhostDeadY = 400;
var PurpleGhostRespawnX = 48;
var PurpleGhostRespawnY = 464;
var PurpleGhostDeadX = 623;
var PurpleGhostDeadY = 400;
var GreyGhostRespawnX = 656;
var GreyGhostRespawnY = 848;
var GreyGhostDeadX = 640;
var GreyGhostDeadY = 464; // promenna se souradnicemi pohybu duchu

var GreenTargetValue = 1;
var GreenTargetCoordinateX;
var GreenTargetCoordinateY;
var PurpleTargetValue = 1;
var PurpleTargetCoordinateX;
var PurpleTargetCoordinateY;
var GreyTargetValue = 1;
var GreyTargetCoordinateX;
var GreyTargetCoordinateY;
var finder;
var finder2;
var finder3;
var finder4;
var grid; // metody cele sceny
// metoda, ktera vypocita a vrati vzdalenost mezi 2 body

function distance(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
} // metoda, ktera vrati ID tile na dane souradnici


function getTileID(x, y) {
  var tile = map.getTileAt(x, y);
  return tile.index;
}

; // metoda, ktera se spusti pri kolizi PacMana s coinem, odstrani dany coin z herni plochy a pricte score, ktere zaroven aktualizuje

function collectCoin(PacMan, coin) {
  coin.destroy(coin.x, coin.y);
  coinScore++;
  totalScore++;
  text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
  return false;
} // metoda, ktera se spusti pri kolizi PacMana s bonusem, odstrani dany bonus z herni plochy a aktivuje ho, dale pricte a aktualizuje skore


function collectBonus(PacMan, bonus) {
  // pokud je efekt bonusu aktivni v dobe sebrani dalsiho bonusu, nastavi se promenna bonusFCheck, aby došlo s prodloužení trvání bonusu
  if (bonusF === true) {
    bonusFCheck = true;
  }

  bonus.destroy(bonus.x, bonus.y);
  totalScore = totalScore + 5;
  text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
  bonusF = true;
  RedGhost.setTexture("BlackGhost"); // zastavi duchy a nastavi jim odlisnou texturu

  PurpleGhost.setTexture("BlackGhost");
  PurpleGhost.setVelocityX(0);
  PurpleGhost.setVelocityY(0);
  GreenGhost.setTexture("BlackGhost");
  GreenGhost.setVelocityX(0);
  GreenGhost.setVelocityY(0);
  GreyGhost.setTexture("BlackGhost"); // casovana udalost, ktera se spusti po 3s, opet probudi duchy a nastavi jim puvodni texturu

  timedEvent = this.time.delayedCall(3000, waitEvent, [], this);

  function waitEvent() {
    // pokud hrac nesebral druhy bonus v dobe trvani prvniho bonus skonci
    if (bonusFCheck === false) {
      RedGhost.setTexture("RedGhost");
      PurpleGhost.setTexture("PurpleGhost");
      GreenGhost.setTexture("GreenGhost");
      GreyGhost.setTexture("GreyGhost"); // vypne aktivni bonus

      bonusF = false;
    }

    bonusFCheck = false;
  }

  return false;
} // metoda, ktera se spusti pri kolizi ducha a PacMana, celkem jsou 4 pro kazdeho ducha je 1 metoda


function damageR() {
  // pokud neni aktivni bonus
  if (bonusF === false) {
    // pozastavi hru, nastavi puvodni polohu duchum a PacMan
    this.scene.pause();
    this.scene.launch("PauseScene");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY; // ubere zivot

    lives = lives - 1; // promenna ktera spousti znovuobjevovani duchu

    spawn = 0;
    return false;
  } // v pripade, ze je bonus aktivni pricte hraci skore a posle ducha do vezeni do doby nez se znovu objevi
  else {
      var respawnEvent = function respawnEvent() {
        if (lives === test) {
          RedGhost.x = RedGhostRespawnX;
          RedGhost.y = RedGhostRespawnY;
        }
      };

      var test = lives;
      totalScore = totalScore + 10;
      text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
      RedGhost.x = RedGhostDeadX;
      RedGhost.y = RedGhostDeadY; // casovana udalost, kdy se po 3s znovuobjevi duch

      timedEvent = this.time.delayedCall(3000, respawnEvent, [], this);
    }
} // identicka metoda jako predchozi jen pro zeleneho ducha


function damageG() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent = function respawnEvent() {
      if (lives === test) {
        GreenGhost.x = GreenGhostRespawnX;
        GreenGhost.y = GreenGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    var timedEvent = this.time.delayedCall(3000, respawnEvent, [], this);
  }
} // identicka metoda jako predchozi jen pro fialoveho ducha


function damageP() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent1 = function respawnEvent1() {
      if (lives === test) {
        PurpleGhost.x = PurpleGhostRespawnX;
        PurpleGhost.y = PurpleGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = 272;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    var timedEvent1 = this.time.delayedCall(3000, respawnEvent1, [], this);
  }
} // identicka metoda jako predchozi jen pro sediveho ducha


function damageGrey() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent2 = function respawnEvent2() {
      if (lives === test) {
        GreyGhost.x = GreyGhostRespawnX;
        GreyGhost.y = GreyGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    GreyGhost.x = 640;
    GreyGhost.y = 304;
    var timedEvent2 = this.time.delayedCall(3000, respawnEvent2, [], this);
  }
} // trida sceny, rozsiruje PhaserScene, exportuje se


var PlayScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PlayScene, _Phaser$Scene);

  function PlayScene() {
    _classCallCheck(this, PlayScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(PlayScene).call(this, {
      key: "PlayScene"
    }));
  } // dostava data z predchozi z sceny, pokud je potreba dostat data z minule sceny, zde se z data.promennaZMinuleSceny dá získat promenna predchazejici sceny


  _createClass(PlayScene, [{
    key: "init",
    value: function init(data) {} // nacteni dat (obrazky, mapa ..) ze slozky hry

  }, {
    key: "preload",
    value: function preload() {
      this.load.tilemapTiledJSON("map1", "./assets/Tilemaps/map1.json");
      this.load.image("terrain", "./assets/Tilesets/BlokyF.png");
    } // zakladni metoda Phaseru, dochazi zde k vytvoreni zakladnich objektu a struktur hry

  }, {
    key: "create",
    value: function create() {
      // obnovi puvodni hodnotu promennych
      lives = 3;
      bonusF = false;
      bonusFCheck = false;
      GreenTargetValue = 1;
      PurpleTargetValue = 1;
      GreyTargetValue = 1;
      coinScore = 0;
      totalScore = 0;
      level = 1;
      spawn = 0; // nastavi vstup z klávesnice

      keys = this.input.keyboard.addKeys("W,Q,E,A,D,S");
      esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); // ukazatel zivotu

      Srdce1 = this.add.image(1000, 15, 'Srdce');
      Srdce2 = this.add.image(1050, 15, 'Srdce');
      Srdce3 = this.add.image(1100, 15, 'Srdce'); // textovy ukazatel skore a jmena hrace

      text = this.add.text(100, 10, "Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore), {
        fontSize: '20px',
        fill: '#ffa500'
      });
      text.setScrollFactor(0); // ukazatel poctu zivotu

      var text2 = this.add.text(900, 10, "Lives:", {
        fontSize: '20px',
        fill: '#ff0000'
      });
      text2.setScrollFactor(0); // vytvoreni mapy podle .json mapy

      map = this.add.tilemap("map1");
      terrain = map.addTilesetImage("Bloky", "terrain");
      topLayer = map.createStaticLayer("top", [terrain], 0, 0).setDepth(-1); // vytvoreni jednotlivych vrstev mapy podle .json souboru

      CoinLayer = map.getObjectLayer('points')['objects'];
      coins = this.physics.add.staticGroup();
      CoinLayer.forEach(function (object) {
        var obj = coins.create(object.x + 16, object.y - 16, "coin");
        obj.setScale(0.5);
        obj.body.width = object.width;
        obj.body.height = object.height;
      });
      BonusLayer = map.getObjectLayer('bonus')['objects'];
      bonus = this.physics.add.staticGroup();
      BonusLayer.forEach(function (object) {
        var obj = bonus.create(object.x + 16, object.y - 16, "bonus");
        obj.setScale(0.5);
        obj.body.width = object.width;
        obj.body.height = object.height;
      }); // pokud ma tile vlastnost collide, nastavi se jeho kolize s objekty hry (PacMan a duchove)

      topLayer.setCollisionByProperty({
        collide: true
      }); // vytvori PacMan a duchy a nastavi jejich kolize s hranicemi a tily

      PacMan = this.physics.add.sprite(PacManRespawnX, PacManRespawnY, "PacMan");
      PacMan.setSize(30, 30);
      RedGhost = this.physics.add.image(RedGhostRespawnX, RedGhostRespawnY, 'RedGhost');
      GreenGhost = this.physics.add.image(GreenGhostDeadX, GreenGhostDeadY, 'GreenGhost');
      PurpleGhost = this.physics.add.image(PurpleGhostDeadX, PurpleGhostDeadY, 'PurpleGhost');
      GreyGhost = this.physics.add.image(GreyGhostDeadX, GreyGhostDeadY, 'GreyGhost');
      this.physics.add.collider(PacMan, topLayer);
      this.physics.add.collider(RedGhost, topLayer);
      this.physics.add.collider(GreenGhost, topLayer);
      this.physics.add.collider(GreyGhost, topLayer);
      this.physics.add.collider(PurpleGhost, topLayer);
      PacMan.setCollideWorldBounds(false);
      RedGhost.setCollideWorldBounds(true);
      PurpleGhost.setCollideWorldBounds(true);
      GreyGhost.setCollideWorldBounds(true);
      GreenGhost.setCollideWorldBounds(true); //  nastavi se overlap, ktery hlida kolizi objektu a v pripade kolize spusti metodu
      // this.physics.add.overlap(kdo, s cim, metodaKolize, null, this);

      this.physics.add.overlap(PacMan, coins, collectCoin, null, this);
      this.physics.add.overlap(PacMan, bonus, collectBonus, null, this);
      this.physics.add.overlap(PacMan, RedGhost, damageR, null, this);
      this.physics.add.overlap(PacMan, GreyGhost, damageGrey, null, this);
      this.physics.add.overlap(PacMan, GreenGhost, damageG, null, this);
      this.physics.add.overlap(PacMan, PurpleGhost, damageP, null, this); // nastaveni pluginu, ktery se stara o hledani cesty v ramci tilu mapy

      var easystarjs = require('easystarjs');

      var easystar = new easystarjs.js();
      finder = easystar;
      finder2 = easystar;
      finder3 = easystar;
      finder4 = easystar;
      grid = []; // vlozi jednotlive tily do mrizky

      for (var y = 0; y < map.height; y++) {
        var col = [];

        for (var x = 0; x < map.width; x++) {
          col.push(getTileID(x, y));
        }

        grid.push(col);
      }

      finder.setGrid(grid);
      finder2.setGrid(grid);
      finder3.setGrid(grid);
      finder4.setGrid(grid);
      tileset = map.tilesets[0];
      properties = tileset.tileProperties;
      acceptableTiles = []; // nastavi ktere tily jsou pruchozi

      for (var i = tileset.firstgid - 1; i < 1120; i++) {
        if (!properties.hasOwnProperty(i)) {
          acceptableTiles.push(i + 1);
          continue;
        }

        if (!properties[i].collide) {
          acceptableTiles.push(i + 1);
        }
      }

      finder.setAcceptableTiles(acceptableTiles);
      finder2.setAcceptableTiles(acceptableTiles);
      finder3.setAcceptableTiles(acceptableTiles);
      finder4.setAcceptableTiles(acceptableTiles);
    } // metoda, ktera bezi neustale dokola, stara se o chod hry

  }, {
    key: "update",
    value: function update() {
      // podminka kdyz hrac sesbira vsechny mince
      if (coinScore === 183) {
        var winEvent = function winEvent() {
          // nacteni skore a pridani nove serazeneho skore do pameti prohlizece
          var testObject = JSON.parse(localStorage.getItem("score"));

          if (testObject !== null) {
            scoreField = JSON.parse(localStorage.getItem("score"));
          }

          var scoreObject = {
            playerName: localStorage.getItem("playerName"),
            score: totalScore
          };

          if (scoreField === null || scoreField === undefined) {
            scoreField[0] = scoreObject;
          } else {
            scoreField.push(scoreObject);
            var length = scoreField.length;

            for (var i = length - 1; i >= 0; i--) {
              for (var j = length - i; j > 0; j--) {
                if (scoreField[j] === undefined) {
                  break;
                }

                if (scoreField[j].score > scoreField[j - 1].score) {
                  var tmp = scoreField[j];
                  scoreField[j] = scoreField[j - 1];
                  scoreField[j - 1] = tmp;
                }
              }
            }
          } // uloze pole skore do pameti prohlizece


          localStorage.setItem("score", JSON.stringify(scoreField));
          coinScore = 0; // ukonci scenu a spusti dalsi uroven

          this.scene.stop();
          this.scene.launch("PlayScene2", {
            totalScore: totalScore
          });
        };

        PacMan.setVelocityX(0);
        PacMan.setVelocityY(0);
        RedGhost.setVelocityX(0);
        RedGhost.setVelocityY(0);
        GreenGhost.setVelocityX(0);
        GreenGhost.setVelocityY(0);
        GreyGhost.setVelocityX(0);
        GreyGhost.setVelocityY(0);
        PurpleGhost.setVelocityX(0);
        PurpleGhost.setVelocityY(0); // vytvori text o dokonceni levelu   

        var text3 = this.add.text(230, 100, "You won this level!", {
          fontSize: '80px',
          fill: '#ff0000'
        });
        text3.setScrollFactor(0); // casovana udalost dokonceni urovne

        timedEvent = this.time.delayedCall(3000, winEvent, [], this);
      }

      if (coinScore !== 183) {
        if (lives === 2) {
          Srdce3.visible = false;
        }

        if (lives === 1) {
          Srdce2.visible = false;
        }

        if (lives === 0) {
          var loseEvent = function loseEvent() {
            // nacteni skore a pridani nove serazeneho skore do pameti prohlizece
            var testObject = JSON.parse(localStorage.getItem("score"));

            if (testObject !== null) {
              scoreField = JSON.parse(localStorage.getItem("score"));
            }

            var scoreObject = {
              playerName: localStorage.getItem("playerName"),
              score: totalScore
            };

            if (scoreField === null || scoreField === undefined) {
              scoreField[0] = scoreObject;
            } else {
              scoreField.push(scoreObject);
              var length = scoreField.length;

              for (var i = length - 1; i >= 0; i--) {
                for (var j = length - i; j > 0; j--) {
                  if (scoreField[j] === undefined) {
                    break;
                  }

                  if (scoreField[j].score > scoreField[j - 1].score) {
                    var tmp = scoreField[j];
                    scoreField[j] = scoreField[j - 1];
                    scoreField[j - 1] = tmp;
                  }
                }
              }
            } // ulozi skore do pameti prohlizece


            localStorage.setItem("score", JSON.stringify(scoreField));
            totalScore = 0;
            coinScore = 0; // ukonci uroven a spusti menu    

            this.scene.stop();
            this.scene.launch("MenuScene");
          };

          Srdce1.visible = false;
          var text3 = this.add.text(325, 100, "Game Over :(", {
            fontSize: '80px',
            fill: '#ff0000'
          });
          text3.setScrollFactor(0);
          timedEvent = this.time.delayedCall(3000, loseEvent, [], this);
        } // znovuobjeveni duchu v 3s intervalech


        if (spawn === 0) {
          var spawn1Event = function spawn1Event() {
            PurpleGhost.x = PurpleGhostRespawnX;
            PurpleGhost.y = PurpleGhostRespawnY;
          };

          var spawn2Event = function spawn2Event() {
            GreenGhost.x = GreenGhostRespawnX;
            GreenGhost.y = GreenGhostRespawnY;
          };

          var spawn3Event = function spawn3Event() {
            GreyGhost.x = GreyGhostRespawnX;
            GreyGhost.y = GreyGhostRespawnY;
          };

          timedEvent = this.time.delayedCall(3000, spawn1Event, [], this);
          timedEvent = this.time.delayedCall(6000, spawn2Event, [], this);
          timedEvent = this.time.delayedCall(9000, spawn3Event, [], this);
          spawn = 1;
        } // finder, diky pluginu easystar js vytvori pole path ve kterem jsou jednotlive tily, ktere vedou k cily nejkratsi cestou


        finder.findPath(Math.floor(RedGhost.x / 32), Math.floor(RedGhost.y / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path) {
          if (path === null || path[1] === undefined) {} else {
            // pokud neni aktivni bonus, duchove se pohybuji po ceste vytvorene finderem, cesta k hraci se obnovuje a duch nasleduje tuto vytvorenou cestu, tudiz pronasleduje hrace
            if (bonusF === false) {
              if (path[1].x * 32 + 16 > RedGhost.x) {
                RedGhost.setVelocityX(speed / 2);
              }

              if (path[1].x * 32 + 16 < RedGhost.x) {
                RedGhost.setVelocityX(-speed / 2);
              }

              if (path[1].y * 32 + 16 > RedGhost.y) {
                RedGhost.setVelocityY(speed / 2);
              }

              if (path[1].y * 32 + 16 < RedGhost.y) {
                RedGhost.setVelocityY(-speed / 2);
              }

              if (path[1].x * 32 + 16 === RedGhost.x) {
                RedGhost.setVelocityX(0);
              }

              if (path[1].y * 32 + 16 === RedGhost.y) {
                RedGhost.setVelocityY(0);
              }
            }
          }
        }); // finder prepocita nalezenou cestu a opět se uloží do path

        finder.calculate(); // zeleny duch se pohybuje po dane ceste a v pripade ze se hrac priblizi do kruhoveho okolo 192 pixelu zacne ho pronasledovat dokud se opet nevzdali, pokud hrac neni v danem okoli duch pokracuje po puvodni trase
        // podminka hlidajici vzdalenost ducha a PacMana

        if (distance(PacMan.x, PacMan.y, GreenGhost.x, GreenGhost.y) <= 192) {
          // finder hleda nejkratsi cestu z pozice zeleneho ducha na pozici PacMana
          finder2.findPath(Math.floor((GreenGhost.x - 16) / 32), Math.floor((GreenGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path2) {
            if (path2 === null || path2[1] === undefined) {} else {
              if (bonusF === false) {
                // duch nasleduje vytvorenou cestu, nastavi rychlost ve smeru cestu
                if (path2[1].x * 32 + 16 > GreenGhost.x) {
                  GreenGhost.setVelocityX(speed / 2);
                }

                if (path2[1].x * 32 + 16 < GreenGhost.x) {
                  GreenGhost.setVelocityX(-speed / 2);
                }

                if (path2[1].y * 32 + 16 > GreenGhost.y) {
                  GreenGhost.setVelocityY(speed / 2);
                }

                if (path2[1].y * 32 + 16 < GreenGhost.y) {
                  GreenGhost.setVelocityY(-speed / 2);
                }

                if (path2[1].x * 32 + 16 === GreenGhost.x) {
                  GreenGhost.setVelocityX(0);
                }

                if (path2[1].y * 32 + 16 === GreenGhost.y) {
                  GreenGhost.setVelocityY(0);
                }
              }
            }

            finder2.calculate();
          });
        } else {
          // pokud neni hrac v blizkosti nasleduje duch vytvorenou cestu, ma 4 body mezi kterymi se pohybuje, v kazdem case se nastavi jeden z bodu a pokud duch dorazi do danych souradnic switch se zvysi o jedna a duch se pohybuje smerem k nasledujicim bodu
          switch (GreenTargetValue) {
            case 1:
              GreenTargetCoordinateX = 1216 / 32;
              GreenTargetCoordinateY = 32 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 2;
              break;

            case 2:
              GreenTargetCoordinateX = 1056 / 32;
              GreenTargetCoordinateY = 32 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 3;
              break;

            case 3:
              GreenTargetCoordinateX = 1056 / 32;
              GreenTargetCoordinateY = 832 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 4;
              break;

            case 4:
              GreenTargetCoordinateX = 1216 / 32;
              GreenTargetCoordinateY = 832 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 1;
              break;

            default:
              break;
          } // finder2 vytvari cestu na zaklade aktualni polohy zeleneho ducha a ciloveho bodu, ktery se nastavuje ve switchi


          finder2.findPath(Math.floor((GreenGhost.x - 16) / 32), Math.floor((GreenGhost.y - 16) / 32), GreenTargetCoordinateX, GreenTargetCoordinateY, function (path2) {
            if (path2 === null || path2[1] === undefined) {} else {
              if (bonusF === false) {
                if (path2[1].x * 32 + 16 > GreenGhost.x) {
                  GreenGhost.setVelocityX(speed / 2);
                }

                if (path2[1].x * 32 + 16 < GreenGhost.x) {
                  GreenGhost.setVelocityX(-speed / 2);
                }

                if (path2[1].y * 32 + 16 > GreenGhost.y) {
                  GreenGhost.setVelocityY(speed / 2);
                }

                if (path2[1].y * 32 + 16 < GreenGhost.y) {
                  GreenGhost.setVelocityY(-speed / 2);
                }

                if (path2[1].x * 32 + 16 === GreenGhost.x) {
                  GreenGhost.setVelocityX(0);
                }

                if (path2[1].y * 32 + 16 === GreenGhost.y) {
                  GreenGhost.setVelocityY(0);
                }
              }
            }

            finder2.calculate();
          });
        } // analogie pro zeleneho ducha, fialovy ma jinou trasu ale pohyb funguje stejne


        if (distance(PacMan.x, PacMan.y, PurpleGhost.x, PurpleGhost.y) <= 192) {
          finder3.findPath(Math.floor((PurpleGhost.x - 16) / 32), Math.floor((PurpleGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path3) {
            if (path3 === null || path3[1] === undefined) {} else {
              if (bonusF === false) {
                if (path3[1].x * 32 + 16 > PurpleGhost.x) {
                  PurpleGhost.setVelocityX(speed / 2);
                }

                if (path3[1].x * 32 + 16 < PurpleGhost.x) {
                  PurpleGhost.setVelocityX(-speed / 2);
                }

                if (path3[1].y * 32 + 16 > PurpleGhost.y) {
                  PurpleGhost.setVelocityY(speed / 2);
                }

                if (path3[1].y * 32 + 16 < PurpleGhost.y) {
                  PurpleGhost.setVelocityY(-speed / 2);
                }

                if (path3[1].x * 32 + 16 === PurpleGhost.x) {
                  PurpleGhost.setVelocityX(0);
                }

                if (path3[1].y * 32 + 16 === PurpleGhost.y) {
                  PurpleGhost.setVelocityY(0);
                }
              }
            }

            finder3.calculate();
          });
        } else {
          switch (PurpleTargetValue) {
            case 1:
              PurpleTargetCoordinateX = 64 / 32;
              PurpleTargetCoordinateY = 832 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 2;
              break;

            case 2:
              PurpleTargetCoordinateX = 192 / 32;
              PurpleTargetCoordinateY = 832 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 3;
              break;

            case 3:
              PurpleTargetCoordinateX = 192 / 32;
              PurpleTargetCoordinateY = 32 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 4;
              break;

            case 4:
              PurpleTargetCoordinateX = 64 / 32;
              PurpleTargetCoordinateY = 32 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 1;
              break;

            default:
              break;
          }

          finder3.findPath(Math.floor((PurpleGhost.x - 16) / 32), Math.floor((PurpleGhost.y - 16) / 32), PurpleTargetCoordinateX, PurpleTargetCoordinateY, function (path3) {
            if (path3 === null || path3[1] === undefined) {} else {
              if (bonusF === false) {
                if (path3[1].x * 32 + 16 > PurpleGhost.x) {
                  PurpleGhost.setVelocityX(speed / 2);
                }

                if (path3[1].x * 32 + 16 < PurpleGhost.x) {
                  PurpleGhost.setVelocityX(-speed / 2);
                }

                if (path3[1].y * 32 + 16 > PurpleGhost.y) {
                  PurpleGhost.setVelocityY(speed / 2);
                }

                if (path3[1].y * 32 + 16 < PurpleGhost.y) {
                  PurpleGhost.setVelocityY(-speed / 2);
                }

                if (path3[1].x * 32 + 16 === PurpleGhost.x) {
                  PurpleGhost.setVelocityX(0);
                }

                if (path3[1].y * 32 + 16 === PurpleGhost.y) {
                  PurpleGhost.setVelocityY(0);
                }
              }
            }

            finder3.calculate();
          });
        } // analogie zelenho ducha, pouze se sedivy pohybuje jinou trasou, vse funguje obdobne jako u zeleneho


        if (distance(PacMan.x, PacMan.y, GreyGhost.x, GreyGhost.y) <= 192) {
          finder4.findPath(Math.floor((GreyGhost.x - 16) / 32), Math.floor((GreyGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path4) {
            if (path4 === null || path4[1] === undefined) {} else {
              if (bonusF === false) {
                if (path4[1].x * 32 + 16 > GreyGhost.x) {
                  GreyGhost.setVelocityX(speed / 2);
                }

                if (path4[1].x * 32 + 16 < GreyGhost.x) {
                  GreyGhost.setVelocityX(-speed / 2);
                }

                if (path4[1].y * 32 + 16 > GreyGhost.y) {
                  GreyGhost.setVelocityY(speed / 2);
                }

                if (path4[1].y * 32 + 16 < GreyGhost.y) {
                  GreyGhost.setVelocityY(-speed / 2);
                }

                if (path4[1].x * 32 + 16 === GreyGhost.x) {
                  GreyGhost.setVelocityX(0);
                }

                if (path4[1].y * 32 + 16 === GreyGhost.y) {
                  GreyGhost.setVelocityY(0);
                }
              }
            }

            finder4.calculate();
          });
        } else {
          switch (GreyTargetValue) {
            case 1:
              GreyTargetCoordinateX = 192 / 32;
              GreyTargetCoordinateY = 832 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 2;
              break;

            case 2:
              GreyTargetCoordinateX = 192 / 32;
              GreyTargetCoordinateY = 32 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 3;
              break;

            case 3:
              GreyTargetCoordinateX = 1056 / 32;
              GreyTargetCoordinateY = 32 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 4;
              break;

            case 4:
              GreyTargetCoordinateX = 1056 / 32;
              GreyTargetCoordinateY = 832 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 1;
              break;

            default:
              break;
          }

          finder4.findPath(Math.floor((GreyGhost.x - 16) / 32), Math.floor((GreyGhost.y - 16) / 32), GreyTargetCoordinateX, GreyTargetCoordinateY, function (path4) {
            if (path4 === null || path4[1] === undefined) {} else {
              if (bonusF === false) {
                if (path4[1].x * 32 + 16 > GreyGhost.x) {
                  GreyGhost.setVelocityX(speed / 2);
                }

                if (path4[1].x * 32 + 16 < GreyGhost.x) {
                  GreyGhost.setVelocityX(-speed / 2);
                }

                if (path4[1].y * 32 + 16 > GreyGhost.y) {
                  GreyGhost.setVelocityY(speed / 2);
                }

                if (path4[1].y * 32 + 16 < GreyGhost.y) {
                  GreyGhost.setVelocityY(-speed / 2);
                }

                if (path4[1].x * 32 + 16 === GreyGhost.x) {
                  GreyGhost.setVelocityX(0);
                }

                if (path4[1].y * 32 + 16 === GreyGhost.y) {
                  GreyGhost.setVelocityY(0);
                }
              }
            }

            finder4.calculate();
          });
        } // podminky pro pohyb pruchodem zleva doprava a zprava doleva, pri prekroceni mapy se PacMan objevi vlevo/vpravo v zavisloti na smeru pohybu


        if (PacMan.x > 1270) {
          PacMan.x = 10;
        }

        if (PacMan.x < 10) {
          PacMan.x = 1270;
        } // podminky, ktere zastavuji hrace ve stredech tilu, usnadnuje zataceni


        if (Math.floor(PacMan.x) % 32 == 16) {
          PacMan.setVelocityX(0);
        }

        if (Math.floor(PacMan.y) % 32 == 16) {
          PacMan.setVelocityY(0);
        }

        if (Math.floor(RedGhost.x) % 32 == 16) {
          RedGhost.setVelocityX(0);
        }

        if (Math.floor(RedGhost.y) % 32 == 16) {
          RedGhost.setVelocityY(0);
        }

        if (Math.floor(GreenGhost.x) % 32 == 16) {
          GreenGhost.setVelocityX(0);
        }

        if (Math.floor(GreenGhost.y) % 32 == 16) {
          GreenGhost.setVelocityY(0);
        }

        if (Math.floor(GreyGhost.x) % 32 == 16) {
          GreyGhost.setVelocityX(0);
        }

        if (Math.floor(GreyGhost.y) % 32 == 16) {
          GreyGhost.setVelocityY(0);
        }

        if (Math.floor(PurpleGhost.x) % 32 == 16) {
          PurpleGhost.setVelocityX(0);
        }

        if (Math.floor(PurpleGhost.y) % 32 == 16) {
          PurpleGhost.setVelocityY(0);
        } // zaokrouhlovaní souradnic duchu a PacMana z toho duvodu, ze pri pohybu rychlosti vznikaji nepresnosti (nepohybuji se po celych pixelech) a je ztizene zataceni


        PacMan.y = Math.floor(PacMan.y);
        PacMan.x = Math.floor(PacMan.x);
        RedGhost.y = Math.floor(RedGhost.y);
        RedGhost.x = Math.floor(RedGhost.x);
        PurpleGhost.y = Math.floor(PurpleGhost.y);
        PurpleGhost.x = Math.floor(PurpleGhost.x);
        GreyGhost.y = Math.floor(GreyGhost.y);
        GreyGhost.x = Math.floor(GreyGhost.x);
        GreenGhost.y = Math.floor(GreenGhost.y);
        GreenGhost.x = Math.floor(GreenGhost.x); // otaceni PacMana do smeru pohybu

        if (PacMan.body.velocity.x < 0) {
          PacMan.angle = 0;
          PacMan.setTexture("PacMan2");
        }

        if (PacMan.body.velocity.x > 0) {
          PacMan.angle = 0;
          PacMan.setTexture("PacMan");
        }

        if (PacMan.body.velocity.y < 0) {
          PacMan.angle = 270;
          PacMan.setTexture("PacMan");
        }

        if (PacMan.body.velocity.y > 0) {
          PacMan.angle = 90;
          PacMan.setTexture("PacMan");
        } // podminky zajistujici pohyb, pouzivaji nadefinovany vstup z klavesnice


        if (keys.W.isDown || keys.S.isDown || keys.A.isDown || keys.D.isDown) {
          // pohyb hrace
          if (keys.W.isDown) {
            PacMan.setVelocityY(-1 * speed);
          } else if (keys.S.isDown) {
            PacMan.setVelocityY(speed);
          }

          if (keys.A.isDown) {
            PacMan.setVelocityX(-1 * speed);
          } else if (keys.D.isDown) {
            PacMan.setVelocityX(speed);
          }
        } // pri zmacknuti klavesy ESC spusti pauzu   


        if (Phaser.Input.Keyboard.JustDown(esc)) {
          this.scene.pause();
          this.scene.launch("PauseScene");
          keys.W.isDown = false;
          keys.A.isDown = false;
          keys.S.isDown = false;
          keys.D.isDown = false;
          resume = true;
        }
      }
    }
  }]);

  return PlayScene;
}(Phaser.Scene);

exports.PlayScene = PlayScene;
},{"easystarjs":"node_modules/easystarjs/src/easystar.js"}],"src/scenes/PlayScene2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene2 = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// PlayScene2 je analogicka k PlayScene, zmenene jsou pouze hodnoty a mapa, protoze funguje obdobne jsou komentáře pouze v PlayScene
var keys;
var PacMan;
var RedGhost;
var GreenGhost;
var PurpleGhost;
var GreyGhost;
var CoinLayer;
var BonusLayer;
var coins;
var bonus;
var coinScore = 0;
var totalScore;
var level = 1;
var topLayer;
var map;
var terrain;
var bonusF;
var text;
var tileset;
var properties;
var acceptableTiles = [];
var bonusFCheck;
var esc;
var resume;
var lives = 3;
var speed = 320;
var Srdce1;
var Srdce2;
var Srdce3;
var timedEvent;
var scoreField = [];
var spawn = 0;
var PacManRespawnX = 656;
var PacManRespawnY = 592;
var RedGhostRespawnX = 640;
var RedGhostRespawnY = 400;
var RedGhostDeadX = 640;
var RedGhostDeadY = 336;
var GreenGhostRespawnX = 1232;
var GreenGhostRespawnY = 400;
var GreenGhostDeadX = 658;
var GreenGhostDeadY = 272;
var PurpleGhostRespawnX = 48;
var PurpleGhostRespawnY = 400;
var PurpleGhostDeadX = 623;
var PurpleGhostDeadY = 272;
var GreyGhostRespawnX = 640;
var GreyGhostRespawnY = 400;
var GreyGhostDeadX = 640;
var GreyGhostDeadY = 304;
var GreenTargetValue = 1;
var GreenTargetCoordinateX;
var GreenTargetCoordinateY;
var PurpleTargetValue = 1;
var PurpleTargetCoordinateX;
var PurpleTargetCoordinateY;
var GreyTargetValue = 1;
var GreyTargetCoordinateX;
var GreyTargetCoordinateY;
var finder;
var finder2;
var finder3;
var finder4;
var grid;

function distance(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function getTileID(x, y) {
  var tile = map.getTileAt(x, y);
  return tile.index;
}

function collectCoin(PacMan, coin) {
  coin.destroy(coin.x, coin.y);
  coinScore++;
  totalScore++;
  text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
  return false;
}

function collectBonus(PacMan, bonus) {
  if (bonusF === true) {
    bonusFCheck = true;
  }

  bonus.destroy(bonus.x, bonus.y);
  totalScore = totalScore + 5;
  text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
  bonusF = true;
  RedGhost.setTexture("BlackGhost");
  PurpleGhost.setTexture("BlackGhost");
  PurpleGhost.setVelocityX(0);
  PurpleGhost.setVelocityY(0);
  GreenGhost.setTexture("BlackGhost");
  GreenGhost.setVelocityX(0);
  GreenGhost.setVelocityY(0);
  GreyGhost.setTexture("BlackGhost");
  timedEvent = this.time.delayedCall(3000, waitEvent, [], this);

  function waitEvent() {
    if (bonusFCheck === false) {
      RedGhost.setTexture("RedGhost");
      PurpleGhost.setTexture("PurpleGhost");
      GreenGhost.setTexture("GreenGhost");
      GreyGhost.setTexture("GreyGhost");
      bonusF = false;
    }

    bonusFCheck = false;
  }

  return false;
}

function damageR() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene2");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent = function respawnEvent() {
      if (lives === test) {
        RedGhost.x = RedGhostRespawnX;
        RedGhost.y = RedGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    RedGhost.x = RedGhostDeadX;
    RedGhost.y = RedGhostDeadY;
    timedEvent = this.time.delayedCall(3000, respawnEvent, [], this);
  }
}

function damageG() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene2");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent = function respawnEvent() {
      if (lives === test) {
        GreenGhost.x = GreenGhostRespawnX;
        GreenGhost.y = GreenGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    var timedEvent = this.time.delayedCall(3000, respawnEvent, [], this);
  }
}

function damageP() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene2");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent1 = function respawnEvent1() {
      if (lives === test) {
        PurpleGhost.x = PurpleGhostRespawnX;
        PurpleGhost.y = PurpleGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = 272;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    var timedEvent1 = this.time.delayedCall(3000, respawnEvent1, [], this);
  }
}

function damageGrey() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene2");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent2 = function respawnEvent2() {
      if (lives === test) {
        GreyGhost.x = GreyGhostRespawnX;
        GreyGhost.y = GreyGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    GreyGhost.x = 640;
    GreyGhost.y = 304;
    var timedEvent2 = this.time.delayedCall(3000, respawnEvent2, [], this);
  }
} // trida scena, rozsiruje PhaserScene a musi se exportovat


var PlayScene2 =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PlayScene2, _Phaser$Scene);

  function PlayScene2() {
    _classCallCheck(this, PlayScene2);

    return _possibleConstructorReturn(this, _getPrototypeOf(PlayScene2).call(this, {
      key: "PlayScene2" // vstupni data

    }));
  }

  _createClass(PlayScene2, [{
    key: "init",
    value: function init(data) {
      totalScore = data.totalScore;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.load.tilemapTiledJSON("map2", "./assets/Tilemaps/map2.json");
      this.load.image("terrain", "./assets/Tilesets/BlokyF.png");
    }
  }, {
    key: "create",
    value: function create() {
      lives = 3;
      bonusF = false;
      bonusFCheck = false;
      GreenTargetValue = 1;
      PurpleTargetValue = 1;
      GreyTargetValue = 1;
      coinScore = 0;
      level = 2;
      spawn = 0;
      keys = this.input.keyboard.addKeys("W,Q,E,A,D,S");
      esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      Srdce1 = this.add.image(1000, 15, 'Srdce');
      Srdce2 = this.add.image(1050, 15, 'Srdce');
      Srdce3 = this.add.image(1100, 15, 'Srdce');
      text = this.add.text(100, 10, "Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore), {
        fontSize: '20px',
        fill: '#ffa500'
      });
      text.setScrollFactor(0);
      var text2 = this.add.text(900, 10, "Lives:", {
        fontSize: '20px',
        fill: '#ff0000'
      });
      text2.setScrollFactor(0);
      map = this.add.tilemap("map2");
      terrain = map.addTilesetImage("Bloky", "terrain");
      topLayer = map.createStaticLayer("top", [terrain], 0, 0).setDepth(-1);
      CoinLayer = map.getObjectLayer('points')['objects'];
      coins = this.physics.add.staticGroup();
      CoinLayer.forEach(function (object) {
        var obj = coins.create(object.x + 16, object.y - 16, "coin");
        obj.setScale(0.5);
        obj.body.width = object.width;
        obj.body.height = object.height;
      });
      BonusLayer = map.getObjectLayer('bonus')['objects'];
      bonus = this.physics.add.staticGroup();
      BonusLayer.forEach(function (object) {
        var obj = bonus.create(object.x + 16, object.y - 16, "bonus");
        obj.setScale(0.5);
        obj.body.width = object.width;
        obj.body.height = object.height;
      });
      topLayer.setCollisionByProperty({
        collide: true
      });
      PacMan = this.physics.add.sprite(PacManRespawnX, PacManRespawnY, "PacMan");
      PacMan.setSize(30, 30);
      RedGhost = this.physics.add.image(RedGhostRespawnX, RedGhostRespawnY, 'RedGhost');
      GreenGhost = this.physics.add.image(GreenGhostDeadX, GreenGhostDeadY, 'GreenGhost');
      PurpleGhost = this.physics.add.image(PurpleGhostDeadX, PurpleGhostDeadY, 'PurpleGhost');
      GreyGhost = this.physics.add.image(GreyGhostDeadX, GreyGhostDeadY, 'GreyGhost');
      this.physics.add.collider(PacMan, topLayer);
      this.physics.add.collider(RedGhost, topLayer);
      this.physics.add.collider(GreenGhost, topLayer);
      this.physics.add.collider(GreyGhost, topLayer);
      this.physics.add.collider(PurpleGhost, topLayer);
      PacMan.setCollideWorldBounds(false);
      RedGhost.setCollideWorldBounds(true);
      PurpleGhost.setCollideWorldBounds(true);
      GreyGhost.setCollideWorldBounds(true);
      GreenGhost.setCollideWorldBounds(true);
      this.physics.add.overlap(PacMan, coins, collectCoin, null, this);
      this.physics.add.overlap(PacMan, bonus, collectBonus, null, this);
      this.physics.add.overlap(PacMan, RedGhost, damageR, null, this);
      this.physics.add.overlap(PacMan, GreyGhost, damageGrey, null, this);
      this.physics.add.overlap(PacMan, GreenGhost, damageG, null, this);
      this.physics.add.overlap(PacMan, PurpleGhost, damageP, null, this);

      var easystarjs = require('easystarjs');

      var easystar = new easystarjs.js();
      finder = easystar;
      finder2 = easystar;
      finder3 = easystar;
      finder4 = easystar;
      grid = [];

      for (var y = 0; y < map.height; y++) {
        var col = [];

        for (var x = 0; x < map.width; x++) {
          col.push(getTileID(x, y));
        }

        grid.push(col);
      }

      finder.setGrid(grid);
      finder2.setGrid(grid);
      finder3.setGrid(grid);
      finder4.setGrid(grid);
      tileset = map.tilesets[0];
      properties = tileset.tileProperties;
      acceptableTiles = [];

      for (var i = tileset.firstgid - 1; i < 1120; i++) {
        if (!properties.hasOwnProperty(i)) {
          acceptableTiles.push(i + 1);
          continue;
        }

        if (!properties[i].collide) {
          acceptableTiles.push(i + 1);
        }
      }

      finder.setAcceptableTiles(acceptableTiles);
      finder2.setAcceptableTiles(acceptableTiles);
      finder3.setAcceptableTiles(acceptableTiles);
      finder4.setAcceptableTiles(acceptableTiles);
    }
  }, {
    key: "update",
    value: function update() {
      // funkce, ktera updatuje scenu
      if (coinScore === 139) {
        var winEvent = function winEvent() {
          // nacteni skore a pridani nove serazeneho skore do pameti browseru
          var testObject = JSON.parse(localStorage.getItem("score"));

          if (testObject !== null) {
            scoreField = JSON.parse(localStorage.getItem("score"));
          }

          var scoreObject = {
            playerName: localStorage.getItem("playerName"),
            score: totalScore
          };

          if (scoreField === null || scoreField === undefined) {
            scoreField[0] = scoreObject;
          } else {
            scoreField.push(scoreObject);
            var length = scoreField.length;

            for (var i = length - 1; i >= 0; i--) {
              for (var j = length - i; j > 0; j--) {
                if (scoreField[j] === undefined) {
                  break;
                }

                if (scoreField[j].score > scoreField[j - 1].score) {
                  var tmp = scoreField[j];
                  scoreField[j] = scoreField[j - 1];
                  scoreField[j - 1] = tmp;
                }
              }
            }
          }

          localStorage.setItem("score", JSON.stringify(scoreField));
          coinScore = 0;
          this.scene.stop();
          this.scene.launch("PlayScene3", {
            totalScore: totalScore
          });
        };

        PacMan.setVelocityX(0);
        PacMan.setVelocityY(0);
        RedGhost.setVelocityX(0);
        RedGhost.setVelocityY(0);
        GreenGhost.setVelocityX(0);
        GreenGhost.setVelocityY(0);
        GreyGhost.setVelocityX(0);
        GreyGhost.setVelocityY(0);
        PurpleGhost.setVelocityX(0);
        PurpleGhost.setVelocityY(0);
        var text3 = this.add.text(230, 100, "You won this level!", {
          fontSize: '80px',
          fill: '#ff0000'
        });
        text3.setScrollFactor(0);
        timedEvent = this.time.delayedCall(3000, winEvent, [], this);
      }

      if (coinScore !== 139) {
        if (lives === 2) {
          Srdce3.visible = false;
        }

        if (lives === 1) {
          Srdce2.visible = false;
        }

        if (lives === 0) {
          var loseEvent = function loseEvent() {
            // nacteni skore a pridani nove serazeneho skore do pameti browseru
            var testObject = JSON.parse(localStorage.getItem("score"));

            if (testObject !== null) {
              scoreField = JSON.parse(localStorage.getItem("score"));
            }

            var scoreObject = {
              playerName: localStorage.getItem("playerName"),
              score: totalScore
            };

            if (scoreField === null || scoreField === undefined) {
              scoreField[0] = scoreObject;
            } else {
              scoreField.push(scoreObject);
              var length = scoreField.length;

              for (var i = length - 1; i >= 0; i--) {
                for (var j = length - i; j > 0; j--) {
                  if (scoreField[j] === undefined) {
                    break;
                  }

                  if (scoreField[j].score > scoreField[j - 1].score) {
                    var tmp = scoreField[j];
                    scoreField[j] = scoreField[j - 1];
                    scoreField[j - 1] = tmp;
                  }
                }
              }
            }

            localStorage.setItem("score", JSON.stringify(scoreField));
            totalScore = 0;
            coinScore = 0;
            this.scene.stop();
            this.scene.launch("MenuScene");
          };

          Srdce1.visible = false;
          var text3 = this.add.text(325, 100, "Game Over :(", {
            fontSize: '80px',
            fill: '#ff0000'
          });
          text3.setScrollFactor(0);
          timedEvent = this.time.delayedCall(3000, loseEvent, [], this);
        }

        if (spawn === 0) {
          var spawn1Event = function spawn1Event() {
            PurpleGhost.x = PurpleGhostRespawnX;
            PurpleGhost.y = PurpleGhostRespawnY;
          };

          var spawn2Event = function spawn2Event() {
            GreenGhost.x = GreenGhostRespawnX;
            GreenGhost.y = GreenGhostRespawnY;
          };

          var spawn3Event = function spawn3Event() {
            GreyGhost.x = GreyGhostRespawnX;
            GreyGhost.y = GreyGhostRespawnY;
          };

          timedEvent = this.time.delayedCall(3000, spawn1Event, [], this);
          timedEvent = this.time.delayedCall(6000, spawn2Event, [], this);
          timedEvent = this.time.delayedCall(9000, spawn3Event, [], this);
          spawn = 1;
        }

        finder.findPath(Math.floor(RedGhost.x / 32), Math.floor(RedGhost.y / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path) {
          if (path === null || path[1] === undefined) {} else {
            if (bonusF === false) {
              if (path[1].x * 32 + 16 > RedGhost.x) {
                RedGhost.setVelocityX(speed / 2);
              }

              if (path[1].x * 32 + 16 < RedGhost.x) {
                RedGhost.setVelocityX(-speed / 2);
              }

              if (path[1].y * 32 + 16 > RedGhost.y) {
                RedGhost.setVelocityY(speed / 2);
              }

              if (path[1].y * 32 + 16 < RedGhost.y) {
                RedGhost.setVelocityY(-speed / 2);
              }

              if (path[1].x * 32 + 16 === RedGhost.x) {
                RedGhost.setVelocityX(0);
              }

              if (path[1].y * 32 + 16 === RedGhost.y) {
                RedGhost.setVelocityY(0);
              }
            }
          }
        });
        finder.calculate();

        if (distance(PacMan.x, PacMan.y, GreenGhost.x, GreenGhost.y) <= 192) {
          finder2.findPath(Math.floor((GreenGhost.x - 16) / 32), Math.floor((GreenGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path2) {
            if (path2 === null || path2[1] === undefined) {} else {
              if (bonusF === false) {
                if (path2[1].x * 32 + 16 > GreenGhost.x) {
                  GreenGhost.setVelocityX(speed / 2);
                }

                if (path2[1].x * 32 + 16 < GreenGhost.x) {
                  GreenGhost.setVelocityX(-speed / 2);
                }

                if (path2[1].y * 32 + 16 > GreenGhost.y) {
                  GreenGhost.setVelocityY(speed / 2);
                }

                if (path2[1].y * 32 + 16 < GreenGhost.y) {
                  GreenGhost.setVelocityY(-speed / 2);
                }

                if (path2[1].x * 32 + 16 === GreenGhost.x) {
                  GreenGhost.setVelocityX(0);
                }

                if (path2[1].y * 32 + 16 === GreenGhost.y) {
                  GreenGhost.setVelocityY(0);
                }
              }
            }

            finder2.calculate();
          });
        } else {
          switch (GreenTargetValue) {
            case 1:
              GreenTargetCoordinateX = 1216 / 32;
              GreenTargetCoordinateY = 96 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 2;
              break;

            case 2:
              GreenTargetCoordinateX = 864 / 32;
              GreenTargetCoordinateY = 96 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 3;
              break;

            case 3:
              GreenTargetCoordinateX = 736 / 32;
              GreenTargetCoordinateY = 832 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 4;
              break;

            case 4:
              GreenTargetCoordinateX = 1216 / 32;
              GreenTargetCoordinateY = 832 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 1;
              break;

            default:
              break;
          }

          finder2.findPath(Math.floor((GreenGhost.x - 16) / 32), Math.floor((GreenGhost.y - 16) / 32), GreenTargetCoordinateX, GreenTargetCoordinateY, function (path2) {
            if (path2 === null || path2[1] === undefined) {} else {
              if (bonusF === false) {
                if (path2[1].x * 32 + 16 > GreenGhost.x) {
                  GreenGhost.setVelocityX(speed / 2);
                }

                if (path2[1].x * 32 + 16 < GreenGhost.x) {
                  GreenGhost.setVelocityX(-speed / 2);
                }

                if (path2[1].y * 32 + 16 > GreenGhost.y) {
                  GreenGhost.setVelocityY(speed / 2);
                }

                if (path2[1].y * 32 + 16 < GreenGhost.y) {
                  GreenGhost.setVelocityY(-speed / 2);
                }

                if (path2[1].x * 32 + 16 === GreenGhost.x) {
                  GreenGhost.setVelocityX(0);
                }

                if (path2[1].y * 32 + 16 === GreenGhost.y) {
                  GreenGhost.setVelocityY(0);
                }
              }
            }

            finder2.calculate();
          });
        }

        if (distance(PacMan.x, PacMan.y, PurpleGhost.x, PurpleGhost.y) <= 192) {
          finder3.findPath(Math.floor((PurpleGhost.x - 16) / 32), Math.floor((PurpleGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path3) {
            if (path3 === null || path3[1] === undefined) {} else {
              if (bonusF === false) {
                if (path3[1].x * 32 + 16 > PurpleGhost.x) {
                  PurpleGhost.setVelocityX(speed / 2);
                }

                if (path3[1].x * 32 + 16 < PurpleGhost.x) {
                  PurpleGhost.setVelocityX(-speed / 2);
                }

                if (path3[1].y * 32 + 16 > PurpleGhost.y) {
                  PurpleGhost.setVelocityY(speed / 2);
                }

                if (path3[1].y * 32 + 16 < PurpleGhost.y) {
                  PurpleGhost.setVelocityY(-speed / 2);
                }

                if (path3[1].x * 32 + 16 === PurpleGhost.x) {
                  PurpleGhost.setVelocityX(0);
                }

                if (path3[1].y * 32 + 16 === PurpleGhost.y) {
                  PurpleGhost.setVelocityY(0);
                }
              }
            }

            finder3.calculate();
          });
        } else {
          switch (PurpleTargetValue) {
            case 1:
              PurpleTargetCoordinateX = 64 / 32;
              PurpleTargetCoordinateY = 832 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 2;
              break;

            case 2:
              PurpleTargetCoordinateX = 512 / 32;
              PurpleTargetCoordinateY = 832 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 3;
              break;

            case 3:
              PurpleTargetCoordinateX = 384 / 32;
              PurpleTargetCoordinateY = 96 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 4;
              break;

            case 4:
              PurpleTargetCoordinateX = 64 / 32;
              PurpleTargetCoordinateY = 96 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 1;
              break;

            default:
              break;
          }

          finder3.findPath(Math.floor((PurpleGhost.x - 16) / 32), Math.floor((PurpleGhost.y - 16) / 32), PurpleTargetCoordinateX, PurpleTargetCoordinateY, function (path3) {
            if (path3 === null || path3[1] === undefined) {} else {
              if (bonusF === false) {
                if (path3[1].x * 32 + 16 > PurpleGhost.x) {
                  PurpleGhost.setVelocityX(speed / 2);
                }

                if (path3[1].x * 32 + 16 < PurpleGhost.x) {
                  PurpleGhost.setVelocityX(-speed / 2);
                }

                if (path3[1].y * 32 + 16 > PurpleGhost.y) {
                  PurpleGhost.setVelocityY(speed / 2);
                }

                if (path3[1].y * 32 + 16 < PurpleGhost.y) {
                  PurpleGhost.setVelocityY(-speed / 2);
                }

                if (path3[1].x * 32 + 16 === PurpleGhost.x) {
                  PurpleGhost.setVelocityX(0);
                }

                if (path3[1].y * 32 + 16 === PurpleGhost.y) {
                  PurpleGhost.setVelocityY(0);
                }
              }
            }

            finder3.calculate();
          });
        }

        if (distance(PacMan.x, PacMan.y, GreyGhost.x, GreyGhost.y) <= 192) {
          finder4.findPath(Math.floor((GreyGhost.x - 16) / 32), Math.floor((GreyGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path4) {
            if (path4 === null || path4[1] === undefined) {} else {
              if (bonusF === false) {
                if (path4[1].x * 32 + 16 > GreyGhost.x) {
                  GreyGhost.setVelocityX(speed / 2);
                }

                if (path4[1].x * 32 + 16 < GreyGhost.x) {
                  GreyGhost.setVelocityX(-speed / 2);
                }

                if (path4[1].y * 32 + 16 > GreyGhost.y) {
                  GreyGhost.setVelocityY(speed / 2);
                }

                if (path4[1].y * 32 + 16 < GreyGhost.y) {
                  GreyGhost.setVelocityY(-speed / 2);
                }

                if (path4[1].x * 32 + 16 === GreyGhost.x) {
                  GreyGhost.setVelocityX(0);
                }

                if (path4[1].y * 32 + 16 === GreyGhost.y) {
                  GreyGhost.setVelocityY(0);
                }
              }
            }

            finder4.calculate();
          });
        } else {
          switch (GreyTargetValue) {
            case 1:
              GreyTargetCoordinateX = 384 / 32;
              GreyTargetCoordinateY = 416 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 2;
              break;

            case 2:
              GreyTargetCoordinateX = 672 / 32;
              GreyTargetCoordinateY = 192 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 3;
              break;

            case 3:
              GreyTargetCoordinateX = 928 / 32;
              GreyTargetCoordinateY = 416 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 4;
              break;

            case 4:
              GreyTargetCoordinateX = 672 / 32;
              GreyTargetCoordinateY = 832 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 1;
              break;

            default:
              break;
          }

          finder4.findPath(Math.floor((GreyGhost.x - 16) / 32), Math.floor((GreyGhost.y - 16) / 32), GreyTargetCoordinateX, GreyTargetCoordinateY, function (path4) {
            if (path4 === null || path4[1] === undefined) {} else {
              if (bonusF === false) {
                if (path4[1].x * 32 + 16 > GreyGhost.x) {
                  GreyGhost.setVelocityX(speed / 2);
                }

                if (path4[1].x * 32 + 16 < GreyGhost.x) {
                  GreyGhost.setVelocityX(-speed / 2);
                }

                if (path4[1].y * 32 + 16 > GreyGhost.y) {
                  GreyGhost.setVelocityY(speed / 2);
                }

                if (path4[1].y * 32 + 16 < GreyGhost.y) {
                  GreyGhost.setVelocityY(-speed / 2);
                }

                if (path4[1].x * 32 + 16 === GreyGhost.x) {
                  GreyGhost.setVelocityX(0);
                }

                if (path4[1].y * 32 + 16 === GreyGhost.y) {
                  GreyGhost.setVelocityY(0);
                }
              }
            }

            finder4.calculate();
          });
        }

        if (PacMan.x > 1270) {
          PacMan.x = 10;
        }

        if (PacMan.x < 10) {
          PacMan.x = 1270;
        }

        if (Math.floor(PacMan.x) % 32 == 16) {
          PacMan.setVelocityX(0);
        }

        if (Math.floor(PacMan.y) % 32 == 16) {
          PacMan.setVelocityY(0);
        }

        if (Math.floor(RedGhost.x) % 32 == 16) {
          RedGhost.setVelocityX(0);
        }

        if (Math.floor(RedGhost.y) % 32 == 16) {
          RedGhost.setVelocityY(0);
        }

        if (Math.floor(GreenGhost.x) % 32 == 16) {
          GreenGhost.setVelocityX(0);
        }

        if (Math.floor(GreenGhost.y) % 32 == 16) {
          GreenGhost.setVelocityY(0);
        }

        if (Math.floor(GreyGhost.x) % 32 == 16) {
          GreyGhost.setVelocityX(0);
        }

        if (Math.floor(GreyGhost.y) % 32 == 16) {
          GreyGhost.setVelocityY(0);
        }

        if (Math.floor(PurpleGhost.x) % 32 == 16) {
          PurpleGhost.setVelocityX(0);
        }

        if (Math.floor(PurpleGhost.y) % 32 == 16) {
          PurpleGhost.setVelocityY(0);
        }

        PacMan.y = Math.floor(PacMan.y);
        PacMan.x = Math.floor(PacMan.x);
        RedGhost.y = Math.floor(RedGhost.y);
        RedGhost.x = Math.floor(RedGhost.x);
        PurpleGhost.y = Math.floor(PurpleGhost.y);
        PurpleGhost.x = Math.floor(PurpleGhost.x);
        GreyGhost.y = Math.floor(GreyGhost.y);
        GreyGhost.x = Math.floor(GreyGhost.x);
        GreenGhost.y = Math.floor(GreenGhost.y);
        GreenGhost.x = Math.floor(GreenGhost.x);

        if (PacMan.body.velocity.x < 0) {
          PacMan.angle = 0;
          PacMan.setTexture("PacMan2");
        }

        if (PacMan.body.velocity.x > 0) {
          PacMan.angle = 0;
          PacMan.setTexture("PacMan");
        }

        if (PacMan.body.velocity.y < 0) {
          PacMan.angle = 270;
          PacMan.setTexture("PacMan");
        }

        if (PacMan.body.velocity.y > 0) {
          PacMan.angle = 90;
          PacMan.setTexture("PacMan");
        }

        if (keys.W.isDown || keys.S.isDown || keys.A.isDown || keys.D.isDown) {
          if (keys.W.isDown) {
            PacMan.setVelocityY(-1 * speed);
          } else if (keys.S.isDown) {
            PacMan.setVelocityY(speed);
          }

          if (keys.A.isDown) {
            PacMan.setVelocityX(-1 * speed);
          } else if (keys.D.isDown) {
            PacMan.setVelocityX(speed);
          }
        }

        if (Phaser.Input.Keyboard.JustDown(esc)) {
          this.scene.pause();
          this.scene.launch("PauseScene2");
          keys.W.isDown = false;
          keys.A.isDown = false;
          keys.S.isDown = false;
          keys.D.isDown = false;
          resume = true;
        }
      }
    }
  }]);

  return PlayScene2;
}(Phaser.Scene);

exports.PlayScene2 = PlayScene2;
},{"easystarjs":"node_modules/easystarjs/src/easystar.js"}],"src/scenes/PlayScene3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene3 = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// PlayScene3 je analogicka k PlayScene, zmenene jsou pouze hodnoty a mapa, protoze funguje obdobne jsou komentáře pouze v PlayScene
var keys;
var PacMan;
var RedGhost;
var GreenGhost;
var PurpleGhost;
var GreyGhost;
var CoinLayer;
var BonusLayer;
var coins;
var bonus;
var coinScore = 0;
var totalScore;
var level = 1;
var topLayer;
var map;
var terrain;
var bonusF;
var text;
var tileset;
var properties;
var acceptableTiles = [];
var bonusFCheck;
var esc;
var resume;
var lives = 3;
var speed = 320;
var Srdce1;
var Srdce2;
var Srdce3;
var timedEvent;
var scoreField = [];
var spawn = 0;
var PacManRespawnX = 656;
var PacManRespawnY = 592;
var RedGhostRespawnX = 640;
var RedGhostRespawnY = 400;
var RedGhostDeadX = 640;
var RedGhostDeadY = 304;
var GreenGhostRespawnX = 1232;
var GreenGhostRespawnY = 400;
var GreenGhostDeadX = 658;
var GreenGhostDeadY = 240;
var PurpleGhostRespawnX = 48;
var PurpleGhostRespawnY = 592;
var PurpleGhostDeadX = 623;
var PurpleGhostDeadY = 240;
var GreyGhostRespawnX = 640;
var GreyGhostRespawnY = 864;
var GreyGhostDeadX = 640;
var GreyGhostDeadY = 272;
var GreenTargetValue = 1;
var GreenTargetCoordinateX;
var GreenTargetCoordinateY;
var PurpleTargetValue = 1;
var PurpleTargetCoordinateX;
var PurpleTargetCoordinateY;
var GreyTargetValue = 1;
var GreyTargetCoordinateX;
var GreyTargetCoordinateY;
var finder;
var finder2;
var finder3;
var finder4;
var grid;

function distance(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function getTileID(x, y) {
  var tile = map.getTileAt(x, y);
  return tile.index;
}

function collectCoin(PacMan, coin) {
  coin.destroy(coin.x, coin.y);
  coinScore++;
  totalScore++;
  text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
  return false;
}

function collectBonus(PacMan, bonus) {
  if (bonusF === true) {
    bonusFCheck = true;
  }

  bonus.destroy(bonus.x, bonus.y);
  totalScore = totalScore + 5;
  text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
  bonusF = true;
  RedGhost.setTexture("BlackGhost");
  PurpleGhost.setTexture("BlackGhost");
  PurpleGhost.setVelocityX(0);
  PurpleGhost.setVelocityY(0);
  GreenGhost.setTexture("BlackGhost");
  GreenGhost.setVelocityX(0);
  GreenGhost.setVelocityY(0);
  GreyGhost.setTexture("BlackGhost");
  timedEvent = this.time.delayedCall(3000, waitEvent, [], this);

  function waitEvent() {
    if (bonusFCheck === false) {
      RedGhost.setTexture("RedGhost");
      PurpleGhost.setTexture("PurpleGhost");
      GreenGhost.setTexture("GreenGhost");
      GreyGhost.setTexture("GreyGhost");
      bonusF = false;
    }

    bonusFCheck = false;
  }

  return false;
}

function damageR() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene3");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent = function respawnEvent() {
      if (lives === test) {
        RedGhost.x = RedGhostRespawnX;
        RedGhost.y = RedGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    RedGhost.x = RedGhostDeadX;
    RedGhost.y = RedGhostDeadY;
    timedEvent = this.time.delayedCall(3000, respawnEvent, [], this);
  }
}

function damageG() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene3");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent = function respawnEvent() {
      if (lives === test) {
        GreenGhost.x = GreenGhostRespawnX;
        GreenGhost.y = GreenGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    var timedEvent = this.time.delayedCall(3000, respawnEvent, [], this);
  }
}

function damageP() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene3");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent1 = function respawnEvent1() {
      if (lives === test) {
        PurpleGhost.x = PurpleGhostRespawnX;
        PurpleGhost.y = PurpleGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = 272;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    var timedEvent1 = this.time.delayedCall(3000, respawnEvent1, [], this);
  }
}

function damageGrey() {
  if (bonusF === false) {
    this.scene.pause();
    this.scene.launch("PauseScene3");
    keys.W.isDown = false;
    keys.A.isDown = false;
    keys.S.isDown = false;
    keys.D.isDown = false;
    resume = true;
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);
    PacMan.setVelocityX(0);
    PacMan.setVelocityY(0);
    PacMan.x = PacManRespawnX;
    PacMan.y = PacManRespawnY;
    RedGhost.x = RedGhostRespawnX;
    RedGhost.y = RedGhostRespawnY;
    PurpleGhost.x = PurpleGhostDeadX;
    PurpleGhost.y = PurpleGhostDeadY;
    GreyGhost.x = GreyGhostDeadX;
    GreyGhost.y = GreyGhostDeadY;
    GreenGhost.x = GreenGhostDeadX;
    GreenGhost.y = GreenGhostDeadY;
    lives = lives - 1;
    spawn = 0;
    return false;
  } else {
    var respawnEvent2 = function respawnEvent2() {
      if (lives === test) {
        GreyGhost.x = GreyGhostRespawnX;
        GreyGhost.y = GreyGhostRespawnY;
      }
    };

    var test = lives;
    totalScore = totalScore + 10;
    text.setText("Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore));
    GreyGhost.x = 640;
    GreyGhost.y = 304;
    var timedEvent2 = this.time.delayedCall(3000, respawnEvent2, [], this);
  }
} // trida scena, rozsiruje PhaserScene a musi se exportovat


var PlayScene3 =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PlayScene3, _Phaser$Scene);

  function PlayScene3() {
    _classCallCheck(this, PlayScene3);

    return _possibleConstructorReturn(this, _getPrototypeOf(PlayScene3).call(this, {
      key: "PlayScene3" // vstupni data

    }));
  }

  _createClass(PlayScene3, [{
    key: "init",
    value: function init(data) {
      totalScore = data.totalScore;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.load.tilemapTiledJSON("map3", "./assets/Tilemaps/map3.json");
      this.load.image("terrain", "./assets/Tilesets/BlokyF.png");
    }
  }, {
    key: "create",
    value: function create() {
      lives = 3;
      bonusF = false;
      bonusFCheck = false;
      GreenTargetValue = 1;
      PurpleTargetValue = 1;
      GreyTargetValue = 1;
      coinScore = 0;
      level = 2;
      spawn = 0;
      keys = this.input.keyboard.addKeys("W,Q,E,A,D,S");
      esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      Srdce1 = this.add.image(1000, 15, 'Srdce');
      Srdce2 = this.add.image(1050, 15, 'Srdce');
      Srdce3 = this.add.image(1100, 15, 'Srdce');
      text = this.add.text(100, 10, "Nickname: ".concat(localStorage.getItem("playerName"), "   Score: ").concat(totalScore), {
        fontSize: '20px',
        fill: '#ffa500'
      });
      text.setScrollFactor(0);
      var text2 = this.add.text(900, 10, "Lives:", {
        fontSize: '20px',
        fill: '#ff0000'
      });
      text2.setScrollFactor(0);
      map = this.add.tilemap("map3");
      terrain = map.addTilesetImage("Bloky", "terrain");
      topLayer = map.createStaticLayer("top", [terrain], 0, 0).setDepth(-1);
      CoinLayer = map.getObjectLayer('points')['objects'];
      coins = this.physics.add.staticGroup();
      CoinLayer.forEach(function (object) {
        var obj = coins.create(object.x + 16, object.y - 16, "coin");
        obj.setScale(0.5);
        obj.body.width = object.width;
        obj.body.height = object.height;
      });
      BonusLayer = map.getObjectLayer('bonus')['objects'];
      bonus = this.physics.add.staticGroup();
      BonusLayer.forEach(function (object) {
        var obj = bonus.create(object.x + 16, object.y - 16, "bonus");
        obj.setScale(0.5);
        obj.body.width = object.width;
        obj.body.height = object.height;
      });
      topLayer.setCollisionByProperty({
        collide: true
      });
      PacMan = this.physics.add.sprite(PacManRespawnX, PacManRespawnY, "PacMan");
      PacMan.setSize(30, 30);
      RedGhost = this.physics.add.image(RedGhostRespawnX, RedGhostRespawnY, 'RedGhost');
      GreenGhost = this.physics.add.image(GreenGhostDeadX, GreenGhostDeadY, 'GreenGhost');
      PurpleGhost = this.physics.add.image(PurpleGhostDeadX, PurpleGhostDeadY, 'PurpleGhost');
      GreyGhost = this.physics.add.image(GreyGhostDeadX, GreyGhostDeadY, 'GreyGhost');
      this.physics.add.collider(PacMan, topLayer);
      this.physics.add.collider(RedGhost, topLayer);
      this.physics.add.collider(GreenGhost, topLayer);
      this.physics.add.collider(GreyGhost, topLayer);
      this.physics.add.collider(PurpleGhost, topLayer);
      PacMan.setCollideWorldBounds(false);
      RedGhost.setCollideWorldBounds(true);
      PurpleGhost.setCollideWorldBounds(true);
      GreyGhost.setCollideWorldBounds(true);
      GreenGhost.setCollideWorldBounds(true);
      this.physics.add.overlap(PacMan, coins, collectCoin, null, this);
      this.physics.add.overlap(PacMan, bonus, collectBonus, null, this);
      this.physics.add.overlap(PacMan, RedGhost, damageR, null, this);
      this.physics.add.overlap(PacMan, GreyGhost, damageGrey, null, this);
      this.physics.add.overlap(PacMan, GreenGhost, damageG, null, this);
      this.physics.add.overlap(PacMan, PurpleGhost, damageP, null, this);

      var easystarjs = require('easystarjs');

      var easystar = new easystarjs.js();
      finder = easystar;
      finder2 = easystar;
      finder3 = easystar;
      finder4 = easystar;
      grid = [];

      for (var y = 0; y < map.height; y++) {
        var col = [];

        for (var x = 0; x < map.width; x++) {
          col.push(getTileID(x, y));
        }

        grid.push(col);
      }

      finder.setGrid(grid);
      finder2.setGrid(grid);
      finder3.setGrid(grid);
      finder4.setGrid(grid);
      tileset = map.tilesets[0];
      properties = tileset.tileProperties;
      acceptableTiles = [];

      for (var i = tileset.firstgid - 1; i < 1120; i++) {
        if (!properties.hasOwnProperty(i)) {
          acceptableTiles.push(i + 1);
          continue;
        }

        if (!properties[i].collide) {
          acceptableTiles.push(i + 1);
        }
      }

      finder.setAcceptableTiles(acceptableTiles);
      finder2.setAcceptableTiles(acceptableTiles);
      finder3.setAcceptableTiles(acceptableTiles);
      finder4.setAcceptableTiles(acceptableTiles);
    }
  }, {
    key: "update",
    value: function update() {
      // funkce, ktera updatuje scenu
      if (coinScore === 108) {
        var winEvent = function winEvent() {
          // nacteni skore a pridani nove serazeneho skore do pameti browseru
          var testObject = JSON.parse(localStorage.getItem("score"));

          if (testObject !== null) {
            scoreField = JSON.parse(localStorage.getItem("score"));
          }

          var scoreObject = {
            playerName: localStorage.getItem("playerName"),
            score: totalScore
          };

          if (scoreField === null || scoreField === undefined) {
            scoreField[0] = scoreObject;
          } else {
            scoreField.push(scoreObject);
            var length = scoreField.length;

            for (var i = length - 1; i >= 0; i--) {
              for (var j = length - i; j > 0; j--) {
                if (scoreField[j] === undefined) {
                  break;
                }

                if (scoreField[j].score > scoreField[j - 1].score) {
                  var tmp = scoreField[j];
                  scoreField[j] = scoreField[j - 1];
                  scoreField[j - 1] = tmp;
                }
              }
            }
          }

          localStorage.setItem("score", JSON.stringify(scoreField));
          coinScore = 0;
          this.scene.stop();
          this.scene.launch("MenuScene");
        };

        PacMan.setVelocityX(0);
        PacMan.setVelocityY(0);
        RedGhost.setVelocityX(0);
        RedGhost.setVelocityY(0);
        GreenGhost.setVelocityX(0);
        GreenGhost.setVelocityY(0);
        GreyGhost.setVelocityX(0);
        GreyGhost.setVelocityY(0);
        PurpleGhost.setVelocityX(0);
        PurpleGhost.setVelocityY(0);
        var text3 = this.add.text(50, 100, "You completed all 3 levels!", {
          fontSize: '70px',
          fill: '#ff0000'
        });
        text3.setScrollFactor(0);
        timedEvent = this.time.delayedCall(3000, winEvent, [], this);
      }

      if (coinScore !== 108) {
        if (lives === 2) {
          Srdce3.visible = false;
        }

        if (lives === 1) {
          Srdce2.visible = false;
        }

        if (lives === 0) {
          var loseEvent = function loseEvent() {
            // nacteni skore a pridani nove serazeneho skore do pameti browseru
            var testObject = JSON.parse(localStorage.getItem("score"));

            if (testObject !== null) {
              scoreField = JSON.parse(localStorage.getItem("score"));
            }

            var scoreObject = {
              playerName: localStorage.getItem("playerName"),
              score: totalScore
            };

            if (scoreField === null || scoreField === undefined) {
              scoreField[0] = scoreObject;
            } else {
              scoreField.push(scoreObject);
              var length = scoreField.length;

              for (var i = length - 1; i >= 0; i--) {
                for (var j = length - i; j > 0; j--) {
                  if (scoreField[j] === undefined) {
                    break;
                  }

                  if (scoreField[j].score > scoreField[j - 1].score) {
                    var tmp = scoreField[j];
                    scoreField[j] = scoreField[j - 1];
                    scoreField[j - 1] = tmp;
                  }
                }
              }
            }

            localStorage.setItem("score", JSON.stringify(scoreField));
            totalScore = 0;
            coinScore = 0;
            this.scene.stop();
            this.scene.launch("MenuScene");
          };

          Srdce1.visible = false;
          var text3 = this.add.text(325, 100, "Game Over :(", {
            fontSize: '80px',
            fill: '#ff0000'
          });
          text3.setScrollFactor(0);
          timedEvent = this.time.delayedCall(3000, loseEvent, [], this);
        }

        if (spawn === 0) {
          var spawn1Event = function spawn1Event() {
            PurpleGhost.x = PurpleGhostRespawnX;
            PurpleGhost.y = PurpleGhostRespawnY;
          };

          var spawn2Event = function spawn2Event() {
            GreenGhost.x = GreenGhostRespawnX;
            GreenGhost.y = GreenGhostRespawnY;
          };

          var spawn3Event = function spawn3Event() {
            GreyGhost.x = GreyGhostRespawnX;
            GreyGhost.y = GreyGhostRespawnY;
          };

          timedEvent = this.time.delayedCall(3000, spawn1Event, [], this);
          timedEvent = this.time.delayedCall(6000, spawn2Event, [], this);
          timedEvent = this.time.delayedCall(9000, spawn3Event, [], this);
          spawn = 1;
        }

        finder.findPath(Math.floor(RedGhost.x / 32), Math.floor(RedGhost.y / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path) {
          if (path === null || path[1] === undefined) {} else {
            if (bonusF === false) {
              if (path[1].x * 32 + 16 > RedGhost.x) {
                RedGhost.setVelocityX(speed / 2);
              }

              if (path[1].x * 32 + 16 < RedGhost.x) {
                RedGhost.setVelocityX(-speed / 2);
              }

              if (path[1].y * 32 + 16 > RedGhost.y) {
                RedGhost.setVelocityY(speed / 2);
              }

              if (path[1].y * 32 + 16 < RedGhost.y) {
                RedGhost.setVelocityY(-speed / 2);
              }

              if (path[1].x * 32 + 16 === RedGhost.x) {
                RedGhost.setVelocityX(0);
              }

              if (path[1].y * 32 + 16 === RedGhost.y) {
                RedGhost.setVelocityY(0);
              }
            }
          }
        });
        finder.calculate();

        if (distance(PacMan.x, PacMan.y, GreenGhost.x, GreenGhost.y) <= 192) {
          finder2.findPath(Math.floor((GreenGhost.x - 16) / 32), Math.floor((GreenGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path2) {
            if (path2 === null || path2[1] === undefined) {} else {
              if (bonusF === false) {
                if (path2[1].x * 32 + 16 > GreenGhost.x) {
                  GreenGhost.setVelocityX(speed / 2);
                }

                if (path2[1].x * 32 + 16 < GreenGhost.x) {
                  GreenGhost.setVelocityX(-speed / 2);
                }

                if (path2[1].y * 32 + 16 > GreenGhost.y) {
                  GreenGhost.setVelocityY(speed / 2);
                }

                if (path2[1].y * 32 + 16 < GreenGhost.y) {
                  GreenGhost.setVelocityY(-speed / 2);
                }

                if (path2[1].x * 32 + 16 === GreenGhost.x) {
                  GreenGhost.setVelocityX(0);
                }

                if (path2[1].y * 32 + 16 === GreenGhost.y) {
                  GreenGhost.setVelocityY(0);
                }
              }
            }

            finder2.calculate();
          });
        } else {
          switch (GreenTargetValue) {
            case 1:
              GreenTargetCoordinateX = 1216 / 32;
              GreenTargetCoordinateY = 32 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 2;
              break;

            case 2:
              GreenTargetCoordinateX = 704 / 32;
              GreenTargetCoordinateY = 32 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 3;
              break;

            case 3:
              GreenTargetCoordinateX = 960 / 32;
              GreenTargetCoordinateY = 832 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 4;
              break;

            case 4:
              GreenTargetCoordinateX = 1216 / 32;
              GreenTargetCoordinateY = 832 / 32;
              if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 1;
              break;

            default:
              break;
          }

          finder2.findPath(Math.floor((GreenGhost.x - 16) / 32), Math.floor((GreenGhost.y - 16) / 32), GreenTargetCoordinateX, GreenTargetCoordinateY, function (path2) {
            if (path2 === null || path2[1] === undefined) {} else {
              if (bonusF === false) {
                if (path2[1].x * 32 + 16 > GreenGhost.x) {
                  GreenGhost.setVelocityX(speed / 2);
                }

                if (path2[1].x * 32 + 16 < GreenGhost.x) {
                  GreenGhost.setVelocityX(-speed / 2);
                }

                if (path2[1].y * 32 + 16 > GreenGhost.y) {
                  GreenGhost.setVelocityY(speed / 2);
                }

                if (path2[1].y * 32 + 16 < GreenGhost.y) {
                  GreenGhost.setVelocityY(-speed / 2);
                }

                if (path2[1].x * 32 + 16 === GreenGhost.x) {
                  GreenGhost.setVelocityX(0);
                }

                if (path2[1].y * 32 + 16 === GreenGhost.y) {
                  GreenGhost.setVelocityY(0);
                }
              }
            }

            finder2.calculate();
          });
        }

        if (distance(PacMan.x, PacMan.y, PurpleGhost.x, PurpleGhost.y) <= 192) {
          finder3.findPath(Math.floor((PurpleGhost.x - 16) / 32), Math.floor((PurpleGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path3) {
            if (path3 === null || path3[1] === undefined) {} else {
              if (bonusF === false) {
                if (path3[1].x * 32 + 16 > PurpleGhost.x) {
                  PurpleGhost.setVelocityX(speed / 2);
                }

                if (path3[1].x * 32 + 16 < PurpleGhost.x) {
                  PurpleGhost.setVelocityX(-speed / 2);
                }

                if (path3[1].y * 32 + 16 > PurpleGhost.y) {
                  PurpleGhost.setVelocityY(speed / 2);
                }

                if (path3[1].y * 32 + 16 < PurpleGhost.y) {
                  PurpleGhost.setVelocityY(-speed / 2);
                }

                if (path3[1].x * 32 + 16 === PurpleGhost.x) {
                  PurpleGhost.setVelocityX(0);
                }

                if (path3[1].y * 32 + 16 === PurpleGhost.y) {
                  PurpleGhost.setVelocityY(0);
                }
              }
            }

            finder3.calculate();
          });
        } else {
          switch (PurpleTargetValue) {
            case 1:
              PurpleTargetCoordinateX = 64 / 32;
              PurpleTargetCoordinateY = 832 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 2;
              break;

            case 2:
              PurpleTargetCoordinateX = 352 / 32;
              PurpleTargetCoordinateY = 832 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 3;
              break;

            case 3:
              PurpleTargetCoordinateX = 480 / 32;
              PurpleTargetCoordinateY = 32 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 4;
              break;

            case 4:
              PurpleTargetCoordinateX = 64 / 32;
              PurpleTargetCoordinateY = 32 / 32;
              if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 1;
              break;

            default:
              break;
          }

          finder3.findPath(Math.floor((PurpleGhost.x - 16) / 32), Math.floor((PurpleGhost.y - 16) / 32), PurpleTargetCoordinateX, PurpleTargetCoordinateY, function (path3) {
            if (path3 === null || path3[1] === undefined) {} else {
              if (bonusF === false) {
                if (path3[1].x * 32 + 16 > PurpleGhost.x) {
                  PurpleGhost.setVelocityX(speed / 2);
                }

                if (path3[1].x * 32 + 16 < PurpleGhost.x) {
                  PurpleGhost.setVelocityX(-speed / 2);
                }

                if (path3[1].y * 32 + 16 > PurpleGhost.y) {
                  PurpleGhost.setVelocityY(speed / 2);
                }

                if (path3[1].y * 32 + 16 < PurpleGhost.y) {
                  PurpleGhost.setVelocityY(-speed / 2);
                }

                if (path3[1].x * 32 + 16 === PurpleGhost.x) {
                  PurpleGhost.setVelocityX(0);
                }

                if (path3[1].y * 32 + 16 === PurpleGhost.y) {
                  PurpleGhost.setVelocityY(0);
                }
              }
            }

            finder3.calculate();
          });
        }

        if (distance(PacMan.x, PacMan.y, GreyGhost.x, GreyGhost.y) <= 192) {
          finder4.findPath(Math.floor((GreyGhost.x - 16) / 32), Math.floor((GreyGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path4) {
            if (path4 === null || path4[1] === undefined) {} else {
              if (bonusF === false) {
                if (path4[1].x * 32 + 16 > GreyGhost.x) {
                  GreyGhost.setVelocityX(speed / 2);
                }

                if (path4[1].x * 32 + 16 < GreyGhost.x) {
                  GreyGhost.setVelocityX(-speed / 2);
                }

                if (path4[1].y * 32 + 16 > GreyGhost.y) {
                  GreyGhost.setVelocityY(speed / 2);
                }

                if (path4[1].y * 32 + 16 < GreyGhost.y) {
                  GreyGhost.setVelocityY(-speed / 2);
                }

                if (path4[1].x * 32 + 16 === GreyGhost.x) {
                  GreyGhost.setVelocityX(0);
                }

                if (path4[1].y * 32 + 16 === GreyGhost.y) {
                  GreyGhost.setVelocityY(0);
                }
              }
            }

            finder4.calculate();
          });
        } else {
          switch (GreyTargetValue) {
            case 1:
              GreyTargetCoordinateX = 928 / 32;
              GreyTargetCoordinateY = 576 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 2;
              break;

            case 2:
              GreyTargetCoordinateX = 640 / 32;
              GreyTargetCoordinateY = 96 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 3;
              break;

            case 3:
              GreyTargetCoordinateX = 352 / 32;
              GreyTargetCoordinateY = 576 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 4;
              break;

            case 4:
              GreyTargetCoordinateX = 640 / 32;
              GreyTargetCoordinateY = 832 / 32;
              if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 1;
              break;

            default:
              break;
          }

          finder4.findPath(Math.floor((GreyGhost.x - 16) / 32), Math.floor((GreyGhost.y - 16) / 32), GreyTargetCoordinateX, GreyTargetCoordinateY, function (path4) {
            if (path4 === null || path4[1] === undefined) {} else {
              if (bonusF === false) {
                if (path4[1].x * 32 + 16 > GreyGhost.x) {
                  GreyGhost.setVelocityX(speed / 2);
                }

                if (path4[1].x * 32 + 16 < GreyGhost.x) {
                  GreyGhost.setVelocityX(-speed / 2);
                }

                if (path4[1].y * 32 + 16 > GreyGhost.y) {
                  GreyGhost.setVelocityY(speed / 2);
                }

                if (path4[1].y * 32 + 16 < GreyGhost.y) {
                  GreyGhost.setVelocityY(-speed / 2);
                }

                if (path4[1].x * 32 + 16 === GreyGhost.x) {
                  GreyGhost.setVelocityX(0);
                }

                if (path4[1].y * 32 + 16 === GreyGhost.y) {
                  GreyGhost.setVelocityY(0);
                }
              }
            }

            finder4.calculate();
          });
        }

        if (PacMan.x > 1270) {
          PacMan.x = 10;
        }

        if (PacMan.x < 10) {
          PacMan.x = 1270;
        }

        if (PacMan.y > 886) {
          PacMan.y = 10;
        }

        if (PacMan.y < 10) {
          PacMan.y = 886;
        }

        if (Math.floor(PacMan.x) % 32 == 16) {
          PacMan.setVelocityX(0);
        }

        if (Math.floor(PacMan.y) % 32 == 16) {
          PacMan.setVelocityY(0);
        }

        if (Math.floor(RedGhost.x) % 32 == 16) {
          RedGhost.setVelocityX(0);
        }

        if (Math.floor(RedGhost.y) % 32 == 16) {
          RedGhost.setVelocityY(0);
        }

        if (Math.floor(GreenGhost.x) % 32 == 16) {
          GreenGhost.setVelocityX(0);
        }

        if (Math.floor(GreenGhost.y) % 32 == 16) {
          GreenGhost.setVelocityY(0);
        }

        if (Math.floor(GreyGhost.x) % 32 == 16) {
          GreyGhost.setVelocityX(0);
        }

        if (Math.floor(GreyGhost.y) % 32 == 16) {
          GreyGhost.setVelocityY(0);
        }

        if (Math.floor(PurpleGhost.x) % 32 == 16) {
          PurpleGhost.setVelocityX(0);
        }

        if (Math.floor(PurpleGhost.y) % 32 == 16) {
          PurpleGhost.setVelocityY(0);
        }

        PacMan.y = Math.floor(PacMan.y);
        PacMan.x = Math.floor(PacMan.x);
        RedGhost.y = Math.floor(RedGhost.y);
        RedGhost.x = Math.floor(RedGhost.x);
        PurpleGhost.y = Math.floor(PurpleGhost.y);
        PurpleGhost.x = Math.floor(PurpleGhost.x);
        GreyGhost.y = Math.floor(GreyGhost.y);
        GreyGhost.x = Math.floor(GreyGhost.x);
        GreenGhost.y = Math.floor(GreenGhost.y);
        GreenGhost.x = Math.floor(GreenGhost.x);

        if (PacMan.body.velocity.x < 0) {
          PacMan.angle = 0;
          PacMan.setTexture("PacMan2");
        }

        if (PacMan.body.velocity.x > 0) {
          PacMan.angle = 0;
          PacMan.setTexture("PacMan");
        }

        if (PacMan.body.velocity.y < 0) {
          PacMan.angle = 270;
          PacMan.setTexture("PacMan");
        }

        if (PacMan.body.velocity.y > 0) {
          PacMan.angle = 90;
          PacMan.setTexture("PacMan");
        }

        if (keys.W.isDown || keys.S.isDown || keys.A.isDown || keys.D.isDown) {
          if (keys.W.isDown) {
            PacMan.setVelocityY(-1 * speed);
          } else if (keys.S.isDown) {
            PacMan.setVelocityY(speed);
          }

          if (keys.A.isDown) {
            PacMan.setVelocityX(-1 * speed);
          } else if (keys.D.isDown) {
            PacMan.setVelocityX(speed);
          }
        }

        if (Phaser.Input.Keyboard.JustDown(esc)) {
          this.scene.pause();
          this.scene.launch("PauseScene3");
          keys.W.isDown = false;
          keys.A.isDown = false;
          keys.S.isDown = false;
          keys.D.isDown = false;
          resume = true;
        }
      }
    }
  }]);

  return PlayScene3;
}(Phaser.Scene);

exports.PlayScene3 = PlayScene3;
},{"easystarjs":"node_modules/easystarjs/src/easystar.js"}],"src/scenes/PauseScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PauseScene = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// inicializace promennych
var resumebutton;
var resume = false;
var menubutton;

var PauseScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PauseScene, _Phaser$Scene);

  function PauseScene() {
    _classCallCheck(this, PauseScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(PauseScene).call(this, {
      key: "PauseScene"
    }));
  }

  _createClass(PauseScene, [{
    key: "init",
    value: function init(data) {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      // vytvoreni tlacitek
      resumebutton = this.add.image(643, 535, 'resume');
      menubutton = this.add.image(645, 505, 'menu');
      resumebutton.setInteractive();
      menubutton.setInteractive();
      resumebutton.on('pointerup', function (pointer) {
        resume = true;
      }); // pri stisknuti tlacitka menu navrat do menu

      menubutton.on('pointerup', function (pointer) {
        this.scene.start("MenuScene");
        this.scene.stop("PlayScene");
        this.scene.stop();
      }, this);
    }
  }, {
    key: "update",
    value: function update() {
      // obnoveni sceny hry
      if (resume) {
        resume = false;
        this.scene.resume("PlayScene");
        this.scene.stop();
      }
    }
  }]);

  return PauseScene;
}(Phaser.Scene);

exports.PauseScene = PauseScene;
},{}],"src/scenes/PauseScene2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PauseScene2 = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// PauseScene2 je analogicka k PauseScene, zmenene jsou pouze nazvy, protoze funguji stejne jsou komentare pouze v PauseScene
var resumebutton;
var resume = false;
var menubutton;

var PauseScene2 =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PauseScene2, _Phaser$Scene);

  function PauseScene2() {
    _classCallCheck(this, PauseScene2);

    return _possibleConstructorReturn(this, _getPrototypeOf(PauseScene2).call(this, {
      key: "PauseScene2"
    }));
  }

  _createClass(PauseScene2, [{
    key: "init",
    value: function init(data) {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      resumebutton = this.add.image(643, 535, 'resume');
      menubutton = this.add.image(645, 505, 'menu');
      resumebutton.setInteractive();
      menubutton.setInteractive();
      resumebutton.on('pointerup', function (pointer) {
        resume = true;
      });
      menubutton.on('pointerup', function (pointer) {
        this.scene.start("MenuScene");
        this.scene.stop("PlayScene2");
        this.scene.stop();
      }, this);
    }
  }, {
    key: "update",
    value: function update() {
      if (resume) {
        resume = false;
        this.scene.resume("PlayScene2");
        this.scene.stop();
      }
    }
  }]);

  return PauseScene2;
}(Phaser.Scene);

exports.PauseScene2 = PauseScene2;
},{}],"src/scenes/PauseScene3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PauseScene3 = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// PauseScene3 je analogicka k PauseScene, zmenene jsou pouze nazvy, protoze funguji stejne jsou komentare pouze v PauseScene
var resumebutton;
var resume = false;
var menubutton;

var PauseScene3 =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PauseScene3, _Phaser$Scene);

  function PauseScene3() {
    _classCallCheck(this, PauseScene3);

    return _possibleConstructorReturn(this, _getPrototypeOf(PauseScene3).call(this, {
      key: "PauseScene3"
    }));
  }

  _createClass(PauseScene3, [{
    key: "init",
    value: function init(data) {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      resumebutton = this.add.image(643, 535, 'resume');
      menubutton = this.add.image(645, 505, 'menu');
      resumebutton.setInteractive();
      menubutton.setInteractive();
      resumebutton.on('pointerup', function (pointer) {
        resume = true;
      });
      menubutton.on('pointerup', function (pointer) {
        this.scene.start("MenuScene");
        this.scene.stop("PlayScene3");
        this.scene.stop();
      }, this);
    }
  }, {
    key: "update",
    value: function update() {
      if (resume) {
        resume = false;
        this.scene.resume("PlayScene3");
        this.scene.stop();
      }
    }
  }]);

  return PauseScene3;
}(Phaser.Scene);

exports.PauseScene3 = PauseScene3;
},{}],"src/scenes/LeaderBoardScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeaderBoardScene = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// inicializace promennych
var backsbutton;
var back = false;
var scoreText = [];
var nameText = [];
var scoreField = [];
var x;
var title;
var background;

var LeaderBoardScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(LeaderBoardScene, _Phaser$Scene);

  function LeaderBoardScene() {
    _classCallCheck(this, LeaderBoardScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(LeaderBoardScene).call(this, {
      key: "LeaderBoardScene"
    }));
  }

  _createClass(LeaderBoardScene, [{
    key: "preload",
    value: function preload() {
      this.load.image("back", "./assets/Back2.png");
    }
  }, {
    key: "create",
    value: function create() {
      // vytvoreni tlacitek z obrazku
      background = this.add.image(640, 448, "background");
      title = this.add.image(640, 100, 'title');
      backsbutton = this.add.image(160, 850, 'back');
      backsbutton.setInteractive();
      backsbutton.on('pointerup', function (pointer) {
        back = true;
      }); // nacteni skore a pridani nove serazeneho skore do pameti prohlizece

      scoreField = JSON.parse(localStorage.getItem("score"));

      for (var i = 0; i < 10; i++) {
        scoreText.push(this.add.text(800, 198 + i * 65));
        nameText.push(this.add.text(400, 198 + i * 65));
      }

      if (scoreField !== null && scoreField !== undefined) {
        x = scoreField.length;

        if (x > 10) {
          x = 10;
        }

        for (var i = 0; i < 10; i++) {
          if (i < x) {
            scoreText[i].setText(" " + scoreField[i].score);
            nameText[i].setText(i + 1 + ": " + scoreField[i].playerName);
          } else {
            nameText[i].setText(i + 1 + ": ");
          }
        }
      } else {
        for (var i = 0; i < 10; i++) {
          scoreText[i].setText(i + 1 + ": ");
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      // pri stisknuti back se znovu spusti scena s menu
      if (back) {
        this.scene.start("MenuScene");
        back = false;
        scoreText = [];
        nameText = [];
        scoreField = [];
      }
    }
  }]);

  return LeaderBoardScene;
}(Phaser.Scene);

exports.LeaderBoardScene = LeaderBoardScene;
},{}],"src/main.js":[function(require,module,exports) {
"use strict";

var _MenuScene = require("./scenes/MenuScene");

var _PlayScene = require("./scenes/PlayScene");

var _PlayScene2 = require("./scenes/PlayScene2");

var _PlayScene3 = require("./scenes/PlayScene3");

var _PauseScene = require("./scenes/PauseScene");

var _PauseScene2 = require("./scenes/PauseScene2");

var _PauseScene3 = require("./scenes/PauseScene3");

var _LeaderBoardScene = require("./scenes/LeaderBoardScene");

// soubor se zakladni konfiguraci Phaseru

/* @type {import("../typings/phaser")} */
// import typingu
// importy scen
// ohraniceni okna hry
var myCustomCanvas = document.createElement('canvas');
myCustomCanvas.id = 'myCustomCanvas';
myCustomCanvas.style = 'border: 4px solid black';
document.body.appendChild(myCustomCanvas); // inicializace hry

var game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1280,
  // sirka okna
  height: 896,
  // vyska okna
  canvas: document.getElementById('myCustomCanvas'),
  // seznam scen
  scene: [_MenuScene.MenuScene, _PlayScene.PlayScene, _PauseScene.PauseScene, _LeaderBoardScene.LeaderBoardScene, _PlayScene2.PlayScene2, _PauseScene2.PauseScene2, _PlayScene3.PlayScene3, _PauseScene3.PauseScene3],
  audio: {
    disableWebAudio: false
  },
  render: {
    pixelArt: true
  },
  // nastaveni fyziky (typ, gravitace, fps ..)
  physics: {
    default: "arcade",
    arcade: {
      fps: 60,
      gravity: {
        y: 0
      }
    }
  }
});
},{"./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/PlayScene":"src/scenes/PlayScene.js","./scenes/PlayScene2":"src/scenes/PlayScene2.js","./scenes/PlayScene3":"src/scenes/PlayScene3.js","./scenes/PauseScene":"src/scenes/PauseScene.js","./scenes/PauseScene2":"src/scenes/PauseScene2.js","./scenes/PauseScene3":"src/scenes/PauseScene3.js","./scenes/LeaderBoardScene":"src/scenes/LeaderBoardScene.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map