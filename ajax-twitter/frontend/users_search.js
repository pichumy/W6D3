const APIUtil = require("./api_utils.js");

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
