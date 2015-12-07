if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'Arron',
        url: 'http://www.helloarron.com'
    });
    Posts.insert({
        title: 'Arron Blog',
        url: 'http://blog.helloarron.com'
    });
    Posts.insert({
        title: 'Arron Github',
        url: 'http://github.com/ArronYR'
    });
};