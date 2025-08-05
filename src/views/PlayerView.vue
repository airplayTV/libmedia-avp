<template>
  <avp-control v-if="videoConfig" :source="videoConfig" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import AvpControl from "@/components/avp-control.vue";

let route = useRoute()
const videoConfig = ref(null)

const onMountedHandler = () => {
  console.log('[参数说明]', { query: { config: btoa(JSON.stringify({ url: encodeURIComponent('https://example.com/file中文.m3u8') })), } })
  console.log('[query.config 生成步骤]', `const config = btoa(JSON.stringify({ url: encodeURIComponent('https://example.com/file中文.m3u8') }))`)

  if (!route.query.config) {
    console.log('[没有播放配置]')
    return
  }
  try {
    const tmpConfig = JSON.parse(atob(route.query.config))
    if (!tmpConfig.url) {
      console.log('[播放配置解析失败]', tmpConfig)
      return
    }
    tmpConfig.url = decodeURIComponent(tmpConfig.url)
    videoConfig.value = tmpConfig
  } catch (e) {
    console.log('[播放参数解析失败]', e)
  }

}

onMounted(onMountedHandler)

</script>

<style scoped>


</style>