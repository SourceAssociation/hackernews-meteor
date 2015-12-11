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
    // data: function () {
    //     return Posts.findOne(this.params._id);
    // },
});

Router.route('/submit', {name: 'postSubmit'});

// Router.route('/login', {name: 'login'});
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');


Router.onBeforeAction('dataNotFound', {only: 'postPage'});