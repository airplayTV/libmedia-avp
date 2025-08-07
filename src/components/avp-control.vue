<template>

  <div class="avp-container" @mouseover="onShowProgressBar">

    <!-- 播放区域 -->
    <div class="avp-canvas flex1" ref="avplayerRef"></div>

    <!-- 控制区域 -->
    <div class="avp-control-wrap">

      <div class="color-white padding-10px" v-if="control.show">
        <div v-if="config && config.name">{{ config.name }}</div>
      </div>

      <div class="avp-control-mask" @click="onSwitchPlayStatus">
        <n-spin v-if="loading" size="large" />
        <div v-if="loadingText" class="color-white" style="margin-top: 20px">
          {{ loadingText }}
        </div>
      </div>

      <div class="avp-slider" v-if="control.show">
        <n-slider
            v-model:value="control.currentTime"
            :max="control.duration"
            :format-tooltip="formatVideoProgress"
            @update-value="onUpdateProgress" />
      </div>

      <div class="avp-control-bar" v-if="control.show">
        <n-space class="color-white">
          <n-icon
              size="28"
              v-if="[avpStatus.PLAYING,avpStatus.PLAYED].includes(control.playerStatus)"
              @click="videoStop"
              :component="Pause12Filled" />
          <n-icon size="28" v-else :component="Play32Filled" @click="videoPlay" />

          <n-icon size="28" v-if="control.muted" :component="SpeakerMute48Filled" @click="onVideoUnMute" />
          <div
              v-else
              class="volume-wrap"
              @mouseover="control.showVolumeSlider=true"
              @mouseout="control.showVolumeSlider=false">
            <n-icon size="28" :component="Speaker248Filled" @click="onVideoMute" />

            <n-slider
                class="volume-slider"
                v-show="control.showVolumeSlider"
                v-model:value="control.volume"
                :max="100"
                @update-value="onUpdateVolume" />
          </div>

          <n-text class="color-white">
            {{ formatSecondsReadable(control.currentTime) }} / {{ formatSecondsReadable(control.duration) }}
          </n-text>
        </n-space>

        <n-space class="color-white">
          <n-icon size="28" :component="FullScreenMaximize24Filled" @click="onRequestFullScreen" />
        </n-space>

      </div>

    </div>

  </div>

</template>

<script setup>

import {onBeforeUnmount, onMounted, ref} from "vue";
import {NIcon, NSlider, NSpace, NSpin, NText} from 'naive-ui'
import {
  FullScreenMaximize24Filled,
  Pause12Filled,
  Play32Filled,
  Speaker248Filled,
  SpeakerMute48Filled
} from '@vicons/fluent'
import {addTimeline, findTimeline, updateTimeline} from "@/helpers/db.js";
import unmuteAudio from "@/helpers/unmute.js";

const props = defineProps(['config'])


const avpStatus = {
  STOPPED: 0,
  DESTROYING: 1,
  DESTROYED: 2,
  LOADING: 3,
  LOADED: 4,
  PLAYING: 5,
  PLAYED: 6,
  PAUSED: 7,
  SEEKING: 8,
  CHANGING: 9,
}

const renderMode = {
  FIT: 0,//自适应
  FILL: 1,//填充
}

const logMode = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  FATAL: 5
}

const control = ref({
  duration: 0,// 总时间
  currentTime: 0,//当前播放时间
  playerStatus: 0,// 参考：AVPlayerStatus
  muted: false,// 是否静音
  progress: 0,// 播放进度，暂时不用
  show: false,
  volume: 70,// [0,100] 百分比
  showVolumeSlider: false,
  fullScreen: false,
})

const avplayer = ref(null)
const avplayerRef = ref(null)
const videoStatTimer = ref(null)
const loadingText = ref(null)
const loading = ref(true)
let throttleWindowResizeTimer = null
let throttleUpdateProgressTimer = null
let throttleShowProgressBarTimer = null
let historyTimeline = false// 播放历史信息

const onMountedHandler = () => {
  // Call once, as early as possible in the page lifecycle
  unmuteAudio()

  onShowProgressBar()
  registerWindowResizeEventHandler()
  loadAvplayer()
}

const registerWindowResizeEventHandler = () => {
  window.onresize = (value) => {
    if (throttleWindowResizeTimer) {
      clearTimeout(throttleWindowResizeTimer)
    }
    throttleWindowResizeTimer = setTimeout(() => {
      avplayer.value?.resize(value.target.innerWidth, value.target.innerHeight)
    }, 50)
  }
}

const parseConfig = () => {
  if (props.config.name) {
    props.config.name = decodeURIComponent(props.config.name)
  }
  if (props.config.id) {
    props.config.id = props.config.id.substring(0, 32)
  }
  if (props.config.name) {
    props.config.name = props.config.name.substring(0, 32)
  }
}

const loadAvplayer = async () => {
  if (!props.config || !props.config.url) {
    showLoading('没有播放数据')
    return
  }
  parseConfig()
  console.log('[播放配置]', JSON.parse(JSON.stringify(props.config)))

  try {
    console.log('[avpCtx]', { avp: AVPlayer, win: window.AVPlayer })
  } catch (e) {
    console.log('[avpCtx]', { win: window.AVPlayer })
  }

  historyTimeline = false

  window.AVPlayer.setLogLevel(logMode.TRACE)

  if (!window.AVPlayer.audioContext) {
    console.log('[new AudioContext]')
    window.AVPlayer.audioContext = new AudioContext()
    window.AVPlayer.audioContext.createBufferSource()
  }

  if (!avplayer.value) {
    avplayer.value = new window.AVPlayer({
      container: avplayerRef.value,
      isLive: false,
      retryCount: 5,
      getWasm: (type, codecId) => {
        const defaultVersion = '-atomic'
        const simdVersion = '-simd'
        const enableSimd = false
        const supportAtomic = false

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
        // console.log('[checkUseMES]', streams)
        return false
      },
      enableHardware: true,
      enableWebCodecs: false,
      enableWebGPU: true,
      enableWorker: false,
      loop: false,
      enableJitterBuffer: true,
      jitterBufferMax: 4,
      jitterBufferMin: 1,
      lowLatency: true
    })
  } else {
    await avplayer.value.stop()
    control.value.currentTime = 0
    control.value.duration = 0
    control.value.playerStatus = avpStatus.STOPPED
    console.log('[stop....]')//
  }

  avplayer.value.setRenderMode(renderMode.FIT)

  registerAvpEventListener()

  avplayer.value.load(props.config.url, { isLive: false }).then(() => {
    // 更新进度条
    control.value.duration = Number(avplayer.value.getDuration())
    Promise.all([avplayer.value.getVideoList(), avplayer.value.getAudioList(), avplayer.value.getSubtitleList()]).then((data) => {
      // TODO FIXME 不能自动播放，不然没声音
      onUpdateVolume()
      seekTimelineWarp()
    })
  }).catch(err => {
    console.log('[资源不存在加载失败]', err)
    showLoading(`视频加载失败：${err}, ${props.config.url}`)
  }).finally(() => {
  })

}

const registerAvpEventListener = () => {

  avplayer.value.on('loading', (pts) => {
    // console.log('[addEventListener] loading', pts)
  })
  avplayer.value.on('loaded', (pts) => {
    // console.log('[addEventListener] loaded', pts)
    loading.value = false

    showLoading(false)
    control.duration = Number(avplayer.value.getDuration()) / 1000
  })
  avplayer.value.on('progress', (pts) => {
    // console.log('[addEventListener] progress', pts)
  })
  avplayer.value.on('time', (currentTime) => {
    // console.log('[time]', currentTime)
    control.value.currentTime = Number(currentTime)
    updateTimelineWarp()
  })

  avplayer.value.on('timeout', (pts) => {
    // console.log('[addEventListener] timeout', pts)
  })
  avplayer.value.on('ended', () => {
    // console.log('[addEventListener] ended')
  })
  avplayer.value.on('error', (pts) => {
    // console.log('[addEventListener] error', pts)
  })

  if (videoStatTimer.value) {
    clearTimeout(videoStatTimer.value)
  }
  videoStatTimer.value = setInterval(() => {
    if (avplayer.value) {
      videoStatCallback(avplayer.value.getStats())
    }
  }, 1000)

}

const videoStatCallback = (stat) => {
}

const showLoading = (msg) => {
  loadingText.value = msg
}

const onUpdateProgress = (p) => {

  loading.value = true
  if (throttleUpdateProgressTimer) {
    clearTimeout(throttleUpdateProgressTimer)
  }
  throttleUpdateProgressTimer = setTimeout(() => {
    control.value.currentTime = p
    updateTimelineWarp()
    videoSeeking()
  }, 500)
}

const onUpdateVolume = () => {
  avplayer.value?.setVolume(3.3 / 100 * control.value.volume)
}

const videoSeeking = () => {
  avplayer.value.seek(BigInt(control.value.currentTime)).then(() => {
    videoPlay()
  }).finally(() => {
    loading.value = false
  })
}

const videoPlay = () => {
  loading.value = true
  avplayer.value?.play().then(() => {
    // const audioStreams = avplayer.value.getStreams().filter((s => s.mediaType === 'Audio'))
    // const videoStreams = avplayer.value.getStreams().filter((s => s.mediaType === 'Video'))
    // console.log('[audioStreams]', audioStreams)
    // console.log('[videoStreams]', videoStreams)

  }).catch(err => {
    console.log('[avplayer.value.play]', err)
  }).finally(() => {
    control.value.playerStatus = avplayer.value.getStatus()
    loading.value = false
  })
}

const videoStop = () => {
  avplayer.value?.pause().then(() => {
  }).finally(() => {
    control.value.playerStatus = avplayer.value.getStatus()
  })
}

const onSwitchPlayStatus = () => {
  control.value.show = true
  if ([avpStatus.PLAYING, avpStatus.PLAYED].includes(control.value.playerStatus)) {
    videoStop()
  } else {
    videoPlay()
  }
  control.value.showVolumeSlider = false
}

const onVideoUnMute = () => {
  avplayer.value?.setVolume(3.3 / 100 * 80)
  control.value.muted = false
}

const onVideoMute = () => {
  avplayer.value?.setVolume(0)
  control.value.muted = true
}

const onRequestFullScreen = () => {
  avplayer.value.enterFullscreen()
}

const formatVideoProgress = (v) => {
  return formatSecondsReadable(control.value.currentTime)
}

const formatSecondsReadable = (seconds) => {
  let h = 0;
  let m = 0;
  let s = 0;
  seconds = seconds / 1000
  // console.log('[seconds]', seconds)
  if (seconds > 3600) {
    h = Math.floor(seconds / 3600);
    m = Math.floor((seconds % 3600) / 60);
    s = Math.floor(seconds % 60);
  } else if (seconds > 60) {
    m = Math.floor(seconds / 60);
    s = Math.floor(seconds % 60);
  } else {
    s = Math.floor(seconds)
  }
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const onBeforeUnmountHandler = () => {
  if (avplayer.value) {
    avplayer.value.stop().then(() => {
      avplayer.value = null
    })
  }
}

const onShowProgressBar = () => {
  control.value.show = true
  if (throttleShowProgressBarTimer) {
    clearTimeout(throttleShowProgressBarTimer)
  }
  throttleShowProgressBarTimer = setTimeout(() => {
    if ([avpStatus.PLAYING, avpStatus.PLAYED].includes(control.value.playerStatus)) {
      control.value.show = false
    }
  }, 8000)
}

const updateTimelineWarp = async () => {
  if (!props.config.id) {
    return
  }
  if (!historyTimeline) {
    historyTimeline = await findTimeline(props.config.id)
  }
  if (!historyTimeline) {
    await addTimeline({
      key: props.config.id,
      name: props.config.name,
      duration: control.value.duration,
      lastTime: control.value.currentTime,
      updated_at: Date.now(),
    })
  } else {
    await updateTimeline(historyTimeline.id, {
      duration: control.value.duration,
      lastTime: control.value.currentTime,
      updated_at: Date.now(),
    })
  }
}

const seekTimelineWarp = async () => {
  if (!props.config.id) {
    return
  }
  const find = await findTimeline(props.config.id)
  if (!find) {
    return
  }
  if (find.lastTime) {
    avplayer.value.seek(BigInt(find.lastTime)).then(resp => {
      control.value.currentTime = find.lastTime
    }).catch(err => {
    })
  }
}

onMounted(onMountedHandler)
onBeforeUnmount(onBeforeUnmountHandler)

</script>

<style scoped>
.color-white {
  color: #ffffff;
}

.avp-container {
  position: relative;
  display: flex;
  flex: 1;
  background-color: #000000;
  overflow: hidden;

  .padding-10px {
    padding: 10px;
  }

  .padding-20px {
    padding: 20px;
  }

  .avp-canvas {
    display: flex;
    flex: 1;
  }

  .avp-control-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .avp-control-mask {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .avp-slider {
      padding: 0 10px;
    }

    .avp-control-bar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 10px;

      .volume-wrap {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .volume-slider {
        width: 80px;
        padding-left: 6px;
      }

    }

  }

  .n-icon {
    cursor: pointer;
  }

}

</style>