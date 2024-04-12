<script lang="ts" setup>

onMounted(async () => {
  await nextTick();

  const favorites = document.querySelector('.favorites') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${favorites.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})

</script>
<template>
  <main>
    <div class="favorites relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
      <div class="favorites-boby w-full flex-grow-1 p-16">

      </div>
      <div class="sidebar">
        <SideBar></SideBar>
      </div>
      <div class="copyright">
        <span select-none>© Jory 2024</span>
        <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-1</a>
      </div>
    </div>
  </main>
</template>
<style lang="scss">
.favorites {
  background-color: var(--jory-body-bg);
  max-width: 960px;
  min-width: 375px;
  box-shadow: var(--jory-body-shadow);
  box-sizing: content-box;

}

.copyright {
  z-index: 1000;
  width: 100%;
  bottom: 0;
  color: var(--jory-color);
  font-size: 13px;
  text-align: center;

  span {
    margin-right: .5rem;
  }
}

.sidebar {
  position: fixed;
  z-index: 1000;
  margin-left: 1rem;
  height: 100vh;
  padding: 2rem 0;
}

</style>
