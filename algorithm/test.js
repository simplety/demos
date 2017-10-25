function getUrlParam(sUrl, sKey) {
    var result,param = {};
    sUrl.replace(/[\?&]?(\w+)=(\w+)/g,function(match,key,value){
        param[key] === void 0 ? param[key] = value : param[key] = param[key].concat(value);
    });
    debugger;
    sKey === void 0 || sKey ==="" ? result = param : result = param[sKey] || "";
    return result;
}
sUrl = "http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe";
getUrlParam(sUrl);
