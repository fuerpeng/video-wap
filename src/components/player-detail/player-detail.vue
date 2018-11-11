<template>
  <div class="play-detail">
    <!--<div class="detail-header">-->
      <!--<div class="back" @click="back">-->
        <!--<i class="icon-back"></i>-->
      <!--</div>-->
      <!--<h1 class="title" v-html="title"></h1>-->
    <!--</div>-->
    <div class="detail-video">
      <div class="back" @click="back">
        <i class="iconfont">&#xe644;</i>
      </div>
      <video v-if="this.isRender" ref="video" controls="controls"
             autoplay="autoplay"
             x5-video-player-type="h5"
             x5-video-player-fullscreen="true"
             playsinline="true" webkit-playsinline="true" x-webkit-airplay="true"
             :style="{width:'100%',height:'220px'}"
             :poster="video.poster">
        <source :src="video.source" type="application/x-mpegURL">
      </video>
    </div>
    <div class="play-line-selector">
      <span class="title">线路切换:</span>
      <checker v-model="selectPlayLine" class="lines"
               default-item-class="demo1-item"
               selected-item-class="demo1-item-selected"
               radio-required
               @on-change="onSelectedLineChange">
        <checker-item v-for="(item, index) in lines" :value="item" :key="index">{{item.name}}</checker-item>
      </checker>
    </div>
    <div class="videoDis">{{video.videoTitle}} <span class="heart" @click="addFavorite"><i class="iconfont">&#xe687;</i></span>
      <div class="videos_count"><i class="iconfont" style="font-size: 16px;vertical-align: bottom;position: relative;top: 2px;">&#xe669;</i>&nbsp;{{video.hotHit}}</div>
      <!--<div class="video_tip">
        <a>三上悠亚</a><a>女教师</a><a>亚洲无码</a><a>中文字幕</a>
      </div>-->
    </div>
    <div class="video-list-wrapper">
      <div class="item-title">猜你喜欢 <span class="more">查看更多&nbsp;<i class="iconfont">&#xe644;</i></span></div>
      <div class="video-scroll-wrapper" ref="scrollWrapper">
        <scroller lock-x scrollbar-y class="video-scroll" ref="scroll" @on-scroll-bottom="onScrollBottom"
                  :height="'-324px'">
          <div>
            <flexbox :gutter="0" :wrap="'wrap'" :align="'flex-start'" style="margin-bottom: 2px;">
              <flexbox-item v-for="(item, index) in guessLikeList" :key="index" :span="6" class="flex-item">
                <div class="group-item">
                  <div style="position: relative"><img class="image" v-lazy="item.pathLogo" @click="onSelectItem(item)"><span v-if="item.videoTime!==undefined" class="video_time">{{item.videoTime.split(".")[0]}}</span></div>
                  <div class="title">{{item.videoTitle}}
                    <div class="videos_count"><i class="iconfont" style="font-size: 16px;vertical-align: bottom;">&#xe669;</i>&nbsp;{{item.hotHit}}</div>
                  </div>
                </div>
              </flexbox-item>
            </flexbox>
            <business v-show="guessLikeList.length" style="margin: 0 5px 10px 5px"></business>
            <load-more v-show="guessLikeList.length" :show-loading="guessLikeHasMore"
                       :tip="guessLikeHasMore?'正在加载':'没有更多啦'"></load-more>
          </div>
          <div v-show="!guessLikeList.length" class="loading-container">
            <loading></loading>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'components/loading/loading'
  import {mapMutations, mapGetters, mapActions} from 'vuex'
  import Video from 'common/js/video'
  import {getViewportSize} from 'common/js/util'
  import {LoadMore, Scroller, Flexbox, FlexboxItem, Checker, CheckerItem} from 'vux'
  import {guessLikeId} from 'common/js/config'
  import {getPlaying} from 'common/js/cache'
  import {ERR_OK} from 'api/config'
  import {getLines} from 'api/player-detail'
  import Business from 'components/business/business'

  export default {
    data () {
      return {
        selectPlayLine: null,
        lines: [{name: '加载中', path: ''}, {name: '加载中', path: ''}],
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          typeId: 7
        },
        video: {
          source: '',
          poster: '',
          videoTitle: '',
          hotHit: ''
        },
        title: '视频详情',
        isRender: false,
        onFetching: false
      }
    },
    mounted () {
      if (!this.isRender) {
        this.isRender = true
        this.$nextTick(function () {
          this.$video = this.$refs['video']
          this.fetchPlayLines(getPlaying())
        })
      }
      const {height} = getViewportSize()
      this.$refs.scrollWrapper.style.height = `${height - 294}px`

      if (this.guessLikeList.length <= 0) {
        this._getGuessYouLikeData()
      }
    },
    computed: {
      player () {
        return this.$refs.videoPlayer.player
      },
      ...mapGetters([
        'guessLikeList',
        'guessLikeHasMore',
        'qq',
        'weChat',
        'favoriteList'
      ])
    },
    methods: {
      addFavorite () {
        this.setFavorite(getPlaying())
        console.log(getPlaying())
        this.$vux.toast.text('收藏成功', 'top')
      },
      fetchPlayLines (video) {
        this.video.poster = video.pathLogo
        this.lines = [{name: '加载中', path: '1'}, {name: '加载中', path: '2'}]
        getLines().then(response => {
          const {currentStatus, currentData} = response
          if (currentStatus === ERR_OK && currentData.length) {
            this.lines = currentData
            this.startPlayVideo(video, currentData[0])
          }
        }).catch(() => {
        })
      },
      onSelectedLineChange (val) {
        this.$video && this.$video.pause()
        const video = getPlaying()
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
        this.startPlayVideo(video, val)
      },
      _getGuessYouLikeData () {
        if (!this.guessLikeHasMore || this.onFetching) {
          return
        }
        this.onFetching = true
        this.insertGuessLikeVideos(guessLikeId).then(() => {
          this.onFetching = false
        })
      },
      onScrollBottom () {
        this._getGuessYouLikeData()
      },
      back () {
        this.$emit('back')
      },
      startPlayVideo (video, line) {
        this.video.source = `${line.path}${video.path480p}`
        this.video.poster = video.pathLogo
        this.video.videoTitle = video.videoTitle
        this.video.hotHit = video.hotHit
        this.selectPlayLine = line
        this.$video && this.$video.load()
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
        this.fetchPlayLines(video)
      },
      ...mapMutations({
        setPlayerVideo: 'SET_PLAYER_VIDEO',
        setFavorite: 'SET_FAVORITELIST'
      }),
      ...mapActions([
        'insertGuessLikeVideos'
      ])
    },
    components: {
      Loading,
      Scroller,
      LoadMore,
      Flexbox,
      FlexboxItem,
      Checker,
      CheckerItem,
      Business
    }
  }
</script>

<style lang="less" scoped>
  .play-detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    /*.detail-header {*/
      /*position: relative;*/
      /*height: 44px;*/
      /*background-color: #ff6573;*/
      /*.back {*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 6px;*/
        /*z-index: 50;*/
        /*.icon-back {*/
          /*display: block;*/
          /*padding: 10px;*/
          /*font-size: 22px;*/
          /*color: #fff;*/
        /*}*/
      /*}*/
      /*.title {*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 10%;*/
        /*z-index: 40;*/
        /*width: 80%;*/
        /*text-align: center;*/
        /*line-height: 40px;*/
        /*font-size: 18px;*/
        /*color: #fff;*/
        /*text-overflow: ellipsis;*/
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
      /*}*/
    /*}*/
    .back{
      position: absolute;
      top:10px;
      left:10px;
      width: 26px;
      height: 26px;
      color: #fff;
      z-index:1000000;
    }
    .detail-video {
      position: relative;
      height: 220px;
      width: 100%;
      background-color: black;
    }
    .play-line-selector {
      position: fixed;
      height: 35px;
      top: 222px;
      width: 100%;
      display: inline-flex;
      overflow: hidden;
      font-size: 12px;
      padding-left: 8px;
      // background: rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid #e5e5e5;
      background: #fff;
      .title {
        line-height: 35px;
      }
      .lines {
        margin-left: 10px;
        margin-top: 5px;
      }
    }
    .videoDis{
      position: fixed;
      top: 260px;
      padding-left: 10px;
      left: 0;
      right: 0;
      .heart{
        float: right;
        color: #ff2083;
        padding-right: 10px;
      }
      .favorite{
        color: #000;
      }
      .videos_count{
        color: #adadad;
        font-size:13px;
      }
      .video_tip{
        color: #ff6faf;
        font-size: 14px;
        a{
          text-decoration: underline;
          margin-right: 8px;
        }
      }
    }
    .video-list-wrapper {
      position: fixed;
      top: 340px;
      bottom: 0;
      width: 100%;
      background: #fff;
      border-top: 5px solid rgba(0, 0, 0, 0.1);
      .item-title {
        position: relative;
        bottom: 0;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        padding-left: 32px;
        color: rgba(0, 0, 0, 0.87);
        margin: 5px 0;
        background: url('./hot_video.png') #fff no-repeat 10px center;
        background-size: 16px;
        .more{
          float: right;
          color: #adadad;
          margin-right: 10px;
          i{
            display: inline-block;
            transform: rotate(180deg);
            font-size: 12px;
          }
        }
      }
      .video-scroll-wrapper {
        position: relative;
        height: 100%;
        overflow: hidden;
        .video-scroll {
          height: 100%;
          .group-item {
            .image {
              height: 6.9rem;
              width: 100%;
              background: rgba(0, 0, 0, .1);
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
            }
            .videos_count{
              color: #adadad;
              font-size:12px;
              margin-top: 3px;
              i{
                font-size: 12px;
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
          .loading-container {
            position: relative;
            margin-top: 100px;
          }
        }
      }
    }
  }

  .demo1-item {
    width: 55px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }

  .demo1-item-selected {
    border-color: #feb7c7;
    background: #feb7c7;
    color: #fff;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
