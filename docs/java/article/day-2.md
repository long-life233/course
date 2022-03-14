# 第二天

在线运行java程序网站

## 基本语法

### 变量

- 在方法体外，类体内声明的变量称为`成员变量`。

- 在方法体内部声明的变量称为`局部变量`

- java的整型常量默认为 int 型，声明long型常量须后加‘l’或‘L’

- java程序中变量通常声明为int型，除非不足以表示较大的数，才使用long
```shell
类型        占用存储空间        表数范围
byte        1字节=8bit位        -128 ~ 127
short       2字节               -215 ~215-1 
int         4字节               -231 ~ 231-1 (约21亿)
long        8字节               -263 ~ 263-1
```

- Java 的浮点型常量默认为double型，声明float型常量，须后加‘f’或‘F’。
```shell
类型            占用存储空间    表数范围
单精度float     4字节           -3.403E38 ~ 3.403E38
双精度double    8字节           -1.798E308 ~ 1.798E308
```
- 字符类型`char a = 'a'`，还可以使用转义字符或者unicode编码`char c = '\n',char b = '\u000a'`

- 了解ASCII码：
上个世纪60年代，美国制定了一套字符编码，对英语字符与二进制位之间的
关系，做了统一规定。这被称为ASCII码。ASCII码一共规定了128个字符的编码，比如
空格“SPACE”是32（二进制00100000），大写的字母A是65（二进制01000001）。这
128个符号（包括32个不能打印出来的控制符号），只占用了一个字节的后面7位，最前
面的1位统一规定为0。

缺点：

不能表示所有字符。

相同的编码表示的字符不一样：比如，130在法语编码中代表了é，在希伯来语编码中却代表
(ג) 了字母Gimel

- 了解Unicode编码

    - 乱码：世界上存在着多种编码方式，同一个二进制数字可以被解释成不同的符号。因
此，要想打开一个文本文件，就必须知道它的编码方式，否则用错误的编码方式解读，
就会出现乱码。

    - Unicode：一种编码，将世界上所有的符号都纳入其中。每一个符号都给予一个独一
无二的编码，使用 Unicode 没有乱码的问题。

    - Unicode 的缺点：Unicode 只规定了符号的二进制代码，却没有规定这个二进制代码
应该如何存储：无法区别 Unicode 和 ASCII：计算机无法区分三个字节表示一个符号
还是分别表示三个符号。另外，我们知道，英文字母只用一个字节表示就够了，如果
unicode统一规定，每个符号用三个或四个字节表示，那么每个英文字母前都必然有
二到三个字节是0，这对于存储空间来说是极大的浪费。

- 了解UTF-8
    - UTF-8 是在互联网上使用最广的一种 Unicode 的实现方式。
    - UTF-8 是一种变长的编码方式。它可以使用 1-6 个字节表示一个符号，根据
不同的符号而变化字节长度。

- String不是基本数据类型，属于引用数据类型

## 数组

### 一维数组的使用(输入学生成绩并求最大值)

```shell
从键盘读入学生成绩，找出最高分，
并输出学生成绩等级。
    成绩>=最高分-10 等级为’A’ 
    成绩>=最高分-20 等级为’B’
    成绩>=最高分-30 等级为’C’ 
    其余 等级为’D’
提示：先读入学生人数，根据人数创建int数组，
存放学生成绩。

请输入学生人数：5
请输入5个成绩：
56
74
89
41
89
最高分是：89
student 0 score is 56 grade is D
。。。
。。。
```
代码
```java
import java.util.Scanner;

public class TestArraysExce {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("请输入学生人数:");
        int stuNum = 0;
        // 输入int数据
        if (scan.hasNextInt()) {
            // 判断输入的是否是整数
            stuNum = scan.nextInt();
            int[] scoreArr = new int[stuNum];
            // 循环输入5个学生的成绩,并存入
            for(int i = 0;i< stuNum;i++){
                System.out.println("请输入学生"+(i+1)+"的成绩:");
                int score = scan.nextInt();
                scoreArr[i] = score;
            }

            System.out.println("最高分是:"+max(scoreArr));
        } else {
            // 输入错误的信息
            System.out.println("not number!!");
        }
        scan.close();
    }
    public static int max(int[] arr){
        int max = arr[0];
        for(int i=1;i<arr.length;i++){
            if(arr[i]>max){
                max = arr[i];
            }
        }
        return max;
    }
}
```

### 数组常见算法(二分查找法)

条件：必须是有序的（可是，在js中，你直接用find，findIndex不是可以很快就找到了吗？）

写出来看看：
```java
//二分法查找：要求此数组必须是有序的。
int[] arr3 = new int[]{-99,-54,-2,0,2,33,43,256,999};
boolean isFlag = true;
int number = 256;
//int number = 25;
int head = 0;//首索引位置
int end = arr3.length - 1;//尾索引位置
while(head <= end){
    int middle = (head + end) / 2;
    if(arr3[middle] == number){
        System.out.println("找到指定的元素，索引为：" + middle);
        isFlag = false;
        break; 
    }else if(arr3[middle] > number){
        end = middle - 1;
    }else{//arr3[middle] < number
        head = middle + 1;
    } 
}
if(isFlag){
    System.out.println("未找打指定的元素");
}
```


