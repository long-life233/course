# 面向对象编程（下）

## static关键字

可以直接用类访问

## 单例设计模式
我觉得最大的作用，就是限定只能有一个对象。(存在内存中，减少内存消耗)


- 设计模式是在大量的实践中总结和理论化之后优选的代码结构、编程风格、
以及解决问题的思考方式。设计模免去我们自己再思考和摸索。就像是经典
的棋谱，不同的棋局，我们用不同的棋谱。”套路”
- 所谓类的单例设计模式，就是采取一定的方法保证在整个的软件系统中，对
某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法。
如果我们要让类在一个虚拟机中只能产生一个对象，我们首先必须将类的构 造器的访问权限设置为private，这样，就不能用new操作符在类的外部产生
类的对象了，但在类内部仍可以产生该类的对象。因为在类的外部开始还无
法得到类的对象，只能调用该类的某个静态方法以返回类内部创建的对象，
静态方法只能访问类中的静态成员变量，所以，指向类内部产生的该类对象
的变量也必须定义成静态的。

饿汉式(不管是否使用到这个实例，都先new了)
```java
class Singleton {
    // 1.私有化构造器
    private Singleton() {}
    // 2.内部提供一个当前类的实例
    // 4.此实例也必须静态化
    private static Singleton single = new Singleton();
    // 3.提供公共的静态的方法，返回当前类的对象
    public static Singleton getInstance() {
        return single; 
    } 
}
```

懒汉式
```java
class Singleton {
    // 1.私有化构造器
    private Singleton() {}
    // 2.内部提供一个当前类的实例
    // 4.此实例也必须静态化
    private static Singleton single;
    // 3.提供公共的静态的方法，返回当前类的对象
    public static Singleton getInstance() {
    if(single == null) {
        single = new Singleton();
    }
    return single; } 
}
```

## 理解main方法的语法

```shell
 由于Java虚拟机需要调用类的main()方法，所以该方法的访问权限必须是
public，又因为Java虚拟机在执行main()方法时不必创建对象，所以该方法必须
是static的，该方法接收一个String类型的数组参数，该数组中保存执行Java命令
时传递给所运行的类的参数。 

 又因为main() 方法是静态的，我们不能直接访问该类中的非静态成员，必须创
建该类的一个实例对象后，才能通过这个对象去访问类中的非静态成员，这种情
况，我们在之前的例子中多次碰到。
```

## 代码块

- 代码块作用：  
    对Java类或对象进行初始化
- 代码块分类：
    静态代码块，非静态代码块。
- static代码块通常用于初始化static属性
```java
class Person {
public static int total;
static {
    total = 100;//为total赋初值
}
…… //其它属性或方法声明
}
```

- 静态代码块：用static 修饰的代码块
    1. 可以有输出语句。
    2. 可以对类的属性、类的声明进行初始化操作。
    3. 不可以对非静态的属性初始化。即：不可以调用非静态的属性和方法。
    4. 若有多个静态的代码块，那么按照从上到下的顺序依次执行。
    5. 静态代码块的执行要先于非静态代码块。
    6. 静态代码块随着类的加载而加载，且只执行一次。

- 非静态代码块：没有static修饰的代码块
    1. 可以有输出语句。 
    2. 可以对类的属性、类的声明进行初始化操作。 
    3. 除了调用非静态的结构外，还可以调用静态的变量或方法。 
    4. 若有多个非静态的代码块，那么按照从上到下的顺序依次执行。 
    5. 每次创建对象的时候，都会执行一次。==且先于构造器执行==。

静态初始化块举例
```java
class Person {
    public static int total;
        static {
            total = 100;
            System.out.println("in static block!");
        }
    }
    public class PersonTest {
    public static void main(String[] args) {
        System.out.println("total = " + Person.total);
        System.out.println("total = " + Person.total);
    } 
}
```

- 总结：程序中成员变量赋值的执行顺序
```shell
1. 声明成员变量的默认初始化

2. 显式初始化、多个初始化块依次被执行（同级别下按先后顺序执行）

3. 构造器再对成员进行初始化操作

4. 通过”对象.属性”或”对象.方法”的方式，可多次给属性赋值
```

## 关键字final

在Java中声明类、变量和方法时，可使用关键字final来修饰,表示“最终的”。 

final标记的类不能被继承。提高安全性，提高程序的可读性。 

String类、System类、StringBuffer类 

final标记的方法不能被子类重写。

比如：Object类中的getClass()。 

final标记的变量(成员变量或局部变量)即称为常量。名称大写，且只
能被赋值一次。 

final标记的成员变量必须在声明时或在每个构造器中或代码块中显式赋
值，然后才能使用。 

final double MY_PI = 3.14;

```shell
3. final修饰变量——常量
class A {
private final String INFO = "atguigu"; //声明常量
public void print() {
//The final field A.INFO cannot be assigned
//INFO = "尚硅谷";
} }


常量名要大写，内容不可修改。——如同古代皇帝的圣旨。
 static final：全局常量
```

## 抽象类和抽象方法

感觉就像是，我帮你把名字取好了，实现自己去做吧。

 用abstract关键字来修饰一个类，这个类叫做抽象类。 

 用abstract来修饰一个方法，该方法叫做抽象方法。 

抽象方法：只有方法的声明，没有方法的实现。以分号结束：
比如：public abstract void talk(); 

 含有抽象方法的类必须被声明为抽象类。

 抽象类不能被实例化。抽象类是用来被继承的，抽象类的子类必须重
写父类的抽象方法，并提供方法体。若没有重写全部的抽象方法，仍
为抽象类。

 不能用abstract修饰变量、代码块、构造器；

 不能用abstract修饰私有方法、静态方法、final的方法、final的类。

举例；
```java
abstract class A {
    abstract void m1();
    public void m2() {
        System.out.println("A类中定义的m2方法");
    } 
}
class B extends A {
    void m1() {
        System.out.println("B类中定义的m1方法");
    } 
}
```

## 接口（interface）

概述
```shell
 一方面，有时必须从几个类中派生出一个子类，继承它们所有的属性和方
法。但是，Java不支持多重继承。有了接口，就可以得到多重继承的效果。 

另一方面，有时必须从几个类中抽取出一些共同的行为特征，而它们之间又
没有is-a的关系，仅仅是具有相同的行为特征而已。例如：鼠标、键盘、打
印机、扫描仪、摄像头、充电器、MP3机、手机、数码相机、移动硬盘等都
支持USB连接。 

接口就是规范，定义的是一组规则，体现了现实世界中“如果你是/要...则
必须能...”的思想。继承是一个"是不是"的关系，而接口实现则是 "能不能"
的关系。

 接口的本质是契约，标准，规范，就像我们的法律一样。制定好后大家都
要遵守。
```

特点
```shell
接口(interface)是抽象方法和常量值定义的集合。

用interface来定义。 

接口中的所有成员变量都默认是由public static final修饰的。 

接口中的所有抽象方法都默认是由public abstract修饰的。 

接口中没有构造器。 

接口采用多继承机制。
```

举例，一个接口经过转换后是什么样子
```java
public interface Runner {
    int ID = 1;
    void start();
    public void run();
    void stop();
}

// ==> 转换后

public interface Runner {
    public static final int ID = 1; // 只能赋值一次
    public abstract void start(); // 被实现类重写
    public abstract void run();
    public abstract void stop();
}
```

```shell
 定义Java类的语法格式：先写extends，后写implements

 class SubClass extends SuperClass implements InterfaceA{ } 

 一个类可以实现多个接口，接口也可以继承其它接口。  实现接口的类中必须提供接口中所有方法的具体实现内容，方可实
例化。否则，仍为抽象类。

 接口的主要用途就是被实现类实现。（面向接口编程）

 与继承关系类似，接口与实现类之间存在多态性

 接口和类是并列关系，或者可以理解为一种特殊的类。从本质上讲，
接口是一种特殊的抽象类，这种抽象类中只包含常量和方法的定义
(JDK7.0及之前)，而没有变量和方法的实现。
```

接口应用举例
```java
interface Runner {
    public void start();
    public void run();
    public void stop();
}
class Person implements Runner {
    public void start() {
        // 准备工作：弯腰、蹬腿、咬牙、瞪眼
        // 开跑
    }
    public void run() {
        // 摆动手臂
        // 维持直线方向
    }
    public void stop() {
        // 减速直至停止、喝水。
    } 
}
```
- 一个类可以实现多个无关的接口
```java
interface Runner { public void run();}
interface Swimmer {public double swim();}
class Creator{public int eat(){…}} 

class Man extends Creator implements Runner ,Swimmer{
    public void run() {……}
    public double swim() {……}
    public int eat() {……}
}
```
- 与继承关系类似，接口与实现类之间存在多态性
```java
public class Test{
    public static void main(String args[]){
        Test t = new Test();
        Man m = new Man();
        t.m1(m);
        t.m2(m);
        t.m3(m);
    }
    public String m1(Runner f) { f.run(); }
    public void m2(Swimmer s) {s.swim();}
    public void m3(Creator a) {a.eat();}
}
```

### 接口的应用：代理模式
- 应用场景
    - 安全代理：屏蔽对真实角色的直接访问。
    - 远程代理：通过代理类处理远程方法调用（RMI）
    - 延迟加载：先加载轻量级的代理对象，真正需要再加载真实对象
        比如你要开发一个大文档查看软件，大文档中有大的图片，有可能一个图片有
        100MB，在打开文件时，不可能将所有的图片都显示出来，这样就可以使用代理
        模式，当需要查看图片时，用proxy来进行大图片的打开。

- 分类
    - 静态代理（静态定义代理类） 
    - 动态代理（动态生成代理类）
        JDK自带的动态代理，需要反射等知识
```java
interface Network {
    public void browse();
}
// 被代理类
class RealServer implements Network { 
    @Override
    public void browse() {
        System.out.println("真实服务器上网浏览信息");
    } 
}

// 代理类
class ProxyServer implements Network {
    private Network network;
    public ProxyServer(Network network) {
        this.network = network; 
    }
    public void check() {
        System.out.println("检查网络连接等操作");
    }
    public void browse() {
        check();
        network.browse();
    } 
}
// 测试
public class ProxyDemo {
    public static void main(String[] args) {
        Network net = new ProxyServer(new RealServer());
        net.browse();
    } 
}
```

### 接口和抽象类之间的对比


|  No. |  区别点 |  抽象类 |  接口  |
|--    |--       | --     |  --    |
| 1     |  定义 | 包含抽象方法的类 |主要是抽象方法和全局常量的集合 |
|2     |   组成 |  构造方法、抽象方法、普通方法、常量、变量| 常量、抽象方法、(jdk8.0:默认方法、静态方法)|

| No.  | 区别点       | 抽象类                                                       | 接口                                        |
| ---- | ------------ | ------------------------------------------------------------ | ------------------------------------------- |
| 1    | 定义         | 包含抽象方法的类                                             | 主要是抽象方法和全局常量的集合              |
| 2    | 组成         | 构造方法、抽象方法、普通方法、常量、变量                     | 常量、抽象方法、(jdk8.0:默认方法、静态方法) |
| 3    | 使用         | 子类继承抽象类(extends)                                      | 子类实现接口(implements)                    |
| 4    | 关系         | 抽象类可以实现多个接口                                       | 接口不能继承抽象类，但允许继承多个接口      |
| 5    | 常见设计模式 | 模板方法                                                     | 简单工厂、工厂方法、代理模式                |
| 6    | 对象         | 都通过对象的多态性产生实例化对象                             | 都通过对象的多态性产生实例化对象            |
| 7    | 局限         | 抽象类有单继承的局限                                         | 接口没有此局限                              |
| 8    | 实际         | 作为一个模板                                                 | 是作为一个标准或是表示一种能力              |
| 9    | 选择         | 如果抽象类和接口都可以使用的话，优先使用接口，因为避免单继承的局限 |                                             |

在开发中，常看到一个类不是去继承一个已经实现好的类，而是要么继承抽象类，

要么实现接口。

```shell
        Java 8中关于接口的改进


Java 8中，你可以为接口添加静态方法和默认方法。从技术角度来说，这是完
全合法的，只是它看起来违反了接口作为一个抽象定义的理念。
静态方法：使用 static 关键字修饰。可以通过接口直接调用静态方法，并执行
其方法体。我们经常在相互一起使用的类中使用静态方法。你可以在标准库中
找到像Collection/Collections或者Path/Paths这样成对的接口和类。
默认方法：默认方法使用 default 关键字修饰。可以通过实现类对象来调用。
我们在已有的接口中提供新方法的同时，还保持了与旧版本代码的兼容性。
比如：java 8 API中对Collection、List、Comparator等接口提供了丰富的默认
方法。
```

## 内部类

...