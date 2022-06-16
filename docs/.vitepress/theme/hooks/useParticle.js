import { ref, onMounted } from 'vue'

export const useParticle = () => {
    // 获取浏览器宽高
    let screenWidth = ref(window.screen.width)
    let screenHeight = ref(window.screen.height)
    // 是否是黑色主题
    let isDark
    // 定义canvas上下文，方便函数里拿到
    let ctx;
    // window.requestAnimationFrame返回id
    let animationID;
    // 保存每个粒子的数组
    var points = []



    // 浏览器缩放重绘canvas
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
        // 绘制点
        for (var i = 0; i < 100; i++) {
            points.push(new Point(Math.random() * screenWidth.value, Math.random() * screenHeight.value))
        }
        // 需要判断清空上一次的动画window.requestAnimationFrame
        if (animationID) {
            window.cancelAnimationFrame(animationID)
        }
        // 判断主题色
        isDark = document.documentElement.classList.contains('dark')
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
        ctx.fillStyle = isDark ? '#fff' : '#000'
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
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, ' + alpha + ')' : 'rgba(0, 0, 0, ' + alpha + ')'
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