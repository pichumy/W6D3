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
