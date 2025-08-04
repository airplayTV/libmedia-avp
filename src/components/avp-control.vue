<template>
  <div id="avplayer" ref="avplayer" class="avp-control">

    <div class="avp-control-wrap" @mousemove="setTimeoutControlDismiss">

      <!-- 播放器中间区域 -->
      <div class="avp-play-area" @click="onTogglePlay">
        <div v-if="loadingText" class="avp-controller-mask">
          <span style="max-width: 70%;text-align: center;">{{ loadingText }}</span>
        </div>
      </div>

      <!-- 播放器进度条区域 -->
      <div class="avp-bar-wrap" v-show="control.show" ref="avpBarWrap">
        <div class="avp-bar"></div>
        <div class="avp-bar-played" draggable="true" :style="{width:`${control.progress}%`}"></div>
        <div class="avp-bar-seeking" :style="{width:`${control.tmpSeeking}px`}"></div>
        <div class="avp-bar-loaded"></div>
        <div class="avp-bar-round"></div>
      </div>

      <!-- 播放器底部控制区域 -->
      <div class="avp-controller" v-show="control.show">
        <div class="avp-icons avp-icons-left">
          <div class="avp-icon avp-play-icon" v-if="control.playerStatus!==AVPlayerStatus.PLAYED" @click="onTogglePlay">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32">
              <path
                  d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path>
            </svg>
          </div>
          <div class="avp-icon avp-play-icon" v-else @click="onTogglePlay">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32">
              <path
                  d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path>
            </svg>
          </div>

          <div class="avp-volume" v-if="!control.muted">
            <div class="avp-icon avp-volume-icon" @click="onToggleAudio(1)">
              <div v-if="true" class="volume-panel"
                   style="bottom: 45px; left: 9px;width: 16px; z-index: 8; padding: 0 0 5px 0; display: flex; flex-direction: column; align-items: center; ">
                <div class="volume-val">100</div>
                <div class="volume-slider"
                     style="height: 86px; background-color: #f2f2f2; width: 10px;  display: flex;flex-direction: column;">
                  <div class="volume-loaded" style="flex: 1"></div>
                  <div class="volume-indicator" draggable="true" style="height: 90%; background-color: red; "></div>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32">
                <path
                    d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path>
              </svg>
            </div>
          </div>
          <div class="avp-volume-muted" v-else>
            <div class="avp-icon avp-volume-muted-icon" @click="onToggleAudio(-1)">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32">
                <path
                    d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path>
              </svg>
            </div>
          </div>

          <div class="avp-time">
            <span class="avp-ptime">{{ showFormatTime(control.currentTime) }}</span>
            &nbsp;/&nbsp;
            <span class="avp-dtime">{{ showFormatTime(control.duration) }}</span>
          </div>
        </div>
        <div class="avp-icons avp-icons-right">
          <!--
          <div class="flex-center">
            <a target="_blank" href="https://github.com/libmedia-avp">github.com/libmedia-avp</a>
          </div>
          -->

          <!--
          <div class="avp-icon avp-setting-icon">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28">
              <path
                  d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path>
            </svg>
          </div>
          -->
          <div class="avp-icon avp-full-icon" @click="onEnterFullScreen">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33">
              <path
                  d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path>
            </svg>
          </div>
          <!--
          <div class="avp-icon avp-full-in-icon">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33">
              <path
                  d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path>
            </svg>
          </div>
          -->

        </div>
      </div>

    </div>

  </div>
</template>

<script>
// import {setLocalPlayerType} from "@/helper/localstorage";

export default {
  name: 'avp-control',
  props: {
    msg: String,
    // avp: null,
    source: null,// 包含播放信息的数据源：{"src": "https://google.com/1.m3u8", "name": "some video name"}
    autoplay: Boolean,

    onLOADING: null,
    onLOADED: null,
    onPLAYING: null,
    onPLAYED: null,
    onPAUSED: null,
    onSTOPPED: null,
  },
  data() {
    return {
      AVPlayerStatus: {
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
      },

      RenderMode: {
        FIT: 0,//自适应
        FILL: 1,//填充
      },

      LogMode: {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        FATAL: 5
      },

      status: 0,
      loadingText: false,


      isTesla: true,
      avp: null,
      statsTimer: null,
      supportAtomic: true,
      statsKeys: [
        'audiocodec',
        'videocodec',
        'width',
        'height',
        'channels',
        'sampleRate',
        'bandwidth',
        'audioBitrate',
        'videoBitrate',
        'audioPacketQueueLength',
        'videoPacketQueueLength',
        'videoEncodeFramerate',
        'videoDecodeFramerate',
        'videoRenderFramerate',
        'keyFrameInterval',
        'audioEncodeFramerate',
        'audioDecodeFramerate',
        'audioRenderFramerate',
        'audioFrameDecodeIntervalMax',
        'audioFrameRenderIntervalMax',
        'videoFrameDecodeIntervalMax',
        'videoFrameRenderIntervalMax',
        'jitter',
        'audioStutter',
        'videoStutter'
      ],
      vW: null,
      vH: null,
      videoStatTimer: null,

      control: {
        duration: 0,
        currentTime: 0,
        playerStatus: 0,// 参考：AVPlayerStatus
        muted: false,// 是否静音
        progress: 0,// 播放进度
        tmpSeeking: 0,// 拖拽进度，是临时效果
        show: true,
        forwardLeftOffset: 0,
        forwardSeconds: 0,
        fullScreen: false,
      },

    }
  },
  watch: {
    // avp: function (val) {
    //   console.log('[watch.avp]', val)
    //   this.addEventListener()
    // },
    source: function (newSource) {
      console.log('[watch.source]', newSource)
      this.initStatus()
      this.loadAvPlayer();
    },
  },
  created() {
    // console.log('[created]', { source: this.source, avp: this.avp })
  },
  beforeMount() {
  },
  mounted() {
    console.log('[mounted]', { source: this.source, avp: this.avp })
    this.initStatus()
    this.loadAvPlayer();

  },
  unmounted() {
    this.destroyAvp()
  },
  methods: {
    initStatus() {
      this.showLoading('加载中...')
      this.control.currentTime = 0
      this.control = {
        duration: 0,
        currentTime: 0,
        playerStatus: 0,// 参考：AVPlayerStatus
        progress: 0,// 播放进度
        tmpSeeking: 0,
        show: true,
        forwardLeftOffset: 0,
        forwardSeconds: 0,
      }

      this.$refs.avpBarWrap.addEventListener('mousemove', (data) => {
        // console.log('[mousemove]', data)
        if (data.offsetX > 0 && data.offsetY > 0) {
          this.control.forwardSeconds = data.offsetX * this.control.duration / this.$refs.avpBarWrap.offsetWidth
          if (data.offsetX + 50 < this.$refs.avpBarWrap.offsetWidth) {
            this.control.forwardLeftOffset = data.offsetX
          }
          this.control.tmpSeeking = data.offsetX
        }
      })
      this.$refs.avpBarWrap.addEventListener('click', (data) => {
        // console.log('[click]', data)
        if (data.offsetX > 0 && data.offsetY > 0) {
          this.onSeeking(Math.floor(data.offsetX * this.control.duration / this.$refs.avpBarWrap.offsetWidth))
        }
      })
      this.$refs.avpBarWrap.addEventListener('mouseleave', (data) => {
        // console.log('[mouseleave]', data)
        this.control.tmpSeeking = Math.floor(this.$refs.avpBarWrap.offsetWidth * this.control.progress / 100)
      })

    },
    addEventListener() {
      this.avp.on('loading', (pts) => {
        // console.log('[addEventListener] loading', pts)
      })
      this.avp.on('loaded', (pts) => {
        // console.log('[addEventListener] loaded', pts)
        this.showLoading(false)
        this.control.duration = Number(this.avp.getDuration()) / 1000
      })
      this.avp.on('progress', (pts) => {
        // console.log('[addEventListener] progress', pts)
      })
      this.avp.on('time', (currentTime) => {
        this.updateCurrentTime(currentTime)
      })

      this.avp.on('timeout', (pts) => {
        // console.log('[addEventListener] timeout', pts)
      })
      this.avp.on('ended', () => {
        // console.log('[addEventListener] ended')
      })
      this.avp.on('error', (pts) => {
        // console.log('[addEventListener] error', pts)
      })

      if (this.videoStatTimer) {
        clearTimeout(this.videoStatTimer)
      }
      this.videoStatTimer = setInterval(() => {
        if (this.avp) {
          this.videoStatCallback(this.avp.getStats())
        }
      }, 1000)

    },
    updateCurrentTime(currentTime) {
      this.control.currentTime = Number(currentTime) / 1000
      this.control.progress = (100 * this.control.currentTime / this.control.duration).toFixed(2)
      if (this.$refs.avpBarWrap) {
        this.control.forwardLeftOffset = Math.floor(this.control.currentTime * this.$refs.avpBarWrap.offsetWidth / this.control.duration)
      }
    },
    onTogglePlay() {
      // console.log('[onTogglePlay]', this.avp)
      if (!this.isAvpReady()) {
        return
      }
      if (this.avp.getStatus() === this.AVPlayerStatus.PLAYED) {
        this.avp.pause().finally(() => {
          this.control.playerStatus = this.avp.getStatus()
        })
      } else {
        this.avp.play().finally(() => {
          this.control.playerStatus = this.avp.getStatus()
        })
      }
    },
    onToggleAudio(v) {
      console.log('[getVolume]', this.avp.getVolume())
      if (this.avp.getVolume() > 0) {
        this.avp.setVolume(0)
        this.control.muted = true
      } else {
        this.avp.setVolume(3.3 / 100 * 70)
        this.control.muted = false
      }
    },
    loadAvPlayer() {
      if (!this.source || !this.source.url) {
        this.showLoading('无播放视频源')
        return
      }
      window.AVPlayer.setLogLevel(this.LogMode.ERROR)
      if (!this.avp) {
        this.avp = new window.AVPlayer({
          container: this.$refs.avplayer,
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
          enableWebGPU: false,
          loop: false,
          enableJitterBuffer: true,
          jitterBufferMax: 4,
          jitterBufferMin: 1,
          lowLatency: true
        })
      }

      this.avp.setRenderMode(this.RenderMode.FIT)

      this.addEventListener()

      // console.log('[URLS]', { url: this.source ? this.source.url : null, source: this.source })

      this.avp.load(this.source.url).then(() => {
        Promise.all([this.avp.getVideoList(), this.avp.getAudioList(), this.avp.getSubtitleList()]).then((data) => {
          // console.log('[Promise.all.data]', data)
          this.avp.play({ audio: true, video: true, subtitle: true }).then(() => {
            // console.log('[avp.play.ok]', this.avp.getStatus())
            this.control.playerStatus = this.avp.getStatus()
            if (!this.avp.isDash()) {
              // const audioStreams = this.avp.getStreams().filter((s => s.mediaType === 'Audio'))
              // const videoStreams = this.avp.getStreams().filter((s => s.mediaType === 'Video'))
              // console.log('[audioStreams]', audioStreams)
              // console.log('[videoStreams]', videoStreams)
              // console.log('[getVolume]', this.avp.getVolume())
              //
              // this.avp.setVolume(3)
            }
          }).catch(err => {
            console.log('[avp.play.error]', err)
          })
        })
      }).catch(err => {
        console.log('[资源不存在加载失败]', err)
        this.showLoading(`视频加载失败：${err}, ${this.source.url}`)

      }).finally(() => {
        setTimeout(() => {
          // this.control.show = false
        }, 8000)
      })
    },
    videoStatCallback(/**stats**/) {
      // console.log('[stats]', JSON.stringify(stats))
      // console.log('[stats.wh]', { w: stats['width'], h: stats['height'] })
    },
    showFormatTime(seconds) {
      let h = 0;
      let m = 0;
      let s = 0;
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
    },
    onEnterFullScreen() {
      if (!this.control.fullScreen) {
        this.control.fullScreen = true
        this.avp.enterFullscreen()
      } else {
        this.control.fullScreen = false
        this.avp.exitFullscreen()
      }
    },
    onSeeking(seconds) {
      this.control.playerStatus = this.AVPlayerStatus.SEEKING
      const seek = BigInt(Number(seconds)) * 1000n
      this.updateCurrentTime(seek)
      this.avp.seek(seek).then(() => {
        this.avp.play().finally(() => {
          this.control.playerStatus = this.avp.getStatus()
        })
      }).catch(err => {
        console.log('[errX]', err)
      })
    },
    showLoading(msg) {
      this.loadingText = msg
    },
    destroyAvp() {
      if (this.avp) {
        this.avp.stop().then(() => {
          this.avp = null
        })
      }
    },
    isAvpReady() {
      if (!this.avp) {
        console.log('[未就绪]', null)
        return false
      }
      const status = this.avp.getStatus()
      if (status >= this.AVPlayerStatus.PLAYED) {
        return true
      } else {
        console.log('[未就绪]', status)
        return false
      }
    },
    setTimeoutControlDismiss() {
      if (this.control.show) {
        return
      }
      this.control.show = true
      setTimeout(() => {
        // this.control.show = false
      }, 8000)
    },


  },
}
</script>

<style scoped>

.avp-control {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #000000;

  .avp-control-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
  }

  .avp-play-area {
    flex: 1;

    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;


    overflow: hidden;

  }

  .avp-controller-mask {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    background-color: #000000;
    z-index: 9;

  }

  .avp-bar-wrap {
    margin: 0 10px;
    padding: 8px 0;
    cursor: pointer;
    position: relative;

    .avp-bar {
      background-color: rgba(255, 255, 255, 0.2);
      height: 4px;
      width: 100%;
      position: absolute;
    }

    .avp-bar-loaded {
      background-color: rgba(255, 255, 255, 0.4);
      height: 4px;
    }

    .avp-bar-played {
      background-color: rgb(0, 178, 194);
      height: 4px;
      position: absolute;
    }

    .avp-bar-seeking {
      background-color: rgb(0, 178, 194);
      height: 4px;
      position: absolute;
    }

    .avp-bar-round {
      position: absolute;

      span {
        position: absolute;
        top: -20px;
      }

    }

  }

  .avp-controller {
    display: flex;
    margin: 0 15px;
    color: white;
    flex-direction: row;
    justify-content: space-between;

    .avp-icons-left {
      display: flex;
      flex-direction: row;

      .avp-time {
        display: flex;
        align-items: center;
      }
    }

    .avp-icons-right {
      display: flex;
      flex-direction: row;

      a {
        color: whitesmoke;
        font-family: 'Source Code Pro', Consolas, Monaco, 'Andale Mono', "Ubuntu Mono", monospace;
      }
    }

    .avp-icons {
      .avp-icon {
        padding: 20px 4px 15px 4px;
        display: flex;
      }

      svg {
        width: 28px;
        height: 28px;
        cursor: pointer;
      }

      svg path, svg circle {
        fill: #fff;
      }

    }

    .avp-volume-icon {
      position: relative;

      .volume-panel {
        position: absolute;
      }
    }
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

}


</style>