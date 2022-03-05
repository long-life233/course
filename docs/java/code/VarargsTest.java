public class VarargsTest {
    public static void test(int b, String... books) {
        for (String book : books) {
            System.out.println(book);
        }
    }

    public static void main(String[] args) {
        VarargsTest.test(1, "xx", "asfsd");
    }
}

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
