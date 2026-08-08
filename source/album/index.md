---
title: 相册
date: 2021-08-13 17:48:03
comments: false
type: album
---
<style>
#imageTab{
  padding: 15px 15px 15px;
  margin: 0 -15px 15px;
}
#myTab{
    box-sizing: border-box;
    padding-left: 0;
    list-style: none;
    border-bottom: 1px solid #ffd452;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
}
.nav-link.active.photo-tab{
    color: #555;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    background-color: #ffd452;
    display: block;
    padding: 3px 15px;
    margin-right: 2px;
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    border: 0px;
}
.nav-link.photo-tab{
    color: #CCA941;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    background-color: transparent;
    
    display: block;
    padding: 3px 15px;
    margin-right: 2px;
    box-sizing: border-box;
    border: 0px;
    border-radius: 4px 4px 0 0;
}
.ImageGrid {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  text-align: center;
}
.card {
  overflow: hidden;
  transition: .3s ease-in-out;
  border-radius: 8px;
  background-color: #efefef;
  padding: 0px;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, .4);
}
.ImageInCard img {
  padding: 0;
  border-radius: 8px;
  width:100%;
  height:100%;
}
.photo-tab{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #e1eaf7;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    color: #606266;
    font-size: 0.8rem;
    transition: box-shadow 0.35s, -webkit-transform 0.35s;
    transition: transform 0.35s, box-shadow 0.35s;
    transition: transform 0.35s, box-shadow 0.35s, -webkit-transform 0.35s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-right:0.8rem;
    margin-top:0.8rem;
}
.photo-tab:hover {
    -webkit-transform: translate3d(0, -3px, 0);
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
}
@media (prefers-color-scheme: dark) {
  .card {background-color: #333;}
}
</style>

<div id="imageTab"></div>
<div class="ImageGrid"></div>
