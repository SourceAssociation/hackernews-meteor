Meteor.publish('posts', function () {
    return Posts.find();
});

Meteor.publish('postsByName', function (name) {
    return Posts.find({author: name});
});

Meteor.publish('postsById', function (postId) {
    return Posts.find({_id: postId});
});