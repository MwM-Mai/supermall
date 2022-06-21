<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--  商品的列表-->
    <cart-list/>
    <!-- 汇总 -->
    <cart-button-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'


import CartList from './childComps/CartList.vue'
import CartButtonBar from './childComps/CartButtonBar.vue'


import { mapGetters } from 'vuex'

export default {
  name: 'cart',
  components: {
    NavBar,
    CartList,
    CartButtonBar,
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }
</style>