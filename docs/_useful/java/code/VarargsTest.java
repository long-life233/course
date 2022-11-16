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
    private int legs;// ������legs����Ϊprivate��ֻ�ܱ�Animal���ڲ�����

    public void setLegs(int i) { // �����ﶨ�巽�� eat() �� move()
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
        //xb.legs = -1000; // �Ƿ�
        System.out.println(xb.getLegs());
    }
}

class JavaBean {
    private String name; // ����һ�㶨��Ϊprivate
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
class Person{ // ����Person��
    private String name ;
    private int age ;
    public Person(){ // �޲ι�����
        System.out.println("�¶���ʵ����") ;
    }
    public Person(String name){
        this(); // ���ñ����е��޲ι�����
        this.name = name ;
    }
    public Person(String name,int age){
        this(name) ; // ������һ�������Ĺ�����
        this.age = age;
    }
    public String getInfo(){
        return "������" + name + "�����䣺" + age ;
    }
}
