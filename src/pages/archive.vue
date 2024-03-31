<script lang="ts" setup>


onMounted(() => {
  const body = document.querySelector('.body') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${body.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})

</script>
<template>
  <main>
    <div class="body relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
      <div class="archive">

      </div>
      <div class="sidebar">
        <SideBar></SideBar>
      </div>
    </div>
  </main>
</template>
<style lang="scss">
.body {
  background-color: var(--jory-body-bg);
  max-width: 960px;
  min-width: 375px;
  box-shadow: var(--jory-body-shadow);
  box-sizing: content-box;
}

.sidebar {
  position: fixed;
  z-index: 1000;
  margin-left: 1rem;
  height: 100vh;
  padding: 2rem 0;
}
</style>
