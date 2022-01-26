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

```
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
```
1. 声明成员变量的默认初始化

2. 显式初始化、多个初始化块依次被执行（同级别下按先后顺序执行）

3. 构造器再对成员进行初始化操作

4. 通过”对象.属性”或”对象.方法”的方式，可多次给属性赋值
```

## 关键字final

