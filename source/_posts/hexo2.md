---
title: 使用Hexo搭建博客（二）：基本操作与配置
date: 2021-09-25 20:11:36
updated: 2021-12-01 02:37:36
tags: hexo
categories: 博客搭建
description: Hexo的基本操作与配置。系统：Windows10；Hexo版本：4.3.0；NexT版本：8.7.0
---
## Hexo 基本命令

基本的知识都可以在 [Hexo 文档](https://hexo.io/zh-cn/docs/) 快速了解到。在命令提示符中可以输入如下命令，并且大部分命令都有缩写。
{% note info 点击查看常用操作 %}
### 常用操作
这里有缩写的仅列出缩写，全称可以查看官方文档。
- `hexo v` 查看版本号
- `hexo init [folder]` 初始化一个博客项目
- `hexo n [layout] [-p,[folder]] [-r] [-s] <title>` 新建一个md页面，layout默认为post，即文章
  - `-p` 自定义新文章的路径
  - `-r` 如果存在同名文章，将其替换
  - `-s` 文章的 Slug，作为新文章的文件名和发布后的 URL
  - `page` 一个文件夹，里面会自动生成主页 index.md
- `hexo publish [layout] <filename>` 发表一个草稿
- `hexo cl` 清除缓存(`db.json`)和public中生成的静态网页文件
- `hexo g [-d] [-w] [-b] [-f] [-c]` 生成静态文件
  - `-d` 生成后立即部署
  - `-w` 监视文件变动
  - `-b` 生成过程中如果发生任何未处理的异常则抛出异常
  - `-f` 强制重新生成文件,效果接近 `hexo c && hexo g`
  - `-c` 最大同时生成文件的数量，默认无限制
- `hexo s [-p] [-s] [-l]` 启动服务器，默认为 http://localhost:4000/
  - `-p` 重设端口
  - `-s` 只使用静态文件
  - `-l` 启动日记记录，使用覆盖记录格式
- `hexo d [-g]` 把网站部署到git库上
  - `-g` 部署之前预先生成静态文件
{% endnote %}

使用`hexo s`查看博客时不需要使用`hexo cl`和`hexo g`，并且除了修改配置文件`_config.yml`外，其余的改动在页面刷新后都可以实时渲染。若没有渲染，可以清除浏览器缓存后重试。

使用`hexo d`时会将`public/`文件夹内的文件全部推送到远端。如果发现`hexo s`和`hexo d`的结果不一致，有以下几种可能：
- 生成前没有执行`hexo cl`，导致`public/`文件夹内残留上次生成的文件和缓存；
- 浏览器缓存没有清除，部分旧的js文件继续运行。

## 基本配置
Hexo 的配置可以在根目录下的 `_config.yml` 文件中修改，而主题的配置可以在 `themes\主题名称\_config.yml` 中修改。
{% note warning %}
要时刻注意二者的区别，不能混淆。
{% endnote %}
`_config.yml` 文件使用 [YAML 语言](https://www.runoob.com/w3cnote/yaml-intro.html)表示键值对。修改配置时，要注意语法问题，例如缩进的层级关系、键值对的冒号后面要有一空格、冒号不能用中文、数组的表示等等。

在 hexo 的 `_config.yml`中，主要的参数如下：

```yml
# Site
title: #网站标题
subtitle: #网站副标题
description: #网站描述，用于SEO，不要乱写
keywords: keyword1,keyword2,keyword3 #网站关键词，用于搜索
author: #网站作者
language: zh-CN #语言，使用不同的主题需要根据主题文档设成不同值
timezone: Asia/Shanghai #网站时区，默认使用电脑时区

# URL
url: #你的博客网址, 必须以 http:// 或 https:// 开头

# Home page setting
index_generator:
  path: ''
  per_page: 10 #主页每页显示文章的数量
  order_by: -date #分页依据（默认按照日期降序）
```
{% note warning %}
如果博客网站在子目录，比如`http://example.com/blog`，则需要把`path`的值改成`/blog/`。
{% endnote %}

之后如果添加了扩展或者自己定义了一些参数，也要在这里修改和添加。


## 进阶配置
这一章里会介绍配置文件中所有参数的用法，仅供参考，大部分参数保持默认设置就行。
### URL
```yml
# URL
url: #你的博客网址, 必须以 http:// 或 https:// 开头
permalink: :year/:month/:day/:title/ # 用于设置文章永久链接的格式
permalink_defaults: # 永久链接中各部分的默认值
pretty_urls: # 用于缩短页面永久链接的长度，去掉最后的index.html后缀
  trailing_index: true # 若设为 false，则永久链接中去掉 index.html
  trailing_html: true # 若设为 false，则永久链接中去掉 .html
```
### 文件夹指向设置

```yml
# Directory
source_dir: source # 用于存放网页资源
public_dir: public # 用于存放渲染后生成的网页文件
tag_dir: tags # 标签文件夹
archive_dir: archives # 归档文件夹
category_dir: categories # 分类文件夹
code_dir: downloads/code # 代码文件夹，source_dir的子目录
i18n_dir: :lang # 国际化文件夹
skip_render: # 跳过渲染，该文件将不做改动地被复制到 public 中
···
# Include / Exclude file(s)
include: # source文件夹内要包含的文件。hexo默认忽略除了_post和_data外的以`_`或`.`开头的文件和文件夹，此设置可以让它们不被忽略。
exclude: # source文件夹内要忽略的文件（不要用于_post文件夹内）
ignore: # 所有目录内要忽略的文件
···
# Metadata elements
meta_generator: true # 元数据标签，值为`false`时 Hexo 不会在头部插入该标签，建议不要改，可能影响兼容性
```
之后如果想更改标签、归档、分类在导航栏中的层级，就需要在这里修改对应文件夹的指向。
如果有一些页面我们不希望应用主题的默认样式，比如想把写好的网页作为网站的一部分，则可以写到`skip_render`里，例如：
```yml
skip_render: 
  - mypage/**/* # 跳过`mypage/`内所有文件的渲染，包括子文件夹内的文件
  - mypage/* # 跳过`mypage/`内所有文件的渲染，不包括子文件夹
  - mypage/*.html # 跳过`mypage/`内`.html`文件的渲染
  - mypage/test* # 跳过`mypage/`内`test`开头文件的渲染
  - _posts/test-post.md # 跳过这篇文章的渲染
  - mypage/index.html # 跳过这个页面的渲染
```
`Include / Exclude` 的语法同上。

### 文章设置

```yml
# Writing
new_post_name: :title.md # `hexo n post <title>`新建文章的默认文件名称
default_layout: post # `hexo n`的默认布局样式（预设是文章）
titlecase: false # 标题内单词首字母自动大写
external_link: #外链跳转（注意不包括网站内部链接）
  enable: true # 在新标签页中打开链接
  field: site # 对整个网站（site）生效，还是仅对文章（post）生效
  exclude: '' # 需要排除的域名，主域名和子域名需要分别配置
filename_case: 0 # 1: 文件名转换成小写；2: 文件名转换成大写
render_drafts: false # 在网站中显示草稿
post_asset_folder: false # 使用资源（asset）文件夹，若设为`true`，每创建一篇文章，都会有一个同名的资源文件夹被创建，在其中可以存放文章的资源，并用相对路径引用。
relative_link: false # 把链接改成与根目录的相对位址，这样无论域名是什么，链接都会有效。仅在反向代理时建议使用。
future: true # 显示下一篇文章的链接
```
### 代码高亮
代码高亮有两种，一种基于 highlight.js，有自动检测语言类型的功能，但默认不支持行号，hexo 通过表格的形式实现了行号功能；另一种基于 prism.js，支持行号，支持编写插件，支持行高亮，也是MDN的高亮引擎。

```yml
highlight: # 代码高亮设置（基于highlight.js）
  enable: true
  line_number: true # 行号
  auto_detect: false # 当未指定代码块语言时，自动检测语言类型。由于会严重占用资源，建议非必要不要开启。
  tab_replace: '' # 用特定字符串替换tab，例如两空格：'  '。如果在编辑器内以及做了
  wrap: true # highlight.js默认不支持行号显示。为支持行号显示，需要将输出包裹在`<table>`内。`line_number: true`时强制开启。
  hljs: false # 为`true`时，在代码块及内部 class 中添加`hljs-`前缀，以便直接应用highlight.js样式（需要`line_number`和`wrap`均为`false`）
prismjs: # 代码高亮设置（基于prism.js，默认关闭）
  enable: false
  preprocess: true # false: 浏览器端高亮; true: 服务器端高亮
  line_number: true # 行号
  tab_replace: '' #替换tab
```
在NexT中，还可以进一步配置代码高亮主题，在[Highlight](https://theme-next.js.org/highlight/)里可以实时查看不同主题的效果。因为比较喜欢 monokai 这个主题，我使用的是highlight.js，以下是我的配置：
```yml
codeblock:
  # Code Highlight theme
  theme:
    light: monokai-sublime
    dark: monokai-sublime
  prism:
    light: prism
    dark: prism-dark
  # Add copy button on codeblock
  copy_button:
    enable: true
    # Available values: default | flat | mac
    style: mac
```
### 分类&标签设置

Hexo 支持设置分类和标签别名，可用于中英文映射、大小写映射等。适当设置标签和分类别名可以缩短url长度。
```yml
# Category & Tag
default_category: uncategorized # 默认分类，预设为空
category_map: #分类别名，可以做中英文映射、大小写映射等。
  <name>: <slug> # 模板。显示的是`<name>`，url是`<slug>`。
  音乐: music # 示例
  Music: music
tag_map: #标签别名
  <name>: <slug>
```
### 日期和时间设置
Hexo 采用 [Moment.js](https://momentjs.com/) 来解析和显示时间，以下的配置可以设置日期时间格式。

```yml
# Date / Time format
date_format: YYYY-MM-DD # 日期格式
time_format: HH:mm:ss # 时间格式
## updated_option supports 'mtime', 'date', 'empty'
updated_option: 'mtime' # 当页面的 front-matter 内未指定 updated（更新时间）时，updated的取值。`mtime`: 文件的最后修改时间；`date`: 日期，可以用于 git 工作流，因为不会受 git 对文件修改时间的影响；`empty`: 空
```
### 分页
```yml
# Pagination
per_page: 10 #0: 禁用分页
pagination_dir: page #分页目录
```

### 主题配置
```yml
# Extensions
theme: next # 主题选择
theme_config: # 其中的值用于替代主题配置文件中的对应值，优先级最高，但建议非必要不使用，保证配置的整体性
```
主题配置文件可以复制一份放在站点根目录下，并命名为`_config.[theme].yml`，这样会覆盖主题目录下的主题配置文件，便于主题更新时的管理。

## 其他配置
如果安装了一些hexo的扩展插件，插件可能要求把规定的键值对写入`_config.yml`中，按插件文档要求编写即可。另外，也可以自己定义一些键值对，作为全局变量在页面上引用，实现客制化。
