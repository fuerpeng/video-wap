<template>
  <div class="recommend">

    <scroller lock-x scrollbar-y class="recommend-scroll" :height="'-94px'" ref="recommend_scroll">
      <div>
        <div style="padding: 0 3%;margin-bottom: 10px">
          <router-link class="search_input" to="/search"><span><i class="iconfont">&#xe6e4;</i>&nbsp;无码,女教师</span></router-link>
          <span class="favoriteLogin"><!--<i class="iconfont">&#xe602;</i>--></span>
          <router-link to="/favorite"><span class="favoriteLogin"><i class="iconfont">&#xe687;</i></span></router-link>
        </div>
        <swiper loop auto @on-click-list-item = 'listItemHandle' class="swiper"  :list="swiperList" :aspect-ratio="0.45" dots-class="custom-bottom" style="padding: 0 10px"></swiper>
<!--

        <swiper loop auto  dots-class="custom-bottom" style="padding: 0 10px">
          <swiper-item class="swiper-demo-img" v-for="(item, index) in swiperList" :key="index">
            <img :src="item.img" style="width:100%;height: 100%" @click="bannerHandle(item.video)">
          </swiper-item>
        </swiper>-->
        <business v-if="recommendVideos.length"></business>
        <template v-for="(group,index) in recommendVideos">
          <template v-if="group.typeCode!=='sy'">
            <group-title class="group-title group-title-icon">{{group.typeName}} <span v-if="group.typeCode !='rmsp'" @click="more(group)" class="more">更多精彩 &nbsp;<i class="iconfont">&#xe644;</i></span></group-title>
            <flexbox v-if="group.typeCode =='rmsp'" :gutter="0" :wrap="'wrap'" :align="'flex-start'" style="background: #fff">
              <flexbox-item class="flex-item" :span="6" v-for="(item,index) in group.videoList.slice(beginNum, endNum).length < 8 ? group.videoList.slice(beginNum=0, endNum=8) : group.videoList.slice(beginNum, endNum)" :key="item.pathLogo">
                <div class="group-item">
                  <div style="position: relative"><img class="image" v-lazy="item.pathLogo" @click="onSelectItem(item)"><span class="video_time" v-if="item.videoTime!==undefined">{{item.videoTime.split(".")[0]}}</span></div>
                  <div class="title">{{item.videoTitle}}
                    <div class="videos_count"><i class="iconfont" style="font-size: 16px;vertical-align: bottom;">&#xe669;</i>&nbsp;{{item.hotHit}}</div>
                  </div>
                </div>
              </flexbox-item>
            </flexbox>
            <flexbox v-else :gutter="0" :wrap="'wrap'" :align="'flex-start'" style="background: #fff">
              <flexbox-item class="flex-item" :span="6" v-for="(item,index) in group.videoList" :key="index">
                <div class="group-item">
                  <div style="position: relative"><img class="image"  v-lazy="item.pathLogo" @click="onSelectItem(item)"><span class="video_time" v-if="item.videoTime!==undefined">{{item.videoTime.split(".")[0]}}</span></div>
                  <div class="title">{{item.videoTitle}}
                    <div class="videos_count"><i class="iconfont" style="font-size: 16px;vertical-align: bottom;">&#xe669;</i>&nbsp;{{item.hotHit}}</div>
                  </div>
                </div>
              </flexbox-item>
            </flexbox>
            <div v-if="group.typeCode =='rmsp'" class="hotButtonWarp">
              <div @click="changeGroup" class="changeLook itembutton" style="width: 48%;float: left">换一批看看 <img src="./changeLook.png" alt="换一批看看"> </div>
              <div @click="more(group)" class="moreVideos itembutton" style="width: 48%;float: right">更多视频 <img src="./moreVideos.png" alt="更多视频"> </div>
            </div>
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
        beginNum: 0,
        endNum: 8,
        swiperList: [{
          img: 'https://210835.com/resources/yzwuma/1089/1089.png',
          title: 'Kamikaze女孩75',
          video: {
            hotHit: 16148,
            id: 4023,
            path480p: '/resources/yzwuma/1089/index.m3u8',
            path720p: '/resources/yzwuma/1089/index.m3u8',
            path1080p: '/resources/yzwuma/1089/index.m3u8',
            pathLogo: 'https://210835.com/resources/yzwuma/1089/1089.png',
            videoTime: '01:19:37.539509',
            videoTitle: 'Kamikaze女孩75'
          }
        }, {
          img: 'https://210835.com/resources/yzyouma/118/118.png',
          title: 'KV-190 GANGBANG性感漂亮和CREAMPIE她的猫',
          video: {
            hotHit: 29323,
            id: 4203,
            path480p: '/resources/yzyouma/118/index.m3u8',
            path720p: '/resources/yzyouma/118/index.m3u8',
            path1080p: '/resources/yzyouma/118/index.m3u8',
            pathLogo: 'https://210835.com/resources/yzyouma/118/118.png',
            videoTime: '02:01:52',
            videoTitle: 'KV-190 GANGBANG性感漂亮和CREAMPIE她的猫'
          }
        }, {
          img: 'https://210835.com/resources/oumei/58/58.png',
          title: '性感的金发女郎照顾公鸡',
          video: {
            hotHit: 44030,
            id: 4073,
            path480p: '/resources/oumei/58/index.m3u8',
            path720p: '/resources/oumei/58/index.m3u8',
            path1080p: '/resources/oumei/58/index.m3u8',
            pathLogo: 'https://210835.com/resources/oumei/58/58.png',
            videoTime: '00:31:46',
            videoTitle: '性感的金发女郎照顾公鸡'
          }
        }]
      }
    },
    methods: {
      changeGroup () {
        this.beginNum += 8
        this.endNum += 8
      },
      listItemHandle (val) {
        this.onSelectItem(val.video)
      },
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
      more (item) {
        if (item.typeCode === 'rmsp') {
          this.$router.push({path: '/hotVideo'})
        } else {
          this.$router.push({path: `/class/${item.id}/${item.typeName}`})
        }
      },
      ...mapMutations({
        setPlayerVideo: 'SET_PLAYER_VIDEO'
      })
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
        border-top: 1px solid #e5e5e5;
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
      .hotButtonWarp{
        overflow: hidden;
        background: #fff;
        padding: 20px;
        .itembutton{
          height: 33px;
          width: 48%;
          background: #ececec;
          border-radius: 6px;
          text-align: center;
          line-height: 33px;
          font-size: 14px;
          img{
            width: 20px;
            vertical-align: top;
            margin-top: 6px;
            margin-left: 6px;
          }
        }
        .changeLook{
          float: left;
        }
        .moreVideos{
          float: right;
        }
      }
    }
  }
</style>
<style>
  .custom-bottom .vux-icon-dot.active {
    background-color: #ff7bca !important;
  }

   .swiper .vux-swiper{
     border-radius: 5px;
   }
  .swiper > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc{
    background: rgba(0, 0, 0, 0.2);
    padding: 4px 50px 4px 13px !important;
  }
  .swiper > .vux-indicator, .vux-slider .vux-indicator-right{
    bottom: 4px !important;
  }
</style>
