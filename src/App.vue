<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import MFooter from 'components/m-footer/m-footer'
  import {ERR_OK, INDEX_VIDEO, HOT_VIDEO} from 'api/config'
  import {getVideoTypes, getVideoListByTypeForIndexPage, getContactQQ} from 'api/recommend'
  import {mapActions, mapMutations} from 'vuex'
  import Video from 'common/js/video'

  export default {
    name: 'app',
    components: {
      MHeader,
      MFooter
    },
    created () {
      this._getIndexPageList()
      this._getQQContact()
    },
    methods: {
      _getQQContact () {
        getContactQQ().then(response => {
          const {currentStatus, currentData} = response
          if (currentStatus === ERR_OK) {
            this.setQQContact({qq: currentData.QQ})
            this.setWeChatContact({weChat: currentData.WECHAT})
          }
        }).catch(() => {

        })
      },
      getVideoObjects () {
        const videos = []
        for (let i = 0; i < 4; i++) {
          videos.push(new Video({
            id: '',
            videoTitle: '加载中...',
            pathLogo: '',
            path480p: '',
            path720p: '',
            path1080p: ''
          }))
        }
        return videos
      },
      _getIndexPageList () {
        getVideoTypes().then(response => {
          const _this = this
          const {currentStatus, currentData} = response
          if (currentStatus === ERR_OK) {
            if (currentData.length) {
              currentData.splice(0, 0, {id: INDEX_VIDEO, typeName: '首页', typeCode: 'sy'})
              currentData.splice(1, 0, {id: HOT_VIDEO, typeName: '热门视频', typeCode: 'rmsp'})
              this.setVideoTypes(currentData)
              const recommendTemplate = []
              currentData.forEach(item => {
                recommendTemplate.push(Object.assign(item, {videoList: _this.getVideoObjects()}))
              })
              this.setRecommend(recommendTemplate)
            }
            return currentData
          }
          return []
        }).then(types => {
          if (types.length) {
            for (let i = 0; i < types.length; i++) {
              if (types[i].typeCode !== 'sy') {
                this.getVideoListByType(types[i])
              }
            }
          }
        })
      },
      getVideoListByType (videoTypeObject) {
        getVideoListByTypeForIndexPage({typeId: videoTypeObject.id}).then(response => {
          const {currentStatus, currentData} = response
          if (currentStatus === ERR_OK && currentData.length) {
            this.updateVideoTypeVideos(Object.assign(videoTypeObject, {videoList: currentData}))
          }
        }).catch(() => {
        })
      },
      ...mapActions([
        'updateVideoTypeVideos'
      ]),
      ...mapMutations({
        setVideoTypes: 'SET_VIDEO_TYPES',
        setRecommend: 'SET_RECOMMEND_VIDEO_LIST',
        setQQContact: 'SET_QQ',
        setWeChatContact: 'SET_WECHAT'
      })
    },
    watch: {
      $route () {
        if (this.$route.path === '/favorite') {
          this.$nextTick(function () {
            document.querySelector('#app').style.cssText = 'height: 0px !important'
          })
        } else {
          this.$nextTick(function () {
            document.querySelector('#app').style.cssText = 'height: 150px !important'
          })
        }
      }
    }
  }
</script>
<style lang="less">
  .weui-cells:before {
    display: none;
  }

  .weui-cells:after {
    display: none;
  }
  @import '~common/less/icon.less';
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @font-face {
    font-family: 'iconfont';  /* project id 728386 */
    src: url('//at.alicdn.com/t/font_728386_de38u4lp6je.eot');
    src: url('//at.alicdn.com/t/font_728386_de38u4lp6je.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_728386_de38u4lp6je.woff') format('woff'),
    url('//at.alicdn.com/t/font_728386_de38u4lp6je.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_728386_de38u4lp6je.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  body {
    background-color: #fff;
  }
  #app{
    background: url("assets/img/head_bg.jpg") no-repeat top center;
    height: 150px;
  }
</style>
