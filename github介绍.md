## Git 与Github 介绍

### 1.1 什么是git 有什么用？

Git 是一个版本控制管理工具：
- 保存历史记录(版本管理、版本回退)
- 多人协同交互

Git 翻译过来就是 饭桶 的意思，老外就是喜欢这样的命名。
### 1.2 安装和配置 Git 环境(最新版本2.13.1)

下载地址：https://git-for-windows.github.io/

历史版本地址：https://github.com/git-for-windows/git/releases

确认是否有 git 环境：

```bash
$ git --version
```

如果看到能输出一个版本号 `git version 2.10.1.windows.1`（版本不一定一致），说明没有问题。

### 1.3 初始设置

```bash
$ git config --global user.name "yourname"
$ git config --global user.email "your_email@example.com"
```
第一次安装了 git 环境之后配置一下即可。
如果想要修改，可以使用上面命令重新执行即可修改

### 1.4基本操作

- `git init` 初始化厂库
- `git status` 查看文件状态  *
- `git add *`    添加到git目录*
- `git commit -m "项目描述"` 提交到本地厂库*
- `git push`   提交到远程厂库*
- `git log`    查看提交日志*

### 1.5 推送至远程仓库

- `git push -u origin master`
  + 推送到名称为 origin 远程仓库地址下的 master 分支下


###  上传成功的状态就是这样的


### 2.1 Git 与 github 关系
+ GitHub是个免费的代码托管平台
+ Git 与GitHub 的关系？

git是一张弓，github是靶子，你的源代码是箭

### github的基本使用(下载别人的源代码)
### 资源共享

前端导航[https://ganjs.github.io/FrontEndGuide/]

掘金网[https://juejin.im/]

学习博客[http://colinued.leanote.com/]

