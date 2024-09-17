<script lang="ts" setup>

</script>
<template>
  <div class="layout-default">

    <div class="g-bg">
      <div class="g-polygon-1"></div>
      <div class="g-polygon-2"></div>
      <div class="g-polygon-3"></div>
    </div>

    <div class="body">
      <Navigation />

      <main class="w-full px-8 pb-20">
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
<style lang="scss">
.layout-default {
  position: relative;
}
</style>
