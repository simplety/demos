#!/usr/bin/env node
var r2 = require('r2'),
  publicIP = require('public-ip'),
  chalk = require('chalk'),
  config = require('./config.json'),
  print = require('./print');

function weather(word) {

  if(word != undefined){
    if(/^[0-9]/.test(word)){
      ipArr = word.split('.');
      if(ipArr.length !== 4) return;

      ipArr = ipArr.filter(function(num,idx,arr){
        num = Number(num);
        return (num > 0) && (num < 255) ;
      });
      if(word !== ipArr.join(".")) {
        console.log(chalk.red("\u300c输入的ip有误，请更正后重试\u300d"));
        console.log();
        return;
      }
    }
    getDataByCity(word);
  }else{
    //get IP   
    publicIP.v4().then(function(ip){
      if(ip==undefined) return;
      getDataByCity(ip);
    });
  }
  
}

async function getDataByCity(city){
  if(city==undefined) return;

  city = encodeURIComponent(city);

  let src = `${config.checkWeather.url}?city=${city}&key=${config.checkWeather.key}`;
  try{
    resp = await r2.put(src,{json:{ok:true}}).json;
    print(resp.HeWeather5[0])
  }catch(e){
    console.log(e);
  }
}

module.exports = function(cities){
  if(cities.length === 0){
    weather();
  }
  for(let i = 0; i < cities.length; i++){
    weather(cities[i]);
  }
};