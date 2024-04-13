<script lang="ts" setup>

import links from '@/assets/links'

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

const openInNewTab = (link: string) => {
  window.open(link, '_blank');
}


</script>
<template>
  <main>
    <div class="favorites relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
      <div class="favorites-boby w-full flex-grow-1 p-16">

      </div>
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
  </main>
</template>
<style lang="scss">

</style>
