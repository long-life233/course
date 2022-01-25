# 面向对象编程（上）

- 在一个类中的访问机制：类中的方法可以直接访问类中的成员变量
```java
class Person{
    int age;
    void shout(){
        system.out.println("oh,my god! i am "+age)
    }
}
```

- 内存解析

```
堆
    专门存放对象实例

栈
    存放局部变量，对象引用。方法执行完，自动释放

方法区
    存储类信息，常量，静态变量。。。
```

- 对象属性的默认初始化赋值
```
        成员变量类型 初始值
        byte 0
        short 0
        int 0
        long 0L
        float 0.0F
        double 0.0
        char 0 或写为:’\u0000’(表现为空)
        boolean false
        引用类型 null
```

- 可变形参被当做数组处理
```java
public class VarargsTest {
    public static void test(int b,String...books){
        for(String book:books){
            System.out.println(book);
        }
    }
    public static void main(String[] args){
        VarargsTest.test(1,"xx","asfsd");
    }
}

```
- 信息的封装与隐藏
Java中通过将数据声明为私有的(private)，再提供公共的（public）
方法:getXxx()和setXxx()实现对该属性的操作，以实现下述目的：

隐藏一个类中不需要对外提供的实现细节；
使用者只能通过事先定制好的方法来访问数据，可以方便地加入控制逻辑，
限制对属性的不合理操作；
便于修改，增强代码的可维护性；
```java
class Animal {
    private int legs;// 将属性legs定义为private，只能被Animal类内部访问
    public void setLegs(int i) { // 在这里定义方法 eat() 和 move()
        if (i != 0 && i != 2 && i != 4) {
            System.out.println("Wrong number of legs!");
            return;
        }
        legs = i;
    }
    public int getLegs() {
        return legs;
    }
}

class Zoo {
    public static void main(String args[]) {
        Animal xb = new Animal();
        xb.setLegs(4); // xb.setLegs(-1000);
        //xb.legs = -1000; // 非法
        System.out.println(xb.getLegs());
    }
}
```

## 构造器

- 它具有与类相同的名称
- 它不声明返回值类型。（与声明为void不同）
- 不能被static、final、synchronized、abstract、native修饰，不能有
- 父类的构造器不可被子类继承
return语句返回值

语法格式
```
修饰符 类名（参数列表）{
    初始化语句
}
```
```java
public class Animal{
    // 构造器
    public Animal(){
        // ...
    }
}
```

## JavaBean

所谓javaBean，是指符合如下标准的Java类：
    类是公共的
    有一个无参的公共的构造器
    有属性，且有对应的get、set方法
```java
class JavaBean {
    private String name; // 属性一般定义为private
    private int age;

    public JavaBean() {
    }

    public int getAge() {
        return age;
    }

    public void setAge(int a) {
        age = a;
    }

    public String getName() {
        return name;
    }

    public void setName(String n) {
        name = n;
    }
}
```

## this的使用

this是什么
```
它在方法内部使用，即这个方法所属对象的引用

它在构造器内部使用，表示该构造器正在初始化的对象

this 可以调用类的属性、方法和构造器
```
this调用本类构造器
```java
class Person{ // 定义Person类
    private String name ;
    private int age ;
    public Person(){ // 无参构造器
        System.out.println("新对象实例化") ;
    }
    public Person(String name){
        this(); // 调用本类中的无参构造器
        this.name = name ;
    }
    public Person(String name,int age){
        this(name) ; // 调用有一个参数的构造器
        this.age = age;
    }
    public String getInfo(){
        return "姓名：" + name + "，年龄：" + age ;
    }
}
```
> 注意：可以在类的构造器中使用"this(形参列表)"的方式，调用本类中重载的其他的构造器！

## 关键字：package、import的使用

- package语句作为Java源文件的第一条语句，指明该文件中定义的类所在
的包。(若缺省该语句，则指定为无名包)。它的格式为：
`package 顶层包名.子包名;`

举例：pack1/pack2/PackageTest.java
```java
package pack1.pack2; //指定类PackageTest属于包pack1.pack2
public class PackageTest{
    public void display(){
        System.out.println("in method display()");
    }
}
```
- 包对应于文件系统的目录，package语句中，用 “.” 来指明包(目录)的层次
- 包通常用小写单词标识。通常使用所在公司域名的倒置：com.atguigu.xxx

包的作用

- 包帮助管理大型软件系统：将功能相近的类划分到同一个包中。

- 包可以包含类和子包，划分项目层次，便于管理

- 解决类命名冲突的问题

- 控制访问权限

## JDK中主要的包介绍

- java.lang--包含一些Java语言的核心类，如String、Math、Integer、 System和Thread，提供常用功能
- java.net----包含执行与网络相关的操作的类和接口
- java.io ----包含能提供多种输入/输出功能的类。
- java.util----包含一些实用工具类，如定义系统特性、接口的集合框架类、使用与日期日历相关的函数。
- java.text----包含了一些java格式化相关的类
- java.sql----包含了java进行JDBC数据库编程的相关类/接口
- java.awt----包含了构成抽象窗口工具集（abstract window toolkits）的多个类，这些类被用来构建和管理应用程序的图形用户界面(GUI)。 B/S C/S

## 关键字import

- 为使用定义在不同包中的Java类，需用import语句来引入指定包层次下所需要的类或全部类(.*)。import语句告诉编译器到哪里去寻找类。
- 语法格式
`import 报名.类名;`
- 应用举例：
```java
import pack1.pack2.Test; //import pack1.pack2.*;表示引入pack1.pack2包中的所有结构
public class PackTest{
    public static void main(String args[]){
        Test t = new Test(); //Test类在pack1.pack2包中定义
        t.display();
    } 
}
```
注意：
1. 在源文件中使用import显式的导入指定包下的类或接口
2. 声明在包的声明和类的声明之间。
3. 如果需要导入多个类或接口，那么就并列显式多个import语句即可
4. 举例：可以使用java.util.*的方式，一次性导入util包下所有的类或接口。
5. 如果导入的类或接口是java.lang包下的，或者是当前包下的，则可以省略此import语句。
6. 如果在代码中使用不同包下的同名的类。那么就需要使用类的全类名的方式指明调用的是哪个类。
7. 如果已经导入java.a包下的类。那么如果需要使用a包的子包下的类的话，仍然需要导入。
8. import static组合的使用：调用指定类或接口下的静态的属性或方法