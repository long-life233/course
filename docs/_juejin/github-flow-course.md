# github flow 入门教程

## 前言

可能对你有用的参考链接：

- [https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html](阮一峰GitHub Actions 入门教程)

- [https://juejin.cn/post/7006524441798639653](掘金)

- [https://juejin.cn/post/7108615649777156104](掘金)

## 术语（看看就好）

GitHub Actions 有一些自己的术语。

（1）workflow （工作流程）：持续集成一次运行的过程，就是一个 workflow。（一个workflow对应一个.github/workflows/*.yml文件）

（2）job （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。（在workflow文件里写jobs字段）

（3）step（步骤）：每个 job 由多个 step 构成，一步步完成。（在job里写step字段）

（4）action （动作）：每个 step 可以依次执行一个或多个命令（action）。（step下面的字段）

## workflow文件

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的.github/workflows目录。

workflow 文件采用 YAML 格式，文件名可以任意取，但是后缀名统一为.yml，比如foo.yml。一个库可以有多个 workflow 文件。GitHub 只要发现.github/workflows目录里面有.yml文件，就会自动运行该文件。

workflow 文件的配置字段非常多，详见官方文档。

https://help.github.com/en/articles/workflow-syntax-for-github-actions