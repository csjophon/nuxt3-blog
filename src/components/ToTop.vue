<script setup lang="ts">

onMounted(() => {
  document.addEventListener('scroll', handleScroll)
})

// 取消滚动事件
onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})

// 监听滚动事件
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop
  showToTop.value = scrollTop > 128
}

const showToTop = ref<boolean>(false)

const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}


</script>

<template>
  <div class="totop">
    <button :class="{ displaynone: !showToTop }" @click="toTop" class="totop button">
      <UIcon class="icon" name="i-octicon-move-to-top-16" dynamic />
    </button>
  </div>
</template>

<style lang="scss"></style>
