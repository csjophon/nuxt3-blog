<script setup lang="ts">

const router = useRouter();

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
      <div class="info">
        <img class="info-avatar" src="/avatar.jpeg" alt="">
        <div class="info-name">
          Jory Joestar
          <span @click="router.push('/version')">{{ version }}</span>
        </div>
        <div class="info-desc">In life, when one is happy, one should enjoy to the fullest; do not let the golden cup
          face
          the moon empty.</div>
        <div class="info-links">
          <div class="info-links-item" @click="openInNewTab('https://github.com/JoryJoestar')">
            <UIcon class="icon" name="i-ri-github-fill" dynamic />
          </div>
        </div>
      </div>
      <div class="ani">

      </div>
    </div>

    <div class="home-main">

      <div class="articles">
        <div class="articles-header header-route">
          <div class="articles-header-title">
            Content
          </div>
          <div class="articles-header-title-route route-link" @click="router.push('/archive')">
            SEE ALL
          </div>
        </div>
        <div class="articles-main">
          <ContentList></ContentList>
        </div>
      </div>
    </div>



  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-top: 5rem;

  &-header {

    .info {
      width: 32rem;

      &-avatar {
        border-radius: 50%;
        width: 8rem;
        height: 8rem;
      }

      &-name {
        font-size: 4rem;

        span {
          font-size: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, .5);
          color: rgba(0, 0, 0, .5);
          cursor: pointer;
          transition: all .15s ease-in-out;
        }

        span:hover {
          border-bottom: 1px solid rgba(0, 0, 0, .75);
          color: rgba(0, 0, 0, .75);
        }
      }

      &-desc {
        font-size: 1rem;
        padding-top: 1rem;
      }

      &-links {
        display: flex;
        padding-top: 1rem;

        &-item {
          width: 2rem;
          height: 2rem;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;

          .icon {
            width: 80%;
            height: 80%;
            transition: all .2s ease-in-out;
          }


        }

        &-item:not(:first-child) {
          margin-left: 1rem;

        }

        &-item:hover {
          .icon {
            color: grey;
          }
        }
      }
    }
  }

  &-main {
    padding-top: 1rem;
    width: 100%;

    .header-route {
      display: flex;
      justify-content: space-between;
      padding-bottom: .5rem;
      font-size: 13px;
      color: grey;

      .route-link {
        cursor: pointer;
        transition: all .2s ease-in-out;
      }

      .route-link:hover {
        color: rgb(63, 63, 63);
      }
    }

    .articles {
      padding-top: 1rem;
    }
  }
}
</style>
