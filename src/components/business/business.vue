<template>
  <div class="business">
    <group>
      <group-title slot="title" class="group-title">
        <img src="./lottery_hot.png"/>
        <span class="group-title__text">棋牌热门-红包讨论群</span>
        <span style="float:right;">免费送福利</span>
      </group-title>
      <flexbox>
        <flexbox-item>
          <business-item :iconType="'weChat'" :contact="weChat1"></business-item>
        </flexbox-item>
        <flexbox-item>
          <business-item :iconType="'weChat'" :contact="weChat2"></business-item>
        </flexbox-item>
      </flexbox>
    </group>
    <group>
      <group-title slot="title" class="group-title">
        <img src="./liuhecai.png"/>
        <span class="group-title__text">六合彩三肖-连准36期</span>
        <span style="float:right;">近期已公开</span>
      </group-title>
      <flexbox>
        <flexbox-item>
          <business-item :iconType="'qq'" :contact="qq1"></business-item>
        </flexbox-item>
        <flexbox-item>
          <business-item :iconType="'weChat'" :contact="weChat3"></business-item>
        </flexbox-item>
      </flexbox>
    </group>
  </div>
</template>
<script>
  import {Group, GroupTitle, Flexbox, FlexboxItem} from 'vux'
  import BusinessItem from './item/item'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        weChat1: '',
        weChat2: '',
        qq1: '',
        weChat3: ''
      }
    },
    watch: {
      weChat (val) {
        if (val) {
          this.getConcats()
        }
      }
    },
    mounted () {
      this.getConcats()
    },
    computed: {
      ...mapGetters([
        'qq',
        'weChat'
      ])
    },
    components: {Group, GroupTitle, Flexbox, FlexboxItem, BusinessItem},
    methods: {
      getConcats () {
        const weChats = this.weChat.indexOf(',') !== -1 ? this.weChat.split(',') : []
        if (weChats.length > 2) {
          this.weChat1 = this.weChat.split(',')[0]
          this.weChat2 = this.weChat.split(',')[1]
          this.weChat3 = this.weChat.split(',')[2]
        }
        if (this.qq) {
          this.qq1 = this.qq
        }
      }
    }
  }
</script>
<style lang="less">
  .business {
    padding: 0px 10px 10px;
    background: #fff;
    .group-title {
      padding-left: 0;
      padding-right: 0;
      padding-top: 0.77em;
      margin-top: 0;
      img{
        width: 18px;
        vertical-align: middle;
      }
      .group-title__icon {
        width: 30px;
        height: 22px;
      }
      .group-title__text {
        margin-left: 5px;
        font-weight: 900;
        color: #323205;
        font-size: 15px;
      }
    }
  }
</style>
