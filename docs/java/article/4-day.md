# 面向对象编程（上）2

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