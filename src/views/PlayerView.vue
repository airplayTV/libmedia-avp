<template>
  <div id="avp-container" @click="">
    <div v-show="tipsModal.show" class="tips" ref="tipsRef">{{ tipsModal.msg }}</div>
  </div>
</template>

<script>
import {defineComponent, getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";

let player = null
let route = null
let tipsModal = ref({
  show: true,
  msg: '加载中...',
})
const supportAtomic = true
const pageInstance = ref(null)

function loadPlayer(videoUrl) {
  player = new AVPlayer({
    container: document.querySelector('#avp-container'),
    isLive: false,
    getWasm: (type, codecId) => {
      switch (type) {
        case 'decoder': {
          if (codecId >= 65536 && codecId <= 65572) {
            return `/avp/decode/pcm${(supportAtomic ? '-atomic' : '')}.wasm`
          }
          switch (codecId) {
              // mpeg1/2
            case 2:
              return `/avp/decode/mpeg2video${(supportAtomic ? '-atomic' : '')}.wasm`
              // H264
            case 27:
              return `/avp/decode/h264${(supportAtomic ? '-atomic' : '')}.wasm`
              // theora
            case 30:
              return `/avp/decode/theora${(supportAtomic ? '-atomic' : '')}.wasm`
              // AAC
            case 86018:
              return `/avp/decode/aac${(supportAtomic ? '-atomic' : '')}.wasm`
              // ac3
            case 86019:
              return `/avp/decode/ac3${(supportAtomic ? '-atomic' : '')}.wasm`
              // eac3
            case 86056:
              return `/avp/decode/eac3${(supportAtomic ? '-atomic' : '')}.wasm`
              // dts
            case 86020:
              return `/avp/decode/dca${(supportAtomic ? '-atomic' : '')}.wasm`
              // MP3
            case 86017:
              return `/avp/decode/mp3${(supportAtomic ? '-atomic' : '')}.wasm`
              // HEVC
            case 173:
              return `/avp/decode/hevc${(supportAtomic ? '-atomic' : '')}.wasm`
              // VVC
            case 196:
              return `/avp/decode/vvc${(supportAtomic ? '-atomic' : '')}.wasm`
              // Mpeg4
            case 12:
              return `/avp/decode/mpeg4${(supportAtomic ? '-atomic' : '')}.wasm`
              // AV1
            case 225:
              return `/avp/decode/av1${(supportAtomic ? '-atomic' : '')}.wasm`
              // Speex
            case 86051:
              return `/avp/decode/speex${(supportAtomic ? '-atomic' : '')}.wasm`
              // Opus
            case 86076:
              return `/avp/decode/opus${(supportAtomic ? '-atomic' : '')}.wasm`
              // flac
            case 86028:
              return `/avp/decode/flac${(supportAtomic ? '-atomic' : '')}.wasm`
              // vorbis
            case 86021:
              return `/avp/decode/vorbis${(supportAtomic ? '-atomic' : '')}.wasm`
              // vp8
            case 139:
              return `/avp/decode/vp8${(supportAtomic ? '-atomic' : '')}.wasm`
              // vp9
            case 167:
              return `/avp/decode/vp9${(supportAtomic ? '-atomic' : '')}.wasm`
            default:
              return null
          }
        }
        case 'resampler':
          return `/avp/resample/resample${(supportAtomic ? '-atomic' : '')}.wasm`
        case 'stretchpitcher':
          return `/avp/stretchpitch/stretchpitch${(supportAtomic ? '-atomic' : '')}.wasm`
      }
    },
    checkUseMES: (streams) => {
      return false
    },
    enableHardware: true,
    enableWebGPU: false,
    // enableWorker: enableWorkerComponent.enableWorker,
    loop: false,
    jitterBufferMax: 4,
    jitterBufferMin: 1,
    lowLatency: true
  })

  player.setRenderMode(0)

  player.load(videoUrl).then(() => {
    console.log('[AAAA]', videoUrl)
    Promise.all([player.getVideoList(), player.getAudioList(), player.getSubtitleList()]).then((data) => {
      console.log('[Promise.all.data]', data)
      player.play({ audio: true, video: true, subtitle: true }).then(() => {
        console.log('[avp.play.ok]')
        if (!player.isDash()) {
          // const audioStreams = player.getStreams().filter((s => s.mediaType === 'Audio'))
          // const videoStreams = player.getStreams().filter((s => s.mediaType === 'Video'))
          // console.log('[audioStreams]', audioStreams)
          // console.log('[videoStreams]', videoStreams)
          // console.log('[getVolume]', player.getVolume())
          // player.setVolume(3)
        }
      }).catch(err => {
        console.log('[avp.play.error]', err)
      })
    })
  }).catch(err => {
    console.log('[资源不存在加载失败]', err)
    tipsModal.value = { show: true, msg: '视频播放失败：' + err, }
  }).finally(() => {
    // console.log('[FINALLY]')
  })

}

function destroyPlayer() {
  if (player) {
    player.stop().then(() => {
      player = null
    })
  }
}

function onBeforeMountHandler() {
  console.log('[onBeforeMountHandler]')
}

function onMountedHandler() {

  console.log('[参数说明]', { query: { config: btoa(JSON.stringify({ url: encodeURIComponent('https://example.com/file中文.m3u8') })), } })
  console.log('[query.config 生成步骤]', `const config = btoa(JSON.stringify({ url: encodeURIComponent('https://example.com/file中文.m3u8') }))`)

  // console.log('[debug]', btoa(JSON.stringify({
  //   url: 'https://h5.chinaguandan.com/files/tmp/yixueqianchi.m3u8',
  //   name: encodeURIComponent('隋文帝发'),
  // })))

  if (!route.query.config) {
    tipsModal.value = { show: true, msg: '播放参数错误', }
    return
  }
  try {
    const videoConfig = JSON.parse(atob(route.query.config))
    if (!videoConfig.url) {
      tipsModal.value = { show: true, msg: '播放地址错误', }
      return
    }

    tipsModal.value = { show: false, msg: '', }

    loadPlayer(decodeURIComponent(videoConfig.url))

  } catch (e) {
    tipsModal.value = { show: true, msg: '播放参数解析失败', }
  }

}

function onBeforeUnmountHandler() {
  destroyPlayer()
}

export default defineComponent({
  setup() {
    route = useRoute()
    onBeforeMount(onBeforeMountHandler)
    onMounted(onMountedHandler)
    onBeforeUnmount(onBeforeUnmountHandler)
    pageInstance.value = getCurrentInstance()
    return {
      tipsModal: tipsModal,
    }
  }
})

</script>

<style scoped>
#avp-container {
  width: 100%;
  height: 100vh;
  background-color: #000000;
  position: relative;

  .tips {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
  }
}

/deep/ .avplayer-ui-header {
  display: none;
}

/deep/ .avplayer-ui-folder-container {
  display: none;
}
</style>