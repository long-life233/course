# temp

pnpm 与 npm 等价的命令，帮助你快速入门

| npm 命令 | pnpm 等价命令 
| ----- | --------- |
| npm install | pnpm install |
| npm i <pkg> | pnpm add <pkg>   | 
|npm run <cmd>|pnpm <cmd>|

当你使用一个未知命令时，pnpm 将会查找和该命令具有相同名称的脚本， 因此，pnpm run lint 和 pnpm lint 是一样的。如果没有相同名称的脚本的话， 那么 pnpm 将按照 shell 脚本的形式执行该命令，所以你可以执行类似 pnpm eslint (see pnpm exec) 指令的命令。（像 npx）


npm link is a two-step process.

First, npm link in a package folder will create a symlink in the global folder

Next, in some other location, npm link package-name will create a symbolic link from globally-installed package-name to node_modules/ of the current folder.

Note that package-name is taken from package.json, not from directory name.

For example:

```shell
cd ~/projects/node-redis    # go into the package directory
npm link                    # creates global link
cd ~/projects/node-bloggy   # go into some other package directory.
npm link redis              # link-install the package
```

You may also shortcut the two steps in one. For example, to do the above use-case in a shorter way:
```shell
cd ~/projects/node-bloggy  # go into the dir of your main project
npm link ../node-redis     # link the dir of your dependency

(cd ../node-redis; npm link)
npm link redis
```

pnpm 使用 link 还是有些区别的。
```shell
pnpm link ../demo2

pnpm link demo2
```

改变了工作空间的目录后，再运行会发现找不到模块了。原因是 pnpm-lock.yaml 会用相对路径记录工作空间依赖的路径。移动目录后自然就找不到模块了。删掉 lock 文件，从新 pnpm i 就可以了。


