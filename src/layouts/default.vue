<script lang="ts" setup>

import links from '@/assets/links'

const openInNewTab = (link: string) => {
  window.open(link, '_blank');
}

</script>
<template>
  <div class="layout-default body relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
    <main class="">
      <slot />
    </main>

    <div class="sidebar">
      <SideBar></SideBar>
    </div>

    <div class="footer">
      <div class="links">
        <button v-for="i, idx in links " :key="idx" :class="[idx, 'button']" @click="openInNewTab(i.link)">
          <UIcon class="icon" :name="i.icon" dynamic />
        </button>
      </div>
      <div class="copyright">
        <span select-none>© Jory 2024</span>
        <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-1</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
