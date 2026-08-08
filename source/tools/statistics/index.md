---
title: 服装统计
comments: false
---
<link rel="stylesheet" href="/css/nikki.css">
<div class="btn-group" role="group" aria-label="...">
  <!-- <button type="button" class="btn btn-default" onclick='statistics.updateCounts("categories")'>更新分类统计</button> -->
  <button type="button" class="btn btn-default" onclick='statistics.getCounts("categories")'>分类统计</button>
  <!-- <button type="button" class="btn btn-default" onclick='statistics.updateCounts("colors")'>更新颜色统计</button> -->
  <button type="button" class="btn btn-default" onclick='statistics.getCounts("colors")' title='统计部件颜色'>颜色统计</button>
</div>
<div id='echart' style="width:81%;height:400px"></div>

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/leancloud-storage@4.11.1/dist/av-min.js" ></script>
<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.0/dist/echarts.min.js" ></script>
<script src="/js/nikki-statistics.js" ></script>