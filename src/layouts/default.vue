<script lang="ts" setup>

import links from '@/assets/links'

const openInNewTab = (link: string) => {
  window.open(link, '_blank');
}

</script>
<template>
  <div class="layout-default">

    <div class="g-bg">
      <div class="g-polygon-1"></div>
      <div class="g-polygon-2"></div>
      <div class="g-polygon-3"></div>
    </div>

    <div class="main-container">
      <div class="sidebar">
        <SideBar></SideBar>
      </div>

      <main class="w-full">
        <slot />
      </main>

      <div class="footer">
        <div class="copyright">
          <span select-none>© Jory 2024</span>
          <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-2</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
