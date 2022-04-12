# threejs
郭龙绑老师

- 学习webgl[http://www.yanhuangxueyuan.com/WebGL/]
- 92版下载地址[https://github.com/mrdoob/three.js/archive/refs/tags/r92.zip]
## 第一个案例
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>第一个three.js文件_WebGL三维场景</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      /* 隐藏body窗口区域滚动条 */
    }
  </style>
  <!--引入three.js三维引擎-->
  <script src="https://cdn.bootcdn.net/ajax/libs/three.js/r92/three.js"></script>
</head>

<body>
  <script>
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    var material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
  </script>
</body>
</html>
```
程序结构
<img src="https://static01.imgkr.com/temp/dd5b28376b254dbe87e7ccb8745cfd0a.png" />

## 案例旋转
```js
    function render() {
        mesh.rotateY(0.01)
        renderer.render(scene, camera);
        requestAnimationFrame(render)
    }
    render()
```
## 鼠标操作三维场景
引入`\examples\js\controls\OrbitControls.js`

多加一行代码

`var controls = new THREE.OrbitControls(camera, renderer.domElement);//创建控件对象`

## 辅助三维坐标系AxisHelper
```js
        // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
        var axisHelper = new THREE.AxisHelper(250);
        scene.add(axisHelper);
```

## 添加一个球几何体
球就像是一个正多边形，边越多，越接近球。
```js
SphereGeometry(radius, widthSegments, heightSegments)
```
更多几何体[http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/geometries/CylinderGeometry]
```js
//长方体 参数：长，宽，高
var geometry = new THREE.BoxGeometry(100, 100, 100);
// 球体 参数：半径60  经纬度细分数40,40
var geometry = new THREE.SphereGeometry(60, 40, 40);
// 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
var geometry = new THREE.CylinderGeometry( 50, 50, 100, 25 );
// 正八面体
var geometry = new THREE.OctahedronGeometry(50);
// 正十二面体
var geometry = new THREE.DodecahedronGeometry(50);
// 正二十面体
var geometry = new THREE.IcosahedronGeometry(50);
```
同时绘制多个几何体
```js
// 立方体网格模型
var geometry1 = new THREE.BoxGeometry(100, 100, 100);
var material1 = new THREE.MeshLambertMaterial({
  color: 0x0000ff
}); //材质对象Material
var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
scene.add(mesh1); //网格模型添加到场景中

// 球体网格模型
var geometry2 = new THREE.SphereGeometry(60, 40, 40);
var material2 = new THREE.MeshLambertMaterial({
  color: 0xff00ff
});
var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
mesh2.translateY(120); //球体网格模型沿Y轴正方向平移120
scene.add(mesh2);

// 圆柱网格模型
var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
var material3 = new THREE.MeshLambertMaterial({
  color: 0xffff00
});
var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
// mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
mesh3.position.set(120,0,0);//设置mesh3模型对象的xyz坐标为120,0,0
scene.add(mesh3); //
```

## 材质半透明效果
```js
        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff,
            opacity: 0.7,
            transparent: true
        }); //材质对象Material

        // material.opacity = 0.5 ;
        // material.transparent = true ;
```

## 高亮效果材质
```js
var sphereMaterial=new THREE.MeshPhongMaterial({
    color:0x0000ff,
    specular:0x4488ee,
    shininess:12
});//材质对象
```

漫反射、镜面反射分别对应两个构造函数MeshLambertMaterial()、MeshPhongMaterial();

实现漫反射材质、镜面反射材质

```shell
MeshStandardMaterial	PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果
```

## 光源

环境光创建
```js
//环境光    环境光颜色与网格模型的颜色进行RGB进行乘法运算
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
```
点光源创建
```js
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
// 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
scene.add(point); //点光源添加到场景中
```
## 材质对象
共有属性`.side属性``.opacity`
## 模型对象旋转平移缩放变换
缩放
```js
mesh.scale.set(0.5, 1.5, 2)

mesh.scale.x = 2.0;
```
`.position`
```js
mesh.position.y = 80;

mesh.position.set(80,2,10);
```
平移
```js
// 等价于mesh.position = mesh.position + 100;
mesh.translateX(100);//沿着x轴正方向平移距离100

mesh.translateZ(-50);

// 沿着自定义的方向移动。
//向量Vector3对象表示方向
var axis = new THREE.Vector3(1, 1, 1);
axis.normalize(); //向量归一化
//沿着axis轴表示方向平移100
mesh.translateOnAxis(axis, 100);
```
执行.translateX()、.translateY()、.translateOnAxis()等方法本质上改变的都是模型的位置属性.position。

旋转
```js
mesh.rotateX(Math.PI/4);//绕x轴旋转π/4

var axis = new THREE.Vector3(0,1,0);//向量axis
mesh.rotateOnAxis(axis,Math.PI/8);//绕axis轴旋转π/8

// 绕着Y轴旋转90度
mesh.rotateY(Math.PI / 2);
//控制台查看：旋转方法，改变了rotation属性
console.log(mesh.rotation);
```

## 阴影投影计算

## 创建纹理贴图
```js
// 纹理贴图映射到一个矩形平面上
var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
// TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
var textureLoader = new THREE.TextureLoader();
// 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
textureLoader.load('earth.jpg', function(texture) {
  var material = new THREE.MeshLambertMaterial({
    // color: 0x0000ff,
    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//设置颜色贴图属性值
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中

  //纹理贴图加载成功后，调用渲染函数执行渲染操作
  // render();
})
```