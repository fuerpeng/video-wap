<template>
  <div class="search_content">
    <div class="search_input_wrapper"><i class="iconfont">&#xe6e4;</i><input v-focus autocomplete="off" type="text" v-model="search_content" class="search_input" placeholder="波多野"><a @click="cancelHandle" class="search_btn" >取消</a></div>

    <div v-if="status == 'failture'" class="noData">
      <i class="iconfont">&#xe601;</i>
      <br/>
      <span style="font-size: 13px">亲,找不到符合的视频请试试其他关键字搜索</span>
    </div>
    <!--<div class="init_content" v-if="status == 'init'">-->
      <!--<h2>热门搜索</h2>-->
      <!--<ul>-->
        <!--<li><a @click="search_handle('波多野结衣')" href="javascript:;"><span>1</span>波多野结衣</a><i class="iconfont up">&#xe612;</i></li>-->
        <!--<li><a @click="search_handle('无码')" href="javascript:;"><span>2</span>无码</a><i class="iconfont up">&#xe612;</i></li>-->
        <!--<li><a @click="search_handle('女教师')" href="javascript:;"><span>3</span>女教师</a><i class="iconfont up">&#xe612;</i></li>-->
        <!--<li><a @click="search_handle('护士')" href="javascript:;"><span>4</span>护士</a><i class="iconfont equal">&#xe600;</i></li>-->
        <!--<li><a @click="search_handle('水野朝阳')" href="javascript:;"><span>5</span>水野朝阳</a><i class="iconfont equal">&#xe600;</i></li>-->
        <!--<li><a @click="search_handle('潮吹')" href="javascript:;"><span>6</span>潮吹</a><i class="iconfont equal">&#xe600;</i></li>-->
        <!--<li><a @click="search_handle('中出')" href="javascript:;"><span>7</span>中出</a><i class="iconfont down">&#xe612;</i></li>-->
        <!--<li><a @click="search_handle('OL')" href="javascript:;"><span>8</span>OL</a><i class="iconfont down">&#xe612;</i></li>-->
        <!--<li><a @click="search_handle('空姐')" href="javascript:;"><span>9</span>空姐</a><i class="iconfont down">&#xe612;</i></li>-->
        <!--<li><a @click="search_handle('制服')" href="javascript:;"><span>10</span>制服</a><i class="iconfont down">&#xe612;</i></li>-->
      <!--</ul>-->
    <!--</div>-->
    <div class="searchHistory" v-if="status == 'init' && (searchHistoryList&&searchHistoryList.length>0)">
      <p>历史记录</p>
      <ul>
        <li v-for="(item,index) in searchHistoryList" :key="index" @click="histSearch(item)"><img src="//s1.hdslb.com/bfs/static/mult/images/history.png" alt="">{{item}}</li>
      </ul>
      <div @click="clearHistory">清除历史记录</div>
    </div>
    <div class="success_content" v-if="status == 'success'">
      <scroller lock-x scrollbar-y  :height="'-80px'">
        <ul>
          <flexbox :gutter="0" :wrap="'wrap'" :align="'flex-start'" style="background: #fff">
            <flexbox-item class="flex-item" :span="6" v-for="(item,index) in videoList" :key="index">
              <div class="group-item">
                <div style="position: relative"><img class="image" v-lazy="item.pathLogo" @click="onSelectItem(item)"><span class="video_time" v-if="item.videoTime!==undefined">{{item.videoTime.split(".")[0]}}</span></div>
                <div class="title">{{item.videoTitle}}
                  <div class="videos_count"><i class="iconfont" style="font-size: 16px;vertical-align: bottom;">&#xe669;</i>&nbsp;{{item.hotHit}}</div>
                </div>
              </div>
            </flexbox-item>
          </flexbox>
        </ul>
      </scroller>
    </div>
    <div v-transfer-dom>
      <transition name="slide">
        <player-detail v-if="playerVisible" @back="playerVisible= false"></player-detail>
      </transition>
    </div>
  </div>
</template>

<script>
  import {Scroller, LoadMore, debounce, Flexbox, FlexboxItem} from 'vux'
  import {mapMutations} from 'vuex'
  import Video from 'common/js/video'
  import {searchVideo} from 'api/search'
  import PlayerDetail from 'components/player-detail/player-detail'
  import TransferDom from 'directives/transfer-dom'
  export default {
    components: {
      Scroller,
      LoadMore,
      Flexbox,
      FlexboxItem,
      PlayerDetail
    },
    directives: {
      TransferDom,
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    },
    data () {
      return {
        search_content: '',
        status: 'init',
        videoList: [],
        searchHistoryList: [],
        playerVisible: false
      }
    },
    methods: {
      search_handle (val) {
        if (val !== '') {
          this.search_content = val
        }
      },
      cancelHandle () {
        this.$router.go(-1)
      },
      histSearch (val) {
        this.getSearchData(val)
        this.search_content = val
      },
      getSearchData (val) {
        searchVideo({keyWord: val, pageNum: 0, pageSize: 300}).then(res => {
          if (res.currentData.list && res.currentData.list.length > 0) {
            this.status = 'success'
            this.videoList = res.currentData.list

            let localData = window.localStorage.getItem('searchHistory')
            var data = []
            if (localData !== null && localData !== '') {
              data = JSON.parse(localData)
              if (data.indexOf(val) === -1) {
                data.unshift(val)
                data = data.slice(0, 10)
              }
            } else {
              data = [val]
            }
            window.localStorage.setItem('searchHistory', JSON.stringify(data))
            this.searchHistoryList = JSON.parse(window.localStorage.getItem('searchHistory'))
          } else {
            this.status = 'failture'
          }
          this.videoList = res.currentData.list
        }).catch(err => {
          console.error(err)
        })
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
        setPlayerVideo: 'SET_PLAYER_VIDEO'
      }),
      clearHistory () {
        window.localStorage.setItem('searchHistory', '')
        this.searchHistoryList = []
      }
    },
    created () {
      this.searchHistoryList = JSON.parse(window.localStorage.getItem('searchHistory'))
    },
    watch: {
      search_content: debounce(function (val) {
        if (val !== '') {
          this.getSearchData(val)
        } else {
          this.status = 'init'
        }
      }, 500)
    }

  }
</script>
<style lang="less" scoped>
  .search_content{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #fff;
    .search_input_wrapper{
      position: relative;
      top: 20px;
      i{
        position: absolute;
        top: 8px;
        left: 8px;
        font-size: 16px;
        color: #9d9d9d;
      }
    }
    .search_input{
      display: inline-block;
      vertical-align: middle;
      width: 80%;
      height: 40px;
      background: #f2f2f2;
      border: 1px solid #fff;
      padding-left: 28px;
      color: #333333;
      border-radius: 35px;
      line-height: 35px;
      font-size: 15px;
      outline: none;
      box-sizing: border-box;
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
    .search_btn{
      width: 15%;
      display: inline-block;
      text-align: center;
      box-sizing: border-box;
      margin-left: 5%;
      color: #333333;
    }
    .noData{
      color: #ff6faf;text-align: center;
      .iconfont{
        font-size: 80px;
      }
    }
    .success_content{
      font-size: 15px;
      margin-top: 30px;
      .success_item{
        margin-bottom: 15px;
        overflow: hidden;
        .img_wrapper{
          position: relative;
          float: left;
          box-sizing: border-box;
          width: 40%;
          img{
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
        }
        .description_wrapper{
          float: left;
          box-sizing: border-box;
          width: 60%;
          padding: 10px 0 0 15px;
          .videos_count{
            color: #adadad;
            font-size:13px;
          }
        }

      }
    }
    .init_content{
      font-size: 14px;
      h2{
        font-size: 18px;
        margin: 10px 0;
      }
      ul>li{
        height: 30px;
        line-height: 30px;
        position: relative;
        a{
          color: #333;
          width: 100%;
          height: 100%;
          display: block;
        }
        >i{
          position: absolute;
          top:0;
          right:0;
          font-size: 12px;
          &.up{
            color: #ff6faf;
          }
          &.equal{
            color: #a9a9a9;
          }
          &.down{
            transform: rotate(180deg);
            color: #a9a9a9;
          }
        }
      }
      ul>li span{
        display: inline-block;
        min-width: 16px;
        height: 16px;
        color: #949494;
        border: 1px solid #949494;
        text-align: center;
        line-height: 16px;
        border-radius: 16px;
        margin-right: 8px;
      }
      ul>li:nth-child(1) span{
        color: #ff79b5;
        border: 1px solid #ff79b5;
      }
      ul>li:nth-child(2) span{
        color: #ff79b5;
        border: 1px solid #ff79b5;
      }
      ul>li:nth-child(3) span{
        color: #ff79b5;
        border: 1px solid #ff79b5;
      }
    }
    .searchHistory{
      background: #fff;
      margin-top: 20px;
      padding: 0 12px;
      P{
        color: #999;
        padding: 10px 0;
      }
      li{
        border-bottom: 1px solid #ccc;
        list-style: none;
        height: 50px;
        line-height: 50px;
        color: #505050;
        font-size: 13px;
      }
      img{
        width: 16px;
        vertical-align: top;
        margin-top: 16px;
        margin-right: 6px;
      }
      div{
        text-align: center;
        color: #999;
        height:50px;
        line-height: 50px;
      }
    }
  }
</style>
