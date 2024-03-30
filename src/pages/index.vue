<script setup lang="ts">


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

setInterval(() => {
  if (!carouselRef.value) return

  if (carouselRef.value.page === carouselRef.value.pages) {
    return carouselRef.value.select(0)
  }

  carouselRef.value.next()
}, 3000)

onMounted(async () => {
  await nextTick();

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
      <div class="info h-40vh w-full relative">
        <div class="bg w-full h-full">
          <div class="mask h-full w-full"></div>
          <UCarousel ref="carouselRef" class="carousel w-full h-full"
            :ui="{ item: 'basis-full ', container: 'h-full ' }" v-slot="{ item }" :items="items">
            <img class="w-full h-full object-cover" :src="item" draggable="false">
          </UCarousel>
        </div>

        <div class="profile">
          <div class="flex items-center mr-16">
            <div class="name color-white mr-2">Jory Joe⭐</div>
            <img class="avatar object-cover" src="/avatar.jpg" alt="Avatar" />
          </div>
          <div class="introduce pt-2">
            人生得意须尽欢，莫使金樽空对月。
          </div>
        </div>

      </div>

      <div class="content flex-grow-1 w-full p-16">
        <ContentList></ContentList>
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
  border-left: .25rem solid rgba(0, 0, 0, 0.1);
  border-right: .25rem solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
}

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
  bottom: -3rem;
  display: flex;
  flex-direction: column;
  align-items: end;

  .avatar {
    height: 5rem;
    width: 5rem;
    border-radius: .5rem;
  }

  .name {
    font-size: 1.5rem;
  }

  .introduce {
    color: var(--jory-color);
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
