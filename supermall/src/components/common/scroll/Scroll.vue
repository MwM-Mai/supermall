<template>
  <!-- ref="" 绑定组件上 通过 this.$refs. 获取的是组件对象
       如果 绑定普通的元素中 通过 this.$refs. 获取的是一个元素对象 -->
  <div class="wrapper" ref="wrapper"> 
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll, { PullUpLoad } from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1. 创建 scroll 对象
    // const wrapper = document.querySelector('.wrapper')
    // 如果 其他组件也有 wrapper 属性 那么 或默认 获取 第一个wrapper 
    // 所以 建议用 ref="" 来获取 唯一性
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,    // 默认为 false   true 时 类似于 div、组件 之类的标签 可以监听到点击事件
      probeType: this.probeType,    // 监听滚动事件的属性
      pullUpLoad: this.pullUpLoad,   // 监听下拉加载数据属性
    }) 

    // this.scroll.scrollTo(0, 0)
    // scroll.scrollTo(x, y, 参数3) 方法 回到指定位置 这里是回到顶部 参数3： 多少毫秒内回到 
  
    // 2. 监听滚动事件
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll', position) // 自定义事件 传给 父组件
    })

    // 3. 监听scroll滚动到底部
    this.scroll.on('pullingUp', () => {
      // console.log('监听滚动到底部');
      this.$emit('pullingUp')
    })
  
  },
  methods: {

    // 定位到 某个位置
    scrollTo(x, y, time) {
      // 判断 this.scroll 是否存在 值 执行 下一步 
      this.scroll && this.scroll.scrollTo(x, y, time)
    },

    // 下拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },

    // 计算 scroll 的高度
    refresh() {
      // 判断 this.scoll 是否存在 值 执行 下一步 
      // 否则 图片加载完成后 csroll 为 null 计算高度会报错
      // console.log(11);
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style>

</style>