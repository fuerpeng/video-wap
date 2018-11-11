<template>
  <div class="class-video">
    <scroller ref="scroller" lock-x scrollbar-y class="class-video-scroll" @on-scroll-bottom="onScrollBottom"
              :scroll-bottom-offst="200" :height="'-94px'">
      <div>
        <div style="padding: 0 3%;margin-bottom: 10px">
          <router-link class="search_input" to="/search"><span><i class="iconfont">&#xe6e4;</i>&nbsp;无码,女教师</span></router-link>
          <span class="favoriteLogin">
            <!--<i class="iconfont">&#xe602;</i>-->
          </span>
          <router-link to="/favorite"><span class="favoriteLogin"><i class="iconfont">&#xe687;</i></span></router-link>
        </div>
        <swiper  loop auto @on-click-list-item='listItemHandle' class="swiper" :list="swiperList" :aspect-ratio="0.45" dots-class="custom-bottom" style="padding: 0 10px">
        </swiper>
        <business v-if="videoList.length"></business>
        <group-title class="group-title group-title-icon">{{$route.params.typeName}}</group-title>
        <flexbox :gutter="0" :wrap="'wrap'" :align="'flex-start'" style="background: #fff">
          <flexbox-item :span="6" v-for="(item,index) in videoList" :key="index" class="flex-item">
            <div class="group-item">
              <div style="position: relative"><img class="image" v-lazy="item.pathLogo" @click="onSelectItem(item)"><span v-if="item.videoTime!==undefined" class="video_time">{{item.videoTime.split(".")[0]}}</span></div>
              <div class="title">{{item.videoTitle}}
                <div class="videos_count"><i class="iconfont" style="font-size: 16px;vertical-align: bottom;">&#xe669;</i>&nbsp;{{item.hotHit}}</div>
              </div>
            </div>
          </flexbox-item>
          <load-more :showLoading="hasMore" :tip="hasMore?'正在加载...':'没有更多啦'"></load-more>
        </flexbox>
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
  import {GroupTitle, Flexbox, FlexboxItem, Scroller, LoadMore, Swiper, SwiperItem} from 'vux'
  import Video from 'common/js/video'
  import {ERR_OK} from 'api/config'
  import {mapMutations, mapGetters} from 'vuex'
  import {getVideoListByType} from 'api/class-list'
  import PlayerDetail from 'components/player-detail/player-detail'
  import TransferDom from 'directives/transfer-dom'
  import Business from 'components/business/business'

  export default {
    components: {
      GroupTitle,
      Flexbox,
      FlexboxItem,
      Scroller,
      LoadMore,
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
        swiperList: [],
        videoTypeName: '',
        videoList: [],
        hasMore: true,
        onFetching: false,
        playerVisible: false,
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          typeId: ''
        }
      }
    },
    methods: {
      listItemHandle (val) {
        this.onSelectItem(val.video)
      },
      _initData (options) {
        this.reset()
        this.listQuery.typeId = options.type
        this.videoTypeName = options.typeName
        this.setRouterTitle(options.typeName)
        if (options.type === '1') {
          this.swiperList = [{
            img: 'https://210835.com/resources/yzyouma/120/120.png',
            title: 'akiho-yoshizawa吉泽明步',
            video: {
              hotHit: 45638,
              id: 4205,
              path480p: '/resources/yzyouma/120/index.m3u8',
              path720p: '/resources/yzyouma/120/index.m3u8',
              path1080p: '/resources/yzyouma/120/index.m3u8',
              pathLogo: 'https://210835.com/resources/yzyouma/120/120.png',
              videoTime: '01:14:43',
              videoTitle: 'akiho-yoshizawa吉泽明步'
            }
          }, {
            img: 'https://210835.com/resources/yzyouma/112/112.png',
            title: '停止一个月的搜索，然后变成荡妇',
            video: {
              hotHit: 21936,
              id: 4197,
              path480p: '/resources/yzyouma/112/index.m3u8',
              path720p: '/resources/yzyouma/112/index.m3u8',
              path1080p: '/resources/yzyouma/112/index.m3u8',
              pathLogo: 'https://210835.com/resources/yzyouma/112/112.png',
              videoTime: '02:55:49',
              videoTitle: '停止一个月的搜索，然后变成荡妇'
            }
          }, {
            img: 'https://210835.com/resources/yzyouma/110/110.png',
            title: '知道妻子的通奸应该起诉她的妹妹',
            video: {
              hotHit: 15823,
              id: 4194,
              path480p: '/resources/yzyouma/110/index.m3u8',
              path720p: '/resources/yzyouma/110/index.m3u8',
              path1080p: '/resources/yzyouma/110/index.m3u8',
              pathLogo: 'https://210835.com/resources/yzyouma/110/110.png',
              videoTime: '01:59:40',
              videoTitle: '知道妻子的通奸应该起诉她的妹妹'
            }
          }]
        } else if (options.type === '2') {
          this.swiperList = [{
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
            img: 'https://210835.com/resources/yzwuma/1083/1083.png',
            title: 'Caribbeancompr（060216-578）Yui Misaki',
            video: {
              hotHit: 29849,
              id: 4017,
              path480p: '/resources/yzwuma/1083/index.m3u8',
              path720p: '/resources/yzwuma/1083/index.m3u8',
              path1080p: '/resources/yzwuma/1083/index.m3u8',
              pathLogo: 'https://210835.com/resources/yzwuma/1083/1083.png',
              videoTime: '01:22:34',
              videoTitle: 'Caribbeancompr（060216-578）Yui Misaki'
            }
          }, {
            img: 'https://210835.com/resources/yzwuma/1078/1078.png',
            title: ' 真棒胸部Kyouko Maki MMF口交和Banging',
            video: {
              hotHit: 40186,
              id: 4012,
              path480p: '/resources/yzwuma/1078/index.m3u8',
              path720p: '/resources/yzwuma/1078/index.m3u8',
              path1080p: '/resources/yzwuma/1078/index.m3u8',
              pathLogo: 'https://210835.com/resources/yzwuma/1078/1078.png',
              videoTime: '00:36:53',
              videoTitle: '真棒胸部Kyouko Maki MMF口交和Banging'
            }
          }]
        } else if (options.type === '4') {
          this.swiperList = [{
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
          }, {
            img: 'https://210835.com/resources/oumei/59/59.png',
            title: '真正的Buttwoman回归 - 亚历克西斯得克萨斯，布莱尔威廉斯',
            video: {
              hotHit: 10681,
              id: 4074,
              path480p: '/resources/oumei/59/index.m3u8',
              path720p: '/resources/oumei/59/index.m3u8',
              path1080p: '/resources/oumei/59/index.m3u8',
              pathLogo: 'https://210835.com/resources/oumei/59/59.png',
              videoTime: '00:38:16',
              videoTitle: '真正的Buttwoman回归 - 亚历克西斯得克萨斯，布莱尔威廉斯'
            }
          }, {
            img: 'https://210835.com/resources/oumei/54/54.png',
            title: 'BELLE CLAIRE-DAP，TP（LP）',
            video: {
              hotHit: 44244,
              id: 4069,
              path480p: '/resources/oumei/54/index.m3u8',
              path720p: '/resources/oumei/54/index.m3u8',
              path1080p: '/resources/oumei/54/index.m3u8',
              pathLogo: 'https://210835.com/resources/oumei/54/54.png',
              videoTime: '00:51:01',
              videoTitle: 'BELLE CLAIRE-DAP，TP（LP）'
            }
          }]
        } else if (options.type === '7') {
          this.swiperList = [{
            url: 'javascript:',
            img: 'https://210835.com/resources/duansp/730/730.png',
            title: 'Alex Gray：天使之尘',
            video: {
              hotHit: 22502,
              id: 4045,
              path480p: '/resources/duansp/730/index.m3u8',
              path720p: '/resources/duansp/730/index.m3u8',
              path1080p: '/resources/duansp/730/index.m3u8',
              pathLogo: 'https://210835.com/resources/duansp/730/730.png',
              videoTime: '00:11:06',
              videoTitle: 'Alex Gray：天使之尘'
            }
          }, {
            img: 'https://210835.com/resources/duansp/727/727.png',
            title: 'Double Daydreams',
            video: {
              hotHit: 45589,
              id: 4042,
              path480p: '/resources/duansp/727/index.m3u8',
              path720p: '/resources/duansp/727/index.m3u8',
              path1080p: '/resources/duansp/727/index.m3u8',
              pathLogo: 'https://210835.com/resources/duansp/727/727.png',
              videoTime: '00:13:17',
              videoTitle: 'Double Daydreams'
            }
          }, {
            img: 'https://210835.com/resources/duansp/722/722.png',
            title: 'Silvie：完美的恋人',
            video: {
              hotHit: 18594,
              id: 4037,
              path480p: '/resources/duansp/722/index.m3u8',
              path720p: '/resources/duansp/722/index.m3u8',
              path1080p: '/resources/duansp/722/index.m3u8',
              pathLogo: 'https://210835.com/resources/duansp/722/722.png',
              videoTime: '00:10:15',
              videoTitle: 'Silvie：完美的恋人'
            }
          }]
        } else if (options.type === '11') {
          this.swiperList = [{
            img: 'https://210835.com/resources/zhubo/510/510.png',
            title: '亚洲网络摄像头525',
            video: {
              hotHit: 27404,
              id: 4272,
              path480p: '/resources/zhubo/510/index.m3u8',
              path720p: '/resources/zhubo/510/index.m3u8',
              path1080p: '/resources/zhubo/510/index.m3u8',
              pathLogo: 'https://210835.com/resources/zhubo/510/510.png',
              videoTime: '01:08:48',
              videoTitle: '亚洲网络摄像头525'
            }
          }, {
            img: 'https://210835.com/resources/zhubo/507/507.png',
            title: '长相很纯的漂亮妹子直播',
            video: {
              hotHit: 29478,
              id: 4269,
              path480p: '/resources/zhubo/507/index.m3u8',
              path720p: '/resources/zhubo/507/index.m3u8',
              path1080p: '/resources/zhubo/507/index.m3u8',
              pathLogo: 'https://210835.com/resources/zhubo/507/507.png',
              videoTime: '00:17:35',
              videoTitle: '长相很纯的漂亮妹子直播'
            }
          }, {
            img: 'https://210835.com/resources/zhubo/502/502.png',
            title: '大美女主播身材性感乳房饱满坚挺光屁屁2',
            video: {
              hotHit: 27314,
              id: 4264,
              path480p: '/resources/zhubo/502/index.m3u8',
              path720p: '/resources/zhubo/502/index.m3u8',
              path1080p: '/resources/zhubo/502/index.m3u8',
              pathLogo: 'https://210835.com/resources/zhubo/502/502.png',
              videoTime: '00:24:08',
              videoTitle: '大美女主播身材性感乳房饱满坚挺光屁屁2'
            }
          }]
        } else if (options.type === '12') {
          this.swiperList = [{
            url: 'javascript:',
            img: 'https://210835.com/resources/dongman/79/79.png',
            title: 'AKI SORA YUME NO NAKA - 第2集',
            video: {
              hotHit: 48800,
              id: 4190,
              path480p: '/resources/dongman/79/index.m3u8',
              path720p: '/resources/dongman/79/index.m3u8',
              path1080p: '/resources/dongman/79/index.m3u8',
              pathLogo: 'https://210835.com/resources/dongman/79/79.png',
              videoTime: '00:25:02',
              videoTitle: 'AKI SORA YUME NO NAKA - 第2集'
            }
          }, {
            url: 'javascript:',
            img: 'https://210835.com/resources/dongman/70/70.png',
            title: '燃烧浸渍转移学生EP01 [RAW]',
            video: {
              hotHit: 20379,
              id: 4181,
              path480p: '/resources/dongman/70/index.m3u8',
              path720p: '/resources/dongman/70/index.m3u8',
              path1080p: '/resources/dongman/70/index.m3u8',
              pathLogo: 'https://210835.com/resources/dongman/70/70.png',
              videoTime: '00:29:55',
              videoTitle: '燃烧浸渍转移学生EP01 [RAW]'
            }
          }, {
            url: 'javascript:',
            img: 'https://210835.com/resources/dongman/56/56.png',
            title: '纯粹的爱情',
            video: {
              hotHit: 43951,
              id: 4167,
              path480p: '/resources/dongman/56/index.m3u8',
              path720p: '/resources/dongman/56/index.m3u8',
              path1080p: '/resources/dongman/56/index.m3u8',
              pathLogo: 'https://210835.com/resources/dongman/56/56.png',
              videoTime: '00:26:17',
              videoTitle: '纯粹的爱情'
            }
          }]
        }

        this._getDataListByClass()
      },
      _getDataListByClass () {
        if (!this.hasMore || this.onFetching) {
          return
        }
        this.onFetching = true
        this.listQuery.pageNum += 1
        getVideoListByType(this.listQuery).then(response => {
          const {currentStatus, currentData} = response
          this.onFetching = false
          if (currentStatus === ERR_OK) {
            this.videoList = this.videoList.concat(currentData.list)
            this.checkMore(currentData.list)
          }
        }).catch(() => {
        })
      },
      checkMore (data) {
        if (!data.length || data.length < this.listQuery.pageSize) {
          this.hasMore = false
        }
      },
      reset () {
        this.videoList = []
        this.hasMore = true
        this.listQuery.pageNum = 0
      },
      onScrollBottom () {
        this._getDataListByClass()
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
      ...mapMutations({
        setPlayerVideo: 'SET_PLAYER_VIDEO',
        setRouterTitle: 'SET_ROUTER_TITLE'
      })
    },
    computed: {
      ...mapGetters([
        'qq',
        'weChat'
      ])
    },
    watch: {
      $route (to, from) {
        if (to.name === 'classVideo' && to.path !== from.path) {
          this.$refs['scroller'].reset({top: 0})
          this._initData(to.params)
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!from.path) return false
      next(vm => {
        vm._initData(to.params)
      })
    }
  }
</script>
<style lang="less" scoped>
  .class-video {
    .class-video-scroll {
      .group-title {
        margin-top: 0 !important;
        margin-bottom: 0px !important;
        padding-left: 32px;
        color: #333;
        height: 36px;
        line-height: 35px;
        font-size: 16px;
        text-align: left;
        .more{
          float: right;font-size: 14px;color: #adadad;
        }
      }
      .group-title-icon {
        background: url('../favorite/hot_video.png') #fff no-repeat 10px center;
        background-size: 16px;
        border-top: 1px solid #e5e5e5;
        padding-top: 4px;
        padding-bottom: 4px;
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

