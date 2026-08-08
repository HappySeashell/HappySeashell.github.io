---
title: 服装录入
comments: false
# layout: test
---
<link rel="stylesheet" href="/css/nikki.css">
<div class='collectInfo nikki'>
  <div class = 'logIn'>
    用户名：<input type='text' id="userIDInput">
    密码：<input type='password' id="userPasswordInput">
    <button class="btn" onclick="AVLogIn()">登录</button>
    <div id ='showLogIn'></div>
  </div>
  <div class = 'showCount'></div>
  <div class = 'showInfo'></div>
  <button class="btn" onclick="submitInfo.check()">提交</button>
  <button class="btn" onclick="submitInfo.changeItems()">刷新</button>
  <div class='submitResult'></div>
  <form class = 'inputInfo' >
    ID: <input type='text' id="idInput" onfocus="this.select()">
    备注: <input type='text' id="remarkInput">
    部位： <select title="categories" id="categoriesInput" onchange="submitInfo.changeTypes()"></select>
    <fieldset id="typesInput">
      <legend>版型</legend>
    </fieldset>
    <fieldset id="stylesInput">
      <legend>风格</legend>
    </fieldset>
    <fieldset id="elementsInput">
      <legend>元素</legend>
    </fieldset>
    <fieldset id="colorsInput">
      <legend>颜色</legend>
    </fieldset>
  </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/leancloud-storage@4.11.1/dist/av-min.js" ></script>
<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js" ></script>
<script src="/js/nikki-submit.js" ></script>