<template>
  <div id="detail-nav-bar">
    <nav-bar >
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" 
             :key="index" class="title-item"
             :class="{active: currentIdenx === index}"
             @click="titleClick(index)"> 
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'


export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIdenx: 0
    }
  },
  props: {
    PcurrentIdenx: {
      type: Number
    }
  },
  methods:{
    titleClick(index) {
      this.currentIdenx = index
      this.$emit('titleClick', index) 
    },
    
    backClick() {
      this.$router.go(-1)  // go(-1) 相当于 back() 点击后 返回上一页面
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }
  
  .active {
    color: var(--color-high-text);
  }
  
  .back img{ 
    margin-top: 10px;
  }
</style>