<template>
  <div class="feature"> 
    <a href="http://act.mogujie.com/zzlx67">
    <img src="~assets/images/home/recommend_bg.jpg" alt="" @load="imageLoad">
    </a>
  </div>
</template>

<script>
export default {
  name: 'HomeFeature',
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      this.$emit('featureImageLoad')
    }
  }
}
</script>

<style>
  .feature img {
    width: 100%;
  }
</style>