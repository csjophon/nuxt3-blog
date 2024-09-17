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
        <div class="info-name">Jory Joestar</div>
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
      <div class="first-row">
        <div class="shorts">
          <div class="shorts-header header-route">
            <div class="shorts-header-title">
              Shorts
            </div>
            <div class="shorts-header-route route-link" @click="router.push('/shorts')">
              SEE ALL
            </div>
          </div>
          <div class="shorts-main">
            <ShortList></ShortList>
          </div>
        </div>

        <div class="projects">
          <div class="projects-header header-route">
            <div class="projects-header-title">
              Projects
            </div>
            <div class="projects-header-route route-link" @click="router.push('/projects')">
              SEE ALL
            </div>
          </div>
          <div class="projects-main">
            <div class="project-item" @click="">
              <div class="project-item-header">
                <div class="project-item-header-type">toC</div>
                <UIcon class="project-item-header-route icon" name="i-icon-park-outline-double-right" dynamic />
              </div>
              <div class="project-item-main">
                <div class="project-item-main-icon"></div>
                <div class="project-item-main-title">AIi18n</div>
                <div class="project-item-main-desc">Use AI to help the product go around the world</div>
              </div>
            </div>
            <div class="project-item" @click=""></div>
          </div>
        </div>
      </div>


      <div class="articles">
        <div class="articles-header header-route">
          <div class="articles-header-title">
            Articles
          </div>
          <div class="articles-header-title-route route-link" @click="router.push('/articles')">
            SEE ALL
          </div>
        </div>
        <div class="articles-main">
          <BlogList></BlogList>
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

    .first-row {
      display: flex;

      .shorts {
        width: calc(50% - 1rem);

        &-main {
          min-width: 24rem;
          height: 12rem;
        }
      }

      .projects {
        flex: 1;
        padding-left: 2rem;

        &-main {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .project-item {

            position: relative;
            cursor: pointer;
            background: grey;
            width: calc(50% - 1rem);
            min-width: 12rem;
            min-height: 12rem;
            padding: 1rem; // 内边距
            border-radius: .75rem; // 圆角
            background: rgba(255, 255, 255, 0.5); // 半透明背景色
            border: 1px solid rgba(255, 255, 255, 0.2); // 轻微的白色边框
            backdrop-filter: blur(10px); // 添加模糊效果
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); // 添加阴影效果
            transition: all .2s ease-in-out; // 添加过渡效果

            &-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: .5rem;
              font-size: .6rem;

              .icon {
                font-size: 1rem;
              }
            }

            &-main {
              position: relative;


              &-title {
                font-size: 1.5rem;
              }

              &-icon {
                background: rgb(219, 219, 219);
                width: 2rem;
                height: 2rem;
              }

              &-desc {
                font-size: .8rem;
              }


            }
          }

          .project-item:hover {
            background: rgba(255, 255, 255, 1); // 半透明背景色
          }
        }
      }
    }

    .articles {
      padding-top: 1rem;

      &-main {}
    }
  }
}
</style>
