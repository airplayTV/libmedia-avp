<template>


  <div>
    <div v-if="false" id="avp-container" @click="">
      <div v-show="tipsModal.show" class="tips" ref="tipsRef">{{ tipsModal.msg }}</div>
    </div>

    <avp-control :source="videoPlayInfo" />

  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import {useRoute} from "vue-router";
import AvpControl from "@/components/avp-control.vue";

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
      const defaultVersion = '-atomic'
      const simdVersion = '-simd'
      const enableSimd = false

      const getWasmVersion = () => {
        return enableSimd ? simdVersion : (supportAtomic ? defaultVersion : '')
      }

      switch (type) {
        case 'decoder': {
          if (codecId >= 65536 && codecId <= 65572) {
            return `/avp/decode/pcm${getWasmVersion()}.wasm`
          }
          if (codecId >= 69632 && codecId <= 69683) {
            return `/avp/decode/adpcm${getWasmVersion()}.wasm`
          }
          switch (codecId) {
              // mpeg1/2
            case 2:
              return `/avp/decode/mpeg2video${getWasmVersion()}.wasm`
              // H264
            case 27:
              return `/avp/decode/h264${getWasmVersion()}.wasm`
              // theora
            case 30:
              return `/avp/decode/theora${getWasmVersion()}.wasm`
              // AAC
            case 86018:
              return `/avp/decode/aac${getWasmVersion()}.wasm`
              // ac3
            case 86019:
              return `/avp/decode/ac3${getWasmVersion()}.wasm`
              // eac3
            case 86056:
              return `/avp/decode/eac3${getWasmVersion()}.wasm`
              // dts
            case 86020:
              return `/avp/decode/dca${getWasmVersion()}.wasm`
              // MP3
            case 86017:
              return `/avp/decode/mp3${getWasmVersion()}.wasm`
              // HEVC
            case 173:
              return `/avp/decode/hevc${getWasmVersion()}.wasm`
              // VVC
            case 196:
              return `/avp/decode/vvc${getWasmVersion()}.wasm`
              // Mpeg4
            case 12:
              return `/avp/decode/mpeg4${getWasmVersion()}.wasm`
              // AV1
            case 225:
              return `/avp/decode/av1${getWasmVersion()}.wasm`
              // Speex
            case 86051:
              return `/avp/decode/speex${getWasmVersion()}.wasm`
              // Opus
            case 86076:
              return `/avp/decode/opus${getWasmVersion()}.wasm`
              // flac
            case 86028:
              return `/avp/decode/flac${getWasmVersion()}.wasm`
              // vorbis
            case 86021:
              return `/avp/decode/vorbis${getWasmVersion()}.wasm`
              // vp8
            case 139:
              return `/avp/decode/vp8${getWasmVersion()}.wasm`
              // vp9
            case 167:
              return `/avp/decode/vp9${getWasmVersion()}.wasm`
            case 86022 :/* AVCodecID.AV_CODEC_ID_DVAUDIO */
              return `/avp/decode/dvaudio${getWasmVersion()}.wasm`;
            case 24: /* AVCodecID.AV_CODEC_ID_DVVIDEO */
              return `/avp/decode/dvvideo${getWasmVersion()}.wasm`;
            case 3: /* AVCodecID.AV_CODEC_ID_H261 */
              return `/avp/decode/h261${getWasmVersion()}.wasm`;
            case 4: /* AVCodecID.AV_CODEC_ID_H263 */
            case 20: /* AVCodecID.AV_CODEC_ID_H263I */
            case 19: /* AVCodecID.AV_CODEC_ID_H263P */
              return `/avp/decode/h263${getWasmVersion()}.wasm`;
            case 14: /* AVCodecID.AV_CODEC_ID_MSMPEG4V1 */
            case 15: /* AVCodecID.AV_CODEC_ID_MSMPEG4V2 */
            case 16 :/* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */
              return `/avp/decode/msmpeg4${getWasmVersion()}.wasm`;
            case 5: /* AVCodecID.AV_CODEC_ID_RV10 */
            case 6 :/* AVCodecID.AV_CODEC_ID_RV20 */
            case 68: /* AVCodecID.AV_CODEC_ID_RV30 */
            case 69: /* AVCodecID.AV_CODEC_ID_RV40 */
              return `/avp/decode/msmpeg4${getWasmVersion()}.wasm`;
            case 86036: /* AVCodecID.AV_CODEC_ID_COOK */
            case 86057 :/* AVCodecID.AV_CODEC_ID_SIPR */
            case 86073: /* AVCodecID.AV_CODEC_ID_RALF */
              return `/avp/decode/ra${getWasmVersion()}.wasm`;
            case 86023 :/* AVCodecID.AV_CODEC_ID_WMAV1 */
            case 86024: /* AVCodecID.AV_CODEC_ID_WMAV2 */
            case 86052: /* AVCodecID.AV_CODEC_ID_WMAVOICE */
            case 86054 :/* AVCodecID.AV_CODEC_ID_WMALOSSLESS */
            case 86053: /* AVCodecID.AV_CODEC_ID_WMAPRO */
              return `/avp/decode/wma${getWasmVersion()}.wasm`;
            case 17 :/* AVCodecID.AV_CODEC_ID_WMV1 */
            case 18: /* AVCodecID.AV_CODEC_ID_WMV2 */
            case 71 :/* AVCodecID.AV_CODEC_ID_WMV3 */
              return `/avp/decode/wmv${getWasmVersion()}.wasm`;
            case 7 :/* AVCodecID.AV_CODEC_ID_MJPEG */
              return `/avp/decode/mjpeg${getWasmVersion()}.wasm`;
            default:
              return null
          }
        }
        case 'resampler':
          return `/avp/resample/resample${getWasmVersion()}.wasm`
        case 'stretchpitcher':
          return `/avp/stretchpitch/stretchpitch${getWasmVersion()}.wasm`
      }
    },
    checkUseMES: (streams) => {
      return false
    },
    enableHardware: true,
    enableWebGPU: false,
    // enableWorker: enableWorkerComponent.enableWorker,
    loop: false,
    enableJitterBuffer: true,
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
  components: { AvpControl },
  setup() {
    route = useRoute()
    // onBeforeMount(onBeforeMountHandler)
    // onMounted(onMountedHandler)
    // onBeforeUnmount(onBeforeUnmountHandler)
    // pageInstance.value = getCurrentInstance()
    return {
      tipsModal: tipsModal,
      videoPlayInfo: videoPlayInfo,
    }
  }
})

</script>

<style scoped>


</style>