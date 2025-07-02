<script setup lang="ts">

const router = useRouter();

definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: 'Jophon',
  ogTitle: 'Jophon',
  description: 'Jophon',
  ogDescription: 'Jophon',
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

const openInNewTab = (link: string) => {
  window.open(link, '_blank');
}




</script>

<template>
  <div class="home">
    <div class="home-header">

    </div>

    <div class="home-main">

      <div class="articles">
        <div class="articles-main">
          <ContentList></ContentList>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-top: 8rem;
}
</style>
