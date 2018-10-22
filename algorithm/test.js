function test(opt) {
  //  if(opt == "generate"){
  //  alert(refresh);
  //  }
  if (opt == "proxy_table" || opt == "requests" || opt == "pdf") {
    var form = new FormData();
    var out = "config";
    document.getElementById("result").innerHTML = "";
  } else {
    var form = new FormData(document.getElementById("config_table"));
    var out = "result";
  }
  form.append("opt", opt);

  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(out).innerHTML =
        this.responseText;
      // stop websocket
    }
  };

  // req.open("post", "${pageContext.request.contextPath}/public/testupload", false);
  req.open("post", "./index2.php", false);
  req.send(form);

  // start websocket
}

function loadDoc() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("result").innerHTML =
        this.responseText;
    }
  };
  req.open("GET", "pdf.log", true);
  req.send();
}

//loadDoc(); // This will run on page load
setInterval(function() {
  loadDoc() // this will run after every 5 seconds
}, 1000);

