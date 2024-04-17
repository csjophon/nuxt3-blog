<script setup lang="ts">

const router = useRouter();

import links from '@/assets/links'

const items = [
  '/bg/1.jpg',
  '/bg/2.jpg',
  '/bg/3.jpg',
  '/bg/4.jpg',
  '/bg/5.jpg',
  '/bg/6.jpg',
  '/bg/7.jpg',
  '/bg/8.jpg',
  '/bg/9.jpg',
  '/bg/10.jpg',
  '/bg/11.jpg',
  '/bg/12.jpg',
  '/bg/13.jpg',
  '/bg/14.jpg',
  '/bg/15.jpg',
  '/bg/16.jpg',
  '/bg/17.jpg',

]

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
    <div class="info h-40vh w-full relative">
      <div class="bg w-full h-full">
        <div class="mask h-full w-full"></div>
        <UCarousel ref="carouselRef" class="carousel w-full h-full" :ui="{ item: 'basis-full ', container: 'h-full ' }"
          v-slot="{ item }" :items="items">
          <img class="w-full h-full object-cover" :src="item" draggable="false">
        </UCarousel>
      </div>

      <div class="profile w-full">
        <div class="mr-16 flex">
          <div class="name color-white mr-4">Jory</div>
          <img class="avatar object-cover" src="/avatar.jpg" alt="Avatar" />
        </div>
        <div class="sub w-full flex justify-end items-center">
          <div class="introduce font-size-6 mr-16">
            三日当空，快脱水
          </div>
        </div>
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
  position: absolute;
  z-index: 999;
  right: 0rem;
  bottom: -6rem;
  display: flex;
  flex-direction: column;
  align-items: end;

  .avatar svg path {
    fill: white;
  }

  .avatar {
    width: 8rem;
    height: 8rem;
    border-radius: .5rem;
  }

  .name {
    font-size: 2rem;
  }

  .sub {
    .introduce {
      color: var(--jory-color);
    }
  }



}
</style>
