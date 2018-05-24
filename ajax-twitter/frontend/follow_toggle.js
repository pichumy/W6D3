const APIUtil = require("./api_utils.js");

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
