# 贪吃蛇

## index.html结构
index.html
```html
    <div id="box">
        <!-- 蛇移动的区域 -->
        <div id="moveArea">
            <!-- 蛇的外壳 -->
            <div id="snake-body">
                <div></div>
            </div>
            <!-- 食物 -->
            <div id="food"></div>
        </div>
        <!-- 分数,等级 -->
        <div id="panel">
            <div class="left">
                分数:3
            </div>
            <div class="right">
                等级:4
            </div>
        </div>
    </div>
```

## index.less样式
```css
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
#box{
    width: 360px;
    height: 420px;
    margin: 100px auto;
    padding: 10px;
    border: 10px solid #000;
    background-color:#b7d4a8;
    position: relative;
    #moveArea{
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        border:solid 3px #000;
        width: 305px;
        height: 305px;
        #snake-body{
            &>div{
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #000;
                border: 1px solid #b7d4a8;
            }
        }
    }

    #food{
        position: absolute;
        width: 10px;
        height: 10px;
        background: cyan;
        border: 1px solid #b7d4a8;
    }

    #panel{
        display: flex;
        position: absolute;
        bottom: 0;
        width: 100%;
        justify-content: space-around;
        .left{

        }
        .right{

        }
    }
}
```
## Food.ts食物类
```ts
// 定义食物类
class Food{
    // 定义一个属性标识食物对应的元素
    element:HTMLElement;
    constructor(){
        this.element = document.getElementById("food")!
    }
    // 定义一个获取事物X轴坐标方法
    get X(){
        return this.element.offsetLeft
    }
    // 定义一个获取食物Y轴坐标方法
    get Y(){
        return this.element.offsetTop
    }
    changeLocation(){
        let x = Math.round(Math.random()*29)*10;
        let y = Math.round(Math.random()*29)*10;

        this.element.style.left = x + 'px'
        this.element.style.top = y + 'px'
    }
}

export default Food
```
## GameControl.ts游戏控制类
```ts
// 引入其他类
import Food from "./Food";
import Panel from "./Panel";
import Snake from "./Snake";

// 游戏控制类
class GameControl {
    food: Food;
    panel: Panel;
    snake: Snake;
    // direction属性,记录蛇的方向
    direction: String = ''
    // 创建一个属性判断游戏是否结束
    isLive: Boolean = true
    constructor() {
        this.food = new Food()
        this.panel = new Panel()
        this.snake = new Snake()
        // 调用游戏的初始化方法,代表游戏执行
        this.init()
    }
    init() {
        // 绑定键盘事件
        document.addEventListener("keydown", this.changeDirection.bind(this))
        //
        this.run()
    }
    /**
     * 
     * ArrowDown
     * ArrowUp
     * ArrowLeft
     * ArrowRight
     */
    changeDirection(event: KeyboardEvent) {
        this.direction = event.key
    }
    // 定义一个方法,用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物重置
            this.food.changeLocation()
            // 分数增加
            this.panel.addScore();
            // 蛇要增加一节
            this.snake.addBody()
        }

    }
    // 控制蛇移动的方法
    run() {
        let X = this.snake.X
        let Y = this.snake.Y
        switch (this.direction) {
            case "ArrowUp":
                Y -= 10
                break;
            case "ArrowDown":
                Y += 10
                break;
            case "ArrowLeft":
                X -= 10
                break;
            case "ArrowRight":
                X += 10
                break;
        }

        // 检查蛇是否吃到了食物
        this.checkEat(X, Y)

        // 修改蛇的x,y
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (error: any) {
            alert(error.message)
            // 将游戏设置为结束
            this.isLive = false
        }

        // 开启一个定时器,让蛇自动跑起来
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.panel.level - 1) * 30)
    }
}

export default GameControl
```
## Panel.ts仪表盘类
```ts
// 分数，等级类
class Panel{
    score = 0;
    level = 1;
    scoreEle:HTMLElement;
    levelEle:HTMLElement;
    // 定义一个变量，动态设置等级限制
    maxLevel:number;
    // 定义一个变量，几分升级一个变量
    upScore:number;
    constructor(maxLevel:number=10,upScore:number=2){
        this.scoreEle=document.querySelector('.left')!;
        this.levelEle = document.querySelector('.right')!;
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    // 加分的方法
    addScore(){
        this.scoreEle.innerHTML = ++this.score+""
        // 判断分数是多少，每2分升一等级
        if(this.score%2===0){
            this.levelUp()
        }
    }
    // 提升等级的方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level+''
        }
    }
}

export default Panel
```
## Snake.ts蛇类
```ts
class Snake {
    // 表示蛇头的元素
    head: HTMLElement;
    // 表示蛇的身体(多个div)
    bodies: HTMLCollection;
    // 表示蛇的壳
    wrap: HTMLElement;
    constructor() {
        this.wrap = document.querySelector("#snake-body") as HTMLElement
        this.head = document.querySelector("#snake-body > div") as HTMLElement
        this.bodies = this.wrap.getElementsByTagName('div') as HTMLCollection
    }

    // 获取蛇的坐标（蛇头坐标）
    get X() {
        return this.head.offsetLeft;
    }
    // 获取蛇的Y轴坐标
    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇头的坐标
    set X(value: number) {
        // 如果新值与旧值相同,则直接返回不修改
        if (this.X === value) {
            return
        }
        // X的值的合法值范围是0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明撞墙了
            throw new Error('蛇撞墙了')
        }
        // 修改x时,是在修改水平坐标;蛇在向右移动时,不能直接向左移动,反亦然
        // 如果想要修改的left值与第二个身体left值相同,则不允许掉头
        // 在这里,为什么不需要修改蛇头方向?
        // 其实蛇头方向已经改变了,传过来的value值也改变了
        // 但是我们在这做了处理,让value=向右走的值
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            let body0 = this.bodies[0] as HTMLElement
            // 往右方向,蛇头想要到达第二个身体部分
            if (value < this.X) {
                value = this.X + 10
            } else {
                // 往左方向,蛇头想要到达第二个身体部分
                value = this.X - 10
            }
        }
        // 先移动身体,防止身体和头分离
        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHeadBody()
    }
    set Y(value: number) {
        if (this.Y === value) {
            return
        }
        // X的值的合法值范围是0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明撞墙了
            throw new Error('蛇撞墙了')
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            let body0 = this.bodies[0] as HTMLElement
            // 往右方向,蛇头想要到达第二个身体部分
            if (value < this.Y) {
                value = this.Y + 10
            } else {
                // 往左方向,蛇头想要到达第二个身体部分
                value = this.Y - 10
            }
        }
        // 先移动身体,防止身体和头分离
        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }

    // 蛇增加自身长度的方法
    addBody() {
        // 向element中添加一个div
        this.wrap.insertAdjacentHTML('beforeend',
        
        
        
        '<div></div>')
    }
    // 蛇身体移动的方法
    moveBody() {
        // 将倒数第一个身体移动到倒数第二个(蛇头不用移动)
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 倒数第二个身体
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 移动倒数第一个身体
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 检查头与身体是否撞到了一起
    checkHeadBody(){
        for(let i =1;i<this.bodies.length;i++){
            let bd=this.bodies[i] as HTMLElement
            if(this.X===bd.offsetLeft && this.Y === bd.offsetTop){
                // 进入判断说明蛇头撞到了身体,游戏结束
                throw new Error('撞到自己了!');
            }
        }
    }
}

export default Snake
```