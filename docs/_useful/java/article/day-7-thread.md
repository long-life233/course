# 线程

## 线程的创建与启动
- 每个线程都是通过某个特定Thread对象的run()方法来完成操作的，经常
把run()方法的主体称为线程体
- 通过该Thread对象的start()方法来启动这个线程，而非直接调用run()
构造器
```java
Thread()：创建新的Thread对象

Thread(String threadname)：创建线程并指定线程实例名

Thread(Runnable target)：指定创建线程的目标对象，它实现了Runnable接
口中的run方法

Thread(Runnable target, String name)：创建新的Thread对象
```
 JDK1.5之前创建新执行线程有两种方法：
1. 继承Thread类的方式
2. 实现Runnable接口的方式

方式一：继承Thread类
```shell
1) 定义子类继承Thread类。
2) 子类中重写Thread类中的run方法。
3) 创建Thread子类对象，即创建了线程对象。
4) 调用线程对象start方法：启动线程，调用run方法。
```
```java
class MyThread extends Thread{
    public MyThread(){
        super();
    }
    public void run(){
        for(int i = 0;i < 100;i++){
            System.out.println("子线程"+i);
        }
    }
}

public class TestThread {
    public static void main(String[] args){
        // 1. 创建线程
        MyThread mt = new MyThread();
        // 2. 启动线程，并调用当前线程的run()方法
        mt.start();
    }
}
```
注意点：
```shell
1. 如果自己手动调用run()方法，那么就只是普通方法，没有启动多线程模式。

2. run()方法由JVM调用，什么时候调用，执行的过程控制都有操作系统的CPU
调度决定。

3. 想要启动多线程，必须调用start方法。

4. 一个线程对象只能调用一次start()方法启动，如果重复调用了，则将抛出以上
的异常“IllegalThreadStateException”。
```

方式二：实现Runnable接口
```shell
1) 定义子类，实现Runnable接口

2) 子类中重写Runnable接口中的run方法。

3) 通过Thread类含参构造器创建线程对象。

4) 将Runnable接口的子类对象作为实际参数传递给Thread类的构造器中。

5) 调用Thread类的start方法：开启线程，调用Runnable子类接口的run方法。
```