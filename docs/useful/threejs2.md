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
        // ==========================
        render.shadowMap.enabled = true
        render.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);

        var geometry = new THREE.BoxGeometry(8, 8, 8);
        var material = new THREE.MeshLambertMaterial({ color: 0x002299 });
        var cube = new THREE.Mesh(geometry, material);
        // ==========================
        cube.castShadow = true;
        scene.add(cube);

        var planeGeometry = new THREE.PlaneGeometry(100, 100)
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // ==========================
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
        // ==========================
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
## 透视摄像机与正交投影摄像机
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
        import { dat } from './dat.gui.js'
        import { Stats } from './Stats.js'
        // console.log(window.__THREE__); // 135
        var scene = new THREE.Scene();
        /**
         *1 我们能看到的视角
         *2 长宽比
         *3 表示距离摄像机多近的位置开始渲染
         *4 表示多远就不能渲染了
         */
        // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        /**
         *1 渲染场景的左边界（边界越大，黑色的分割线越大）
         *2 渲染场景的右边界
         *3 渲染场景的上边界
         *4 渲染场景的下边界
         *5 近面距离，场景从距离相机这么近的点开始渲染
         *6 远面距离，场景从距离相机这么远的点停止渲染
         */
        var camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16,-10,1024)

        var render = new THREE.WebGLRenderer();
        render.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);


        var planeGeometry = new THREE.PlaneGeometry(100, 100)
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, -4, 0)
        scene.add(plane)

        camera.position.x = -40;
        camera.position.y = 55;
        camera.position.z = 45;
        camera.lookAt(scene.position)

        // 环境光
        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight)
        // 点光源
        var spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set(-60, 40, -65);
        // spotLight.castShadow = true;
        // spotLight.shadow.mapSize = new THREE.Vector2(1024,1024)
        // spotLight.shadow.camera.far = 130;
        // spotLight.shadow.camera.near = 40
        scene.add(spotLight)


        // 坐标系
        var axes = new THREE.AxesHelper(50)
        scene.add(axes)

        var stats = addStats()
        function addStats() {
            var stats = new Stats();
            stats.domElement.style.position = 'absolute'
            stats.domElement.style.left = '10px'
            stats.domElement.style.top = '10px'
            stats.setMode(1);

            document.getElementById("myStats").appendChild(stats.domElement);
            return stats
        }


        var ctrlObj = {
            showText: "透视投影相机",
            changeCamera() {
                if (camera instanceof THREE.OrthographicCamera) { // 透视
                    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = -30;
                    camera.position.y = 45;
                    camera.position.z = 35;
                    camera.lookAt(scene.position)
                    ctrlObj.showText = "景深投影相机"
                } else {
                    camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16)
                    camera.position.x = -30;
                    camera.position.y = 45;
                    camera.position.z = 35;
                    camera.lookAt(scene.position)
                    ctrlObj.showText = "透视投影相机"
                }
            }
        };
        var ctrl = new dat.GUI();
        ctrl.add(ctrlObj, "showText").listen() // listen方法可以监听文本变化
        ctrl.add(ctrlObj, "changeCamera")

        var geometry = new THREE.BoxGeometry(8,8,8);
        var material = new THREE.MeshLambertMaterial({color:0xbbffaa})
        var cube1 = new THREE.Mesh(geometry,material)
        cube1.position.set(0,8,0)
        scene.add(cube1)

        for (var i = 0; i < (planeGeometry.parameters.width / 5); i++) {
            for (var j = 0; j < (planeGeometry.parameters.height / 5); j++) {
                var cubeGeo = new THREE.BoxGeometry(4, 4, 4)
                var cubeMaterial = new THREE.MeshLambertMaterial();
                cubeMaterial.color = new THREE.Color(0, Math.random() * 0.5 + 0.5, 0, 0)
                var cube = new THREE.Mesh(cubeGeo, cubeMaterial);
                cube.position.x = 5 * i + 5 / 2 - (planeGeometry.parameters.width / 2)
                cube.position.y = 3
                cube.position.z = 5 * j + 5 / 2 - (planeGeometry.parameters.height / 2)

                scene.add(cube)
            }
        }

        var pos = 0;
        renderScene();
        function renderScene() {
            pos += .1
            cube1.position.x = (10*Math.sin(pos))
            camera.lookAt(cube1.position)
            stats.update()
            requestAnimationFrame(renderScene);
            render.render(scene, camera)
        }



        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth, window.innerHeight)
        }
    </script>
</body>

</html>
```

## ambientLight环境光源和spotLight聚光灯光源

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
        import { dat } from './dat.gui.js'
        import { Stats } from './Stats.js'
        // console.log(window.__THREE__); // 135
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -40;
        camera.position.y = 140;
        camera.position.z = 45;
        camera.lookAt(scene.position)

        var geometry = new THREE.BoxGeometry(8, 8, 8);
        var material = new THREE.MeshLambertMaterial({ color: 0xbbffcc });
        var cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        scene.add(cube);

        var planeGeometry = new THREE.PlaneGeometry(100, 100)
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, -4, 0)
        scene.add(plane)



        // 环境光
        // 参数一，光照颜色；参数二，光照强度。
        var ambientLight = new THREE.AmbientLight(0xffffff);
        // scene.add(ambientLight)
        // 点光源
        // 参数一，光照颜色；参数二，光照强度。
        // 参数三，光源发出光最大距离；参数四，光线散射角度。
        // 参数五，聚光锥的半影衰减百分比
        // 参数六，沿着光照距离的衰减量
        var spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize = new THREE.Vector2(1024,1024)
        spotLight.shadow.camera.far = 130;
        spotLight.shadow.camera.near = 40
        spotLight.position.set(-60, 40, -65);
        scene.add(spotLight)


        // 坐标系
        var axes = new THREE.AxesHelper(50)
        scene.add(axes)
        // 光线辅助对象
        var lightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(lightHelper)
        // 相机辅助对象
        var shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
        scene.add(shadowCameraHelper)

        var ctrlObj = {
            // AmbientLight
            ambientIntensity:1, // 光照强度
            ambientLightColor:0xffffff, // 光照颜色
            // SpotLight
            spotLightIntensity:1,
            spotLightColor:0xcccccc,
            spotLightDistance:0,
            spotLightAngle:Math.PI / 3,
            spotPenumbra:0,
            spotDecay:0
        };
        var ctrl = new dat.GUI();
        // 为了区分，辅助对象设置分组方法
        var ambientLightFolder = ctrl.addFolder("ambientLight");
        // 将保存属性的对象添加到辅助对象ctrl中
        ambientLightFolder.add(ctrlObj,"ambientIntensity",0,5) // 设置范围，0, - 5
        // 会在控制菜单模块添加一个选项，在这个选项中能够直接传入颜色变量，然后通过onChange方法告诉控制菜单当每次改变颜色时执行传入的回调函数
        ambientLightFolder.addColor(ctrlObj,"ambientLightColor").onChange((crl)=>{
            ambientLight.color = new THREE.Color(crl)
        })
        var spotLightFolder = ctrl.addFolder("spotLight");
        spotLightFolder.add(ctrlObj,"spotLightIntensity",0,5);
        spotLightFolder.addColor(ctrlObj,"spotLightColor").onChange(crl=>{
            spotLight.color = new THREE.Color(crl)
        })
        spotLightFolder.add(ctrlObj,"spotLightDistance",0,1000).onChange(distance=>{
            spotLight.distance = distance
        })
        spotLightFolder.add(ctrlObj,"spotLightAngle",0,2*Math.PI).onChange(angle=>{
            spotLight.angle = angle
        })
        spotLightFolder.add(ctrlObj,"spotPenumbra",0,1).onChange(penumbra=>{
            spotLight.penumbra = penumbra
        })
        spotLightFolder.add(ctrlObj,"spotDecay",0,5).onChange(decay=>{
            spotLight.decay = decay
        })

        var render = new THREE.WebGLRenderer();
        render.shadowMap.enabled = true
        render.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);

        renderScene();
        function renderScene() {
            ambientLight.intensity = ctrlObj.ambientIntensity
            spotLight.intensity = ctrlObj.spotLightIntensity

            lightHelper.update()
            shadowCameraHelper.update()

            requestAnimationFrame(renderScene);
            render.render(scene, camera)
        }

        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth, window.innerHeight)
        }
    </script>
</body>

</html>
```

## PointLight点光源和DirectionalLight平行光源

点光源不能产生阴影。

轨道控制对象

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
        import { dat } from './dat.gui.js'
        import { Stats } from './Stats.js'
        import {GLTFLoader} from './GLTFLoader.js'
        import {OrbitControls} from './OrbitControls.js'
        // console.log(window.__THREE__); // 135
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -40;
        camera.position.y = 40;
        camera.position.z = 45;
        camera.lookAt(scene.position)


        var planeGeometry = new THREE.PlaneGeometry(100, 100)
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, 0, 0)
        scene.add(plane)

        // 环境光
        // 参数一，光照颜色；参数二，光照强度。
        // var ambientLight = new THREE.AmbientLight(0xffffff);
        // scene.add(ambientLight)
        // 点光源
        // 光照颜色，光照强度，光源到光照强度为0的位置，沿着光照距离的衰退量
        // const pointLight = new THREE.PointLight(0xffffff,3,160)
        // pointLight.position.set(0,0,9)
        // scene.add(pointLight)
        // 平行光
        const directionalLight = new THREE.DirectionalLight(0xffffff,4)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        directionalLight.position.set(20,20,20)
        
        scene.add(directionalLight)

        const helper = new THREE.DirectionalLightHelper(directionalLight)
        scene.add(helper)

        // 相机辅助对象
        var shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
        scene.add(shadowCameraHelper)

        var geometry = new THREE.BoxGeometry(1,1,1);
        var material = new THREE.MeshLambertMaterial({color:0xfa424242})
        var cube = new THREE.Mesh(geometry,material)
        cube.castShadow = true;
        cube.position.set(-20,2,0)
        directionalLight.target = cube
        scene.add(cube)

        // 在点光源的位置上放一个小球
        // var sphereGeo = new THREE.SphereGeometry(0.3)
        // var sphereMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
        // var sphereMesh = new THREE.Mesh(sphereGeo,sphereMaterial);
        // sphereMesh.castShadow = true;
        // sphereMesh.position.copy(pointLight.position);
        // // sphereMesh.position.set(0,0,5)
        // scene.add(sphereMesh)

        // 坐标系
        var axes = new THREE.AxesHelper(50)
        scene.add(axes)

        var ctrlObj = {
          
        };
        var ctrl = new dat.GUI();

        var render = new THREE.WebGLRenderer();
        render.shadowMap.enabled = true
        render.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);

        // 轨道控制器对象
        var controls = new OrbitControls(camera,render.domElement)
        controls.update();

        loadModel()
        function loadModel(){
            new GLTFLoader().setPath("model/").
            load("untitled.glb",function(gltf){
                gltf.scene.scale.set(0.02,0.02,0.02);
                gltf.scene.traverse(obj=>{
                    if(obj.isMesh){
                        obj.castShadow = true;
                    }
                })
                scene.add(gltf.scene)
            })
        }

        renderScene();
        function renderScene() {
            controls.update();
            requestAnimationFrame(renderScene);
            render.render(scene, camera)
        }

        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth, window.innerHeight)
        }
    </script>
</body>

</html>
```
## HemisphereLight半球光光源
可以为室外场景创建更加自然的光照

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
        import { dat } from './dat.gui.js'
        import { Stats } from './Stats.js'
        import {GLTFLoader} from './GLTFLoader.js'
        import {OrbitControls} from './OrbitControls.js'
        // console.log(window.__THREE__); // 135
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -40;
        camera.position.y = 40;
        camera.position.z = 45;
        camera.lookAt(scene.position)


        var planeGeometry = new THREE.PlaneGeometry(100, 100)
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, 0, 0)
        scene.add(plane)

        // 环境光
        // 参数一，光照颜色；参数二，光照强度。
        // var ambientLight = new THREE.AmbientLight(0xffffff);
        // scene.add(ambientLight)
        // 点光源
        // 光照颜色，光照强度，光源到光照强度为0的位置，沿着光照距离的衰退量
        // const pointLight = new THREE.PointLight(0xffffff,3,160)
        // pointLight.position.set(0,0,9)
        // scene.add(pointLight)
        // 平行光
        const directionalLight = new THREE.DirectionalLight(0xffffff,2)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        directionalLight.position.set(20,20,20)
        scene.add(directionalLight)
        // 平行光辅助对象
        const helper = new THREE.DirectionalLightHelper(directionalLight)
        scene.add(helper)
        // 相机辅助对象
        var shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
        scene.add(shadowCameraHelper)

        // 1,天空中发出光线的颜色，默认值白色
        // 2，地面发出光线的颜色，默认值白色
        // 3,光照强度
        const hemisphereLight = new THREE.HemisphereLight(0xffffff)
        scene.add(hemisphereLight)

        var geometry = new THREE.BoxGeometry(1,1,1);
        var material = new THREE.MeshLambertMaterial({color:0xfa424242})
        var cube = new THREE.Mesh(geometry,material)
        cube.castShadow = true;
        cube.position.set(-20,2,0)
        // directionalLight.target = cube
        scene.add(cube)

        // 在点光源的位置上放一个小球
        // var sphereGeo = new THREE.SphereGeometry(0.3)
        // var sphereMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
        // var sphereMesh = new THREE.Mesh(sphereGeo,sphereMaterial);
        // sphereMesh.castShadow = true;
        // sphereMesh.position.copy(pointLight.position);
        // // sphereMesh.position.set(0,0,5)
        // scene.add(sphereMesh)

        // 坐标系
        var axes = new THREE.AxesHelper(50)
        scene.add(axes)

        var ctrlObj = {
            hemisphereLightVisible:true,
            skyColor:0xffffff, // 改变此颜色，模型和阴影的颜色都发生了改变
            groundColor:0x00ff00,
            hemisphereIntensity:1
        };
        var ctrl = new dat.GUI();
        var hemisphereLightFolder = ctrl.addFolder("hemisphereLight")
        hemisphereLightFolder.add(ctrlObj,"hemisphereLightVisible").onChange(e=>{
            hemisphereLight.visible = e
        })
        hemisphereLightFolder.addColor(ctrlObj,"skyColor").onChange(e=>{
            hemisphereLight.color = new THREE.Color(e)
        })
        hemisphereLightFolder.addColor(ctrlObj,"groundColor").onChange(e=>{
            hemisphereLight.groundColor = new THREE.Color(e)
        })
        hemisphereLightFolder.add(ctrlObj,"hemisphereIntensity",0,10).onChange(e=>{
            hemisphereLight.intensity = e
        })

        var render = new THREE.WebGLRenderer();
        render.shadowMap.enabled = true
        render.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);

        // 轨道控制器对象
        var controls = new OrbitControls(camera,render.domElement)
        controls.update();

        loadModel()
        function loadModel(){
            new GLTFLoader().setPath("model/").
            load("untitled.glb",function(gltf){
                gltf.scene.scale.set(0.02,0.02,0.02);
                gltf.scene.traverse(obj=>{
                    if(obj.isMesh){
                        obj.castShadow = true;
                    }
                })
                scene.add(gltf.scene)
            })
        }

        renderScene();
        function renderScene() {
            controls.update();
            requestAnimationFrame(renderScene);
            render.render(scene, camera)
        }

        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth, window.innerHeight)
        }
    </script>
</body>

</html>
```

## 平面光光源
从一个矩形平面上均匀地发射光线，这种光源的主要应用场景是模拟明亮的窗户或者条状灯光光源，实际在开发家具建模项目中会有广泛应用。

注意事项：

不支持阴影，只支持MeshStandardMaterial和MeshPhysicalMaterial两种材质。

必须在场景中加入RectAreaLightUniformsLib,并调用init（）

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
        import { dat } from './dat.gui.js'
        import { Stats } from './Stats.js'
        import {GLTFLoader} from './GLTFLoader.js'
        import {OrbitControls} from './OrbitControls.js'
        import {RectAreaLightUniformsLib} from './RectAreaLightUniformsLib.js'
        import {RectAreaLightHelper} from './RectAreaLightHelper.js'
        // console.log(window.__THREE__); // 135
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -40;
        camera.position.y = 40;
        camera.position.z = 45;
        camera.lookAt(scene.position)


        var planeGeometry = new THREE.PlaneGeometry(100, 100)
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, 0, 0)
        scene.add(plane)

        // 平面光
        RectAreaLightUniformsLib.init();
        // 颜色，亮度，宽度，高度
        const rectLight = new THREE.RectAreaLight(0xff0000,5,4,10)
        rectLight.position.set(0,0,0)
        scene.add(rectLight)

        // 平面光辅助对象
        var rectAreaLightHelper = new RectAreaLightHelper(rectLight)
        scene.add(rectAreaLightHelper)

        // 接收平面光的地面
        const geoFloor = new THREE.BoxGeometry(2000,0.1,2000)
        const matStdFloor = new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.2,metal:0})
        const mshStdFloor = new THREE.Mesh(geoFloor,matStdFloor)
        scene.add(mshStdFloor)

        // 坐标系
        var axes = new THREE.AxesHelper(50)
        scene.add(axes)

        var ctrlObj = {
            areaColor:0xff0000,
            areaIntensity:1
        };
        var ctrl = new dat.GUI();
        var areaLightFolder = ctrl.addFolder("AreaLight");
        areaLightFolder.addColor(ctrlObj,"areaColor").onChange(e=>{
            rectLight.color = new THREE.Color(e);
        })
        areaLightFolder.add(ctrlObj,"areaIntensity",0,10).onChange(e=>{
            rectLight.intensity = e
        })

        var render = new THREE.WebGLRenderer();
        render.shadowMap.enabled = true
        render.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);

        // 轨道控制器对象
        var controls = new OrbitControls(camera,render.domElement)
        controls.update();

        renderScene();
        function renderScene() {
            controls.update();
            requestAnimationFrame(renderScene);
            render.render(scene, camera)
        }

        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth, window.innerHeight)
        }
    </script>
</body>

</html>
```

## 镜头光晕
Lensflare镜头光晕并不是一种光源

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
        import { dat } from './dat.gui.js'
        import { Stats } from './Stats.js'
        import {GLTFLoader} from './GLTFLoader.js'
        import {OrbitControls} from './OrbitControls.js'
        import {Lensflare,LensflareElement} from './Lensflare.js'
        // console.log(window.__THREE__); // 135
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -40;
        camera.position.y = 40;
        camera.position.z = 45;
        camera.lookAt(scene.position)

        var planeGeometry = new THREE.PlaneGeometry(100, 100)
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, 0, 0)
        scene.add(plane)

        // 半球体光源
        // 1,天空中发出光线的颜色，默认值白色
        // 2，地面发出光线的颜色，默认值白色
        // 3,光照强度
        const hemisphereLight = new THREE.HemisphereLight(0xffffff)
        hemisphereLight.position.set(20,20,20)
        scene.add(hemisphereLight)

        // 加载贴图
        const textureLoader = new THREE.TextureLoader();
        const textureFlare0 = textureLoader.load("textures/lensflare0.png")
        const textureFlare1 = textureLoader.load("textures/lensflare1.png")

        // 创建一个镜头光晕对象
        const lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureFlare0,500,0))
        lensflare.addElement(new LensflareElement(textureFlare1,60,0.1))
        var lensflareEl
        lensflare.addElement(lensflareEl = new LensflareElement(textureFlare1,30,0.2))
        hemisphereLight.add(lensflare)

        // 坐标系
        var axes = new THREE.AxesHelper(50)
        scene.add(axes)

        var ctrlObj = {
            hemisphereLightVisible:true,
            skyColor:0xffffff, // 改变此颜色，模型和阴影的颜色都发生了改变
            groundColor:0x00ff00,
            hemisphereIntensity:1,
            // 光晕尺寸
            lensflareSize:30,
            lensflareDistance:0,
            lensflareColor:0xffffff
        };
        var ctrl = new dat.GUI();
        var hemisphereLightFolder = ctrl.addFolder("hemisphereLight")
        hemisphereLightFolder.add(ctrlObj,"hemisphereLightVisible").onChange(e=>{
            hemisphereLight.visible = e
        })
        hemisphereLightFolder.addColor(ctrlObj,"skyColor").onChange(e=>{
            hemisphereLight.color = new THREE.Color(e)
        })
        hemisphereLightFolder.addColor(ctrlObj,"groundColor").onChange(e=>{
            hemisphereLight.groundColor = new THREE.Color(e)
        })
        hemisphereLightFolder.add(ctrlObj,"hemisphereIntensity",0,10).onChange(e=>{
            hemisphereLight.intensity = e
        })
        var lensflareFolder = ctrl.addFolder("lensflare")
        lensflareFolder.add(ctrlObj,"lensflareSize",0,100).onChange(e=>{
            lensflareEl.size = e
        })
        lensflareFolder.add(ctrlObj,"lensflareDistance",0,1).onChange(e=>{
            lensflareEl.distance = e
        })
        lensflareFolder.addColor(ctrlObj,"lensflareColor").onChange(e=>{
            lensflareEl.color = new THREE.Color(e)
        })

        var render = new THREE.WebGLRenderer();
        render.shadowMap.enabled = true
        render.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("body").appendChild(render.domElement);

        // 轨道控制器对象
        var controls = new OrbitControls(camera,render.domElement)
        controls.update();

        loadModel()
        function loadModel(){
            new GLTFLoader().setPath("model/").
            load("untitled.glb",function(gltf){
                gltf.scene.scale.set(0.02,0.02,0.02);
                gltf.scene.traverse(obj=>{
                    if(obj.isMesh){
                        obj.castShadow = true;
                    }
                })
                scene.add(gltf.scene)
            })
        }

        renderScene();
        function renderScene() {
            controls.update();
            requestAnimationFrame(renderScene);
            render.render(scene, camera)
        }

        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth, window.innerHeight)
        }
    </script>
</body>

</html>
```

## 内置平面几何体
```js
        var planeGeometry = new THREE.PlaneGeometry(10, 10);
        var planeMaterial = new THREE.MeshLambertMaterial({ color:0xff0000 });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMaterial.side = THREE.DoubleSide
        scene.add(plane)
```

## 内置常见普通几何体
略
## 凸面几何体和车削几何体
略
## 管道几何体
略
## 拉伸几何体
略
## Parametric Geometry参数化缓冲几何体
略
## TextGeometry文本缓冲几何体
略
## 材质常用基础属性


