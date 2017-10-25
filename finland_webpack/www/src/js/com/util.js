
function throttle(method,interval,context){
    interval = interval || 500;
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
        console.log("enter.");
    },interval);
};
export default{
    throttle: throttle
};
