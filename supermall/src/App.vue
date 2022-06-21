<template>
  <div id="app">
    <keep-alive exclude="Detail"> <!-- <keep-alive> 防止点击其他页面 再回来的时候被销毁（重新渲染）
      exclude="Detail" 排除 组件 Detail 以外 都进行缓存 -->
      <router-view></router-view>
    </keep-alive>
    <main-tar-bar class="main-tar-bar"></main-tar-bar>
  </div>
</template>

<script>
import MainTarBar from "components/comtents/maintabbar/MainTabBar"

export default {
  name: 'App',
  components: {
    MainTarBar
  }
}
</script>

<style>
  @import "./assets/css/base.css";
  .main-tar-bar {
    background-color: #fff;
  }
</style>
