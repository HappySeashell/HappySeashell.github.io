---
title: 使用Hexo搭建博客（三）：NexT 主题配置
date: 2021-09-26 16:47:30
updated: 2021-12-01 04:52:06
tags:
- hexo
- next
categories: 博客搭建
description: NexT 8.7.0 的主题配置与模板修改。系统：Windows10；Hexo版本：4.3.0；NexT版本：8.7.0
---

> 本文部分内容参考 [NexT 官方文档](https://theme-next.js.org/)编写而成。

## 主题基本配置
主题配置文件路径为`~/themes/主题名称/_config.yml`。以 NexT 为例，主题配置文件中有多组可以设置的参数。主要是配置主题的各种样式。NexT 自带的一些插件也可以在这里启用以及设置参数。

例如，改变下面的 `scheme` 参数可以配置主题模板。主题共有四个：[Muse](https://theme-next.js.org/muse/)（默认样式，单栏）、[Mist](https://theme-next.js.org/mist/)（单栏，带横导航栏）、[Pisces](https://theme-next.js.org/pisces/)（双栏，无目录侧栏）、[Gemini](https://theme-next.js.org/)（NexT英文官网的样式，双栏，硬伤是手机端没有可以查看目录的侧栏）。注意改变参数后要把原来的注释掉，只保留一个。

```yml next/_config.yml
# ---------------------------------------------------------------
# Scheme Settings (模板设置)
# ---------------------------------------------------------------
# Schemes
# scheme: Muse
scheme: Mist
# scheme: Pisces
# scheme: Gemini
```
## 新建分类、标签、日程页面
### 标签页
我们可以通过`hexo n page tags` 新建一个页面，新建之后，`~/source/` 中会多出一个名为 `tags` 的文件夹，其中有一个主页 `index.md`。新建页面之后，我们就可以从 `域名/文件夹名/` 访问到这个页面。例如：https://username.github.io/tags/ 。

打开主页，在开头的 Front-matter 加入以下内容：
```yml source/tags/index.md
---
title: tags # 可以自己设成别的
date: 2021-09-02 11:10:48
type: tags # 加入的内容
---
```
这表示当前页面的类型为 `tags`，可以应用到它对应的默认样式。

#### 标签云

配置标签云的样式：

```yml next/_config.yml
tagcloud:
  min: 12 # 最小字体大小
  max: 30 # 最大字体大小
  amount: 200 # 标签总数
  orderby: name # 排序
  order: 1 # 顺序/倒序
```

### 分类页
同样地，通过 `hexo n page categories` 新建一个页面，在主页内指定页面类型为`categories`：
```yml source/categories/index.md
---
title: categories
date: 2021-09-02 11:10:48
type: categories # 加入的内容
---
```
### 日程页
通过 `hexo n page schedule` 新建一个页面，在主页内指定页面类型为`schedule`：
```yml source/schedule/index.md
---
title: schedule
date: 2021-09-02 11:10:48
type: schedule # 加入的内容
---
```
需要注意，这个页面是调用了 Google 日历，所以需要在主题配置里填写如下参数，否则会报错：
```yml next/_config.yml
# Google Calendar
# Share your recent schedule to others via calendar page.
calendar:
  calendar_id: <required> # Google calendar 的 id
  api_key: <required> # 项目的api key。
```

配置 Google Calendar可以参考 Google 的[日历API文档](https://developers.google.cn/calendar/api)。步骤如下：
1. 在[Google Developer Console](https://console.developers.google.com/apis)（要梯子）中启用 Google calendar 的 api，新建一个 project，在OAuth同意屏幕中设置用户类型为“外部”，填写用户邮箱和开发者邮箱，并发布应用。
2. 在凭据中新建APP KEY，设置应用限制为“HTTP引荐来源网址”，填入自己的网站域名。
3. 将对应的 Google Calendar 权限设为公开，并查看 calendar id；
4. 在主题配置里填写对应参数，就可以使用了。但是访问也是需要梯子的。


{% note warning %}
如果仍然不能使用，可能是因为没有更新NexT，这时有三个解决方法：
- 把 `schedule` 里的 `title` 内容删掉
- 把 `~/themes/next/layout/_partials/head/head-unique.njk`里最后的内容改成：
  ```html
  {{ next_data('calendar',
    theme.calendar if page.type === 'schedule' else '')
  }}
  ```
- 按照{% post_link hexo1 %}最后更新主题的方法进行更新
{% endnote %}


## 导航栏配置

我们如何在导航栏添加分类、标签页等，或者其他自定义页面呢？在主题配置文件中可以找到菜单栏设置：
```yml next/_config.yml
# ---------------------------------------------------------------
# Menu Settings（导航栏设置）
# ---------------------------------------------------------------
menu:
  home: / || fa fa-home
  # about: /about/ || fa fa-user
  # tags: /tags/ || fa fa-tags
  # categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  # schedule: /schedule/ || fa fa-calendar
  # sitemap: /sitemap.xml || fa fa-sitemap
  # commonweal: /404/ || fa fa-heartbeat
```

设置格式为 `Key: /link/ || icon` 的形式，其中 `Key` 是导航选项的名称，可以写成中文，也可以写成英文之后在 `~/themes/next/languages/zh-CN.yml` 中添加对应的中英文。

`/link/` 是页面的位置，例如我们新建了一个 comments 页面，它对应的文件夹在项目中的位置为`~/source/comments/`，则用 `hexo g` 渲染成静态页面后，在项目中的位置为 `~/comments/`。因此，如果我们希望它显示在导航上，路径需为`/comments/`。

`icon` 是该页在导航中的小图标，图标来源为 [FontAwesome v5 free](https://fontawesome.com/v5.15/icons?d=gallery&p=2&s=brands&m=free)。`icon` 的格式为`<fa/fas/far/fab> fa-<name> [size] `，其中`<fa/fas/far/fal/fab>` 指定了图标的外观类型。`fa` 为默认值，一般和 `fas` 效果一样；`fas` 为 solid（实心）类型；`far` 为 regular（线条）类型；`fab` 为 brand（商标）类型。`fa-<name>` 是图标名称，可以在官网查询到。`[size]` 是图标大小，可选值为`fa-lg/fa-2x/fa-3x/fa-4x/fa-5x`。

当我们指定了图标之后，会在对应位置生成一个 `<i>` 标签，标签的类名即为我们填写的 `icon` 值，再通过 FontAwesome 的 CSS 样式生成图标。更多图标的配置可以参考 [官方示例](http://www.fontawesome.com.cn/examples/)。
{% note info 点击查看图标示例 %}
### FontAwesome 图标示例
类型（class）|图标
:--:|:--:
`fa fa-comment`|<i class="fa fa-comment"></i>
`fas fa-comment`|<i class="fas fa-comment"></i>
`far fa-comment`|<i class="far fa-comment"></i>
`fab fa-zhihu`|<i class="fab fa-zhihu"></i>
`fa fa-comment fa-2x`|<i class="fa fa-comment fa-2x"></i>
{% endnote %}

例如，我们把 comments 页面加入导航栏：
```yml next/_config.yml
menu:
  home: / || fa fa-home
  archives: /archives/ || fa fa-archive
  comments: /comments/ || fa fa-comment
```
{% note warning %}
把页面加入导航栏时，要生成对应的页面文件夹才能访问。
{% endnote %}

###  多级导航

NexT支持多级导航，修改配置如下：
```yml next/_config.yml
menu:
  home: / || fa fa-home
  archives: /archives/ || fa fa-archive
  # 注意缩进
  submenu: 
    default: /submenu/ || fa fa-comment
    item1: /item1/ || fa fa-comment
    item2: 
      default: /item2/ || fa fa-heart
      item2-2: /item2-2/ || fa fa-heart
```
其中`default`为必填项，代表这个二级导航的默认主页。`item1`和`item2`都是这个导航的子页面，而`item2-2`是`item2`的子页面。一般把子页面的文件夹放在父页面文件夹内，方便管理。

较为特殊的是，把 types，categories，archives加入次级导航。例如，我们新建了一个`categories`页面，页面内包含`tags`和`archives`两个子页面，则应该建立如下的文件夹结构：
```bash
  categories       # 分类页面文件夹
  ├─index.md       # 分类主页，type: categories
  └─tags           # 标签页面文件夹
     └── index.md     # 标签主页，type: tags
```
接下来，对hexo `_config.yml`里的文件夹指向做出修改：
```yml _config.yml
# Directory
tag_dir: categories/tags # 标签文件夹
archive_dir: categories/archives # 归档文件夹
category_dir: categories # 分类文件夹
```
最后，对主题配置里的导航做出修改，注意其与普通路径的不同之处：
```yml next/_config.yml
menu:
  home: / || fa fa-home
  posts: 
    default: /categories/ || fa fa-th
    tags: tags/ || fa fa-tags
    archives: archives/ || fa fa-archive
```

## 侧边栏配置
### 侧边栏样式
在主题配置文件中找到 `sidebar`，有如下选项：
{% tabs setting-sidebar %}
<!-- tab 位置 <code>position</code> -->
* **`left`** → 在屏幕左侧显示。
* `right` → 在屏幕右侧显示。
<!-- endtab -->

<!-- tab 宽度 <code>width</code> -->
通过设定 `sidebar.width` 的值，可以改变侧边栏宽度（单位：像素）：

```yml next/_config.yml
sidebar:
  width: 300
```

{% note info %}
默认值：
* Muse | Mist: `320`
* Pisces | Gemini: `240`
{% endnote %}
<!-- endtab -->

<!-- tab 显示 <code>display</code> -->
* **`post`** → 仅在有目录的文章中显示
* `always` → 在每一页面都显示
* `hide` → 在每一页面都隐藏（浏览者可以手动开启）
* `remove` → 移除侧边栏
<!-- endtab -->

<!-- tab 内边距 <code>padding</code> -->
通过改变 `sidebar.padding` 的值设定内边距:

```yml next/_config.yml
sidebar:
  padding: 18
```
<!-- endtab -->

<!-- tab 偏移 <code>offset</code> -->
通过改变 `sidebar.offset` 的值设定其与导航栏的距离:

```yml next/_config.yml
sidebar:
  offset: 12
```

{% note danger %}
在 **6.0.x** 及之后的版本，只有 Pisces / Gemini 支持 `offset`。
{% endnote %}
<!-- endtab -->

{% endtabs %}

### 头像样式
{% tabs avatar %}
<!-- tab <code>url</code> -->
默认的头像为：

```yml next/_config.yml
avatar:
  url: /images/avatar.gif
```

如果想更换默认头像，只需替换 `url` 如下：

{% subtabs avatar1 %}
<!-- tab 站点目录 -->
把替换头像放在站点目录的 `source/uploads/`，设置键值为 `url: /uploads/avatar.png`。
<!-- endtab -->

<!-- tab NexT 目录 -->
把替换头像放在站点目录的 `themes/next/source/images/`，设置键值为 `url: /images/avatar.png`。
<!-- endtab -->

<!-- tab 网络图像 -->
也可以使用网络上的图像地址： `http(s)://example.com/avatar.png`
<!-- endtab -->
{% endsubtabs %}
<!-- endtab -->

<!-- tab 圆形头像<code>rounded</code> -->
* `true` → 头像为圆形。
* **`false`** → 头像为方形。
<!-- endtab -->

<!-- tab 旋转<code>rotated</code> -->
* `true` → 鼠标放在上方时头像会旋转。
* **`false`** → 鼠标放在上方时头像不会旋转。
<!-- endtab -->
{% endtabs %}

### 站点动态
设置是否显示分类、标签、归档的数量。

```yml next/_config.yml
site_state: true
```
### 社交链接
{% note warning %}
社交链接必须具有完整的 url。
{% endnote %}

格式如下：
```yml next/_config.yml
social:
  GitHub: https://github.com/yourname || fab fa-github
  E-Mail: mailto:yourname@gmail.com || fa fa-envelope
  Weibo: https://weibo.com/yourname || fab fa-weibo
  Google: https://plus.google.com/yourname || fab fa-google
  Twitter: https://twitter.com/yourname || fab fa-twitter
  FB Page: https://www.facebook.com/yourname || fab fa-facebook
  StackOverflow: https://stackoverflow.com/yourname || fab fa-stack-overflow
  YouTube: https://youtube.com/yourname || fab fa-youtube
  Instagram: https://instagram.com/yourname || fab fa-instagram
  Skype: skype:yourname?call|chat || fab fa-skype
```

默认显示社交链接的图标。样式可以配置如下：

{% tabs social_icons %}
<!-- tab <code>enable</code> -->
选择是否显示图标。

```yml next/_config.yml
social_icons:
  enable: true
```
<!-- endtab -->

<!-- tab <code>icons_only</code> -->
只显示图标：

```yml next/_config.yml
social_icons:
  icons_only: true
```
<!-- endtab -->

<!-- tab <code>transition</code> -->
显示具有过渡效果：

```yml next/_config.yml
social_icons:
  transition: true
```
<!-- endtab -->

{% endtabs %}

### 相关链接

{% tabs blogrolls %}
<!-- tab <code>links_settings</code> -->
设置链接图标：

```yml next/_config.yml
links_settings:
  icon: fa fa-globe
```
设置标题：

```yml next/_config.yml
links_settings:
  title: Links
```
设置链接的显示方式：有 `inline` 和 `block` 两种。

```yml next/_config.yml
links_settings:
  layout: block
```
<!-- endtab -->

<!-- tab <code>links</code> -->
添加相关链接：

```yml next/_config.yml
links:
  Title1: https://example1.com/
  Title2: https://example2.com/
```
<!-- endtab -->

{% endtabs %}

### 文章目录

{% tabs toc %}
<!-- tab <code>enable</code> -->
设置是否显示文章目录：

```yml next/_config.yml
toc:
  enable: true
```
<!-- endtab -->

<!-- tab <code>number</code> -->
设置是否显示列表号：

```yml next/_config.yml
toc:
  number: true
```
<!-- endtab -->

<!-- tab <code>wrap</code> -->
标题超出侧边栏宽度时，是否换行显示：

```yml next/_config.yml
toc:
  wrap: true
```
<!-- endtab -->

<!-- tab <code>expand_all</code> -->
初始显示全部级别的标题：

```yml next/_config.yml
toc:
  expand_all: true
```
<!-- endtab -->

<!-- tab <code>max_depth</code> -->
生成目录的最大层级深度（默认为`6`）：

```yml next/_config.yml
toc:
  max_depth: 3
```
<!-- endtab -->
{% endtabs %}

## 站点页脚配置
### 开始时间

默认显示当前年份： `© 2021`。

```yml next/_config.yml
footer:
  since: 2021
```

### 小图标

默认显示红色心形。

{% tabs icon %}
<!-- tab <code>name</code> -->
图标名称：
```yml next/_config.yml
footer:
  icon:
    name: fa fa-heart
```

<!-- endtab -->

<!-- tab <code>animated</code> -->
设置是否有图标动画（缩放）：

```yml next/_config.yml
footer:
  icon:
    animated: false
```
<!-- endtab -->

<!-- tab <code>color</code> -->
设置图标颜色（必须使用十六进制）：

```yml next/_config.yml
footer:
  icon:
    color: "#808080"
```

<!-- endtab -->
{% endtabs %}

### 版权名称

默认显示 站点配置文件中的 `author`。 可以在如下设置里进行修改：

```yml next/_config.yml
footer:
  copyright:
```

### 平台信息

设置是否显示 `Powered by Hexo & NexT.Muse`。

```yml next/_config.yml
footer:
  powered: true
```

### 备案信息

设置是否显示备案信息。

```yml next/_config.yml
footer:
  beian:
    enable: true
    icp: 京ICP备 1234567890号-1
    gongan_id: 1234567890
    gongan_num: 京公网安备 1234567890号
    gongan_icon_url: /uploads/beian.png
```
## 文章配置
### 文章摘要

使用以下方式在主页显示摘要和**阅读更多**按钮。

{% tabs preamble %}
<!-- tab 文中标记 -->
在文中使用 `<!-- more -->`，注释前的内容作为摘要。

<!-- endtab -->

<!-- tab 文章描述<code>excerpt_description</code> -->
如果文章前的 [front-matter](https://hexo.io/docs/front-matter) 添加了 `description`, 会将 `description` 的值作为摘录。可以在主题配置文件中禁用：

```yml next/_config.yml
excerpt_description: true
```

<!-- endtab -->
{% endtabs %}

{% note info %}
建议使用`<!-- more -->`，更方便且可以使用插件。
{% endnote %}

### 文章信息

可以显示创建、更新日期和分类。

{% tabs postmeta %}
<!-- tab 描述文本<code>item_text</code> -->
设置是否显示文章信息的描述文本：

```yml next/_config.yml
post_meta:
  item_text: true
```
<!-- endtab -->

<!-- tab 创建日期<code>created_at</code> -->
设置是否显示创建日期：

```yml next/_config.yml
post_meta:
  created_at: true
```
<!-- endtab -->

<!-- tab 更新日期<code>updated_at</code> -->

{% note warning %}
Make sure you set `use_date_for_updated` and `updated_option` in {% label info@site config file %} correctly, otherwise this option will not take effect. See also [Date / Time format](https://hexo.io/docs/configuration#Date-Time-format).
{% endnote %}

{% subtabs postmeta1 %}
<!-- tab <code>enable</code> -->
设置是否显示更新日期：

```yml next/_config.yml
post_meta:
  updated_at:
    enable: true
```
<!-- endtab -->

<!-- tab <code>another_day</code> -->
默认情况下，若创建日期与更新日期相同，则更新日期在创建日期下方以弹出标题的形式显示。可以在下面的设置中禁用：

```yml next/_config.yml
post_meta:
  updated_at:
    another_day: true
```
<!-- endtab -->
{% endsubtabs %}

<!-- endtab -->

<!-- tab 分类<code>categories</code> -->

设置是否显示分类：

```yml next/_config.yml
post_meta:
  categories: true
```
<!-- endtab -->

{% endtabs %}

### 字数统计

{% tabs wordcount %}
<!-- tab 安装 -->
在站点目录下，通过下面的命令安装 `hexo-word-counter` 插件：

```bash
$ npm install hexo-word-counter
$ hexo clean
```
<!-- endtab -->

<!-- tab 配置 -->
在站点配置文件中添加下面任何的配置，都可启用该插件：

{% subtabs wordcount1 %}
<!-- tab 单词<code>symbols</code> -->
统计单词：
```yml hexo/_config.yml
symbols_count_time:
  symbols: true
```
<!-- endtab -->

<!-- tab 阅读时间<code>time</code> -->
统计阅读时间：

```yml hexo/_config.yml
symbols_count_time:
  time: true
```
<!-- endtab -->

<!-- tab 站点总字数<code>total_symbols</code> -->
统计站点总字数：

```yml hexo/_config.yml
symbols_count_time:
  total_symbols: true
```
<!-- endtab -->

<!-- tab 站点总阅读时间<code>total_time</code> -->
统计站点总阅读时间：

```yml hexo/_config.yml
symbols_count_time:
  total_time: true
```
<!-- endtab -->

<!-- tab 平均单词长度<code>awl</code> -->
设置平均单词长度：

```yml next/_config.yml
symbols_count_time:
  awl: 4
```
<!-- endtab -->

<!-- tab 每分钟阅读字数<code>wpm</code> -->
设置每分钟阅读字数。可以在 [WordCounter](https://wordcounter.net/) 中检测。

```yml next/_config.yml
symbols_count_time:
  wpm: 275
```
<!-- endtab -->

{% endsubtabs %}

<!-- endtab -->

<!-- tab NexT 配置 -->
在主题配置文件中，还可设置下面的选项：

{% subtabs wordcount2 %}
<!-- tab 行内显示<code>separated_meta</code> -->
设置是否把信息显示在同一行：

```yml next/_config.yml
symbols_count_time:
  separated_meta: true
```
<!-- endtab -->

<!-- tab 描述文本<code>item_text_total</code> -->
设置是否显示描述文本：

```yml next/_config.yml
symbols_count_time:
  item_text_total: true
```
<!-- endtab -->

{% endsubtabs %}

<!-- endtab -->
{% endtabs %}

### 标签图标

默认情况下，标签带有 # 标志。如果想使用图标，可以在下面的设置中更改：

```yml next/_config.yml
tag_icon: true
```

### 打赏

首先保存支付二维码到目录内或云端，再进行如下设置：

```yml next/_config.yml
# 打赏设置
reward_settings:
  enable: true # 每个文章后显示打赏图标
  animation: false # 动画
  comment: Buy me a coffee # 描述文本

# 打赏二维码
reward:
  wechatpay: /images/wechatpay.png
  alipay: /images/alipay.png
  bitcoin: /images/bitcoin.png
```

也可以添加其他平台的二维码：

```yml next/_config.yml
paypal: /images/paypal.png
monero: /images/monero.png
```

### 关注

在下面的设置中选择或者添加关注方式：

```yml next/_config.yml
follow_me:
  #Twitter: https://twitter.com/username || fab fa-twitter
  #Telegram: https://t.me/channel_name || fab fa-telegram
  #WeChat: /images/wechat_channel.jpg || fab fa-weixin
  #RSS: /atom.xml || fa fa-rss
```

### 相关文章

通过安装插件 [hexo-related-popular-posts](https://github.com/tea3/hexo-related-popular-posts)来实现。

{% tabs related_posts %}
<!-- tab 安装 -->
通过下面的命令安装 `hexo-related-popular-posts`：

```bash
$ npm install hexo-related-popular-posts
$ hexo clean
```
<!-- endtab -->

<!-- tab 使用<code>enable</code> -->
在主题配置文件中设置是否显示相关文章：

```yml next/_config.yml
related_posts:
  enable: true
```
<!-- endtab -->

<!-- tab 标题<code>title</code> -->
设置版块标题：

```yml next/_config.yml
related_posts:
  title:
```
<!-- endtab -->

<!-- tab 在主页显示<code>display_in_home</code> -->
设置是否在主页显示：

```yml next/_config.yml
related_posts:
  display_in_home: true
```
<!-- endtab -->

<!-- tab 显示方式<code>params</code> -->

{% subtabs related_posts1 %}
<!-- tab 最大数量<code>maxCount</code> -->
设置显示的最大数量：

```yml next/_config.yml
related_posts:
  params:
    maxCount: 5
```
<!-- endtab -->

<!-- tab 混合比例<code>PPMixingRate</code> -->
热门文章和相关文章的混合比例：

```yml next/_config.yml
related_posts:
  params:
    #PPMixingRate: 0.0
```
<!-- endtab -->

<!-- tab 日期<code>isDate</code> -->
显示相关文章的日期：

```yml next/_config.yml
related_posts:
  params:
    isDate: true
```
<!-- endtab -->

<!-- tab 图像<code>isImage</code> -->
显示相关文章的图像：

```yml next/_config.yml
related_posts:
  params:
    isImage: true
```
<!-- endtab -->

<!-- tab 摘录<code>isExcerpt</code> -->
显示相关文章的摘录：

```yml next/_config.yml
related_posts:
  params:
    isExcerpt: true
```
<!-- endtab -->

{% endsubtabs %}
<!-- endtab -->
{% endtabs %}

### 编辑文章

NexT 支持文章的编辑功能。通过启用此功能，用户可以快速浏览和修改 GitHub 上的博客源代码。

{% tabs post_edit %}
<!-- tab <code>enable</code> -->
设置启用：
```yml next/_config.yml
post_edit:
  enable: true
```
<!-- endtab -->

<!-- tab <code>url</code> -->
设置代码仓库位置：

* 用于站点仓库：
  * 查看： `url: https://github.com/user-name/repo-name/tree/master/source/_posts/`
  * 编辑： `url: https://github.com/user-name/repo-name/edit/master/source/_posts/`
* 用于文章仓库：
  * 查看： `url: https://github.com/user-name/repo-name/_posts/tree/master/`
  * 编辑： `url: https://github.com/user-name/repo-name/_posts/edit/master/`

```yml next/_config.yml
post_edit:
  url:
```
<!-- endtab -->

{% endtabs %}

### 上/下篇文章

设置是否显示及显示位置。可用的值为`left`、`right`、`false`。

```yml next/_config.yml
post_navigation: left
```

## 自定义页面
### 使用归档页作为主页

在站点配置页面中设置归档页路径如下：

```yml hexo/_config.yml
archive_dir: /

index_generator:
  path: archives
  per_page: 10
  order_by: -date
```

### 404 页面

新建 404 页面：

```bash
$ cd hexo-site
$ hexo new page 404
```

在站点配置文件中禁用：

```yml hexo/_config.yml
relative_link: false
```

#### 公益 404

如果想启用腾讯的公益404服务，把404页面设置为如下内容：

```md
---
title: '404'
date: 2014-12-22 12:39:04
comments: false
---
<script src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js"
        charset="utf-8" homePageUrl="/" homePageName="Back to home">
</script>
```

把404页面添加到导航栏：

```yml next/_config.yml
menu:
  home: / || fa fa-home
  archives: /archives/ || fa fa-archive
  commonweal: /404/ || fa fa-heartbeat
```
## 其他设置
### 预连接

设置预先连接字体和插件的CDN：

```yml next/_config.yml
# Preconnect CDN for fonts and plugins.
# For more information: https://www.w3.org/TR/resource-hints/#preconnect
preconnect: true
```

### 文本对齐

自定义文本对齐方式：

| 值     | 效果            |
| ------ | -------------- |
| `start`        | 左对齐|
| `end`          | 右对齐|
| `left`         | 行内左对齐|
| `right`        | 行内右对齐|
| `center`       | 行内居中|
| `justify`      | 除最后一行外，行内两端对齐|
| `justify-all`  | 行内全部两端对齐|
| `match-parent` | 遗传父元素的属性，但值根据父元素的方向决定|

```yml next/_config.yml
text_align:
  # 可选值: start | end | left | right | center | justify | justify-all | match-parent
  desktop: justify
  mobile: justify
```

### 移动设备自适应

在宽度较窄的移动设备中自动减小`padding`和`margin`的值：

```yml next/_config.yml
mobile_layout_economy: true
```

### 主题颜色

通过设置以下的值改变主题色（十六进制格式）：

```yml next/_config.yml
theme_color:
  light: "#222"
  dark: "#222"
```
### 滚动条
用于设置页面滚动条：
```yml next/_config.yml
body_scrollbar:
  # 滚动条置于内容上方
  overlay: false
  # 始终显示滚动条，无论内容是否超出屏幕
  stable: false
```


### 回到顶部按钮

{% tabs b2t %}
<!-- tab 启用<code>enable</code> -->
设置是否启用：
```yml next/_config.yml
back2top:
  enable: true
```

<!-- endtab -->

<!-- tab 侧边栏<code>sidebar</code> -->
设置把按钮放在侧边栏：
```yml next/_config.yml
back2top:
  # Back to top in sidebar.
  sidebar: true
```
<!-- endtab -->

<!-- tab 滚动百分比<code>scrollpercent</code> -->
设置显示当前位置占总长度的百分比：
```yml next/_config.yml
back2top:
  # Scroll percent label in b2t button.
  scrollpercent: true
```
<!-- endtab -->
{% endtabs %}

### 阅读进度

设置启用阅读进度：

```yml next/_config.yml
reading_progress:
  enable: true
  # 可选值: left | right
  start_at: left
  # 可选值: top | bottom
  position: top
  reversed: false
  color: "#37c6c0"
  height: 2px
```

### 书签

书签是一个可以自动保存阅读进度的插件，使浏览者能定位上次阅读到的位置。

在主题配置文件中启用：

```yml next/_config.yml
bookmark:
  enable: false
  # 书签颜色
  color: "#222"
  # auto：关闭页面或点击书签按钮时保存阅读进度
  # manual：点击书签按钮时保存阅读进度
  save: auto
```

### GitHub 横幅

在右上方显示 `Follow me on GitHub` 横幅：

```yml next/_config.yml
github_banner:
  enable: true
  permalink: https://github.com/yourname # 链接必须完整
  title: Follow me on GitHub # 标题
```

### 自定义字体

NexT 提供五种字体设置

* Global Font: 全局字体；
* Title Font: 网页标题字体；
* Headlines Font: 文章标题字体；
* Article Font: 文章字体；
* Code Font: 代码字体。

如果选择的字体不可用，将退回到默认字体设置：

* Non-code Font: 退回到 `"PingFang SC", "Microsoft YaHei", sans-serif`
* Code Font: 退回到 `consolas, Menlo, "PingFang SC", "Microsoft YaHei", monospace`

```yml next/_config.yml
font:
  enable: true

  # 字体源, 默认为 https://fonts.googleapis.com
  host:

  # 字体设置
  # `external: true` 从上方的字体源加载字体.
  # `family: Times New Roman`. 字体家族，无需引号.
  # `size: x.x`. 字体大小，使用 `em` 单位. 默认: 1 (16px)

  # 全局字体： <body>内所有元素的字体.
  global:
    external: true
    family: Monda
    size: 1.125

  # 网站标题字体 (.site-title).
  title:
    external: true
    family: Lobster Two
    size:

  # 文章标题字体 (<h1> to <h6>).
  headings:
    external: true
    family: Amita
    size:

  # 文章字体 (.post-body).
  posts:
    external: true
    family: Montserrat

  # 代码块字体： <code> and code blocks.
  codes:
    external: true
    family: PT Mono
```

每个选项可以应用多个字体，例如，中英文使用不同字体。

```yml next/_config.yml
font:
  ...
  title:
    external: true
    family: Roboto Slab, Noto Serif SC
    size:
```

如果需要更多的自定义，在站点根目录下的 `source/_data/variables.styl` 中添加以下变量：
```styl hexo/source/_data/variables.styl
// 标题字体
$font-family-headings = Georgia, sans

// 字体家族
$font-family-base = "Microsoft YaHei", Verdana, sans-serif

// 代码字体
$code-font-family = "Input Mono", "PT Mono", Consolas, Monaco, Menlo, monospace

// 文章字体大小
$font-size-base = 16px

// 表格和代码字体大小
$table-font-size = 13px
```

并在主题配置文件中取消`variable`在 `custom_file_path`中的注释。

### SEO 设置

SEO（Search Engine Optimization）指搜索引擎优化，用以让搜索引擎更好地索引网页。

在站点配置文件中可以设置`subtitle`，并在主题配置文件将其添加到索引：

```yml next/_config.yml
index_with_subtitle: true
```

### 站长工具

详见 [NexT 站长工具文档](https://theme-next.js.org/docs/theme-settings/seo.html#Webmaster-Tools)。

### 国际化
详见 [NexT 国际化文档](https://theme-next.js.org/docs/theme-settings/internationalization.html)。

## 第三方插件
### 数学公式

文章中的数学公式采用 LaTeX 语法，可通过 [MathJax](https://www.mathjax.org) 或 [KaTeX](https://katex.org) 两种方式渲染。Mathjax 支持的功能更多，但渲染也更慢。KaTeX [功能较少](https://github.com/KaTeX/KaTeX/wiki/Things-that-KaTeX-does-not-(yet)-support)，但较为轻量，渲染快。在主题配置文件中设置如下：

```yml next/_config.yml
# 数学公式渲染
math:
  # 默认 (false) 只在需要的页面（页面设置 `mathjax: true`）加载 mathjax / katex script。
  # 若设置为 true, 在每个页面都会加载 mathjax / katex，影响网页运行速度。建议设置为 false。
  every_page: false

  mathjax:
    enable: true
    # 可选值： none（不编号） | ams（自动方程式编号） | all（所有公式编号）
    tags: none

  katex:
    enable: false
    # 若设置为 true，复制公式内容将为 LaTeX 格式。参见 https://github.com/KaTeX/KaTeX/tree/master/contrib/copy-tex
    copy_tex: false
```
若设置`every_page: false`，控制单页使用数学公式的语法如下：

{% note default **示例** %}

- 会渲染数学公式：

    ```md
    ---
    title: 渲染
    mathjax: true
    ---
    ```

- 不会渲染数学公式：

    ```md
    ---
    title: 不渲染
    mathjax: false
    ---
    ```
    ```md
    ---
    title: 不渲染
    ---
    ```

{% endnote %}


#### 渲染引擎

选择公式渲染引擎后，必须安装对应的 Hexo 渲染器，否则可能不会正常显示。


{% tabs render-engines %}
<!-- tab MathJax -->
**渲染器选择**

可选的渲染器有:

- [hexo-renderer-pandoc](https://github.com/wzpan/hexo-renderer-pandoc)（推荐使用）

{% note warning %}

**渲染器选择**

如果使用其他渲染器，如 [hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked)需要注意 Markdown 和 LaTeX 的语法冲突。例如， 下划线 (`_`) 可以解释为 Markdown 中斜体文本的开头，或 TeX 中的下标标记。为避免语法错误，需改用转义字符  (`\_`) ：

```diff
-$\epsilon_0$
+$\epsilon\_0$
-\begin{eqnarray*}
+\begin{eqnarray\*}
-\\
+\\\\
```

{% endnote %}

1. 卸载原始渲染器 `hexo-renderer-marked`，并安装  `hexo-renderer-pandoc`:

    ```bash
    $ npm un hexo-renderer-marked
    $ npm i hexo-renderer-pandoc
    ```

2. [pandoc](https://github.com/jgm/pandoc) 在安装 hexo-renderer-pandoc 时是必须的，这里给出 [如何安装 pandoc](https://github.com/jgm/pandoc/blob/master/INSTALL.md)。

**插件**

MathJax 的所有扩展都会自动加载。例如， [mhchem](https://mhchem.github.io/MathJax-mhchem/) （一个化学方程式工具）实现了LaTeX mhchem 包的 `\ce` 和 `\pu` 化学方程式宏 。
<!-- endtab -->

<!-- tab KaTeX -->
**渲染器选择**

可选的渲染器有:

- [hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)
- [hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it)

**安装**

1. 卸载原始渲染器 `hexo-renderer-marked`，并安装新的渲染器：

{% subtabs katex-renderer %}
<!-- tab hexo-renderer-markdown-it-plus -->

```bash
$ npm un hexo-renderer-marked
$ npm i hexo-renderer-markdown-it-plus
```
<!-- endtab -->

<!-- tab hexo-renderer-markdown-it -->

```bash
$ npm un hexo-renderer-marked
$ npm i hexo-renderer-markdown-it
```

如果选择 `hexo-renderer-markdown-it`，也需要安装 `markdown-it-katex`:

```bash
$ npm i markdown-it-katex
```

并且在站点配置文件中需要给  `hexo-renderer-markdown-it` 添加 `markdown-it-katex` 插件：

```yml hexo/_config.yml
# hexo-renderer-markdown-it 配置
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-katex
```
<!-- endtab -->
{% endsubtabs %}

**插件**

KaTeX 的 [Copy-tex 扩展](https://github.com/KaTeX/KaTeX/tree/master/contrib/copy-tex)在选择和复制整个渲染元素时，剪贴板内容会呈现为由指定分隔符包围的 LaTeX 源。

```yml next/_config.yml
math:
  ...
  katex:
    # 参见: https://github.com/KaTeX/KaTeX/tree/master/contrib/copy-tex
    copy_tex: true
```

{% note danger %}
**KaTeX 的已知问题**

1.  KaTeX [常见问题](https://katex.org/docs/issues.html)。
2. 数学公式 (` $$...$$ `) 需要另起一行([comment #32](https://github.com/theme-next/hexo-theme-next/pull/32#issuecomment-357489509))。
3. 不支持 Unicode ([comment #32](https://github.com/theme-next/hexo-theme-next/pull/32#issuecomment-357489509))。
4. 行内公式 (..` $...$ `) 在 **开头的 ` $ ` 后 和结束的 ` $ ` 前** 不能有空格 ([comment #32](https://github.com/theme-next/hexo-theme-next/pull/32#issuecomment-357489509))。
5. 在小标题中使用数学公式，在 TOC 目录中会显示对应的 LaTeX 代码三次([comment #32](https://github.com/theme-next/hexo-theme-next/pull/32#issuecomment-359018694))。
6. 文章标题中使用的公式不会被渲染 ([comment #32](https://github.com/theme-next/hexo-theme-next/pull/32#issuecomment-359142879))。
{% endnote %}
<!-- endtab -->
{% endtabs %}

{% note warning %}
如果安装多余的数学公式插件，例如 `hexo-math` 或 `hexo-katex`，可能会与内置渲染引擎冲突。
{% endnote %}

更多使用示例请参考 [NexT 数学公式](https://theme-next.js.org/docs/third-party-services/math-equations.html#Examples)。

### 评论系统

NexT允许同时启用多个评论系统，配置如下：

```yml next/_config.yml
# 多评论系统支持
comments:
  # 可选值: tabs | buttons
  style: tabs
  # 选择默认显示的评论系统：
  # 可选系统： disqus | disqusjs | changyan | livere | gitalk | utterances | isso
  active:
  # 设为 `true` 则自动保存访客使用的评论系统：
  storage: true
  # 对所有评论系统启用懒加载。IE和2017年之前发布的大多数浏览器不支持。
  lazyload: false
  # 修改评论系统的图标、文本、顺序，下面是示例：
  nav:
    #disqus:
    #  text: Load Disqus
    #  order: -1
    #gitalk:
    #  order: -2
```

如果博客读者主要使用不支持懒加载的老版浏览器，可使用 [Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)。

#### 页面禁用评论

启用评论服务（如Disqus）后，所有新页面都将自动提供评论服务。如果想在一个页面中禁用它，在页面中设置：

```md your-post.md
title: All tags
type: "tags"
comments: false
---
```

#### 重命名评论计数文本

文章开头会显示评论系统名称及评论数量。在`languages.yml`中可对其重命名: [覆盖默认翻译](https://theme-next.js.org/docs/theme-settings/internationalization.html#Override-Default-Translations)。

#### 评论系统的选择

关于各评论系统的特点，可以查看[评论系统|NexT](https://theme-next.js.org/docs/third-party-services/comments.html#Disqus)中的介绍。如果需要使用其他评论系统，则需安装对应插件。

#### Waline 的安装

若想使用 Waline 作为评论系统，则需安装 [@waline/hexo-next](https://www.npmjs.com/package/@waline/hexo-next) 插件：

```bash
$ npm install @waline/hexo-next
```
并在站点配置文件或主题配置文件中添加如下配置：

```yml _config.yml 或 next/_config.yml
# Waline
# 官网 https://waline.js.org, Github https://github.com/walinejs/waline
waline:
  enable: false
  serverURL: https://waline.vercel.app # Waline 服务器地址
  placeholder: Just go go # 评论占位文字
  avatar: mm # Gravatar 头像样式
  meta: [nick, mail, link] # 评论选项
  pageSize: 10 # 每页显示评论数
  lang: # 语言，可选值: en, zh-cn
  # 注: 不要同时启用 `waline.visitor` 和 `leancloud_visitors`
  visitor: false # 文章阅读统计
  comment_count: true # 设置评论数是否在主页显示
  requiredFields: [] # 必填项目: [nick] | [nick, mail]
  libUrl: # 设置库的 CDN 链接
```

### 文章打分与分享

#### 给文章打分

登录到 [widgetpack](https://widgetpack.com/admin#signin) 并添加新站点，获取站点ID:

```js
wpac_init.push({widget: 'Rating', id: ID});
```

在主题配置文件中设置如下：

```yml next/_config.yml
rating:
  enable: false
  id:     ID #<app_id>
  color:  "#fc6423"
```

#### 添加分享按钮

该服务基于[AddThis](https://www.addthis.com)。在 官网的 `Profile Settings` → `General` → `ID`中获取服务 ID。在主题配置文件中配置如下：
```yml next/_config.yml
add_this_id: your_add_this_id
```

### 统计与分析

{% note warning %}
只要页面的 url 与站点配置文件中设置的 url 不匹配，NexT 就不会将记录发送给分析服务提供商，以防止本地调试污染分析。
{% endnote %}

#### 分析工具

##### Google 分析

官网为 [Google Analytics](https://analytics.google.com)。在主题配置文件中配置如下：

```yml next/_config.yml
# Google Analytics
google_analytics:
  tracking_id: UA-XXXXXXXX-X # Google track ID，总以 UA 开头
  only_pageview: false # 启用时，NexT 仅将`pageview` 事件发送到 Google 分析，以提供更好的性能，但没有完整的分析功能。
```

##### 百度分析

官网：[Baidu Analytics](https://tongji.baidu.com)。复制`hm.js?`后面的脚本 ID，添加到主题配置文件中：

```yml next/_config.yml
# 百度分析 ID
baidu_analytics: your_id
```

##### Growingio 分析

参见[官方文档](https://docs.growingio.com/v3/developer-manual/sdkintegrated/web-js-sdk/latest-jssdk)。在主题配置文件中配置如下：

```yml next/_config.yml
# Growingio 分析
growingio_analytics: # <project_id>
```

##### Cloudflare 网页分析

在主题配置文件中配置如下：

```yml next/_config.yml
# Cloudflare 网页分析
cloudflare_analytics:
```

#### 访客统计

##### LeanCloud

可添加文章阅读时间。 为使其安全运行，参见 [hexo-leancloud-counter-security](https://github.com/theme-next/hexo-leancloud-counter-security)。

1. 登录 [LeanCloud](https://console.leancloud.app/login) 并添加应用，获取 APP ID 和 APP KEY。
2. 安装 `hexo-leancloud-counter-security`：
  ```bash
  $ npm install hexo-leancloud-counter-security
  ```
3. 在站点配置文件中配置如下：
  ```yml hexo/_config.yml
  leancloud_counter_security:
    enable_sync: true
    app_id: <your app id>
    app_key: <your app key>
    username: <your username>
    password: <your password> # 建议留空。
  ```
4. 在主题配置文件中配置如下：
  ```yml next/_config.yml
  # 显示每篇文章的访问数。
  leancloud_visitors:
    enable: true
    app_id: #<app_id>
    app_key: #<app_key>
    # 国内版必填参数：
    server_url: # <your server url>
    # 参见 https://github.com/theme-next/hexo-leancloud-counter-security
    # 若不担心安全问题，则可设置`security` 为 `false`。
    security: true
  ```

##### Firebase

[Firebase](https://console.firebase.google.com/u/0/) 提供访客统计功能。在主题配置文件中配置如下：

```yml next/_config.yml
firestore:
  enable: true
  collection: articles #必填，用于访问 firestore 数据库
  apiKey: #必填
  projectId: #必填
```

##### 不蒜子统计

无需登录，但统计量不准确。配置如下：

```yml next/_config.yml
busuanzi_count:
  total_visitors: true # 显示总访客数
  total_visitors_icon: fa fa-user
  total_views: true # 显示总浏览数
  total_views_icon: fa fa-eye
  post_views: true # 单篇文章浏览数
  post_views_icon: far fa-eye
```

### 网页搜索

#### Algolia 搜索

需要安装插件： [Hexo Algolia](https://github.com/oncletom/hexo-algolia) 或 [Hexo Algoliasearch](https://github.com/LouisBarranqueiro/hexo-algoliasearch)。但免费账户限制内容索引功能。参见 [NexT 官方教程](https://theme-next.js.org/docs/third-party-services/search-services.html#Algolia-Search)来安装。

#### 本地搜索

本地搜索不需要任何外部第三方服务，并且可以由搜索引擎额外索引，建议使用。

通过下面的命令安装：

```bash
$ npm install hexo-generator-searchdb
```

在站点配置文件中配置：

```yml hexo/_config.yml
search:
  path: search.xml
  field: post
  content: true
  format: html
```
在主题配置文件中配置如下：

```yml next/_config.yml
# Local search
# Dependencies: https://github.com/next-theme/hexo-generator-searchdb
local_search:
  enable: true
  # auto：输入值改变时自动搜索
  # manual：回车时进行搜索
  trigger: auto
  # 1: 顺序显示；-1: 倒序显示
  top_n_per_article: 1
  # 解码 html 字符串，使之可读
  unescape: false
  # 在页面加载前预加载搜索索引
  preload: false
```

### 聊天室

#### Chatra

官网：[Chatra](https://chatra.com) 

在主题配置文件中配置如下：

```yml next/_config.yml
# Chatra Support
# See: https://chatra.com
# Dashboard: https://app.chatra.io/settings/general
chatra:
  enable: true
  async: true
  id: <ChatraID>
```
并激活侧边栏按钮：

```yml next/_config.yml
# 在侧边栏中启用聊天按钮
chat:
  enable: true
  icon: fa fa-comment
  text: Chat
```

#### Tidio

官网： [Tidio](https://www.tidio.com/)。

在主题配置文件中配置如下：

```yml next/_config.yml
# Tidio Support
# See: https://www.tidio.com
# Dashboard: https://www.tidio.com/panel/dashboard
tidio:
  enable: true
  key: <Publick Key>
```
并用同样方法激活侧边栏按钮。

#### Gitter

[Gitter](https://gitter.im) 是一个聊天社区。

在主题配置文件中配置如下

```yml next/_config.yml
# Gitter Support
# For more information: https://gitter.im
gitter:
  enable: true
  room: <Community>/<Room Name>
```
并用同样方法激活侧边栏按钮。

### 外部插件
#### PJAX

[Pjax](https://github.com/MoOx/pjax) 是一个独立的 JavaScript 模块，它使用 AJAX （一种异步方法） 和`pushState()`提供快速的浏览体验。

{% note warning %}
使用图像时需要用绝对路径或[Hexo asset_img tag](https://hexo.io/docs/tag-plugins#Include-Assets)标签，否则在 Pjax 刷新期间可能无法加载图像。
{% endnote %}

在主题配置文件中配置如下：

```yml next/_config.yml
# 参考: https://github.com/next-theme/pjax
pjax: true
```
#### 图片灯箱

##### Fancybox

Fancybox 是一个 jQuery 灯箱效果脚本，用于放大显示图像，视频等。在主题配置文件中配置如下：

```yml next/_config.yml
fancybox: true
```

##### Medium Zoom

[Medium Zoom](https://github.com/francoischalifour/medium-zoom) 和 Fancybox 的作用类似，用于缩放图像。在主题配置文件中配置如下：

```yml next/_config.yml
mediumzoom: true
```

{% note warning %}
不要同时启用 `fancybox` 和 `mediumzoom`。
{% endnote %}

#### 图片懒加载

[Lozad.js](https://github.com/ApoorvSaxena/lozad.js) 是一个图像懒加载插件，在用户滚动到视口之外的图像之前，不会加载这些图像。在主题配置文件中配置如下：

```yml next/_config.yml
lazyload: true
```

启用或禁用 lazyload 后，需要在站点根目录中运行：

```bash
$ hexo clean
```

#### 自动加空格

[pangu.js](https://github.com/vinta/pangu.js) 将自动在页面上的所有中文字符和英文、数字符号之间插入一个空格。在主题配置文件中配置如下：

```yml next/_config.yml
pangu: true
```

#### 快速加载链接

[Quicklink](https://github.com/GoogleChromeLabs/quicklink) 通过在闲时预取视口内链接来加快后续页面加载速度。在主题配置文件中配置如下：

```yml next/_config.yml
...
quicklink:
  enable: true
  home: true
  archive: true
  delay: true
  timeout: 3000
  priority: true
...
```

#### 动画效果

NexT默认启用 Anime.js 和Animate.css支持的动画效果，这会略微拖慢网页加载速度，可以设置`motion.enable` 为 `false`来禁用它。可以查看 [NexT 动画效果预览](https://theme-next.js.org/animate/)，在主题配置文件中配置如下：

```yml next/_config.yml
# 基于 Animate.css
# For more information: https://animate.style
motion:
  enable: true
  async: false
  transition:
    # 所有动画效果： https://theme-next.js.org/animate/
    post_block: fadeIn
    post_header: fadeInDown
    post_body: fadeInDown
    coll_header: fadeInLeft
    # 仅对 Pisces | Gemini 有效：
    sidebar: fadeInUp
```

#### 进度条

Pace 将自动监控网页加载进度并显示。在主题配置文件中配置如下：

```yml next/_config.yml
pace:
  enable: true
  color: orange # 进度条颜色
  theme: minimal # 进度条主题，全部主题参见 https://codebyzach.github.io/pace/
```

#### 动态背景

[canvas-ribbon.js](https://github.com/hustcc/ribbon.js) 是 NexT 自带的丝带背景。在主题配置文件中配置如下：

```yml next/_config.yml
canvas_ribbon:
  enable: true
  size: 300 # 丝带宽度
  alpha: 0.6 # 丝带透明度
  zIndex: -1 # 丝带显示级别
```

## 深度优化
### 模板和样式优化
NexT 提供了简捷的样式修改途径，利用了 hexo `source/_data`文件夹中内容会保留的特性，可在里面放入自定义的样式文件，会在生成静态文件时自动合并到`main.css`最后。在主题配置文件中，找到：
```yaml next/_config.yml
custom_file_path:
  #head: source/_data/head.njk
  #header: source/_data/header.njk
  sidebar: source/_data/sidebar.njk
  postMeta: source/_data/post-meta.njk
  postBodyEnd: source/_data/post-body-end.njk
  #footer: source/_data/footer.njk
  bodyEnd: source/_data/body-end.njk
  variable: source/_data/variables.styl
  mixin: source/_data/mixins.styl
  style: source/_data/styles.styl
```
取消对应文件的注释，在`_data`文件夹中新建对应文件并进行修改，即可覆盖原本的样式。

- `head`: `<head>`标签内模板
- `header`: 页眉模板
- `sidebar`: 侧边栏模板
- `postMeta`: 文章信息模板
- `postBodyEnd`: 文后信息模板
- `footer`: 页脚模板
- `variable`: 样式的变量，可在其他样式文件中使用（例如颜色、图片）
- `mixin`: 代码复用
- `style`: 主要的自定义样式文件

`.styl`文件使用 CSS 语法，`.njk`文件使用 nunjucks 语法即可。

### 修改、添加页面模板
如果想新建一个页面模板，或者修改原本的模板，应该如何操作？对于侧边栏和文章前后的修改，我们可以通过`_data`文件夹中的`.njk`文件修改，但如果想进行更深层的修改，例如添加一个相册模板，在归档页面展示文章数量统计的图表，或者把分类页面修改成多级目录的形式，应该怎么做呢？

所有页面模板都保存在`themes/next/layout`目录里，通过修改对应的模板，我们就能自由增添功能。NexT 采用的是 nunjucks 模板，但也可以使用 Hexo 自带的 ejs 模板（参见[模板 | Hexo](https://hexo.io/zh-cn/docs/templates)），不同模板要通过对应的语言去修改，这部分可以看官网介绍，就不赘述了。需要注意的是，许多页面的模板是由多个`.njk`文件决定的，需要一并修改。

在页面模板上，hexo 为我们提供了诸多的[变量](https://hexo.io/zh-cn/docs/variables)和[辅助函数](https://hexo.io/zh-cn/docs/helpers)，我们可以借鉴现有的主题模板，照猫画虎地进行编写。

例如，我们想为归档页添加一个分类数量统计的饼状图，则要找到其对应的页面模板`themes/next/layout/archive.njk`，引用文章分类的相关变量，获取分类信息并排序，在合适的位置添加图表，并使图表引用排序结果。需要注意，hexo 中提供的变量本质是 Prototype 对象的属性，它的读取本身是异步操作，因此处理时和一般的 JS 方法有不同之处。

{% note info 点击查看示例代码 %}
```html
{% block script %}
<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.0/dist/echarts.min.js"></script>
<!-- 文章数量统计 -->
<script>
  // 获取分类对象列表并进行排序
  {%- set categories_length = site.categories.data.length %}
  {%- set categories = site.categories.sort('parent').data %}
  var dataLabels=[];
  var chartData=[];
  {%- for category_item in categories %}
    dataLabels.push("{{ category_item.name }}");
    chartData.push({value:{{ category_item.posts.length }},name:"{{ category_item.name }}"});
  {%- endfor %} 
  // 生成图表
  var chartDom = document.getElementById('custom-category-chart');
  var myChart = echarts.init(chartDom, 'dark');
  var option;
  // 注: 为保证可读性,option中省略了许多样式参数
  option = {
      title: {
          text: '分类统计',
      },
      legend: {
          data: dataLabels,
      },
      series: [
          {
              name: '分类',
              type: 'pie',
              data: chartData.sort(function (a, b) { return a.value - b.value; }),
          }
      ]
  };

  option && myChart.setOption(option);
</script>
{% endblock %}
```
{% endnote %}
效果可以查看[我的分类页最底部](https://happyseashell.gitee.io/overview/)。

又比如，我们想新建一个相册模板，应用于所有的相册页面上。此时我们可以根据不同需求选择。
- 若希望该相册和整体页面全无关系，则直接在`themes/next/layout`文件夹中新建`album.njk`或`album.ejs`，并在相册页面的 front-matter中添加`type: album`即可。
- 若希望相册像其他页面一样，是整体的一部分，则在`themes/next/layout/_partials/page`中新建`album.njk`，并在`themes/next/layout/page.njk`中添加对应引用：
  ```diff next/layout/page.njk
  {% block title %}
    {%- set page_title_suffix = ' | ' + title %}

    {%- if page.type === 'categories' and not page.title %}
      {{- __('title.category') + page_title_suffix }}
    {%- elif page.type === 'tags' and not page.title %}
      {{- __('title.tag') + page_title_suffix }}
    {%- elif page.type === 'schedule' and not page.title %}
      {{- __('title.schedule') + page_title_suffix }}
  +  {%- elif page.type === 'album' and not page.title %}
  +    {{- __('title.album') + page_title_suffix }}
    {%- else %}
      {{- page.title + page_title_suffix }}
    {%- endif %}
  {% endblock %}

  ...

  <div class="post-body{%- if page.direction and page.direction.toLowerCase() === 'rtl' %} rtl{%- endif %}">
          {%- if page.type === 'tags' %}
            {%- include '_partials/page/tags.njk' -%}
          {% elif page.type === 'categories' %}
            {%- include '_partials/page/categories.njk' -%}
          {% elif page.type === 'schedule' %}
            {%- include '_partials/page/schedule.njk' -%}
  +        {% elif page.type === 'album' %}
  +          {{ page.content }}
  +          {%- include '_partials/page/album.njk' -%}
          {% else %}
            {{ page.content }}
          {%- endif %}
        </div>
  ```
