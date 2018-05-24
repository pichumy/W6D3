const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");

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
