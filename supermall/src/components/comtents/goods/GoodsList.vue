<template>
  <div class="goods"> 
    <goods-list-item v-for="item in goods" :key="item.index" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>


import GoodsListItem from './GoodsListItem.vue'

export default {
  name: 'GoodsList',
  components: { 
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      defualt() {
        return []
      }
    }
  }
}
</script>
  
<style>
  .goods {
    display: flex;
    flex-wrap: wrap;  /* 根据一行的宽度显示 多少个 */
    justify-content: space-around;  /* 弹性盒子的子元素 主轴 均等分 */
  } 


</style>