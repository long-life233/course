# canvas实现粒子效果

## 注意
canvas的宽高必须在渲染为dom之前指定，不然为默认宽高。

并且不能通过css，style方式设置宽高，而是要将宽高设置为dom元素的属性。

例如
```js
document.querySelector("#box").innerHTML = `<canvas id="canvas" width=${screenWidth.value} height=${screenHeight.value} style="position:fixed;z-index:2"></canvas>`
```

canvas在H5可以设置绝对定位被覆盖。但在小程序上却不能通过定位被覆盖。

使用window.requestAnimationFrame方法更流畅的执行动画

## 最后，贴下我的代码

组件中引入使用即可
```js
// 引入useParticle钩子
import useParticle from "../hooks/useParticle.js"

useParticle()

<div id="box"></div>
```

useParticle.js
```js
import { ref, onMounted } from 'vue'

export default function () {
    // 获取浏览器宽高
    let screenWidth = ref(window.screen.width)
    let screenHeight = ref(window.screen.height)
    // 定义canvas上下文，方便函数里拿到
    let ctx;
    // window.requestAnimationFrame返回id
    let animationID;
    // 保存每个粒子的数组
    var points = []
    // 动态获取浏览器
    window.onresize = (e) => {
        screenWidth.value = e.target.innerWidth;
        screenHeight.value = e.target.innerHeight;
        drawCanvas()
    }
    // 绘制canvas
    function drawCanvas() {
        // 清空点
        points = []
        document.querySelector("#box").innerHTML = `<canvas id="canvas" width=${screenWidth.value} height=${screenHeight.value} style="position:fixed;z-index:2"></canvas>`
        ctx = document.querySelector("#canvas").getContext("2d")
        for (var i = 0; i < 100; i++) {
            points.push(new Point(Math.random() * screenWidth.value, Math.random() * screenHeight.value))
        }
        // 需要判断清空上一次的动画window.requestAnimationFrame
        if(animationID){
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
        ctx.fillStyle = '#fff'
        ctx.fill()
        ctx.stroke();
    }
    // 移动方法
    Point.prototype.move = function () {
        this.x += this.sx
        this.y += this.sy
        if (this.x > screenWidth.value || this.x < 0) this.sx = -this.sx
        if (this.y > screenHeight.value || this.y < 0) this.sy = -this.sy
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
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')'
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
        ctx.clearRect(0, 0, screenWidth.value, screenHeight.value)
        for (var i = 0; i < points.length; i++) {
            points[i].move()
            points[i].draw(ctx)
            for (var j = i + 1; j < points.length; j++) {
                points[i].drawLine(ctx, points[j])
            }
        }
    }
    onMounted(() => {
        // 绘制canvas
        drawCanvas()
    })
}

```