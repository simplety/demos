//var Vue = require("vue");
import Vue from "vue";

var app = new Vue({
  el: "#app",
  data: {
    message: "Loaded at" + new Date().toLocaleString(),
  }
});
