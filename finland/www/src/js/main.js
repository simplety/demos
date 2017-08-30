//configure loading modules from the lib directory,
//except for "app" ones

requirejs.config({
    baseUrl: "./src/js",
    paths: {
        "jquery": "./lib/jquery.min"
    }
})

//加载入口模块
requirejs(['app/index']);