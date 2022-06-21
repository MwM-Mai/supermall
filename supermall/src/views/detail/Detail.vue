<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <div>
      {{$store.state.Cartlist.lenght}}
    </div>
    <scroll class="centent" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment="commentInfo"></detail-comment-info>
      <goods-list ref="recomment" :goods="recommends">
      </goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top> <!-- 组件是无法监听的 要监听组件 必须在监听后面加 .native -->
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childcomps/DetailNavBar'
import DetailSwiper from './childcomps/DetailSwiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo.vue'
import DetailShopInfo from './childcomps/DetailShopInfo.vue'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo.vue'
import DetailParamInfo from './childcomps/DetailParamInfo.vue'
import DetailCommentInfo from './childcomps/DetailCommentInfo.vue'
import DetailBottomBar from './childcomps/DetailBottomBar.vue'



import Scroll from 'components/common/scroll/Scroll.vue'
// import Toast from 'components/common/toast/Toast.vue'
import GoodsList from 'components/comtents/goods/GoodsList.vue'
import GoodListItem from 'components/comtents/goods/GoodsListItem.vue'





import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
import { debounce } from 'common/utils.js'
import { backTopMixin } from 'common/mixin.js' // 导入混入



export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    GoodsList,
    GoodListItem,
    Scroll,
    // Toast
  },
  mixins: [backTopMixin],   // 使用混入
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false,
    }
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid

    // 2. 根据iid 请求详情数据
    getDetail(this.iid).then(res => {
      // 1. 获取顶部的轮播图片数据
      const data = res.result

      // 2. 获取轮播图信息
      this.topImages = data.itemInfo.topImages
      // console.log(res);
      
      // 3. 获取商品信息
      // 因为后端数据很乱 所以 创建一个类 把那些数据放到一个类对象里面 传给子组件
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    
      // 4. 获取店铺信息
      this.shop = new Shop(data.shopInfo) 

      // 5. 获取商品详细信息
      this.detailInfo = data.detailInfo

      // 6. 获取参数的详细的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7. 获取评论信息
      // 有些商品没有评论信息 所以需判断
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      } 

      // 错误的写法 对应的DOM是已经被渲染出来 但是图片还没有加载完（目前获取到offsetTop不包含其中的图片）
      // this.$nextTick(() => {  // $nextTick(下一帧) dom渲染完成不代表图片渲染完成 渲染线程 和 js代码 不在同一个线程里面
        
      //   // 根据最新的数据， 对应的DOM是已经被渲染出来 但是图片还没有加载完（目前获取到offsetTop不包含其中的图片）
      //   // $refs 拿到的是组件 
      //   // 组件不是DOM元素，是没有OffsetTop的，无法通过 点 .OffsetTop来获取的。就需要通过$el来获取组件中的DOM元素
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   // this.themeTopYs.push(参数的offsteTop);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      //   // this.themeTopYs.push(评论的offsteTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      //   // this.themeTopYs.push(评论的offsteTop);
      //   this.themeTopYs.push(this.$refs.recomment.$el.offsetTop - 44);
      //   console.log(this.themeTopYs);
      // })


    })

    // 每次点击的商品详情页都不一样 所以 不需要 用 keep-alive 对组件进行缓存
    // 所以在 app.vue 里面的 keep-alive 标签 加上 exclude="Detail"
  

    // 8. 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })


    // 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        // this.themeTopYs.push(参数的offsteTop);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
        // this.themeTopYs.push(评论的offsteTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        // this.themeTopYs.push(评论的offsteTop);
        this.themeTopYs.push(this.$refs.recomment.$el.offsetTop - 44);
        // 添加一个最大值 Number.MAX_VALUE 最大值
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);

      }, 1000)
  },
  mounted() {
    
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
    },


    //  滚动内容显示对应的标题
    contentScroll(position) {
      // console.log(position);
      // 1. 获取y值
      const positionY = -position.y

      // 2. positionY 和 主题中的值对比
      let lenght = this.themeTopYs.length
      // console.log(lenght);
      for(let i = 0; i < lenght - 1; i++) {
        // console.log(i);  类型是 str
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i*1 + 1]) {
        //   // 这个 i+1 = 5 时 会报错 undefined 
          // console.log(i);
        // }
        // console.log(this.themeTopYs.length);
        // if(this.currentIndex !== i && ((i < lenght - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === lenght - 1 && positionY >= this.themeTopYs[i]))) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          // this.currentIndex !== i 判断 是否和当前 i 一致 ， 一致时 不会多次打印 
          this.currentIndex = i
          this.$refs.nav.currentIdenx = this.currentIndex
          // console.log(this.$refs.nav.currentIdenx);
        }
      }


      // 3.是否显示回到顶部
      ((-position.y) > 1000) ? this.isShowBackTop = true :this.isShowBackTop = false

    },

    //  加入购物车
    addToCart() {
      // console.log(1);
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid

      // 2. 将商品添加到给购物车里面  利用 vuex 
      // this.$store.Cartlist.push(product)   不合法的 在开发过程中 不允许组件直接修改全局数据
      // commit 的作用 就是 调用某个 mutations 的函数
      // this.$store.commit('addCart', product)   // 调用 store 里面的 vuex 的 mutations 方法
      // console.log(this.$store.state.Cartlist);
      this.$store.dispatch('addCart', product).then(res => {
        console.log(res);
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 2000)
        this.$toast.show(res, 2000)

      })


      // 3. 利用 Toast 添加到购物车成功
    }
  }
}
</script>

<style>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .centent{
    height: calc(100vh - 102px);
    overflow: hidden;
  }
</style>