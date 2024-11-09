<script lang="ts" setup>

</script>
<template>
  <div class="layout-default">

    <div class="body">
      <Navigation />

      <main>
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

  main {
    padding: 0 2rem 5rem;
  }
}
</style>
