public class Test {
    public void method(Person e) { // ��Person����û��getschool() ����
    // System.out.pritnln(e.getschool()); //�Ƿ�,����ʱ����
        if (e instanceof Student) {
            Student me = (Student) e; // ��eǿ��ת��ΪStudent����
            System.out.pritnln(me.getschool());
        }
    }

    public static void main(String[] args) {
        Test t = new Test();
        Student m = new Student();
        t.method(m);
    }
}