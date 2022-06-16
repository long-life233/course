# 记录
## npm与yarn相关
yarn镜像

yarn config set registry https://registry.npm.taobao.org/

npm清除缓存`npm cache clean -f`

获取缓存`npm config get cache`

验证是否还有缓存`npm cache verify`

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