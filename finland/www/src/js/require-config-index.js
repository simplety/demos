/**
 * Created by Kaisla on 31/08/2017.
 */
requirejs.config({
    baseUrl: "../js",
    paths: {
        "jquery": "./lib/jquery.min"
    },
    waitSeconds: 0
});
// //加载入口模块
// requirejs(['app/index'],function(){
//     requirejs(['app/experience']);
// });

requirejs(["index"]);