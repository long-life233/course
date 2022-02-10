import { ref, onMounted } from 'vue'

export default function () {
    // 获取浏览器宽高
    let screenWidth = ref(window.screen.width)
    let screenHeight = ref(window.screen.height)
    onMounted(() => {
        // 创建canvas标签
        let canvasNode = document.createElement('canvas');
        canvasNode.width = screenWidth.value;
        canvasNode.height = screenHeight.value;
        canvasNode.style.border = `1px solid #fff`
        canvasNode.style.position = `fixed`
        canvasNode.style.zIndex = `99`
        canvasNode.id = "canvas"
        document.querySelector("#box").appendChild(canvasNode)
        // 动态获取浏览器
        // window.onresize = (e) => {
        //     screenWidth.value = e.target.innerWidth;
        //     screenHeight.value = e.target.innerHeight;
        //     console.log(12);
        // }
        const ctx = canvasNode.getContext("2d")
        var points = []

        /**速度*/
        var Point = function (x, y) {
            this.x = x
            this.y = y
            this.r = Math.random() * 2
            this.sx = Math.random() *0.5 -0.25
            this.sy = Math.random() * 0.5 -0.25
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

        for (var i = 0; i < 200; i++) {
            points.push(new Point(Math.random() * screenWidth.value, Math.random() * screenHeight.value))
        }

        /**粒子进行*/
        const gameloop = () => {
            window.requestAnimationFrame(gameloop)
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

        gameloop(); //进行
        // // ctx.draw();
    })
    return {
        screenWidth,
        screenHeight
    }
}
