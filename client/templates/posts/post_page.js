Template.postPage.onRendered(function(){
    this.subscribe('postsById', Router.current().params._id);
});

Template.postPage.helpers({
    post: function(){
        var postId = Router.current().params._id;
        return Posts.findOne({_id: postId});
    }
});