# Easy Chat Room
app.js,作为服务端
```js
var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    // 接受客户端消息
    conn.on('text', (str) => {
        // 向客户端发送消息
        // conn.send("来自服务端的消息:" + str + "!!!")
        // 广播，向每一个连接发送消息
        server.connections.forEach(conn=>{
            conn.send("来自服务端的消息:" + str + "!!!")
        })
    })


    // 处理异常
    conn.on('error', (err) => {

    })
}).listen(2333)
```
index.html,作为客户端
```html
<body>
    <input type="text" id="input"><button id="btn">发送</button>
    <div></div>
    来自服务端的数据：
    <div id="cont">

    </div>
    <script>
        let ws = new WebSocket("ws://localhost:2333")
        // 客户端向服务端发送消息
        ws.addEventListener('open', function (event) {
            btn.onclick = ()=>{
                ws.send(input.value);
            }
            
        });
        // 接受服务端消息
        ws.addEventListener('message', function (event) {
            console.log(event.data);
            let div = document.createElement('div')
            div.innerText = event.data
            cont.append(div)
        });
    </script>
</body>
```

