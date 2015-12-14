Posts = new Mongo.Collection('posts');

Posts.allow({
    // 因为服务器端调用的 postInsert,所以这个不需要了
    // insert: function (userId, doc) {
    //     return !! userId;
    // },
    // 服务器端调用CURD是不需要验证权限的，所以需再 permission 中验证
    update: function (userId, post, fields, modifier) {
        return ownDocs(userId, post);
    },
    remove: function (userId, post) {
        return ownDocs(userId, post);
    }
});

Posts.deny({
    update: function (userId, doc, fields, modifier) {
        return (_.without(fields, 'url', 'title').length > 0) ? true : false;
    }
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

        // 延时补偿演示
        // if (Meteor.isServer) {
        //     postAttributes.title += "{server}";
        //     Meteor._sleepForMs(5000);
        // }else{
        //     postAttributes.title += "{client}";
        // };

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.emails[0].address,
            submitted: new Date()
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});