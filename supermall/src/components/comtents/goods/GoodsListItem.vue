<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">  <!-- @load="" 监听图片 -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
    defualt() {
      return {}
    }
    }
  },
  methods:{
    imageLoad() {
      // console.log(11);
      // $.bus 事件总线 可以向 父组件的父组件 或者 （无关联的两个页面） 发送事件
      // console.log(this.$bus); 是 未定义
      // 要是 想 让 $bus 发送事件 必须给它赋特殊值（vue实例）
      // 在main.js 里面 赋值

      if(this.$route.path.indexOf('/home')) {  // 判断是不是在 /home 路径
        this.$bus.$emit('itemImageLoad')
      }
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)   // 路由跳转
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  mounted() {
    
  }
}
</script>

<style>
 .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 47%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {  /* 利用伪元素 插入 收藏的小图标 */
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
  }

</style>