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