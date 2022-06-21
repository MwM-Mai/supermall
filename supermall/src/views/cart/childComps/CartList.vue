<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item, index) in cartList"
                         :key="index" :item="item">
        </cart-list-item>
      </scroll>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    // console.log(11);
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 40px);
  }

  .content {
    height: calc(100% - 40px);
    overflow: hidden;
  }
</style>