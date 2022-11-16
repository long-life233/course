# 面向对象编程（中）

## 继承性

```java
class Person {
    public String name;
    public int age;
    public Date birthDate;

    public String getInfo() {
        return "xx";
    }
}

class Student extends Person {
    public String school;
}
```

## 方法重写

```shell
定义：

    在子类中可以根据需要对从父类中继承来的方法进行改造，也称
    为方法的重置、覆盖。在程序执行时，子类的方法将覆盖父类的方法。

要求：

    1. 子类重写的方法必须和父类被重写的方法具有相同的方法名称、参数列表
    2. 子类重写的方法的返回值类型不能大于父类被重写的方法的返回值类型
    3. 子类重写的方法使用的访问权限不能小于父类被重写的方法的访问权限
            子类不能重写父类中声明为private权限的方法

    4. 子类方法抛出的异常不能大于父类被重写方法的异常

 注意：

    子类与父类中同名同参数的方法必须同时声明为非static的(即为重写)，或者同时声明为
    static的（不是重写）。因为static方法是属于类的，子类无法覆盖父类的方法。
```

## 四种访问权限修饰符
```shell
修饰符      类内部      同一个包    不同包的子类    同一个工程
private     Yes
(缺省)      Yes         Yes
protected   Yes         Yes         Yes
public      Yes         Yes         Yes             Yes
```

## 关键字：super

```shell
super可用于访问父类中定义的属性

super可用于调用父类中定义的成员方法

super可用于在子类构造器中调用父类的构造器

注意：

尤其当子父类出现同名成员时，可以用super表明调用的是父类中的成员
super的追溯不仅限于直接父类
```

关键字super举例
```java
class Person {
    protected String name = "张三";
    protected int age;
    public String getInfo() {
        return "Name: " + name + "\nage: " + age;
    }
}
class Student extends Person {
    protected String name = "李四";
    private String school = "New Oriental";

    public String getSchool() {
        return school;
    }

    public String getInfo() {
        // ===========================================
        return super.getInfo() + "\nschool: " + school;
        // ===========================================
    }
}
```

调用父类构造器
```java
public class Person {
    private String name;
    private int age;
    private Date birthDate;

    public Person(String name, int age, Date d) {
        this.name = name;
        this.age = age;
        this.birthDate = d;
    }

    public Person(String name, int age) {
        this(name, age, null);
    }

    public Person(String name, Date d) {
        this(name, 30, d);
    }

    public Person(String name) {
        this(name, 30);
    }
}
```

## 多态
其实很简单，就是你规定一个对象是什么类型，然后你用一个更大的类型来描述这个对象，也是可以的

`Person p = new Student()`

## instanceof 
判断一个实例是不是属于这个类型。如果是属于a类型，那么大于a的类型也属于了。

`new Student() instanceof Object`

## 对象类型转换
```java
// 基本数据类型的Casting： 
//     自动类型转换：小的数据类型可以自动转换成大的数据类型
//     如long g=20; double d=12.0f 
//     
//     强制类型转换：可以把大的数据类型强制转换(casting)成小的数据类型
//     如 float f=(float)12.0; int a=(int)1200L

// Java对象的强制类型转换

Object obj = "Hello";
String objStr = (String) obj;
```
还有个例子
```java
public class Test {
    public void method(Person e) { // 设Person类中没有getschool() 方法
    // System.out.pritnln(e.getschool()); //非法,编译时错误
        if (e instanceof Student) {
            Student me = (Student) e; // 将e强制转换为Student类型
            System.out.pritnln(me.getschool());
        }
    }

    public static void main(String[] args) {
        Test t = new Test();
        Student m = new Student();
        t.method(m);
    }
}
```

## Object类使用

Object类中的主要结构

```shell
NO.         方法名称                             类型        描述
1       public  Object()                        构造器      构造器
2       public boolean equals(Object obj)       普通方法    对象比较
3       public int hashCode()                   普通方法    取得Hash码 
4       public String toString()                普通方法    对象打印时调用
```

## ==操作符与equals方法

- 基本类型比较值:只要两个变量的值相等，即为true
    - `int a=5; if(a==6){…}`
    - 引用类型比较引用(是否指向同一个对象)：只有指向同一个对象时，==才返回true。
```java
Person p1=new Person();
Person p2=new Person();
if (p1==p2){…}
```

equals方法

- equals()：所有类都继承了Object，也就获得了equals()方法。还可以重写。
- 只能比较引用类型，其作用与“==”相同,比较是否指向同一个对象。
- 格式:obj1.equals(obj2)

- 特例：当用equals()方法进行比较时，对类File、String、Date及包装类（Wrapper Class）来说，是比较类型及内容而不考虑引用的是否是同一个对象；
    - 原因：在这些类中重写了Object类的equals()方法。


## toString()方法

- toString()方法在Object类中定义，其返回值是String类型，返回类名和它的引用地址。
- 在进行String与其它类型数据的连接操作时，自动调用toString()方法
```java
Date now=new Date();
System.out.println(“now=”+now); // 相当于
System.out.println(“now=”+now.toString());
```
- 可以根据需要在用户自定义类型中重写toString()方法如String 类重写了toString()方法，返回字符串的值。
```java
s1=“hello”;
System.out.println(s1);//相当于System.out.println(s1.toString());
```
- 基本类型数据转换为String类型时，调用了对应包装类的toString()方法
`int a=10; System.out.println(“a=”+a);`

## 包装类的使用
- 针对八种基本数据类型定义相应的引用类型—包装类（封装类）
- 有了类的特点，就可以调用类中的方法，Java才是真正的面向对象

```shell
基本数据类型    包装类
byte            Byte
short           Short
int             Integer
long            Long
float           Float
double          Double
boolean         Boolean
char            Character
```

- 基本数据类型包装成包装类的实例 ---装箱
    - 通过包装类的构造器实现
    `int i = 500; Integer t = new Integer(i);`
    - 还可以通过字符串参数构造包装类对象：
    ` Float f = new Float(“4.56”);`
    `Long l = new Long(“asdf”); //NumberFormatException`
- 获得包装类对象中包装的基本类型变量 ---拆箱
    - 调用包装类的.xxxValue()方法：`boolean b = bObj.booleanValue();`
- JDK1.5之后，支持自动装箱，自动拆箱。但类型必须匹配
- 字符串转换成基本数据类型
    - 通过包装类的构造器实现：`int i = new Integer(“12”);`
    - 通过包装类的parseXxx(String s)静态方法：`Float f = Float.parseFloat(“12.1”);`
- 基本数据类型转换成字符串
    - 调用字符串重载的valueOf()方法：`String fstr = String.valueOf(2.34f);`
    - 更直接的方式：`String intStr = 5 + “”`


## native关键字
说明这个方法是原生函数（用c/c++写的）