<template>
  <div>
    <div class="cart_list_item">
      <check-button :is-checked="item.checked" 
                    @click.native="checkClick"/>
      <div class="item_img">
        <img :src="item.image" alt="" />
      </div>
      <div class="item_info">
        <p class="item_title">{{ item.title }}</p>
        <p class="item_desc">{{ item.desc }}</p>
        <div class="item-price-layout">
          <span class="item_price">￥{{ item.price }}</span>
          <span class="item_count">x{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/comtents/cheButton/CheckButton.vue'


export default {
  components: { 
    CheckButton 
    },
  name: 'CartLIstItem',
  props: {
    item: {
      tepy: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.item.checked = !this.item.checked
    }
  }
}
</script>

<style scoped>
.cart_list_item {
  width: 100%;
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
  display: flex;
  justify-content:center;
  align-items: center;
  padding: 0.4rem;
  padding-left: 0rem;
}
.item_img {
  width: 3.5rem;
}
.item_img img {
  width: 100%;
  border-radius: 0.4rem;
}
.item_info {

  width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
  margin-left: 0.4rem;
}

.item_info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.item_title {
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
}

.item_desc {
  font-size: 0.6rem;
  color: gray;
}

.item-price-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item_price {

  font-size: 0.75rem;
  color: orangered;
}

.item_count {
  right: 0.4rem;
  font-size: 0.75rem;
}
</style>