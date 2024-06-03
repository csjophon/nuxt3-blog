<script lang="ts" setup>

const colorMode = useColorMode()
const router = useRouter();
const route = useRoute();

const baseUrl = `/`
const showToTop = ref<boolean>(false)
const showBack = computed(() => {
  return route.path !== baseUrl
})

onMounted(() => {
  document.addEventListener('scroll', handleScroll)



  currentThemeIndex.value = themeList.indexOf(colorMode.preference);
})

// 取消滚动事件
onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})

// 监听滚动事件
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop
  showToTop.value = scrollTop > 128
}
const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const back = () => {
  router.back()
}


const themeList = ['dark', 'light']
const currentThemeIndex = ref(0)
const switchTheme = () => {
  // 计算下一个主题索引（如果到达最后一个，则回到第一个）
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themeList.length;
  // 根据新的索引设置当前主题
  colorMode.preference = themeList[currentThemeIndex.value];
}

const openRssFeed = () => {
  window.location.href = '/rss.xml'
}
</script>
<template>
  <main>
    <ClientOnly>
      <div class="sidebar-container">
        <div class="navigation">
          <button class="theme-icon button" @click="switchTheme">
            <UIcon v-show="colorMode.value === 'dark'" class="icon moon" name="i-ph-moon-fill" dynamic />
            <UIcon v-show="colorMode.value === 'light'" class="icon sun" name="i-ph-sun-fill" dynamic />
          </button>
          <button class="rss-icon button" @click="openRssFeed">
            <UIcon class="icon" name="i-typcn-rss" dynamic />
          </button>
          <button class="home-icon button" @click="router.push('/')">
            <UIcon class="icon" name="i-material-symbols-home" dynamic />
          </button>
          <button class="short-icon button" @click="router.push('/short')">
            <UIcon class="icon" name="i-mdi-message" dynamic />
          </button>
          <button class="favorites-icon button" @click="router.push('/favorites')">
            <UIcon class="icon" name="i-ph-star-fill" dynamic />
          </button>
          <button class="archive-icon button" @click="router.push('/archive')">
            <UIcon class="icon" name="i-material-symbols-archive" dynamic />
          </button>
          <button class="about-icon button" @click="router.push('/about')">
            <UIcon class="icon" name="i-cib-about-me" dynamic />
          </button>
        </div>

        <div class="hover">
          <button :style="showBack ? 'opacity: 1;' : 'opacity: 0;'" @click="back" class="back button2">
            <UIcon class="icon" name="i-streamline-return-2-solid" dynamic />
          </button>
          <button :style="showToTop ? 'opacity: 1;' : 'opacity: 0;'" @click="toTop" class="totop button2">
            <UIcon class="icon" name="i-octicon-move-to-top-16" dynamic />
          </button>
        </div>
      </div>
    </ClientOnly>
  </main>
</template>

<style lang="scss">
main {
  height: 100%;
}

.sidebar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .navigation {
    display: flex;
    flex-direction: column;
    background-color: var(--jory-button-bg);
    border-radius: 2rem;
    opacity: .85;
  }

  .hover {
    display: flex;
    flex-direction: column;
    transition: all .3s;
  }

  .button,
  .button2 {
    width: 3rem;
    height: 3rem;
    border-radius: 2rem;
    transition: all .3s;
    margin-bottom: .5rem;
  }

  .button2 {
    opacity: .85;
    background-color: var(--jory-button-bg);
  }

  .button:last-child {
    margin-bottom: 0;
  }

  .button:hover,
  .button2:hover {
    background-color: var(--jory-button-hover-bg);
  }

  .icon {
    font-size: 1.75rem;
    color: var(--jory-bg);
  }

}
</style>
