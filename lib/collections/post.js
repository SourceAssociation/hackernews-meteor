Posts = new Mongo.Collection('posts');

Posts.allow({
    insert: function (userId, doc) {
        return !! userId;
    }//,
    // update: function (userId, doc, fields, modifier) {
    //     //...
    // },
    // remove: function (userId, doc) {
    //     //...
    // },
    // fetch: ['owner'],
    // transform: function () {
    //     //...
    // }
});

Meteor.methods({
    postInsert: function (postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        // 查找已存在post
        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                id: postWithSameLink._id
            }
        };

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});