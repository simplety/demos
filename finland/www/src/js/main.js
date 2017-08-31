//configure loading modules from the lib directory,
//except for "app" ones

requirejs.config({
    baseUrl: "../js",
    paths: {
        "jquery": "./lib/jquery.min"
    }
});

