<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" 
                 :title="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl1"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="content" 
            :probe-type="3" @scroll="contentscroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends" ref="recommends"></home-recommend-view>
      <home-feature ref="feature"></home-feature>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods" ref="goods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top> <!-- 组件是无法监听的 要监听组件 必须在监听后面加 .native -->
  </div>
</template>

<script>
import HomeSwiper from './chidComps/HomeSwiper.vue'
import HomeRecommendView from './chidComps/HomeRecommendView.vue'
import HomeFeature from './chidComps/HomeFeature'
 
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/comtents/tabcontrol/Tabcontrol.vue'
import GoodsList from 'components/comtents/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/comtents/backTop/BackTop.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home.js'
import { debounce } from 'common/utils.js'



export default {
  name: 'home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeature,

    NavBar,
    TabControl,
    getHomeGoods,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],   // 轮播图数据
      recommends: [],  // 推荐数据
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
        
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsteTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created() { // 生命周期函数 创建好 就发送请求
    // 1. 请求多个数据
    this.getHomeMultidata()
    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  mounted() {

    // 1.监听 item 图片加载完成 （来自GoodsListItem.vue） 监听 发送过来是事件

    const refresh = debounce(this.$refs.content.refresh, 500)

    // $.bus 事件总线 向不是父子组件 发送监听事件 这里监听 GoodsListItem 的事件
    this.$bus.$on('itemImageLoad', () => {
      // console.log('11');
      // console.log(this.$refs.content);
      // 要判断 this.$refs.content 里面是否有数据  因为图片加载完的速度快
      // 如果网络慢  this.$refs.content 获取数据慢 有可能 是 undefined 就会报错 
      
      // this.$refs.content && this.$refs.content.refresh() // 每次加载完图片 重新计算高度 解决 加载图片慢的时候 无法滚动的bug
      this.$refs.content && refresh()
    })

    
  } ,
  methods: {
    /** 网络请求相关的方法 */
    getHomeMultidata() {
      getHomeMultidata().then( res => {
      // console.log(res);
      // this.result = res;  // 保存 获取的数据 如果不保存 函数调用弯之后会跳出函数栈（释放所有的变量）
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      });  // 异步操作
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;  // 实现页码复用
      // goods 是对象 获取的属性是变量的时候用goods[type] 写法 用 . 会报错
      getHomeGoods(type, page).then( res => {
      // console.log(res.data);
      this.goods[type].list.push(...res.data.list) // 存储数据 
      this.goods[type].page += 1 // goods 里面属性的页码


      // 完成数据请求后需要调用 finishPullUp 否则只能 一次下拉加载数据
      this.$refs.content.finishPullUp()

      })
    },


    /** 事件监听相关的方法 */
    tabClick(index) {
      switch(index) {
        case 0: 
          this.currentType = 'pop'
          break
        case 1: 
          this.currentType = 'new'
          break
        case 2: 
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    
    backClick() {
      this.$refs.content.scrollTo(0, 0 , 500)  // 访问子组件 content 的 scroll 的方法
      
    }, 

    // 监听首页滚动
    contentscroll(position) {
      // 判断什么时候显示返回顶部图标
      ((-position.y) > 1000) ? this.isShowBackTop = true :this.isShowBackTop = false

      // 决定 tabControl 是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsteTop // (-position.y) > this.tabOffsteTop 大于 为true
    },

    loadMore() {
      // console.log(11);
      this.getHomeGoods(this.currentType)
    },

    // 监听轮播图高度方法
    swiperImageLoad() {
      // 2. 获取tabControl 的 offsteTop 实现吸顶效果 到达一定高度时 固定位置
      // 组件中没有 offsetTop 只用 元素才有 比如 div 之类的
      // 所以组件中都要应该属性$el: 用于获取组件中的元素
      // this.tabOffsteTop = this.$refs.TabControl.$el
      // 如果在 生命周期函数 mounted 获取的offseTop 不是准确的 因为图片是异步加载 所以 还没有计算到图片的高度
      
      // 正确获取值 需要监听 图片的高度 然后发出事件 监听事件
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsteTop = this.$refs.tabControl2.$el.offsetTop
    }

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  // 如果 不使用 <keep-alive> 标签  activated 和 deactivated 是不起作用的
  // 进入时 方法
  activated() {
    this.$refs.content.refresh() // 进入的时候重新计算一下高度 否则 会出现 直接跳转到顶部
    this.$refs.content.scrollTo(0, this.saveY)
    
    // console.log(111);
  },

  // 离开时 方法 
  deactivated() {
    // console.log(11);
    // console.log(this.$refs.content.scroll.y);
   this.saveY = this.$refs.content.scroll.y
  },
}
</script>

<style scoped> /* scoped 是只针对这个组件的css作用 如果其他地方有相同的 css 不作用 */
  #home {
    padding: 44px 0 0 0;
    height: 100vh;  /* vh -> viewport height 视口高度 */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control { 
    position: relative;
    z-index: 9; /* z-index: ; 只对定位的元素起效果 */
    background-color: #fff;
  } 

  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
    background-color: #fff;
    /* position: absolute;
    left: 0;
    top: 44px;
    right: 0;
    bottom: 49px;
    background-color: #fff; */
  }

</style>