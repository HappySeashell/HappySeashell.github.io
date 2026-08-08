---
title: 使用Hexo搭建博客（一）：前期准备与 Hexo 安装、部署
date: 2021-09-10 13:41:25
updated: 2021-12-01 02:34:54
tags: hexo
categories: 博客搭建
description: 前期准备与 Hexo 安装、部署。系统：Windows10；Hexo版本：4.3.0；NexT版本：8.7.0
---

参考了下面的视频：[手把手教你从0开始搭建自己的个人博客 |无坑版视频教程| hexo](https://www.bilibili.com/video/BV1Yb411a7ty?from=search&seid=16875068426960954441&spm_id_from=333.337.0.0)。UP 主是 Mac 电脑，Windows 的差不多。
<iframe src="//player.bilibili.com/player.html?aid=44544186&bvid=BV1Yb411a7ty&cid=158772893&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

# Node.js 安装
官网：[Node.js官网](https://nodejs.org/zh-cn/)

{% blogCard https://nodejs.org/zh-cn/ target:_self rel:nofollow %}

## 简介
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，提供了多种可调用的 API 和函数库，使得 JS 可以在服务端运行。

[npm](https://www.npmjs.com/) 是Node.js的默认包管理工具，通过 npm 可以安装、管理代码模块。

如果打开[Hexo官网](https://hexo.io/zh-cn/)，映入眼帘的就是一句`$ npm install hexo-cli -g`。即，Hexo 是基于 Node.js 的博客框架，需要通过 npm 来安装。因此，我们需要先安装好 Node.js 环境。

## 安装与使用
在官网下载好对应的安装文件（如果安装慢可以通过[淘宝镜像](https://npm.taobao.org/mirrors/node)下载），例如 Windows 的默认安装文件为`.msi`格式。安装完成后，在命令提示符（cmd）中运行`node -v`和`npm -v`命令可以分别打印两者的版本号，验证是否安装成功。

由于官方源的下载速度较慢，我们可以使用淘宝 npm 镜像来加速下载：
```bash
#查看当前下载源
npm config get registry
#把下载源替换到淘宝镜像
npm config set registry https://registry.npm.taobao.org
#或者下载cnpm（中国npm镜像的客户端）
npm install -g cnpm --registry=https://registry.npm.taobao.org
#查看cnpm版本
cnpm -v
```
{% note warning %}
如果选择了用 cnpm 的方式，下载命令应为 `cnpm install`。
{% endnote %}

下面是一些常用命令：
```bash
#查看npm配置参数
npm config ls -l
#查看全局包的安装路径
npm root -g
#列出安装的所有包
npm ls
#安装Node.js依赖包
npm install <name>
#移除
npm remove <name>
#更新
npm update <name>
#查看帮助
npm help
#单独查看安装帮助
npm help install
```

# git 安装
## 简介
git 是一个分布式版本控制系统，使得我们能对代码方便地维护。关于 git 的简介，可以参考 [git 简明指南](https://www.runoob.com/manual/git-guide/)。

{% blogCard https://www.runoob.com/manual/git-guide/ target:_self rel:nofollow %}

git把代码分成一个个仓库。维护本地仓库时，在工作目录内保存实际文件，在暂存区（Index）内保存改动，再用Head指向最后一次修改的结果。改动本地仓库后，我们能将这些改动推送到克隆的远端仓库，也可以随时撤销改动。git的每个仓库内都有若干分支，可以将各个分支的特性隔离开来。我们可以在其他分支上进行开发，完成后将其合并到主分支（master）上。

Github是一个基于git的全球最大的代码托管平台，我们可以将静态博客项目托管到 Github 并部署到 Github pages上，这样其他人就能通过username.github.io的域名来访问你的网站。但 Github pages 的国内访问速度较慢，可以购买服务器或者使用国外的 Vercel，国内的 Gitee，Coding 来部署。关于几种方法的对比，可以参考这篇博客：[静态网站托管服务商评比](https://cjh0613.com/20200507StaticWebsiteServiceProvider.html)。

{% note warning %}
Gitee 的 Pages 服务对于个人版是不支持免费自动部署的，可以利用工具来实现。
{% endnote %}

## 安装与配置

在[git官网](https://git-scm.com/download)下载对应的版本（如果下载慢可以通过[淘宝镜像](https://npm.taobao.org/mirrors/git-for-windows/)获取），安装完成后，可以通过 `git --version` 查看git的版本号，确认是否安装正确。

安装完git后，我们会发现多了三个东西：git Bash，git CMD 和 git GUI。git Bash 是 Linux 风格的命令行，可以使用 Windows 和 Linux 的命令；而git CMD 是 Windows 风格的命令行，可以使用 Windows 命令。git GUI 是一个仓库管理的图形界面。一般推荐使用 git Bash 来进行操作，命令相对丰富。

在 Github 或 Gitee 等网站上注册账号，注册完成后，打开 git Bash，可以对用户信息进行配置：

```bash
# 设置全局的 Github 或 Gitee 用户名和邮箱
$ git config --global user.name "<username>"
$ git config --global user.email "<E-mail>"

# 设置局部的的 Github 或 Gitee 用户名和邮箱
$ cd ~/project
$ git config user.name "<username>"
$ git config user.email "<E-mail>"

# 查看设置好的用户名和邮箱
$ git config user.name
$ git config user.email

# 生成SSH公钥，实现免密登录
$ ssh-keygen -t rsa -C "<E-mail>"
# 运行命令后会提示是否设置密码，一般不需要设置

# 查看是否已配置SSH
$ cd ~/.ssh
# 查看公钥
$ cat ~/.ssh/id_rsa.pub
# 把文件里面的内容复制到 Github 或 Gitee 的SSH公钥配置里，即可使用。
```
如果想实现在同一台电脑上同时使用 Github 和 Gitee，则进行如下操作：（参考了[这篇博客](https://www.cnblogs.com/leyili/p/git_ssh_key.html)）
```bash
# 进入 SSH 配置文件夹
$ cd ~/.ssh
# 生成 key，将<E-mail>替换为 Gitee 或者 Github 使用的邮件地址
$ ssh-keygen -t rsa -C "<E-mail>"
# 弹出提示：
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/your_user_name/.ssh/id_rsa):
# 如果按下回车，就会像上面那样生成id_rsa.pub文件；如果输入<filename>，则会生成<filename>.pub文件。
# 为了区分 Github和Gitee，可以将新的名称设置为：
$ id_rsa_gitee
# 查看对应公钥
$ cat ~/.ssh/id_rsa_gitee.pub
# 把公钥复制到 Gitee 的 SSH 公钥配置内。
# 在.ssh文件夹下创建config配置文件并编辑
$ vi config
```
输入以下配置内容：

```bash
# gitee
Host gitee.com
  HostName gitee.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_gitee
  User username1

# github
Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_github
  User username2
```

测试连接是否正常：
```bash
# Github 测试
$ ssh -T git@github.com
Hi username2! You’ve successfully authenticated, but Github does not provide shell access.
# Gitee 测试
$ ssh -T git@gitee.com
Hi username1! You’ve successfully authenticated, but GITEE.COM does not provide shell access.
```
{% note warning %}
首次使用需要确认并添加主机到本机SSH可信列表。
{% endnote %}
## 建立博客仓库

新建一个仓库（repository），如果想使用 Pages 服务的话，仓库的名称应为特定的：

- Github：如果命名为 `<username>.github.io` ，则个人网站地址为 `<username>.github.io` ，其中 `<username>` 是账号名；否则为 `<username>.github.io/<projectname>` ，其中 `<projectname>` 为仓库名。
- Gitee：如果命名为 `<username>` ，则个人网站地址为 `<username>.gitee.io` ，否则为 `<username>.gitee.io/<projectname>` 。


# hexo 安装与新建博客项目
官网：[Hexo](https://hexo.io/zh-cn/)
{% blogCard https://hexo.io/zh-cn/ target:_self rel:nofollow %}

直接运行如下命令。`hexo-cli` 中的 `cli` 表示 command line interface（命令行接口），代表安装它之后，我们就可以在命令行窗口里使用 hexo 的专属命令了。
```bash
# 安装 hexo 框架
cnpm install hexo-cli -g
# 查看 hexo 版本，注意检查 Node.js 版本与 Hexo 版本的兼容性
hexo v
```
安装完成后，即可新建博客项目：
```bash
# 新建名为blog的文件夹
md blog
# 进入文件夹
cd blog
# 新建 Hexo 博客项目，若未填写文件夹名称，则默认在当前文件夹初始化。
hexo init [folder]
```
一个 Hexo 博客项目的文件结构如下：

``` bash
  #博客项目结构
  .
  ├─.deploy_git     # git部署文件
  ├─public          # 生成的静态文件
  ├─scaffolds       # 文章模板，默认有draft，page，post三种
  ├─node_modules    # hexo的js插件，最好不要乱改
  ├─source          # 用于存放文章、页面
  │   ├── _drafts   # 草稿
  │   ├── _posts    # 文章
  │   └── _data     # 用户自定义数据文件，例如自定义样式
  ├─themes          # 主题相关文件
  ├── _config.yml   # 全局配置文件
  └── package.json  # 项目依赖信息
```
# 新建文章
我们可以通过 `hexo n <title>` 命令创建一篇文章。例如，`hexo n 我的博文` 会在 `_post` 文件夹里自动生成一个`我的博文.md`文件。打开这个文件，里面会有一些自动填充的内容：

```yaml
---
title: 我的博文
date: 2021-09-02 11:10:48
tags: 
---
```
这些内容是根据 `scaffolds/` 文件夹内的`post.md`模板生成的，其中，`---` 之间的内容是文章的一些属性，叫做 Front-matter，采用[YAML 语言](https://www.runoob.com/w3cnote/yaml-intro.html)来表示。 我们可以修改模板内容来改变新建文件时的默认内容。以下是一些常用的参数：

|参数|描述|默认值|
|---|---|---|
|layout|布局|config.default_layout|
|title|名称|文件名|
|date|建立日期|文件建立日期|
|update|更新日期|文件更新日期|
|comments|评论功能|true|
|tags|标签||
|categories|分类||

此时在博客项目内运行 `hexo s` 命令，就可以在 http://localhost:4000/ 端口看到自己的博客了。但如果想让其他人也看到博客，就需要部署到服务器或者 Github Pages 服务上。

# git 部署与启用 pages 服务

安装git部署插件：
```bash
cnpm install --save hexo-deployer-git
```
在`~/_config.yml`文件里找到下面的配置并进行修改：

```yml
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: 'git' #部署类型
  repo: https://github.com/username/projectname #博客仓库地址
  branch: master #部署的分支,可以用master（主分支），也可以新建gh-pages分支用于部署，把渲染前的源码放在master中，这样有利于对源码的维护。
```
如果要使用SSH登录，则此处应写成：
```yml
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: 'git' #部署类型
  repo: #写成SSH的配置
    github: git@github.com:username/projectname.git
    gitee: git@gitee.com:username/projectname.git
  branch: master #部署的分支,可以用master（主分支），也可以新建gh-pages分支用于部署。
```

配置后即可通过`hexo d`命令将本地项目生成的静态网页文件推送到 Github 仓库内。

推送时，我们最好按照以下命令进行操作：

```bash
hexo clean # 清理生成的缓存文件和静态网页文件（即public文件夹中的文件）。如果只是增添文章而不改动原来的文件，可以省略这一步。
hexo generate # 生成静态网页文件
hexo deploy # 把public里的内容推送到 Github 仓库内
# 以上命令也可以简写成如下形式
hexo cl && hexo g -d
```
如果使用SSH，以上操作应在 git bash 内进行。

在 Hexo 项目被成功推送到远端仓库之后，可以通过 Pages 服务来对网站进行部署。 Github 是可以自动部署的，Gitee 则需要在服务一栏手动开启和更新。

成功启用后，我们就可以通过之前提到的域名访问自己的网页了。

# 使用其他主题

Hexo 默认的主题是 landscape，但也可以安装各式各样的其他主题。我们可以在[官网](https://hexo.io/themes/)找到自己心仪的主题。选用主题时，最好选用那些比较热门、有人维护的主题，这样遇到配置问题时更容易搜索到答案，更新也快。

目前比较热门的主题有：
-  [NexT](https://theme-next.js.org/)：简洁的性冷淡风，自带功能很全，客制化非常方便
-  [Butterfly](https://butterfly.js.org/)：多图，漂亮
-  [Fluid](https://hexo.fluid-dev.com/)：Material Design 风格
-  [Matery](http://blinkfox.com/)：Material Design 风格，个人感觉颜色太艳丽了
-  [Icarus](https://ppoffice.github.io/hexo-theme-icarus/)：简洁明亮，有赛博朋克2077的主题

本人用的是 NexT，纯粹是因为太小白担心踩坑。
安装主题时，可以采用如下方式：

```bash
# 进入博客项目的主题文件夹
$ cd blog
# 克隆 github 上的主题源码到themes/next文件夹内
$ git clone https://github.com/next-theme/hexo-theme-next.git themes/next
```
{% note warning %}
NexT一共有三个不同的 github 仓库，只有一个是最新版本，也就是上面链接内的版本。这个版本对应的文档是[NexT - theme for Hexo](https://theme-next.js.org/)，而百度搜索的结果[NexT 使用文档](http://theme-next.iissnan.com/) 是老版本，不要安错了。
{% endnote %}

速度较慢的话，可以直接到github上下载源码并解压到themes/next中，也可以使用国内镜像站的域名。

安装完成后，在`_config.yml`文件里找到下面的配置并进行修改：

```yml
## Themes: https://hexo.io/themes/
theme: next
```

即可启用 NexT 主题。
在cmd中使用`hexo v`命令同样可以查看NexT的版本号。NexT的版本每月更新一次，更新时可以采取如下 npm 命令：

```bash
$ cd hexo-site
$ npm install hexo-theme-next@latest
```
或者通过git更新：

```bash
$ cd themes/next
$ git pull
```
{% note warning %}
更新前要备份修改过的配置文件等，并根据版本予以替换。
{% endnote %}
