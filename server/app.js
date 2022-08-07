const express = require('express')
const fs = require('fs')
var bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});

app.get('/vue', (req, res) => {
  console.log('get');
  fs.readFile('./docs/vue.md', 'utf8' , (err, data) => {
    res.send({
      code:0,
      msg:"读取成功",
      data
    })
  })
})

app.post('/vue', (req, res) => {
  console.log('post');
  fs.writeFile('./docs/vue.md', req.body.content, err => {
    res.send({
      code:0,
      msg:"写入成功"
    })
  })
})


app.get('/react', (req, res) => {
  console.log('get');
  fs.readFile('./docs/react.md', 'utf8' , (err, data) => {
    res.send({
      code:0,
      msg:"读取成功",
      data
    })
  })
})

app.post('/react', (req, res) => {
  console.log('post');
  fs.writeFile('./docs/react.md', req.body.content, err => {
    res.send({
      code:0,
      msg:"写入成功"
    })
  })
})



app.listen(3000, () => console.log('Server ready'))