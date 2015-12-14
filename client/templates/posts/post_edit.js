Template.postEdit.events({

    'submit form': function (e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Posts.update({_id: currentPostId}, {$set: postProperties}, function(error){
            if (error) {
                // 显示错误信息
                alert(error.reason);
            }else{
                Router.go('postPage', {_id: currentPostId});
            }
        });
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("确定删除该post吗？")) {
            var currentPostId = this._id;
            Posts.remove({_id: currentPostId}, function (error) {
                if (error) {
                    // 显示错误信息
                    alert(error.reason);
                }else{
                    Router.go('postsList');
                }
            });
        };
    }
});