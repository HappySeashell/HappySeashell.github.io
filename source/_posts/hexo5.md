---
title: 使用Hexo搭建博客（五）：实用插件推荐
date: 2021-12-01 02:51:49
tags:
- hexo
categories: 博客搭建
description: Hexo的实用插件推荐。系统：Windows10；Hexo版本：4.3.0；NexT版本：8.7.0
mathjax: true
---
## 添加动态图表

[hexo-tag-echarts3](https://www.npmjs.com/package/hexo-tag-echarts3)是一款基于 [Echarts](https://echarts.apache.org/zh/index.html) 的动态图表插件。

使用时的语法为：
```jinja
{% echarts [height] [weight] %}
<!-- 此处填写 echarts 配置 -->
{% endecharts %}
```
{% note info 点击查看示例代码 %}
```jinja
{% echarts 400 '81%' %}
{
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      magicType: { type: ['line', 'bar','stack'] },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    data: ['Profit', 'Expenses', 'Income']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  series: [
    {
      name: 'Profit',
      type: 'bar',
      label: {
        show: true,
        position: 'inside'
      },
      emphasis: {
        focus: 'series'
      },
      data: [200, 170, 240, 244, 200, 220, 210]
    },
    {
      name: 'Income',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 302, 341, 374, 390, 450, 420]
    },
    {
      name: 'Expenses',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'left'
      },
      emphasis: {
        focus: 'series'
      },
      data: [-120, -132, -101, -134, -190, -230, -210]
    }
  ]
};
{% endecharts %}
```
{% endnote %}

效果为：
{% echarts 400 '81%' %}
{
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      magicType: { type: ['line', 'bar','stack'] },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    data: ['Profit', 'Expenses', 'Income']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  series: [
    {
      name: 'Profit',
      type: 'bar',
      label: {
        show: true,
        position: 'inside'
      },
      emphasis: {
        focus: 'series'
      },
      data: [200, 170, 240, 244, 200, 220, 210]
    },
    {
      name: 'Income',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 302, 341, 374, 390, 450, 420]
    },
    {
      name: 'Expenses',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'left'
      },
      emphasis: {
        focus: 'series'
      },
      data: [-120, -132, -101, -134, -190, -230, -210]
    }
  ]
};
{% endecharts %}

由于原作者已不再维护，echarts 的版本较老，可以在`node_modules`文件夹中修改js引用路径：
```diff blog/node_modules/hexo-tag-echarts3/template.html
- <script src="https://cdn.bootcss.com/echarts/3.8.0/echarts.common.min.js"></script>
+ <script src="https://cdn.bootcss.com/echarts/5.2.1/echarts.common.min.js"></script>
```

{% note warning %}
修改 echarts 到最新版本后，语法也会相应地改变，请到[官网示例](https://echarts.apache.org/examples/zh/index.html)自行查询。选择一个需要的图表，调整参数后拷贝`option=`后面的部分并粘贴到`echarts`标签内。
{% endnote %}

## 添加思维导图

[hexo-markmap](https://www.npmjs.com/package/hexo-markmap)是一款轻量的思维导图插件，在`markmap`标签内使用 markdown 语言可生成对应的思维导图，并且支持 Mathjax 公式渲染。

{% note info 点击查看示例代码 %}
```jinja
{% markmap 300px %}
# hexo-markmap
## 支持
### 无序列表
- 无序列表1
- 无序列表2
  - 无序列表嵌套
### 有序列表
1. 有序列表1
2. 有序列表2
### 行内公式
- $\epsilon_0$ 
- $O\left(f_{t}\left(X_i;\theta\right)\right)=\gamma T+\frac{1}{2}\lambda\|w\|^{2}$
### 引用
> 这是引用
## 不支持
- 超链接
- 代码块
- 内嵌样式（粗体、斜体等）
- 多行文字
- 公式收回后不能再次渲染

{% endmarkmap %}
```
{% endnote %}
{% markmap 300px %}
# hexo-markmap
## 支持
### 无序列表
- 无序列表1
- 无序列表2
  - 无序列表嵌套
### 有序列表
1. 有序列表1
2. 有序列表2
### 行内公式
- $\epsilon_0$ 
- $O\left(f_{t}\left(X_i;\theta\right)\right)=\gamma T+\frac{1}{2}\lambda\|w\|^{2}$
### 引用
> 这是引用
## 不支持
- 超链接
- 代码块
- 内嵌样式（粗体、斜体等）
- 多行文字
- 公式收回后不能再次渲染
{% endmarkmap %}

## 添加卡片式超链接

[hexo-tag-blog-card](https://www.npmjs.com/package/hexo-tag-blog-card)可以获取超链接的预览并生成链接卡片。

```jinja
{% blogCard https://www.zhihu.com/ target:_self rel:nofollow %}
```
效果如下：
{% blogCard https://www.zhihu.com/ target:_self rel:nofollow %}

{% note warning %}
有时会无法获取链接信息，这时不能显示卡片。
{% endnote %}
