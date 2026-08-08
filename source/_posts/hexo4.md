---
title: 使用Hexo搭建博客（四）：文章写作
date: 2021-09-29 00:13:32
tags:
- hexo
- markdown
categories: 博客搭建
description: Hexo的文章写作语法。包括Markdown语法简介、Nunjucks标签语法简介。系统：Windows10；Hexo版本：4.3.0；NexT版本：8.7.0
mathjax: true
---
## 设置文章的基本信息
### 标题
当使用`hexo n <title>`命令创建了一篇新文章时，文章的标题和文件名默认为`<title>`。此时在文章首修改信息为：

```yaml title1.md
---
title: title2
---
```
则文章的显示标题为`title2`，但网页地址显示为`title1`。因此，为缩短链接长度，我们可以将文件名命名为英文简写，而把真实标题写在文章首。

例如，本篇文章的地址为 `https://happyseashell.gitee.io/2021/09/29/hexo4/`，名称为`使用Hexo搭建博客（四）：文章写作`。

### 标签

标签的写法有两种方式：

```yaml
# 第一种方式：
tags: [tag1, tag2, ...]
# 第二种方式：
tags:
- tag1
- tag2
- ...
```
标签是不分层级和先后顺序的。

### 分类

分类的写法为：
```yaml
categories: 
- level1
- level2
- ...
```
分类是分层级的，后一个分类是前一个分类的子分类。

如果想让一篇文章同时拥有多个同级的分类，可以采取以下写法：
```yaml
categories: 
- [level1, level2]
- [level1, level3]
- [level4]
- ...
```
其中，`level2`和`level3`是`level1`的子分类，而`level4`是一个独立的分类。

## Markdown语法

我们新建的文章一般用 markdown 语言编写。Markdown 是一种简洁的标记语言，易于渲染，并且兼容 html 语法。下面的内容参考了[菜鸟教程](https://www.runoob.com/markdown/md-tutorial.html)。

### 标题
Markdown 的标题分为1~6级，有两种写法：

```md
一、二级标题可以写成如下形式：

一级标题
=======
二级标题
-------

1~6级标题可以写成如下形式：

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```
注意，网站的标题会被搜索引擎检索到，因此不要把标题当作加粗功能，而放一些无关的文字。

### 段落与样式
#### 段落
Markdown语法中，如果只敲一个回车并不会分段，而是相当于一个空格。如果要分段，我们需要在段尾打两个及以上空格再回车，或者在段落之间空一行，如下所示：

```md
段落一

段落二
```
效果为：

段落一

段落二

#### 字体
Markdown可以使用斜体、粗体和删除线，下划线可以通过html里的`<u>`表示。语法如下：

```md
*斜体*
_斜体_

**粗体**
__粗体__

***粗斜体***
___粗斜体___

~~删除线~~

<u>下划线</u>
```

效果如下：

正常字体 *斜体* **粗体** ***粗斜体*** ~~删除线~~ <u>下划线</u>

#### 分隔线
Markdown可以使用三个及以上的 * 、 - 和 _ 来表示分隔线，符号之间可以有空格，但不能混用，也不能在此行插入其他内容。示例如下：
```md
***
- - -
________
```
效果如下：
***



### 列表
Markdown 支持有序列表和无序列表。无序列表使用星号(*)、加号(+)或是减号(-)作为列表标记，这些标记后面要添加一个空格，然后再填写内容。语法如下：
```md
* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项

- 第一项
- 第二项
- 第三项
```
效果如下：
- 第一项
- 第二项
- 第三项

有序列表使用数字并加上 . 号来表示。语法如下：
```md
1. 第一项
2. 第二项
3. 第三项
```
效果如下：
1. 第一项
2. 第二项
3. 第三项

待办事项列表可以用 `[ ]` 和 `[x]` 来表示，语法如下：
```md
- [ ] 第一项
- [x] 第二项
- [ ] 第三项

1. [ ] 第一项
2. [ ] 第二项
3. [x] 第三项
```
效果如下：
- [ ] 第一项
- [x] 第二项
- [ ] 第三项

1. [ ] 第一项
2. [ ] 第二项
3. [x] 第三项

也可以使用以下语法（ `:` 加四个空格）来表示定义列表（`<dl>`标签）：
```md
第一项
:    定义一

第二项
:    定义二

与有序列表联用：

1. 第一项
:    定义一

2. 第二项
:    定义二

与无序列表联用：
- 第一项
:    定义一

- 第二项
:    定义二
```

效果如下：

第一项
:    定义一

第二项
:    定义二

1. 第一项
:    定义一

2. 第二项
:    定义二

- 第一项
:    定义一

- 第二项
:    定义二

列表是可以嵌套的，嵌套时需要缩进：
```md
1. 第一项
    - 第一个
    - 第二个
2. 第二项
    1. 第一个
    2. 第二个
```
效果如下：
1. 第一项
    - 第一个
    - 第二个
2. 第二项
    1. 第一个
    2. 第二个

### 引用
区块引用的语法如下：
```md
> 引用
```
效果如下：
> 引用

引用内可以嵌套其他语法，列表里也可以嵌套引用，例如：

```md
嵌套引用：
> 引用
> > 二级引用
> ```python
> import numpy as np
> ```    
> - 列表一
>   >列表嵌套引用
> - 列表二
```

效果如下：

> 引用
> > 二级引用
> ```python
> import numpy as np
> ```
> - 列表一
>   >列表嵌套引用
> - 列表二

### 代码

行内代码的写法为：
```md
使用`hexo s`命令
```
效果为：

使用`hexo s`命令

代码块的写法有两种，一种是直接缩进，例如：
```md
引入模块：

    import numpy as np
    import matplotlib as mt
```
效果为：

引入模块：

    import numpy as np
    import matplotlib as mt

如果要加入语法高亮，需要采取下面的写法：

````md
```python
import numpy as np
import matplotlib as mt
``` 
````

效果为：
```python
import numpy as np
import matplotlib as mt
```
如果要在代码块中使用连续的多个反引号`` ` ``，则需要用更多的反引号来包裹代码块，例如：
`````md
行内代码的反引号：
`` ` ``

代码块的反引号：
````md
```python
import numpy as np
import matplotlib as mt
```
````
`````

效果为：

行内代码：`` ` ``

代码块：

````md
```python
import numpy as np
import matplotlib as mt
```
````

### 超链接
语法如下：
```md
[链接](链接地址)
或者
<链接地址>
```
效果如下：

[链接的用法](https://www.runoob.com/markdown/md-link.html)
<https://www.runoob.com/markdown/md-link.html>

也可以通过变量来设置链接，再把赋值放在文章末尾：
```md
[链接][地址1]

[地址1]: 链接地址
```

### 图片
语法如下：
```md
![替代文本](图片地址)

![替代文本](图片地址 "可选标题")
```
效果如下：

![松果图片](https://happyseashell.gitee.io/images/apple-touch-icon-nut.png "松果")

也可以通过变量设置图片链接：
```md
![链接][地址2]

[地址2]: 链接地址
```
设置变量时，注意不要重名。

### 表格

Markdown 表格使用 `|` 来分隔不同的单元格，使用 `-` 来分隔表头和其他行。使用 `:` 来指定表格的对齐方式。语法如下：
```md
|左对齐|右对齐|居中对齐|
|:----|-----:|:-----:|
|单元格|单元格|单元格 |
|单元格|单元格|单元格 |

也可以省略边框：

左对齐|右对齐|居中对齐
:----|-----:|:-----:
单元格|单元格|单元格
单元格|单元格|单元格
```
效果如下：

|左对齐|右对齐|居中对齐|
|:----|-----:|:-----:|
|单元格|单元格|单元格 |
|单元格|单元格|单元格 |

### 转义

Markdown 使用反斜杠 `\` 转义一些有语法作用的特殊字符：
```text
\   反斜杠
`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
```
转义语法为：
```md
**文本加粗** 
\*\* 正常显示星号 \*\*
```
效果如下：
**文本加粗** 
\*\* 正常显示星号 \*\*

对于 hexo，还会有一些跟 Nunjucks 有关的特殊语法，使用 `\` 转义也不会起作用：
```md
{{ }}
{% %}
```
此时可以用 html 的转义字符来表示，常见的转义字符如下：

```html
<!-- 注意不要落下分号 -->
  &nbsp;<!-- 空格 -->
! &#33;
” &#34; &quot;
# &#35;
$ &#36;
% &#37;
& &#38; &amp;
‘ &#39;
( &#40;
) &#41;
* &#42;
+ &#43;
< &#60; &lt;
= &#61;
- &#45; &minus;
> &#62; &gt;
? &#63;
@ &#64;
[ &#91;
\ &#92;
] &#93;
{ &#123;
| &#124;
} &#125;
```
上面的语法就可以写成：
```html
&#123;&#123; 我是内容 &#125;&#125;
&#123;% 我是内容 %&#125;
```
效果如下：
&#123;&#123; 我是内容 &#125;&#125;
&#123;% 我是内容 %&#125;

### 公式

当需要插入数学公式时，可以使用`$$` 包裹 TeX 或 LaTeX 格式的数学公式来实现单行公式，用`$`包裹来实现行内公式。 NexT 提供 Mathjax 或 KaTeX 来渲染数学公式，可根据需要自行选择。

语法为：

```latex
当 $a \ne 0$，$ax^2 + bx + c = 0$ 有两个解：
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

```

效果为：

当 $a \ne 0$，$ax^2 + bx + c = 0$ 有两个解：
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

### 附加功能
#### 支持的 html 语法

Markdown 原生支持的 HTML 元素有 `<kbd> <b> <i> <em> <sup> <sub> <br>` 等，而 hexo 中的文章支持所有 html 语法，并且可以插入 `<script> <link> <style>` 等元素。
#### 渲染器

hexo默认的 markdown 渲染器支持的功能较少，若替换为  [hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it) 或 [hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)等渲染器则可支持脚注、标题锚点等功能，但可能会有一些兼容性问题。

#### emoji

需要安装[hexo-filter-emoji](https://www.npmjs.com/package/hexo-filter-emoji)插件，并在站点配置文件中添加：
```yaml _config.yml
emoji:
  enable: true
  className: github-emoji
  styles:
  customEmojis:
```

使用时的语法为 &#58;smile&#58; 或
```jinja
{% emoji smile %}
```
效果为：:smile:

若不希望在文章中显示 emoji，则可在文章 front-matter 中添加：
```yaml
---
title: Hello World
no-emoji: true
---
```

此时 &#58;smile&#58; 不再起作用，但`{% emoji smile %}`仍然有效。

#### 脚注

Hexo 原生不支持脚注。但我们可以安装脚注插件来使其支持下面的语法。目前 hexo 有两款脚注插件：[hexo-footnotes](https://github.com/LouisBarranqueiro/hexo-footnotes) 和 [hexo-reference](https://github.com/kchen0x/hexo-reference)，前者已停止维护，后者支持正文脚注处弹窗，但也有一些bug。也可以将hexo默认的渲染器替换为  [hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it) 或 [hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)。

格式如下:

```md
正文[^脚注]

[^脚注]: 脚注内容
```

#### TOC 目录

NexT 在侧边栏自带 TOC 目录，但文章内插入目录需要安装插件 [hexo-toc](https://github.com/bubkoo/hexo-toc)。
安装指令：
```bash
npm install hexo-toc --save
```

并在站点配置文件中添加：

```yaml _config.yml
toc:
  maxDepth: 3 # 生成目录的最大深度
```

在文章中使用 TOC 目录的语法为：

```html
<!-- toc -->
```
但该插件存在一些 bug，并且可能和自带 toc 冲突。如果每篇文章在同一个位置需要插入目录，可以直接在文章模板里使用辅助函数 [toc()](https://hexo.io/zh-cn/docs/helpers.html#toc)。

#### 文章摘要

在文章中使用 `<!-- more -->`，那么 `<!-- more -->` 之前的文字将会被视为摘要。首页中将只出现这部分文字，同时这部分文字也会出现在正文之中。摘要可能会被 `Front Matter` 中的 `excerpt` 覆盖。

## 标签语法

标签插件是一种使Hexo支持特殊样式内容的方法。[Hexo 提供的标签](https://hexo.io/docs/tag-plugins)使用了 nunjucks 语法，格式为：

```jinja
<!-- tagname 为标签名 -->
{% tagname 附加信息 %}
内容
{% endtagname %}
```
{% note warning %}
不能把标签包裹在 markdown语法中。但标签和标签可以嵌套，标签也可以嵌套在html的元素内。
{% endnote %}

除了自带标签外，也可以使用主题支持的标签，以及安装插件后支持的标签。

### Hexo 标签

#### 引用块

在文章中插入引言，可包含作者、来源和标题。
```jinja
{% blockquote [author[, source]] [link] [source_link_title] %}
content
{% endblockquote %}
```
使用范例：

```jinja
{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}
```
效果为：

{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}

#### 嵌入代码演示
Hexo 自带 jsfiddle 标签。该标签可在文章中嵌入 jsFiddle 网页，一个 web 代码演示工具。嵌入格式如下：
```jinja
{% jsfiddle shorttag [tabs] [skin] [width] [height] %}
```
但国内需要梯子才能访问。关于 jsFiddle 和 CodePen 的嵌入，请看这篇博文：[Hexo NexT：在文章中嵌入 CodePen或 jsFiddle](https://www.jianshu.com/p/79e808bbf0a8)。

#### 嵌入 Github Gist 代码片段

Github Gist 是一个分享代码片段的 web 应用。语法为：
```jinja
{% gist gist_id [filename] %}
```
#### 嵌入网页

使用 iframe 标签来嵌入：
```jinja
{% iframe url [width] [height] %}
```

#### 插入图片

在文章中插入指定大小的图片。该标签可用于引用相对位置的图片。
```jinja
{% img [class names] /path/to/image [width] [height] '"title text" "alt text"' %}
```

#### 插入链接

在文章中插入链接，并自动给外部链接添加 `target="_blank"` 属性:
```jinja
{% link text url [external] [title] %}
```
#### 插入代码文件夹中的文件

插入 `source/downloads/code` 文件夹内的代码文件。`source/downloads/code` 不是固定的，取决于在站点配置文件中 `code_dir` 的配置。

```jinja
{% include_code [title] [lang:language] [from:line] [to:line] path/to/file %}
```
#### 引用博客其他文章
在使用此标签时可以忽略文章文件所在的路径或者文章的永久链接信息、如语言、日期。例如，在文章中使用 `{% post_link how-to-bake-a-cake %}` 时，只需有一个名为 `how-to-bake-a-cake.md` 的文章文件即可。即使这个文件位于站点文件夹的 `source/posts/2015-02-my-family-holiday` 目录下、或者文章的永久链接是 `2018/en/how-to-bake-a-cake`，都没有影响。

```jinja
{% post_path filename %}
{% post_link filename [title] [escape] %}
```

#### 引用文章资源

```jinja
{% asset_path filename %}
{% asset_img [class names] slug [width] [height] [title text [alt text]] %}
{% asset_link filename [title] [escape] %}
```



### NexT 标签

NexT 提供以下标签：

#### 居中引用

此标记将生成一个引号，其前后有两行，并且引用的文本将居中。用法：
```jinja
{% centerquote %}内容{% endcenterquote %}
<!-- 缩写 -->
{% cq %}内容{% endcq %}
```
示例：
{% cq %}内容{% endcq %}

#### 嵌入视频

用法为：
```jinja
{% video url %}
```

#### 插入按钮

```jinja
{% button url, text, icon [class], [title] %}
<!-- 缩写 -->
{% btn url, text, icon [class], [title] %}

```
- `url`：URL 的绝对或相对路径。
- `text`：按钮文本。如果未指定图标，则为必需。
- `icon`：font-awesome图标名称。如果未指定文本，则为必需。
- `[class]`：可选参数。font-awesome 类： `fa-fw|fa-lg|fa-2x|fa-3x|fa-4x|fa-5x`
- `[title]`：可选参数。鼠标悬停时的工具提示。

示例：

```jinja
{% btn https://github.com, GitHub, fab fa-github fa-fw fa-lg, GitHub %}
```

<div class="text-center">{% btn https://github.com, GitHub, fab fa-github fa-fw fa-lg, GitHub %}</div>

#### 插入图表

NexT 主题中提供[mermaid标签](https://theme-next.js.org/docs/tag-plugins/mermaid.html)，可以用如下语法进行绘图：

```jinja
<!-- 流程图 -->
{% mermaid graph TD %}
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
{% endmermaid %}
```
效果如下：
{% mermaid graph TD %}
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
{% endmermaid %}

```jinja
<!-- 甘特图 -->
{% mermaid gantt %}
dateFormat  YYYY-MM-DD
section Section
Completed :done,    des1, 2014-01-06,2014-01-08
Active        :active,  des2, 2014-01-07, 3d
Parallel 1   :         des3, after des1, 1d
Parallel 2   :         des4, after des1, 1d
Parallel 3   :         des5, after des3, 1d
Parallel 4   :         des6, after des4, 1d
{% endmermaid %}
```
效果如下：
{% mermaid gantt %}
dateFormat  YYYY-MM-DD
section Section
Completed :done,    des1, 2014-01-06,2014-01-08
Active        :active,  des2, 2014-01-07, 3d
Parallel 1   :         des3, after des1, 1d
Parallel 2   :         des4, after des1, 1d
Parallel 3   :         des5, after des3, 1d
Parallel 4   :         des6, after des4, 1d
{% endmermaid %}

```jinja
<!-- 饼图 -->
{% mermaid pie %}
"Dogs" : 386
"Cats" : 85
"Rats" : 15
{% endmermaid %}

```
效果如下：
{% mermaid pie %}
"Dogs" : 386
"Cats" : 85
"Rats" : 15
{% endmermaid %}

#### 插入 Can I Use

用法：
```jinja
{% caniuse feature @ [periods] %}
<!-- 缩写 -->
{% can feature @ [periods] %}
```

- `feature` : 在[官网](https://caniuse.com)搜索所需功能，然后单击搜索结果标题左侧的符号，将获得此功能的唯一名称。
- `[periods]` : 可选参数。选择要显示的浏览器版本。支持的值: `past_1`, `past_2`, `past_3`, `past_4`, `past_5`, `current`, `future_3`, `future_2`, `future_1`. 如果此值为空，则将使用默认值 `current`。

#### 插入图片组

```jinja
{% grouppicture [number]-[layout] %}{% endgrouppicture %}
<!-- 缩写 -->
{% gp [number]-[layout] %}{% endgp %}

```

- `[number]`：可选参数。要添加到组图片中的图片总数。

- `[layout]`：可选参数。布局的索引见下图。例如，如果要将第二个布局应用于 4 张图片，则使用
  ```jinja
  {% grouppicture 4-2 %}{% endgrouppicture %}
  ```
  ![](https://theme-next.js.org/images/group-picture-1.png)
  ![图片组布局](https://theme-next.js.org/images/group-picture-2.png)

{% note info 点击查看示例 %}
{% grouppicture 6-3 %}
![](/images/logo-nut.svg)
![](/images/logo-nut.svg)
![](/images/logo-nut.svg)
![](/images/logo-nut.svg)
![](/images/logo-nut.svg)
![](/images/logo-nut.svg)
{% endgrouppicture %}
{% endnote %}

#### 插入彩色标签

参见[官方文档](https://theme-next.js.org/docs/tag-plugins/label.html)。

#### 插入 Bootstrap 风格提示框
插入一个提示框，提示框内语法仍为 markdown 语法。可在主题配置文件中设置提示框的样式：
```yaml next/_config.yml
note:
  # 提示框样式：
  #  - simple    默认，老样式
  #  - modern    新样式
  #  - flat      扁平化
  #  - disabled  无样式
  style: simple
  icons: false
  # 背景亮度调节的百分比 (modern: -12 | 12; flat: -18 | 6).
  light_bg_offset: 0
```
标签语法为：
```jinja
{% note [class] [no-icon] [summary] %}
内容 (支持内联标签)。
{% endnote %}
```

示例：
{% note success %}
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}

更详细的介绍参见[官方文档](https://theme-next.js.org/docs/tag-plugins/note.html)。

#### 插入选项卡
配置如下：
```yml next/_config.yml
tabs:
  # 使包含较长内容的选项卡的导航栏粘在顶部
  sticky: false
  transition:
    tabs: false
    labels: true
```
语法如下：
```jinja
{% tabs Unique name, [index] %}
<!-- tab [Tab caption] [@icon] -->
Any content (support inline tags too).
<!-- endtab -->
{% endtabs %}
```

- `Unique name`   : 选项卡标签的唯一名称，不带逗号。对于当前网址必须是**唯一**的。
- `[index]`       : 可选参数，为活动选项卡的索引号。如果未指定，则选择第一个选项卡（1）。如果索引为 -1，则不会选择任何选项卡。
- `[Tab caption]` : 可选参数，为当前选项卡的标题。如果未指定标题，则带有选项卡索引后缀的唯一名称将用作选项卡的标题。如果未指定标题，但指定了图标，则标题将为空。
- `[@icon]`       : 可选参数，为Font Awesome 图标名称。

示例如下:

```jinja
{% tabs First unique name %}
<!-- tab 1 -->
**第一个选项卡**
<!-- endtab -->
<!-- tab 2 -->
**第二个选项卡**
<!-- endtab -->
<!-- tab 3 -->
**第三个选项卡**
<!-- endtab -->
{% endtabs %}
```

{% tabs First unique name %}
<!-- tab 1 -->
**第一个选项卡**
<!-- endtab -->
<!-- tab 2 -->
**第二个选项卡**
<!-- endtab -->
<!-- tab 3 -->
**第三个选项卡**
<!-- endtab -->
{% endtabs %}

更多设置请参见[官方文档](https://theme-next.js.org/docs/tag-plugins/tabs.html)。

#### 插入链接卡片

语法如下：
```jinja
{% linkgrid [image] [delimiter] [comment] %}{% endlinkgrid %}
<!-- 缩写 -->
{% lg [image] [delimiter] [comment] %}{% endlg %}

```
- `[image]`     : 可选参数。默认图像 url。
- `[delimiter]` : 可选参数。如果给定了可选的分隔符参数，则将其解释为每行中项的分隔符。
- `[comment]`   : 可选参数。如果给出了可选的注释参数，则将其解释为注释掉一行的符号。

{% note info 点击查看示例 %}
语法：

```jinja
{% linkgrid %}
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/logo-nut.svg
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/logo-nut.svg
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/logo-nut.svg
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/logo-nut.svg
{% endlinkgrid %}
```

效果：
{% linkgrid %}
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/logo-nut.svg
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/logo-nut.svg
Theme NexT | https://theme-next.js.org/ | Stay Simple. Stay NexT. | /images/logo-nut.svg
https://theme-next.js.org/
{% endlinkgrid %}
{% endnote %}

这种链接卡片的网址和图标都需要自己输入，如果想根据链接自动生成，可以用插件[hexo-tag-blog-card](https://www.npmjs.com/package/hexo-tag-blog-card)。效果如下：

{% blogCard https://happyseashell.gitee.io/ target:_self rel:nofollow %}

#### 插入 PDF 阅读器

配置：
```yml next/_config.yml
pdf:
  enable: true
  # Default height
  height: 500px
```
用法：
```jinja
{% pdf url [height] %}
```

- `url`      : PDF文件的 url
- `[height]` : 可选参数*，PDF显示视窗的高度。

{% note warning %}
pdf.js或pdf文件的加载可能会被 CORS 策略阻止。如果要从其他网站加载资源，请确保正确设置了"Access-Control-Allow-Origin "响应头。参见 [Access-Control-Allow-Origin - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)。
{% endnote %}

{% note info 点击查看示例 %}
代码：
```jinja
{% pdf https://www.unicef.cn/sites/unicef.org.china/files/2019-04/Atlas%202018%20final%20CN.pdf %}
```
效果：
{% pdf https://www.unicef.cn/sites/unicef.org.china/files/2019-04/Atlas%202018%20final%20CN.pdf %}
{% endnote %}

