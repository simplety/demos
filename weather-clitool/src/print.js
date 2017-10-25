const chalk = require('chalk');
const log = console.log;

function print(weaObj){
  if((weaObj == undefined) || (weaObj.status == undefined)) return;
  if(weaObj.status !== 'ok'){
    if(weaObj.status == 'unknown city'){
      log();
      log(chalk.red('\u300c未知城市，请确认参数后重试\u300d'));
      log();
    }else{
      log();
      log(chalk.red('\u300c服务器繁忙或是网络故障，请稍后重试\u300d'));
      log();
    }
    return;
  }
  this.weaObj = weaObj;
  this.init();
}

print.prototype = {
  init: function (){
    this.printBasic(this.weaObj.basic);
    this.printNow(this.weaObj.now);
    this.printForecast3(this.weaObj.daily_forecast);
  },
  printBasic: function (basicObj){
    if(basicObj == undefined) return;
    log(chalk.yellow('「',basicObj.cnty + basicObj.city + ' 」'),
      chalk.cyan('天气预报'));
  log();
  },
  printNow: function(nowObj){
    if(nowObj == undefined) return; 
    log(chalk.white("当前天气"),chalk.green(nowObj.cond.txt),chalk.white("\uff0c气温"),
      chalk.green(nowObj.tmp,"\u00B0C"),
      chalk.white("\u3002")
    );
    log();
  },
  printForecast3: function(foreObj){
    if(foreObj == undefined) return;
    if(foreObj.length !== 3) return;
    //log(chalk.white("  空气质量指数：",weatherObj.aqi.city.aqi));
    for(var i=0;i<3;i++){
      log(chalk.magenta(foreObj[i].date),'天气',
        chalk.yellow(foreObj[i].cond.txt_d,
        foreObj[i].cond.txt_n));
      log(chalk.white("最高气温"),chalk.red(foreObj[i].tmp.max,"\u00B0C"),
        chalk.white('\uff0c'),
        chalk.white("最低气温"),chalk.cyan(foreObj[i].tmp.min,"\u00B0C"),
        chalk.white("\u3002"));
      log();
    }
    
  }
}

module.exports = function(obj){
  new print(obj);
};