<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">  <!-- 动态获取点击之后进入的页面 -->
          <img :src="item.image" alt="" @load="imageLoad"> <!-- 动态获取图片 -->
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>

// import Swiper from 'components/common/swiper/Swiper.vue'
// import SwiperItem from 'components/common/swiper/SwiperItem.vue'
import { Swiper, SwiperItem } from 'components/common/swiper/index'


export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {  // 类型是对象或者数组是，默认值必须是函数
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      // 有多少张图片就发出多少事件 轮播图的高度都是一样的 获取的数据 每一次一样的
      // 所以 只需要发一次事件即可 节流阀
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
      // console.log(1);
    }
  }
}
</script>

<style>

</style>