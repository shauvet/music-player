<template>
  <div class="share-wrapper">
    <div class="artist-wrapper">
      <div id="img-wrapper">
        <x-img :src="cover" container="#img-wrapper"></x-img>
      </div>
      <toast v-model="show.enabled" :type="show.type" :time="100000" is-show-mask :text="show.msg" position="middle"></toast>
      <p class="artist-name" v-text="name"></p>
      <span class="desc" v-text="time"></span>
      <p class="song-name" v-text="songChnName"></p>
      <span class="desc" v-text="songEngName"></span>
      <div class="audio-wrapper">
        <div class="audio-time">{{currentTime}}/{{duration}} </div>
        <audio controls="controls" id="audio" :src="currentSongSrc" @timeupdate="timeupdate()" autoplay="autoplay"></audio>
      </div>
    </div>
    <div class="song-list-wrapper">
      <div class="song-wrapper" v-for="song in songs" :key="song.no" @click="checkSong(song)">
        <flexbox>
          <flexbox-item :span="2">
            <span v-if="!song.active" class="">{{song.no}}</span>
            <span v-if="song.active" class=""><i class="iconfont">&#xe629;</i></span>
          </flexbox-item>
          <flexbox-item :span="7">
            <p class="" v-text="song.engName"></p>
            <span class="" v-text="song.chnName"></span>
          </flexbox-item>
          <flexbox-item>
            <span class="">{{song.duration}}</span>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>
<script>
  import {XImg, Flexbox, FlexboxItem, Toast} from 'vux'
  import * as api from '../api/shareApi'
//  import AudioPlayer from '../components/AudioPlayer.vue'

  export default {
    data() {
      return {
        cover: '',
        name: '',
        shareno: "",
        background: "",
        time: '',
        songEngName: '',
        songChnName: '',
        songs: [
          {
            no: 1,
            engName: '',
            chnName: '',
            duration: '',
            time: "",
            active: true
          }
        ],
        duration: 0,
        currentTime: 0,
        currentSongSrc: '',
        show: {
          msg: "",
          enabled: false,
          type: "text"
        },
      }
    },
    components: {
//      AudioPlayer,
      Toast,
      XImg,
      Flexbox,
      FlexboxItem
    },
    mounted(){
//      document.title = '分享-葱新科技';
      if(this.$route.query.no == null){
        this.showInfo('页面信息有误,无法为你展示分享内容', "warn");
        return;
      }
      this.getShareInfo();
    },
    methods: {
      showInfo(msg, type) {
        this.show.enabled = true;
        this.show.msg = msg;
        if(type == null){
          this.show.type = 'text';
        }else{
          this.show.type = type;
        }
      },
      getShareInfo(){
        this.shareno = this.$route.query.no;
        api.getShareInfo({arg: this.$route.query.no, nosign:1}).then(result => {
          if (result.code && result.code === 200) {
            if(result.ret == 1){
              this.name = result.user.uname;
              this.background = result.user.background;
              document.body.style.backgroundImage="url("+this.background+")";
              this.cover = result.user.head;
              this.songs = result.data;
              this.checkSong(this.songs[0])
            }else{
                this.showInfo('页面信息有误,无法为你展示分享内容', "warn");
            }
          }else{
            this.showInfo('服务器异常,正在维修,无法为你展示分享内容', "warn");
          }
        });
      },
      timeupdate(){
        var audio =document.querySelector('#audio');
        var m = Math.floor(audio.currentTime / 60);
        var s = Math.floor(audio.currentTime % 60);
        this.currentTime = (m<10? '0'+m : m) +':'+ (s<10? '0'+s : s);
        var m = Math.floor(audio.duration / 60);
        var s = Math.floor(audio.duration % 60);
        this.duration = (m<10? '0'+m : m) +':'+ (s<10? '0'+s : s);
      },
      checkSong(song) {
        this.songs.map(s => {
          s.active = false;
        });
        song.active = true;
        this.songEngName = song.engName;
        this.songChnName = song.chnName;
        this.currentSongSrc = song.src;
        this.time = song.time;
        document.title = song.chnName + '- .TS';
        this.shareno = song.shareno;
        history.replaceState({no: song.shareno}, "", "/#/share?no="+ song.shareno);
        var audio =document.querySelector('#audio');
        audio.currentTime=0;
        audio.load();
        audio.play();
      }
    }
  }
</script>
<style lang="less" scoped>
  html, body {
    /*background-image: url("https://o5omsejde.qnssl.com/demo/test8.jpg") !important;*/
  }
  .artist-wrapper {
    margin: 30px 20px 10px 20px;
    padding-top: 40px;
    height: 300px;
    background-color: #fff;
    border-radius: 1em;
    text-align: center;
    #img-wrapper {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border-radius: 100px;
      overflow: hidden;
    }
    .artist-name {
      font-size: 16px;
      color: #9cf;
    }
    .song-name {
      font-size: 20px;
      font-weight: 700;
    }
    .desc {
      font-size: 12px;
      color: #ccc;
    }
    .audio-time{
      color: #9cf;
      font-size: 10px;
      text-align: center;
    }
  }

  .song-list-wrapper {
    margin: 0px 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 1em;
    text-align: center;
    .song-wrapper {
      margin-bottom: 5px;
      color: #9cf;
    }
  }

</style>
