<script setup lang="ts">

definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: 'Jory Joestar',
  ogTitle: 'Jory Joestar',
  description: 'Jory Joestar',
  ogDescription: 'Jory Joestar',
  ogImage: '',
})


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

})

onUnmounted(() => {
  clearInterval(carouselTimer.value);
});


</script>

<template>
  <div class="index relative">

    <div class="shortlist flex-grow-1 w-full px-16 mt-32">
      <ShortList></ShortList>
    </div>

    <div class="content flex-grow-1 w-full px-16">
      <ContentList></ContentList>
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

</style>
