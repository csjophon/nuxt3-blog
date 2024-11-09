<script setup lang="ts">

const router = useRouter();

definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: 'Rich Wilds',
  ogTitle: 'Rich Wilds',
  description: 'Rich Wilds',
  ogDescription: 'Rich Wilds',
  ogImage: '',
})


const carouselRef = ref()

const carouselTimer = ref()

const version = ref<string>('');

const versionContentQuery = queryContent()
  .where({ type: { $eq: 'version' } })
  .findOne()

versionContentQuery.then((res) => {
  version.value = res.title as string;
})



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
      <div class="intro">
        <div class="intro-first">
          <img class="intro-avatar" src="/avatar.jpeg" alt="">
          <div class="intro-name">Rich Wilds</div>
          <div class="intro-version" @click="router.push('/version')">{{ version }}</div>
        </div>
        <div class="intro-second">
          <div class="intro-links">
            <div class="intro-links-item" @click="openInNewTab('https://github.com/JoryJoestar')">
              <UIcon class="icon" name="i-ri-github-fill" dynamic />
            </div>
          </div>
          <div class="intro-desc">In life, when one is happy, one should enjoy to the fullest; do not let the golden cup
            face
            the moon empty.</div>
        </div>
      </div>
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

  &-header {

    .intro {

      &-first,
      &-second {
        display: flex;
        align-items: stretch; // 确保子元素可以拉伸以填满父元素的高度
        gap: 1rem;

        margin-bottom: 1rem;
      }

      &-avatar {
        border-radius: var(--shape-border-radius-circle);
        width: 10rem;
        height: 10rem;
        border: var(--border-m);
      }

      &-name {
        display: flex;
        justify-content: start;
        align-items: center;
        flex: 1;
        flex-grow: 1;
        min-height: 10rem;
        font-size: var(--typography-font-size-headline2);
        border: var(--border-m);
        border-radius: var(--shape-border-radius-rounded-rectangle-l);
        padding: var(--card-padding-m);
      }

      &-version {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 10rem;
        min-height: 10rem;
        font-size: var(--typography-font-size-headline4);
        border: var(--border-m);
        border-radius: var(--shape-border-radius-rounded-rectangle-l);
        padding: var(--card-padding-m);
        color: var(--font-color);
        text-decoration: underline;
        cursor: pointer;
        transition: all .15s ease-in-out;
      }

      &-version:hover {
        background-color: var(--background-color-hover);
      }

      &-desc {
        display: flex;
        justify-content: start;
        align-items: center;
        flex: 1;
        flex-grow: 1;
        font-size: var(--typography-font-size-body1);
        border: var(--border-m);
        border-radius: var(--shape-border-radius-rounded-rectangle-l);
        padding: 1.5rem 2rem;
      }

      &-links {
        display: flex;

        &-item {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 10rem;
          font-size: var(--typography-font-size-headline4);
          border: var(--border-m);
          border-radius: var(--shape-border-radius-rounded-rectangle-l);
          padding: 1rem 2rem;
          cursor: pointer;
          color: var(--font-color);
          transition: all .15s ease-in-out;

          .icon {
            width: 3rem;
            height: 3rem;
            transition: all .2s ease-in-out;
          }


        }

        &-item:not(:first-child) {
          margin-left: 1rem;

        }

        &-item:hover {
          background-color: var(--background-color-hover);
        }
      }
    }
  }
}
</style>
