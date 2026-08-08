---
title: 奇暖服装管理
comments: false
robots: noindex, nofollow
---
<link rel="stylesheet" href="/css/nikki.css">

<div class="nikki nikki-admin">
<p id="nikki-admin-status" class="nikki-status">请使用博客管理员账号登录。此页面不会开放访客录入。</p>

<section id="nikki-login-panel" class="nikki-admin-panel">
<form id="nikki-login">
<label>用户名 <input id="nikki-username" autocomplete="username" required></label>
<label>密码 <input id="nikki-password" type="password" autocomplete="current-password" required></label>
<button class="btn" type="submit">登录</button>
</form>
</section>

<div id="nikki-editor" hidden>
<div class="nikki-admin-toolbar">
<input id="nikki-admin-search" placeholder="搜索名称或备注">
<select id="nikki-admin-filter"><option value="all">全部完整度</option><option value="incomplete">标签不完整</option></select>
<label><input id="nikki-include-deleted" type="checkbox"> 包含已隐藏</label>
<button id="nikki-admin-query" class="btn" type="button">查询</button>
<button id="nikki-new" class="btn" type="button">新建</button>
<button id="nikki-logout" class="btn" type="button">退出</button>
</div>

<div class="nikki-admin-grid">
<section id="nikki-admin-results" class="nikki-admin-results"></section>
<form id="nikki-item-form" class="nikki-admin-form">
<label>内部序号 <input id="nikki-item-number" disabled></label>
<label>衣柜编号 <input id="nikki-wardrobe-item" type="number" min="1" required></label>
<label>名称 <input id="nikki-name" maxlength="100" required></label>
<label>部位 <input id="nikki-category" list="nikki-category-list" required></label>
<label>套装 <input id="nikki-suit" maxlength="200"></label>
<label>来源 <input id="nikki-source" maxlength="300" required></label>
<label>星级 <select id="nikki-star"><option>1</option><option>2</option><option>3</option><option>4</option><option selected>5</option><option>6</option></select></label>
<label class="nikki-check"><input id="nikki-gesture" type="checkbox"> 特殊姿势</label>
<label>版型（逗号分隔） <input id="nikki-types" list="nikki-type-list"></label>
<label>风格（逗号分隔） <input id="nikki-styles" list="nikki-style-list"></label>
<label>元素（逗号分隔） <input id="nikki-elements" list="nikki-element-list"></label>
<label>颜色（逗号分隔） <input id="nikki-colors" list="nikki-color-list"></label>
<label class="nikki-wide">备注 <textarea id="nikki-remark" maxlength="1000" rows="3"></textarea></label>
<div class="nikki-wide nikki-actions">
<button id="nikki-save" class="btn" type="submit">新增服装</button>
<button id="nikki-delete" class="btn danger" type="button" hidden>隐藏</button>
<button id="nikki-restore" class="btn" type="button" hidden>恢复</button>
</div>
</form>
</div>
</div>

<datalist id="nikki-category-list"></datalist><datalist id="nikki-type-list"></datalist>
<datalist id="nikki-style-list"></datalist><datalist id="nikki-element-list"></datalist><datalist id="nikki-color-list"></datalist>
</div>

<script src="/js/nikki-api.js"></script>
<script src="/js/nikki-admin.js"></script>
