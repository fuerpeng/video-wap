<template>
  <div class="m-header">
    <router-link to="/">
      <div class="logo"></div>
    </router-link>
    <div class="slider-wrapper">
      <div class="slider">
        <scroller lock-y class="slider-scroller">
          <ul ref="sliderGroup" :style="{width: `${(videoTypes.length-2)*80+40}px`}">
            <template v-for="(item,index) in videoTypes">
              <li :class="activeItemName == item.typeName ? 'activeItem': ''" v-if="item.typeCode !== 'rmsp'" :style="{width: `${item.typeCode === 'sy'? '40px':'80px'}`}"
                  @click="handleItemClick(item)">{{item.typeName}}
              </li>
            </template>
          </ul>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import {Scroller} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      Scroller
    },
    data () {
      return {
        activeItemName: ''
      }
    },
    computed: {
      ...mapGetters([
        'routerTitle',
        'videoTypes'
      ])
    },
    methods: {
      handleItemClick (item) {
        if (item.typeCode === 'sy') {
          this.activeItemName = ''
          return this.$router.push({path: '/index'})
        }
        this.activeItemName = item.typeName
        return this.$router.push({path: `/class/${item.id}/${item.typeName}`})
      }
    },
    watch: {
      $route () {
        this.activeItemName = this.$route.params.typeName
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-header {
    position: relative;
    height: 44px;
    font-size: 0;
    .logo {
      position: absolute;
      left: 8px;
      top: 5px;
      width: 60px;
      height: 32px;
      background-image: url("./logo-yhc@2x.png");
      background-size: 60px 32px;
    }
    .slider-wrapper {
      top: 0;
      right: 0;
      height: 44px;
      margin-left: 65px;
      margin-right: 5px;
      font-size: 15px;
      overflow: hidden;
      text-align: center;
      .slider-scroller {
        ul {
          list-style-type: none;
          height: 44px;
          line-height: 44px;
          font-size: 16px;
          font-family: SimHei;
          color: #fff;
          li {
            display: inline-block;
            transition: 0.3s all;
          }
          li.activeItem{
            color: #fffcc8;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
