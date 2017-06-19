function setRouter(app){ 
 var router = app; 

//假设域名是localhost, 端口是8080

//更多详细使用方法参考 http://www.expressjs.com.cn/guide/routing.html

router.get("/login",function(req,res){
  username = req.query.username
  password = req.query.password
  console.log("username",username)
  console.log("password",password)
  info = {
    "ty":"123",
    "xiaoming":"abcd1234"
  }
  if (info[username] === password){
    res.send({"loginStatus":true})
  }else res.send({"loginStatus":false})
})

router.get("/load",function(req,res){
  index = Number(req.query.index)
  length = Number(req.query.length)
  info = []
  for(i = index + 1; i < index + length + 1; i++){
    info.push("内容"+ i)
  }
  console.log("index",typeof index)
  console.log("length",typeof length)

  console.log("info",info)
  setTimeout(function(){
    res.send(info)
  },5000)
})
/**
 * 当 http://localhost:8080/getInfo 的GET请求到来时被下面匹配到进行处理
 * 发送JSON格式的响应数据 {name: 'ruoyu'}
 */
router.get('/getInfo', function(req, res) {
  res.send({name: 'ruoyu'})
  // info = require(./db.json)
  // res.send(info)
})

router.use("/loadNews",function(req, res){
  var index = Number(req.query.index)
  var length = Number(req.query.length)
  var info = []
  for(let i = index + 1; i < index + length + 1; i++){
    info.push("新闻"+ i)
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.send(info)
})

router.get("/loadMusic", function(req, res) {
    var channelList = [
        "夕阳无限好",
        "葡萄成熟时",
        "别找我麻烦",
        "你在终点等我",
        "成全",
        "全世界谁倾听你",
        "阳宝",
        "多得他",
        "浪费",
        "失落沙洲",
        "一样的月光",
        "惧高症",
        "绿洲",
        "圆舞曲",
        "身骑白马",
        "树洞的声音",
        "湫兮如风",
        "当我找到了你",
        "寻人启事",
        "理想人生",
        "不怕庆祝",
        "出口",
        "潜规则"
    ]

    var retuArr = []
    for (let i = 3; i > 0; i--){
        retuArr.push(channelList[Math.floor(Math.random() * channelList.length)])
    }
    var retuStr = req.query.callback + "(" + JSON.stringify(retuArr) + ")"
    res.send(retuStr)
})


/**
 * 当 http://localhost:8080/getFriends 的GET请求到来时被下面匹配到进行处理
 * 通过req.query获取请求的参数对象
 * 通过 req.send发送响应
 */
router.get('/getFriends', function(req, res) {
	var username = req.query.username // 通过 req.query获取请求参数
	var friends

  //根据请求参数mock数据
  switch (username){
  	case 'ruoyu':
  		friends = ['小米', '小刚']
  		break
  	case 'hunger':
  		friends = ['小谷', '小花']
  		break;
  	default:
  		friends = ['没有朋友']
  }
  res.send(friends)
})


/**
 * 当 http://localhost:8080/comment 的GET请求到来时被下面匹配到进行处理
 * 通过req.body获取post请求的参数对象
 * 通过 req.send发送响应
 */
router.post('/comment', function(req, res) {
  console.log(req.body.comment) // 可通过req.body获取 post 提交的参数
  res.send({status: 'ok'})
})

/**
 * 使用 router.use可处理所有类型的请求
*/
router.use('/hello', (req, res)=>{
  res.send('world')
})


/**
 * 设置 header 可以处理跨域请求
*/
router.use('/hi', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.send('world')
})

}
 module.exports.setRouter = setRouter