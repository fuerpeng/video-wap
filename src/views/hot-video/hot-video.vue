<template>
  <div class="recommend">

    <scroller lock-x scrollbar-y class="recommend-scroll" :height="'-94px'" ref="recommend_scroll">
      <div>
        <template v-for="(group,index) in recommendVideos">
          <template v-if="group.typeCode==='rmsp'">
            <group-title class="group-title group-title-icon">{{group.typeName}}</group-title>
            <flexbox :gutter="0" :wrap="'wrap'" :align="'flex-start'" style="background: #fff">
              <flexbox-item class="flex-item" :span="6" v-for="(item,index) in group.videoList" :key="index">
                <div class="group-item">
                  <div style="position: relative"><img class="image" v-lazy="item.pathLogo" @click="onSelectItem(item)"><span v-if="item.videoTime!==undefined" class="video_time">{{item.videoTime.split(".")[0]}}</span></div>
                  <div class="title">{{item.videoTitle}}
                    <div class="videos_count"><i class="iconfont" style="font-size: 16px;vertical-align: bottom;">&#xe669;</i>&nbsp;{{item.hotHit}}</div>
                  </div>
                </div>
              </flexbox-item>
            </flexbox>
          </template>
        </template>
      </div>
    </scroller>

    <div v-transfer-dom>
      <transition name="slide">
        <player-detail v-if="playerVisible" @back="playerVisible= false"></player-detail>
      </transition>
    </div>
  </div>
</template>

<script>
  import {GroupTitle, Flexbox, FlexboxItem, Scroller, Swiper, SwiperItem} from 'vux'
  import {mapMutations, mapGetters} from 'vuex'
  import Video from 'common/js/video'
  import PlayerDetail from 'components/player-detail/player-detail'
  import TransferDom from 'directives/transfer-dom'
  import Business from 'components/business/business'

  export default {
    components: {
      GroupTitle,
      Flexbox,
      FlexboxItem,
      Scroller,
      PlayerDetail,
      Business,
      Swiper,
      SwiperItem
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        playerVisible: false,
        swiperList: [{
          url: 'javascript:',
          img: 'https://210835.com/resources/yzyouma/120/120.png',
          title: 'akiho-yoshizawa吉泽明步'
        }, {
          url: 'javascript:',
          img: 'https://210835.com/resources/yzyouma/118/118.png',
          title: 'KV-190 GANGBANG性感漂亮和CREAMPIE她的猫'
        }, {
          url: 'javascript:',
          img: 'https://210835.com/resources/yzyouma/115/115.png',
          title: 'NHỮNGCÔNÀNGCÔNGSỞDÂMĐÃNG'
        }]
      }
    },
    methods: {
      onSelectItem (video) {
        this.setPlayerVideo(new Video({
          id: video.id,
          videoTitle: video.videoTitle,
          pathLogo: video.pathLogo,
          path480p: video.path480p,
          path720p: video.path720p,
          path1080p: video.path1080p,
          videoTime: video.videoTime.split('.')[0],
          hotHit: video.hotHit
        }))
        this.playerVisible = true
      },
      ...mapMutations({
        setPlayerVideo: 'SET_PLAYER_VIDEO'
      })
    },
    created () {
    },
    computed: {
      ...mapGetters([
        'recommendVideos',
        'qq',
        'weChat'
      ])
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        setTimeout(function () {
          vm.$refs.recommend_scroll.reset()
        }, 300)
      })
    }
  }
</script>
<style lang="less" scoped>
  input::-webkit-input-placeholder{
    color:#fff;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#fff;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#fff;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#fff;
  }
  .recommend {
    position: fixed;
    width: 100%;
    top: 44px;
    bottom: 50px;
    .recommend-scroll {
      .group-title {
        margin-top: 0 !important;
        margin-bottom: 0px !important;
        padding-left: 32px;
        padding-top: 4px;
        padding-bottom: 4px;
        color: #333;
        height: 36px;
        line-height: 35px;
        font-size: 16px;
        text-align: left;
        .more{
          float: right;font-size: 14px;color: #adadad;
          i{
            display: inline-block;
            transform: rotate(180deg);
            font-size: 12px;
          }
        }
      }
      .group-title-icon {
        background: url('./hot_video.png') #fff no-repeat 10px center;
        background-size: 16px;
      }
      .group-item {
        .image {
          height: 6.9rem;
          width: 100%;
          vertical-align: top;
        }
        .video_time{
          position: absolute;
          bottom: 0;
          right:0;
          background: rgba(0,0,0,0.3);
          font-size: 13px;
          color: #fff;
          padding: 0 4px;
        }
        .title {
          font-family: Roboto, Lato, sans-serif;
          overflow: hidden;
          font-size: 13px;
          height: 2.8rem;
          line-height: 16px;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-top: 6px;
          padding-left: 6px;
          .videos_count{
            color: #adadad;
            font-size:12px;
            margin-top: 3px;
            i{
              font-size: 12px;
            }
          }
        }
      }
      .flex-item:nth-child(2n-1){
        .group-item{
          margin-right: 5px;
        }
      }
      .flex-item:nth-child(2n){
        .group-item{
          margin-left: 5px;
        }
      }
      .search_input {
        display: inline-block;
        vertical-align: middle;
        width: 70%;
        height: 30px;
        background: rgba(245, 153, 205, 0.5);
        border: 1px solid #fff;
        padding-left: 10px;
        color: #fff;
        border-radius: 30px;
        text-align: center;
        line-height: 30px;
        outline: none;
      }
      .favorite, .login {
        display: inline-block;
        height: 30px;
        width: 30px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .favoriteLogin {
        margin-left: 5px;
        float: right;
        height: 30px;
        line-height: 30px;
      }
      .favoriteLogin i {
        font-size: 24px;
        color: #fff;
        vertical-align: middle;
      }
    }
  }
</style>
