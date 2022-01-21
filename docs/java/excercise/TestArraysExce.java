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