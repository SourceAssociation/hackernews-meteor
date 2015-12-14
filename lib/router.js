Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('posts');
    }
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () {
        var postId = this.params._id;
        return Posts.findOne({_id: postId});
    },
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function () {
        return Posts.findOne(this.params._id);
    },
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function () {
    if (!Meteor.user()) {
        this.render('accessDenied');
    }else{
        this.next();
    }
}

// Router.route('/login', {name: 'login'});
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');


Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});