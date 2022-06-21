<template>
  <div class="tab-control">
    <div v-for="(item, index) in title" 
    :key="item.index" class="tab-control-item"
    :class="{active: index == currentIndex}" 
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  nam: 'TabCtrol',
  props: {
    title: {
      type:Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0  // 记录当前是否选中
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)  // 子传父 自定义事件
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    font-size: 15px;
    line-height: 40px;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span{
    padding: 5px;
  }

  .active {
    color: var(--color-high-text); /* 在css 里面定义的变量颜色 */
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>