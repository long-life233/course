# 异常处理
java处理异常方式

- try-catch-finally
- throws + 异常类型


## 方式一，try-catch-finally
```java
try{
    //可能产生异常的代码
}
catch( ExceptionName1 e ){
    //当产生ExceptionName1型异常时的处置措施
}
catch( ExceptionName2 e ){
    //当产生ExceptionName2型异常时的处置措施
    // getMessage() 获取异常信息，返回字符串
    // printStackTrace() 获取异常类名和异常信息，以及异常出
    // 现在程序中的位置。返回值void。
}[ finally{
    //无论是否发生异常，都无条件执行的语句
} ]
```

## 方式二，throws + 异常类型

```shell
如果一个方法(中的语句执行时)可能生成某种异常，但是并不能确定如何处理这
种异常，则此方法应显示地声明抛出异常，表明该方法将不对这些异常进行处理，
而由该方法的调用者负责处理。 

在方法声明中用throws语句可以声明抛出异常的列表，throws后面的异常类型可
以是方法中产生的异常类型，也可以是它的父类。
```
```java
import java.io.*;
public class ThrowsTest {
    public static void main(String[] args) {
        ThrowsTest t = new ThrowsTest();
        try {
            t.readFile();
        } catch (IOException e) {
            e.printStackTrace();
        } 
    }
    public void readFile() throws IOException {
        FileInputStream in = new FileInputStream("atguigushk.txt");
        int b; 
        b = in.read();
        while (b != -1) {
            System.out.print((char) b);
            b = in.read();
        }
        in.close();
    } 
}
```

## 手动抛出异常
```java
IOException e = new IOException();
throw e;
```

## 用户自定义异常类

```java
 一般地，用户自定义异常类都是RuntimeException的子类。

 自定义异常类通常需要编写几个重载的构造器。 

 自定义异常需要提供serialVersionUID

 自定义的异常通过throw抛出。 

 自定义异常最重要的是异常类的名字，当异常出现时，可以根据名字判断异常类型。
```

用户自定义异常类MyException，用于描述数据取值范围错误信息。用户
自己的异常类必须继承现有的异常类。

```java
class MyException extends Exception {
    static final long serialVersionUID = 13465653435L;
    private int idnumber;
    public MyException(String message, int id) {
        super(message);
        this.idnumber = id; 
    }
    public int getId() {
        return idnumber; 
    } 
}

public class MyExpTest {
    public void regist(int num) throws MyException {
        if (num < 0)
            throw new MyException("人数为负值，不合理", 3);
        else
        System.out.println("登记人数" + num);
    }
    public void manager() {
        try {
            regist(100);
        } catch (MyException e) {
            System.out.print("登记失败，出错种类" + e.getId());
        }
            System.out.print("本次登记操作结束");
    }
    public static void main(String args[]) {
        MyExpTest t = new MyExpTest();
        t.manager();
    } 
}
```