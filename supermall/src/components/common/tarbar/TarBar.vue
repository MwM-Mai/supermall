<template>
  <div id="tab-bar">
    <!-- 插槽 -->
    <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'tabbar'
}
</script>

<style>
   #tab-bar {
    display: flex;  /* 弹性盒子布局 */

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

  
</style>