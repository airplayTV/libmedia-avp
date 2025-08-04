<template>
  <avp-control v-if="videoConfig" :source="videoConfig" />
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import AvpControl from "@/components/avp-control.vue";

let route = useRoute()
const videoConfig = ref(null)

const onBeforeMountHandler = () => {
  console.log('[参数说明]', { query: { config: btoa(JSON.stringify({ url: encodeURIComponent('https://example.com/file中文.m3u8') })), } })
  console.log('[query.config 生成步骤]', `const config = btoa(JSON.stringify({ url: encodeURIComponent('https://example.com/file中文.m3u8') }))`)

  // console.log('[debug]', btoa(JSON.stringify({
  //   url: 'https://h5.chinaguandan.com/files/tmp/yixueqianchi.m3u8',
  //   name: encodeURIComponent('隋文帝发'),
  // })))

  if (!route.query.config) {
    console.log('[播放参数错误]', route.query)
    return
  }
  try {
    const videoConfig = JSON.parse(atob(route.query.config))
    if (!videoConfig.url) {
      console.log('[播放地址错误]', videoConfig)
      return
    }
    videoConfig.url = decodeURIComponent(videoConfig.url)

    console.log('[videoConfig]', videoConfig)

  } catch (e) {
    console.log('[播放参数解析失败]', e)
  }

}

onBeforeMount(onBeforeMountHandler)

</script>

<style scoped>


</style>