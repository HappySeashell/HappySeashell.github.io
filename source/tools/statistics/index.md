---
title: 服装统计
comments: false
---
<link rel="stylesheet" href="/css/nikki.css">
<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default" onclick='statistics.getCounts("categories")'>分类统计</button>
  <button type="button" class="btn btn-default" onclick='statistics.getCounts("colors")' title='统计部件颜色'>颜色统计</button>
</div>
<p id="statistics-status" class="nikki-status">正在读取实时统计…</p>
<div id='echart' style="width:81%;height:400px"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.0/dist/echarts.min.js" ></script>
<script src="/js/nikki-api.js"></script>
<script src="/js/nikki-statistics.js" ></script>
