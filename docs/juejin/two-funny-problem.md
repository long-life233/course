# 【题目一】现有库位表达式：x库.y区.n-m,n1,n2,n3

##### 第一步：请编写个程序解析上述表达式，并在程序结束执行完成后，打印出此表达式所代表的详细库位信息

***例：***
```bash
上海一库.东区.13-15

==============

上海一库.东区.13

上海一库.东区.14

上海一库.东区.15
```
```bash
上海一库.西区.1-3,5,7,9-11

==============

上海一库.西区.1

上海一库.西区.2

上海一库.西区.3

上海一库.西区.5

上海一库.西区.7

上海一库.西区.9

上海一库.西区.10

上海一库.西区.11
```

##### 第二步：请思考后在上述表达式解释过程中加入校验逻辑，完善整个解释过程的容错, 并在出错时程序能给出精准错误提示，同时在下方简述你校验的逻辑
```
1. 
2.
3.
...
```

# 【题目二】请编写代码完成以下题目： 

(1) 随机生成一堆数字作为源 

(2) 随机生成一堆数字作为目标 

(3) 设计一个算法穷举哪些（目标中数字的和）与 (源中数字和) 一致 

(4) 所设计的算法必须通过有效方法对产生的结果进行验证 
****
***例：***

源: 19,47,20,78,23 

目标: 13,6,14,23,33,31,10 

预期结果： 

源 19 = 目标 13 + 6 

源 47 = 目标 33 + 14 

源 47 = 目标 14 + 23 + 10 

源 19 + 47 = 目标 23 + 10 + 33

## 解答第一题


## 第一问
```js
const testStr = '上海一库.西区.1-3,5,7,9-11,9-19'

function parseString(str) {
    const [...dotSplitStr] = str.split('.')

    const [...numStr] = dotSplitStr[dotSplitStr.length - 1].split(',')

    const newNumArr = numStr.map(item => {
        if(item.includes('-')) {
            const [start, end] = item.split('-')

            let startNum = Number(start)

            let endNum = Number(end)

            const enumArr = []

            while(startNum <= endNum) {
                enumArr.push(startNum)

                startNum ++
            }
            return enumArr
        }

        return parseInt(item, 10)
    }).flat(1) // 如果有需求，还可以进行去重、按从小到大排序

    newNumArr.forEach(item => {
        const logStr = `${dotSplitStr[0]}.${dotSplitStr[1]}.${item}`

        console.log(logStr)
    })
}

parseString(testStr)
```

## 第二问

简述校验逻辑：

被解析的字符串以`.`符号作为分隔符，分为三部分字符串。

第一部分（例如上海一库），开头或结尾不能有`.`符号。

第三部分（例如1-3,5,7,9-11,9-19），结尾不能有`.`符号。

然后第三部分也不能以，开头或结尾。

再将第三部分以`,`符号解析为若干部分。

解析第三部分的数字时，必须是数字，并且当有-符号时，-左边的数字必须小于有-右边的数字。
```js
const testStr = '上海一库.西区.1-3,5,7,9-11,9-19'

function parseString(str) {
    const [...dotSplitStr] = str.split('.')

    if(dotSplitStr[0] === '') {
        throw new Error('不能以 . 开头')
    } 

    if(dotSplitStr[dotSplitStr.length - 1] === '') {
        throw new Error('不能以 . 结尾')
    }

    const [...numStr] = dotSplitStr[dotSplitStr.length - 1].split(',')

    if(numStr[0] === '') {
        throw new Error('不能以 , 开头')
    } 

    if(numStr[numStr.length - 1] === '') {
        throw new Error('不能以 , 结尾')
    }

    const newNumArr = numStr.map(item => {
        if(item.includes('-')) {
            const [start, end] = item.split('-')

            let startNum = Number(start)

            let endNum = Number(end)

            if(Number.isNaN(startNum)) {
                throw new Error('解析数字错误: ' + start)
            }

            if(Number.isNaN(endNum)) {
                throw new Error('解析数字错误: ' + end)
            }

            if(startNum > endNum) {
                throw new Error('数字必须从小到大排列: ' + item)
            }   

            const enumArr = []

            while(startNum <= endNum) {
                enumArr.push(startNum)

                startNum ++
            }
            return enumArr
        }

        return parseInt(item, 10)
    }).flat(1) // 如果有需求，还可以进行去重、按从小到大排序

    newNumArr.forEach(item => {
        const logStr = `${dotSplitStr[0]}.${dotSplitStr[1]}.${item}`

        console.log(logStr)
    })
}

parseString(testStr)
```
