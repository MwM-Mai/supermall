import BackTop from 'components/comtents/backTop/BackTop.vue'

// 点击回到顶部
export const backTopMixin = {
  components: {
    BackTop,

  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0 , 500)  // 访问子组件 content 的 scroll 的方法
    },
  }
}