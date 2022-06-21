<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
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
      if(!this.isLoad) {
        this.$emit('recommentImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style>
  .recommend {
    display: flex;
    width: 100;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 10px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 80px;
    height: 80px;
    margin-bottom: 5px;
  }
</style>