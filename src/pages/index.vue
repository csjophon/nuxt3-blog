<script setup lang="ts">

useSeoMeta({
  title: 'Rwilds - blog',
  ogTitle: 'Rwilds - blog',
  description: 'Rwilds - blog',
  ogDescription: 'Rwilds - blog',
  ogImage: '',
})

import links from '@/assets/links'


const carouselRef = ref()

const carouselTimer = ref()


onMounted(async () => {
  await nextTick();

  carouselTimer.value = setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)

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

onUnmounted(() => {
  clearInterval(carouselTimer.value);
});

const openInNewTab = (link: string) => {
  window.open(link, '_blank');
}

</script>

<template>
  <div class="body relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
    <div class="info h-15vh w-full relative">
      <div class="profile w-full">
        <div class="name en">Jory Joestar</div>
      </div>
    </div>

    <div class="shortlist flex-grow-1 w-full px-16 mt-32">
      <ShortList></ShortList>
    </div>

    <div class="content flex-grow-1 w-full px-16">
      <ContentList></ContentList>
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
</template>

<style lang="scss">
.bg {
  position: absolute;
  z-index: 998;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 95%, rgba(0, 0, 0, .5) 100%);
    z-index: 998;
    pointer-events: none;
  }

  .carousel {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 997;
  }
}


.profile {
  svg {
    opacity: .5;
    width: 4rem;
    height: 4rem;

    path {
      fill: var(--jory-color);
    }
  }
}

.profile {
  z-index: 999;
  display: flex;
  padding: 1rem;
  justify-content: start;
  align-items: center;
  color: var(--jory-color);
  border-bottom: .25rem dashed var(--jory-color);
  opacity: .15;

  .name {
    &.en {
      font-size: 5rem;
      margin-left: 1rem;
      font-weight: bold;

    }
  }

}
</style>
