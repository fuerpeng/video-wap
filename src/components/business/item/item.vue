<template>
  <div class="business-item">
    <flexbox :gutter="0" class="business-item__wrapper" >
      <flexbox-item :span="8" style="overflow: hidden">
        <img v-if="iconType==='qq'" class="icon" src="../qq.png"/>
        <img v-if="iconType==='weChat'" class="icon" src="../weChat.png"/>
        <span class="title">{{contact}}</span>
      </flexbox-item>
      <flexbox-item style="overflow: hidden">
        <div v-if="iconType==='qq'" class="title-right" @click="openQQ" style="overflow: hidden">复制</div>
        <div v-if="iconType==='weChat'" class="title-right" style="overflow: hidden" @click="handleCopyWeChat($event)">复制</div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Group, GroupTitle, Flexbox, FlexboxItem} from 'vux'
  import clip from 'common/js/clipboard'
  export default {
    props: {
      contact: {
        type: String
      },
      iconType: {
        type: String,
        default: 'qq'
      }
    },
    data () {
      return {}
    },
    mounted () {
    },
    components: {Group, GroupTitle, Flexbox, FlexboxItem},
    methods: {
      openQQ () {
        if (this.contact && this.contact !== 'null') {
          window.open(`mqqapi://im/chat?chat_type=wpa&uin=${this.contact}&version=1&src_type=web`, '_blank')
        }
      },
      handleCopyWeChat (event) {
        if (this.contact && this.contact !== 'null') {
          clip(this.contact, event, function () {
            let f = confirm('微信号已复制,粘贴即可')
            if (f) {
              window.open('weixin://', '_blank')
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .business-item {
    background-color: #feb7c7;
    height: 35px;
    border-radius: 6px;
    .business-item__wrapper {
      line-height: 35px;
      overflow: hidden;
      .icon {
        height: 16px;
        width: 16px;
        vertical-align: middle;
        margin-left: 10px;
        display: inline-block;
      }
      .title {
        font-size: 13px;
        width: 10px;
        color: rgb(255, 255, 255);
        display: inline-block;
      }
      .title-right {
        height: 20px;
        font-size: 13px;
        color: rgb(255, 255, 255);
        float: right;
        line-height: 20px;
        margin-right: 20px;
        border-left: 1px solid #fff;
        padding-left: 7px;
      }
    }
  }
</style>
