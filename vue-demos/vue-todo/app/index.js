import Vue from "vue";

Vue.component("todo-item",{
  props: ["todo"],
  template: "<li>{{todo.text}}</li>"
});

var app = new Vue({
  el: "#app",
  data: {
    newTodo: "",
    todoList: []
  },
  created: function(){
    this.newTodo = "input your note";
    this.todoList = [
    {id:0,text:"hey"},
    {id:1,text:"yo"}];
  },
  methods: {
    addTodo: function(){
      this.todoList.push({
        id: this.todoList.length,
        text: this.newTodo,
      })
      console.log(this.todoList);
    }
  }
})
