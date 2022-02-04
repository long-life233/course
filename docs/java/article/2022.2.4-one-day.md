# 第一天

## JDK、JRE
因为Java程序必须运行在JVM之上，所以，我们第一件事情就是安装JDK。

搜索JDK 17，确保从Oracle的官网下载最新的稳定版JDK：

安装完JDK后，需要设置一个名为%JAVA_HOME%，值为jdk的bin目录的环境变量。打开命令提示符窗口，输入命令java -version
```shell
名词解释
初学者学Java，经常听到JDK、JRE这些名词，它们到底是啥？

JDK：Java Development Kit
JRE：Java Runtime Environment
简单地说，JRE就是运行Java字节码的虚拟机。但是，如果只有Java源码，要编译成Java字节码，就需要JDK，因为JDK除了包含JRE，还提供了编译器、调试器等开发工具。

二者关系如下：

  ┌─    ┌──────────────────────────────────┐
  │     │     Compiler, debugger, etc.     │
  │     └──────────────────────────────────┘
 JDK ┌─ ┌──────────────────────────────────┐
  │  │  │                                  │
  │ JRE │      JVM + Runtime Library       │
  │  │  │                                  │
  └─ └─ └──────────────────────────────────┘
        ┌───────┐┌───────┐┌───────┐┌───────┐
        │Windows││ Linux ││ macOS ││others │
        └───────┘└───────┘└───────┘└───────┘
```
## JAVA_HOME的bin目录
```shell
JDK
细心的童鞋还可以在JAVA_HOME的bin目录下找到很多可执行文件：

java：这个可执行程序其实就是JVM，运行Java程序，就是启动JVM，然后让JVM执行指定的编译后的代码；
javac：这是Java的编译器，它用于把Java源码文件（以.java后缀结尾）编译为Java字节码文件（以.class后缀结尾）；
jar：用于把一组.class文件打包成一个.jar文件，便于发布；
javadoc：用于从Java源码中自动提取注释并生成文档；
jdb：Java调试器，用于开发阶段的运行调试。
```

## 第一个java程序
我们来编写第一个Java程序。

打开文本编辑器，输入以下代码：

 // Java规定，某个类定义的public static void main(String[] args)是Java程序的固定入口方法，因此，Java程序总是从main方法开始执行。
```java
public class Hello {
    // Java规定，某个类定义的public static void main(String[] args)是Java程序的固定入口方法，因此，Java程序总是从main方法开始执行。
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```
文件名必须是Hello.java

Java源码本质上是一个文本文件，我们需要先用javac把Hello.java编译成字节码文件Hello.class，然后，用java命令执行这个字节码文件`java Hello`（不要执行java Hello.class）：

