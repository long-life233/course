# 我的html，css，和js

## css部分 ↓
 
## pointer-events
结构
```html
    <div id="box1">
        <div id="box2">
            <div id="box3">
            </div>
        </div>
    </div>
```
css样式(并附带结论)
```css
    <style>
        /* pointer-events */
        /* 
            none，当设置none属性时，为box1添加的鼠标事件会失效。
                    并且其子元素的鼠标事件也会失效。
            auto，（默认值）
            inherit  （继承父元素的属性值）
        */
        div{
            position: absolute;
        }
        /* 最外面的盒子 */
        #box1{
            width: 500px;
            height: 500px;
            background-color: red;
            /* 
            当设置none属性时，为box1添加的鼠标事件会失效。
            并且其子元素的鼠标事件也会失效。
            */
            /* pointer-events: none; */
        }
        #box2{
            width: 400px;
            height: 400px;
            background-color:green;
        }
        #box3{
            width: 300px;
            height: 300px;
            background-color: blue;
            pointer-events: none;
        }
    </style>
```
js事件
```js
    <script>
        box1.onclick=()=>{
            alert("box1触发alert事件")
        }
        box2.onclick=()=>{
            alert("box2触发alert事件")
        }
        box3.onclick=()=>{
            alert("box3触发alert事件")
        }
    </script> 
```

## object-fit

样式
```css
    <style>
        div{
            width: 500px;
            height: 500px;
        }
        img{
            width: 500px;
            height: 500px;
            /* 
            object-fit，object-position 属性
                mdn解释：
                    object-fit CSS 属性指定可替换元素（img，video等元素）的内容应该如何适应到其使用的高度和宽度确定的框。
                    您可以通过使用 object-position 属性来切换被替换元素的内容对象在元素框内的对齐方式。
                
                按我的话来说，就是img，video等这类元素，其实本身就分为两部分，一部分是外面的边框，一部分是里面的内容。
                
                    object-fit可以设置里面内容的长宽是contain，cover，fill，none，还是scale-down。
                    object-position可以设置里面内容的相对外面边框的位置。
            */
            object-fit: contain;
            object-position:left;
            background-color:blue;
        }
    </style>
```
html
```html
    <div id="box1">
        <img src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg" alt="">
    </div>
```

## 骨架屏
<script setup>
import Skelttion from '/@theme/components/vue/Skelttion.vue'
</script>

<Skelttion />
```html
    <style>
        div{
            width: 100px; 
            height: 100px;
            border: 2px solid #000;
            /* 
            背景大小、
            背景是否重复、
            背景原点（左上角）位置(content-box,border-box,padding-box)、
            背景渐变、
            */
            background-size: 400% 100%;
            background-repeat: no-repeat;
            background-origin: padding-box;		
            background-image:linear-gradient(90deg, #ff0000 25%, #41d16a 37%, #ff0000 63%);;
            animation: 1.4s infinite ease skelttion; 
        }

        @keyframes skelttion {
            0% {
                background-position: 100% 50%;
            }

            100% {
                background-position: 0 50%;
            }
        }
    </style>
</head>
<body>
    <div></div>
</body>
```

## 设置字体
```css
font-family:sans-serif;
```

## 获取图片主色调

https://blog.csdn.net/qq_28918357/article/details/116493371


