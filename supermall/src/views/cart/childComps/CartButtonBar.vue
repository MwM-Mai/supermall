<template>
  <div class="button-bar">
      <div  class="check-content" >
        <check-button ref="checkButtonRef" 
                      class="check-button"
                      :is-checked="isSelectAll"
                      @click.native="checkclick"/>
        <span class="check-text">全选</span>
      </div>
      <div class="calc">总计：{{ totalPrice }}</div>
      <div class="buy" @click="buyClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/comtents/cheButton/CheckButton.vue'


export default {
  name: 'CartButtonBar',
  components: {
    CheckButton,
  },
  computed: {
    // 计算勾选的总价格
    totalPrice() {
      // 返回 过滤掉没有勾选的价格
      return '￥' + this.$store.state.Cartlist.filter(item => {
        return item.checked
      }).reduce((prevalue, item) => {    // .reduce 高阶函数 累加
        return prevalue + item.price * item.count
      }, 0)
    },
    // 去计算（合计）
    checkLength() {
      // 返回 过滤掉没有勾选的价格的长度
      return this.$store.state.Cartlist.filter(item => item.checked).length
    },
    // 计算是否全部选中
    isSelectAll() {
      // !(num) 大于0 为 false 等于0 为 true
      // 1. filter
      // return !(this.$store.state.Cartlist.filter(item => !item.checked).length) // 返回 选中状态长度 == 0 的
      
      // 2. find
      if(this.$store.state.Cartlist.length === 0) {
        return false
      }else{
        return !this.$store.state.Cartlist.find(item => !item.checked)
      }
    }
  },
  methods: {
    checkclick() {
      // console.log(this.$store.state.Cartlist.some(item => !item.checked));
      if(this.isSelectAll) {   // 全部选中
        this.$store.state.Cartlist.forEach(item => item.checked = false);
      }else {
        this.$store.state.Cartlist.forEach(item => item.checked = true);
      }
    },
    buyClick () {
      if(this.$store.state.Cartlist.filter(item => item.checked).length === 0) {
        this.$toast.show('请添加购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .button-bar {
    height: 40px;
    background-color: rgb(228, 228, 228);
    position: relative;
    bottom: 49px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  .check-content {
    display: flex;
    align-items: center;
  }

  .check-button {
    margin-left: 5px;
  }

  .check-text {
    margin-left: 5px;
  }

  .buy {
    width: 5rem;
    line-height: 40px;
    background-color: #f03;
    color: white;
  }
</style>