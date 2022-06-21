<template>
      <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
          <slot name="item-icon"></slot>  <!-- 图片和文字不能写死 -->
        </div>
        <div v-else>
          <slot name="item-icon-active"></slot>  <!-- 图片和文字不能写死 -->
        </div>
        <div :style="activeStyle">
          <slot name="item-text"></slot> <!-- 动态绑定 calss 是布尔值 -->
        </div>
        <!-- <slot :class="{active: isActive}" name="item-text"></slot> -->
        <!-- 插槽最后会被替换掉 :class="{active: isActive}" 也会替换掉 所以在这里添加不显示 所以需要放在一个div里面 -->
      </div>
</template>

<script>
export default {
  name: 'tabbarItem',
  props: {  // 在App.vue获取对应的组件路径 父传子
    path: String,
    activecolor: { // 在App.vue获取对应的组件文字的颜色 父传子
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true 不能写死
    }
  },
  computed: {
    isActive () {
      // $route.path返回 当前活跃的path
      // 判断 当前活跃的路径是否和点击路径相同 例如
      // /home =? item1(/home) == true
      // /home =? item1(/class) == flase
      // /home =? item1(/chopCard) == flase
      // /home =? item1(/profile) == flase
      return this.$route.path.indexOf(this.path)  != -1
      // -1 表示 当前活跃的路径和点击路径不存在相同
    },
    activeStyle() {
      return this.isActive ? {color: this.activecolor} : {} // 三元表达式
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(() => {})
    }
  }
}
</script>

<style>
  .tab-bar-item {
    flex: 1; /* 均衡分配 */
    text-align: center;
    height: 49px;
    box-shadow: 0 -2px 1px rgba(100,100,100,0.1); /* 边框阴影 */
    font-size: 14px;
    
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;  /* 图片边框 向下移动3px */
    vertical-align: middle;  /* 垂直对齐方式 图片和文字的间距默认为 3px middle 是放在父元素的中部 */
    margin-bottom: 2px;
  }

  
</style>