if (Meteor.isClient) {
    Meteor.startup(function(){
        var lang = window.navigator.userLanguage || window.navigator.language;
        T9n.setLanguage(lang);
    });
};


if (Meteor.isServer) {
    Meteor.startup(function(){
        // weibo
        ServiceConfiguration.configurations.upsert(
            { service: "weibo" },
            { $set: { clientId: "1292962797", secret: "75a730b58f5691de5522789070c319bc" } }
        );
        // wechat
        ServiceConfiguration.configurations.remove({
            service: "wechat"
        });
        ServiceConfiguration.configurations.insert({
            service: "wechat",
            appId: "<your-app-id>",
            scope:'basic',
            secret: "<your-app-secret>"
        });
        // QQ
        ServiceConfiguration.configurations.remove({
            service: "qq"
        });
        ServiceConfiguration.configurations.insert({
            service: "qq",
            clientId: "<your-client-id>",
            scope:'get_user_info',
            secret: "<your-client-secret>"
        });
    });
};