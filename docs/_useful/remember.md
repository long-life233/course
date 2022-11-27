# 记录
## npm与yarn相关

nvm，切換nodejs、npm版本
npm -g nrm/yrm，切換鏡像

yarn镜像

yarn config set registry https://registry.npm.taobao.org/

yarn cache dir
yarn cache clean

yarn config get registry
npm config get registry

npm config set registry https://registry.npm.taobao.org

npm config set registry https://registry.npmjs.org

npm清除缓存`npm cache clean -f`
npm config list --json
获取缓存`npm config get cache`

验证是否还有缓存`npm cache verify`

npm install时报错，pathy2
https://blog.csdn.net/qq_24788629/article/details/103819561
要以管理员身份运行powerShell

https://blog.csdn.net/weixin_29307799/article/details/105553834?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-105553834-blog-107587043.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-105553834-blog-107587043.pc_relevant_default&utm_relevant_index=2

## script脚本
&和&&区别

https://blog.csdn.net/MYspegale/article/details/117556628

阮一峰
https://blog.csdn.net/weixin_41697143/article/details/104029573

https://blog.csdn.net/qq_23334071/article/details/114736831

## git 命令
删除远程分支
```shell
git push origin --delete [branch_name]
```
## 配置ssh
1. 
```shell
git config --global user.name "你的用户名"

git config --global user.email "你的邮箱"
```
2. 
删除`C:\Users\Administrator\.ssh\known_hosts`文件
3. 
git输入`ssh-keygen -t rsa -C “你的邮箱”`，一直回车
4. 
此时.ssh文件夹里出现两个文件，id_rsa（密钥）和id_rsa.pub（公钥）。
用记事本打开公钥，复制全部内容。
5. 
进入gitee，设置添加公钥。