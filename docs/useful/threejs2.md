# threejs2

## 查看版本

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<script src="./three.js"></script>
	</head>
	<body>
		<script>
			console.log(window.__THREE__);
		</script>
	</body>
</html>
```
## 渲染第一个threejs三维对象
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./three.js"></script>
</head>
<body>
    <script>
        // console.log(window.__THREE__); // 135
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

        var render = new THREE.WebGLRenderer();
        render.setSize(window.innerWidth,window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);

        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({color:0x002299});
        var cube = new THREE.Mesh(geometry,material);
        scene.add(cube);

        camera.position.z = 5;
        cube.rotation.x += .8
        cube.rotation.y += .8

        render.render(scene,camera)
    </script>
</body>
</html>
```
## 坐标轴、光源、阴影效果
坐标轴
```js
var axes = new THREE.AxesHelper(50)
scene.add(axes)

// 调整视角
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;
// 相机对准场景中心
camera.lookAt(scene.position)
```
光源

基础材质对各种光源是没有作用的。基础材质不需要光源就能显示，而非基础材质（lambert）则需要光源才能显示。

要设置接受阴影、产生阴影等。（可是不知道阴影为啥还是没出现`plane.receiveShadow = true;`原来是receive写错了）
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./three.js"></script>
</head>

<body>
    <script>
        // console.log(window.__THREE__); // 135
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var render = new THREE.WebGLRenderer();
        render.shadowMap.enabled = true
        render.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);

        var geometry = new THREE.BoxGeometry(8, 8, 8);
        var material = new THREE.MeshLambertMaterial({ color: 0x002299 });
        var cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        scene.add(cube);

        var planeGeometry = new THREE.PlaneGeometry(100, 100)
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, -4,0)
        scene.add(plane)

        camera.position.x = -30;
        camera.position.y = 45;
        camera.position.z = 35;
        camera.lookAt(scene.position)

        // 环境光
        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight)
        // 点光源
        var spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set(-60,40,-65);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize = new THREE.Vector2(1024,1024)
        spotLight.shadow.camera.far = 130;
        spotLight.shadow.camera.near = 40
        scene.add(spotLight)


        // 坐标系
        var axes = new THREE.AxesHelper(50)
        scene.add(axes)

        render.render(scene, camera)
    </script>
</body>

</html>
```

## stats库检测动画运行帧数
路径

```shell
C:\Users\LuKecheng\Desktop\three.js-r135\examples\js\libs\stats.min.js
```

## dat.gui库，方便测试动画
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./default.css">
    <script src="./three.js"></script>
    <!-- stats库，检测动画运行帧数 -->
    <!-- <script src="./stats.min.js"></script> -->
    
</head>

<body>
    <div id="myStats"></div>
    <script type="module">
        import {dat} from './dat.gui.js'
        import {Stats} from './Stats.js'
        // console.log(window.__THREE__); // 135
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var render = new THREE.WebGLRenderer();
        render.shadowMap.enabled = true
        render.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);

        var geometry = new THREE.BoxGeometry(8, 8, 8);
        var material = new THREE.MeshLambertMaterial({ color: 0x002299 });
        var cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        scene.add(cube);

        var planeGeometry = new THREE.PlaneGeometry(100, 100)
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, -4,0)
        scene.add(plane)

        camera.position.x = -30;
        camera.position.y = 45;
        camera.position.z = 35;
        camera.lookAt(scene.position)

        // 环境光
        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight)
        // 点光源
        var spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set(-60,40,-65);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize = new THREE.Vector2(1024,1024)
        spotLight.shadow.camera.far = 130;
        spotLight.shadow.camera.near = 40
        scene.add(spotLight)


        // 坐标系
        var axes = new THREE.AxesHelper(50)
        scene.add(axes)


        var stats = addStats()

        var ctrlObj = {rotationSpeed:0.01,jumpSpeed:0.01};
        var ctrl = new dat.GUI();
        ctrl.add(ctrlObj,"rotationSpeed",0,1)
        ctrl.add(ctrlObj,"jumpSpeed",0,1);

        var gap = 0;
        renderScene();
        function renderScene(){
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            // cube.rotation.z += 0.01;

            cube.rotation.x += ctrlObj.rotationSpeed;
            cube.rotation.y += ctrlObj.rotationSpeed;
            cube.rotation.z += ctrlObj.rotationSpeed;
            
            // gap += 0.01
            gap += ctrlObj.jumpSpeed
            cube.position.x = 25 + (20*(Math.sin(gap)))
            cube.position.y = 6 + (20*Math.abs(Math.cos(gap)))

            stats.update()
            requestAnimationFrame(renderScene);
            render.render(scene, camera)
        }

        function addStats(){
            var stats = new Stats();
            stats.domElement.style.position = 'absolute'
            stats.domElement.style.left = '10px'
            stats.domElement.style.top = '10px'
            stats.setMode(1);

            document.getElementById("myStats").appendChild(stats.domElement);
            return stats
        }

        window.addEventListener('resize',onWindowResize,false);

        function onWindowResize(){
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth,window.innerHeight)
        }
    </script>
</body>

</html>
```

## threejs场景的基本方法和属性

```shell
#
scene.children.length 可以获取场景中的所有对象

#
根据name获取指定对象

cube.name = "cube"

var obj = scene.getObjectByName("cube",boolean) // 为true表示深度查找

#
scene.remove(obj) // 删除场景中的某个对象

# 
对场景中的每个对象执行一个回调方法
scene.traverse((obj)=>{

})

# 雾属性
scene.fog = new Fog(0xff0000,0.03,100);
or
scene.fog = new FogExp2(0x0000ff,0.02)

# overrideMaterial属性
可以强制场景中的物体使用相同的属性

```

## threejs的几何体和网格
圆环几何体
```js
var torusgeo = new TorusGeometry();
var torusmaterial = new MeshLambertMaterial({color:0xff2288});
var torus = new Mesh(torusgeo,torusmaterial);
torus.castShadow = true;
```
自定义几何体
```js
var geometry = new BufferGeometry();
var vertices = new Float32Array([
    // 第一个面
    0,0,0,
    10,0,0,
    0,10,0,
    // ...

])
var attribute = new BufferAttribute(vertices)
geometry.attributes.position = attribute
var material = new MeshBasicMaterial({
    color:0x0000ff,
    side:DoubleSide
})
var mesh = new Mesh(geometry,material)
scene.add(mesh);

var wireFrame = new WireframeGeometry(geometry)
var line = new LineSegments(wireFrame);
line.material.depthTest = true;
line.material.transparent = false;
line.material.opacity = 0.5;
scene.add(line)
```

visible属性设置是否可见