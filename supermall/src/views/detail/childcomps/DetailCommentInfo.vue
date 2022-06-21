<template>
  <div id="detail_comment" v-if="Object.keys(comment).length != 0">
    <div class="comment_title">
      <span class="comment_name">用户评价</span>
      <span class="comment_more">更多</span>
    </div>
    <div class="comment_info">
      <div class="u_info">
        <img :src="comment.user.avatar" alt="" />
        <span>{{ comment.user.uname }}</span>
      </div>
      <div class="comment_content">
        <div class="content">{{ comment.content }}</div>
        <p class="content_info">
          {{ comment.created | showDate }} {{ comment.style }}
        </p>
        <!-- comment.created 是获取时间  服务器的时间都是 时间戳 不是 yyyy-mm-dd 格式 所以需要 过滤 | -->
      </div>
    </div>
    <div class="shop_reply" v-if="comment.explain != null">
      {{ comment.explain }}
    </div>
    <div class="comment_img" v-if="comment.images != null">
      <img
        :src="item"
        alt=""
        v-for="(item, index) in comment.images"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import { formatDate } from 'common/utils.js'

export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {   //  过滤器 在可在双花括号使用 {{ | 函数名字如(showDate) }}
  // 可被用于一些常见的文本格式化
    showDate(value) {
      // 1. 将时间戳转成 Date对象
      const date = new Date(value * 1000)  // 时间戳的数值是秒 Date对象 需要的是毫秒 所以 * 1000
      
      // 2. 将date进行格式化 
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')  // 'yyyy-MM-dd' 为格式化 大写 M 为月 小写 m 为时
    } 
  }
};
</script>
<style scoped>
#detail_comment {
  font-size: 0.65rem;
  padding: 0.42rem 0.34rem;
}
.comment_title {
  padding: 0.42rem 0;
  padding-bottom: 0.8rem;
  border-bottom: 0.08rem solid rgba(128, 128, 128, 0.3);
  position: relative;
}
.comment_more {
  position: absolute;
  right: -0.26rem;
  top: 0rem;
}
.comment_more::after {
  content: "";
  background: url("~assets/images/common/arrow-left.svg") 0 0/1.06rem 1.06rem;
  display: inline-block;
  position: relative;
  top: 0.26rem;
  width: 1.06rem;
  height: 1.06rem;
}
.u_info {
  padding: 0.42rem 0;
  line-height: 1.8rem;
  display: flex;
}
.u_info img {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  border: 0.04rem solid rgba(128, 128, 128, 0.3);
}
.u_info span {
  margin-left: 0.42rem;
}
.content {
  line-height: 1rem;
  color: #666;
}
.content_info {
  color: #999;
  padding: 0.3rem 0;
}
.shop_reply {
  border-top: 0.04rem solid rgba(128, 128, 128, 0.4);
  padding: 0.5rem 0;
  color: gray;
  line-height: 0.8rem;
}
.comment_img img {
  margin-right: 0.21rem;
  width: auto;
  height: 4.26rem;
}
</style>