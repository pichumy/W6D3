/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_utils.js":
/*!*******************************!*\
  !*** ./frontend/api_utils.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  unfollowUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      type: 'DELETE',
      dataType: 'JSON'
    });
  },
  followUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      type: 'POST',
      dataType: 'JSON'
    });
  },
  searchUsers: (queryVal, success) => {
    return $.ajax({
      url: "/users/search/",
      data: {query: queryVal},
      type: 'GET',
      dataType: 'JSON',
      success: (data) => {
        success(data);
      }
    });
  }
};

module.exports = APIUtil;


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_utils.js */ "./frontend/api_utils.js");

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = $(el).attr("data-user-id");
    this.followState = $(el).attr("data-initial-follow-state");
    this.render = this.render.bind(this);
    this.render();
    this.handleClick = this.handleClick.bind(this);
    this.$el.on("click", e => {
      this.handleClick(e);
    });
  }

  render() {
    switch (this.followState) {
      case "followed":
        this.$el.prop("disabled", false);
        this.$el.text("Unfollow!");
        break;
      case "unfollowed":
        this.$el.prop("disabled", false);
        this.$el.text("Follow!");
        break;
      case "following":
        this.$el.prop("disabled", true);
        break;
      case "unfollowing":
        this.$el.prop("disabled", true);
        break;
    }
  }

  handleClick(e) {
    e.preventDefault();

    if (this.followState === "followed") {
      this.followState = "unfollowing";
      this.render();
      
      APIUtil.unfollowUser(this.userId).then( (response) => {
        this.followState = "unfollowed";
        this.render();
      }, function (failure) {
        console.log(failure);
      });

    } else if (this.followState === "unfollowed"){
      this.followState = "following";
      this.render();

      APIUtil.followUser(this.userId).then( (response) => {
          this.followState = "followed";
          this.render();
        }, function (failure) {
          console.log(failure);
        });
      }
    }
}

module.exports = FollowToggle;


/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");

$( () => {
  let buttons = $('.follow-toggle');
  buttons.each( (idx) => {
    const el = new FollowToggle(buttons[idx]);
  });

  let search = $(".users-search");
  search.each( (idx) => {
    const el = new UsersSearch(search[idx]);
  });

});


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_utils.js */ "./frontend/api_utils.js");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $("#search-bar");
    this.$ul = $(".users");
    this.renderResults = this.renderResults.bind(this);
    this.$input.on("input", e => {
      this.handleInput(e);
    });
  }

  handleInput(e) {
    APIUtil.searchUsers(e.currentTarget.value, (response) => {
      this.renderResults(response);
    });
  }

  renderResults(response) {
    this.$ul.empty();
    console.log(response);
    response.forEach((user) => {
      this.$ul.append(`<li><a href='${user.id}'>${user.username}</a></li>`);
    });
  }
}

module.exports = UsersSearch;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map