import java.util.Scanner;

public class TestArraysExce {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("������ѧ������:");
        int stuNum = 0;
        // ����int����
        if (scan.hasNextInt()) {
            // �ж�������Ƿ�������
            stuNum = scan.nextInt();
            int[] scoreArr = new int[stuNum];
            // ѭ������5��ѧ���ĳɼ�,������
            for(int i = 0;i< stuNum;i++){
                System.out.println("������ѧ��"+(i+1)+"�ĳɼ�:");
                int score = scan.nextInt();
                scoreArr[i] = score;
            }

            System.out.println("��߷���:"+max(scoreArr));
        } else {
            // ����������Ϣ
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