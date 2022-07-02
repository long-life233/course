# Canvas Particle Effect

## 在vitepree中使用报错
获取不到元素。。
```shell
本地调试运行没有问题，

可是打包上传到服务器就会有各种问题。比如获取不到canvas的宿主元素<box id="box"></box>

此时打印document,发现只有<div id="app"></app>渲染出来呢，其他元素还没有渲染出来。。。

所以我想既然canvas只是作为背景那为什么不直接插进body标签里呢。
```
::: danger 最后的结果
还是有问题。。。Hydration completed but contains mismatches.
:::

## 注意
canvas的宽高必须在渲染为dom之前指定，不然为默认宽高。

并且不能通过css，style方式设置宽高，而是要将宽高设置为dom元素的属性。

例如
```js
document.querySelector("#box").innerHTML = `<canvas id="canvas" width=${screenWidth.value} height=${screenHeight.value} style="position:fixed;z-index:2"></canvas>`
```

canvas在H5可以设置绝对定位被覆盖。但在小程序上却不能通过定位被覆盖。

使用window.requestAnimationFrame方法更流畅的执行动画

## 代码
可以将这段代码复制到html的script标签或者vue的onMounted钩子里。
```js

    // 获取浏览器宽高
    let screenWidth = 0
    let screenHeight = 0
    // 是否是黑色主题
    let isDark
    // 定义canvas上下文，方便函数里拿到
    let ctx;
    // window.requestAnimationFrame返回id
    let animationID;
    // 保存每个粒子的数组
    var points = []
    // 绘制canvas
    function drawCanvas() {
        screenWidth = window.screen.width
        screenHeight = window.screen.height
        // 清空点
        points = []
        // 删除之前的canvas
        if (document.querySelector("canvas")) {
            document.querySelector("canvas").remove()
        }
        // 创建canvas
        let canvasNode = document.createElement('canvas')
        canvasNode.width = screenWidth
        canvasNode.height = screenHeight
        canvasNode.style.position = 'fixed'
        canvasNode.style.zIndex = -2
        canvasNode.id = "canvas"
        ctx = canvasNode.getContext("2d")
        document.body.appendChild(canvasNode)
        // 绘制点
        for (var i = 0; i < 200; i++) {
            points.push(new Point(Math.random() * screenWidth, Math.random() * screenHeight))
        }
        // 需要判断清空上一次的动画window.requestAnimationFrame
        if (animationID) {
            window.cancelAnimationFrame(animationID)
        }

        gameloop(); //进行
    }

    /**速度*/
    var Point = function (x, y) {
        this.x = x
        this.y = y
        this.r = Math.random() * 2
        this.sx = Math.random() * 0.5 - 0.25
        this.sy = Math.random() * 0.5 - 0.25
    }
    // 画点方法
    Point.prototype.draw = function (ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = '#000'
        ctx.fill()
        ctx.stroke();
    }
    // 移动方法
    Point.prototype.move = function () {
        this.x += this.sx
        this.y += this.sy
        if (this.x > screenWidth || this.x < 0) this.sx = -this.sx
        if (this.y > screenHeight || this.y < 0) this.sy = -this.sy
    }
    // 画线方法
    Point.prototype.drawLine = function (ctx, p) {
        var dx = this.x - p.x
        var dy = this.y - p.y
        var d = Math.sqrt(dx * dx + dy * dy)
        if (d < 100) {
            var alpha = (100 - d) / 300 * 1
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(p.x, p.y)
            ctx.closePath()
            ctx.strokeStyle = 'rgba(0, 0, 0, ' + alpha + ')'
            ctx.strokeWidth = 1
            ctx.stroke()
        }
    }
    /**粒子进行*/
    const gameloop = () => {
        animationID = window.requestAnimationFrame(gameloop)
        // setTimeout(gameloop, 100);
        paint();
    }
    /**清空画布*/
    const paint = () => {
        ctx.clearRect(0, 0, screenWidth, screenHeight)
        for (var i = 0; i < points.length; i++) {
            points[i].move()
            points[i].draw(ctx)
            for (var j = i + 1; j < points.length; j++) {
                points[i].drawLine(ctx, points[j])
            }
        }
    }
    // 浏览器缩放重绘canvas
    window.onresize = (e) => {
        screenWidth = e.target.innerWidth;
        screenHeight = e.target.innerHeight;
        drawCanvas()
    }
    // 绘制canvas
    drawCanvas()

```
