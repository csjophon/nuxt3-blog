<script lang="ts" setup>

onMounted(async () => {
  await nextTick();

  const about = document.querySelector('.about') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${about.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})

</script>
<template>
  <div class="about relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
    <div class="about-boby w-full flex-grow-1 p-16">
      <div class="title pb-4">
        About me
      </div>
      <div class="introduce">
        <p>Hello i'm jory, you can call me <span class="font-bold font-size-2rem">Rwilds</span>, it means rich wilds,I
          really wanna explore there.
        </p>
        <p>Also you can call me <span class="font-bold font-size-2rem">Jory Joestar</span>, it means JoJo which is my
          favorite roles' nickname.</p>
        <p>I enjoy creating, whether it's games, music, dance, sport, car, junk food or anything else</p>
        <p>I hope I can become the person I want to be.</p>
        <p>It's a long road ahead, see you later.</p>
      </div>
    </div>
    <div class="sidebar">
      <SideBar></SideBar>
    </div>
    <div class="copyright">
      <span select-none>© Jory 2024</span>
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-1</a>
    </div>
  </div>
</template>
<style lang="scss">
.about {
  background-color: var(--jory-body-bg);
  max-width: 960px;
  min-width: 375px;
  box-shadow: var(--jory-body-shadow);
  box-sizing: content-box;

  .title {
    color: var(--jory-color);
    font-size: 2.5rem;
    font-weight: 600;

  }

  .introduce {
    color: var(--jory-color);
    font-size: 1.5rem;

    p {
      margin: .5rem 0;
    }
  }

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
