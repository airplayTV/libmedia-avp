<template>
  <avp-control :key="videoConfig" :config="videoConfig" />
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import AvpControl from "@/components/avp-control.vue";

let route = useRoute()
const videoConfig = ref(null)

const onBeforeMountHandler = () => {
  console.log('[参数说明]', {
    query: {
      config: btoa(JSON.stringify({ url: encodeURIComponent('https://example.com/file中文.m3u8') })),
    },
    'query.config=': `btoa(JSON.stringify({ url: encodeURIComponent('https://example.com/file中文.m3u8') }))`
  })

  if (!route.query.config) {
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

// onMounted(onMountedHandler)
onBeforeMount(onBeforeMountHandler)

</script>

<style scoped>


</style>