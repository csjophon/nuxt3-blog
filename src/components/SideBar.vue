<script lang="ts" setup>

const colorMode = useColorMode()
const router = useRouter();
const route = useRoute();

const baseUrl = `/`
const showToTop = ref<boolean>(false)
const showBack = ref<boolean>(true)

onMounted(() => {
  document.addEventListener('scroll', handleScroll)

  showBack.value = route.path !== baseUrl

  colorMode.preference = 'system';
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
  router.go(-1)
}


const themeList = ['dark', 'light']
const currentThemeIndex = ref(0)
const switchTheme = () => {
  // 计算下一个主题索引（如果到达最后一个，则回到第一个）
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themeList.length;
  // 根据新的索引设置当前主题
  colorMode.value = themeList[currentThemeIndex.value];
}

</script>
<template>
  <main>
    <div class="sidebar-container">

      <div class="navigation">
        <button class="home button" @click="router.push('/')">
          <UIcon class="icon" name="i-material-symbols-home" dynamic />
        </button>

        <button class="archive button">
          <UIcon class="icon" name="i-material-symbols-archive" dynamic />
        </button>
        <button class="theme button" @click="switchTheme">
          <UIcon v-if="colorMode.value === 'dark'" class="icon moon" name="i-ph-moon-fill" dynamic />
          <UIcon v-if="colorMode.value === 'light'" class="icon sun" name="i-ph-sun-fill" dynamic />
        </button>
      </div>

      <div class="hover">
        <button v-show="showBack" @click="back" class="back button">
          <UIcon class="icon" name="i-lets-icons-back" dynamic />
        </button>
        <transition name="fade" mode="out-in">
          <button v-show="showToTop" @click="toTop" class="totop button">
            <UIcon class="icon" name="i-bxs-to-top" dynamic />
          </button>
        </transition>
      </div>
    </div>
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
  }

  .hover {
    display: flex;
    flex-direction: column;
    transition: all .3s;
  }

  .button {
    background-color: var(--jory-button-bg);
    width: 3rem;
    height: 3rem;
    border-radius: .5rem;
    transition: all .3s;
    margin-bottom: .5rem;
  }

  .button:hover {
    background-color: var(--jory-button-hover-bg);
  }

  .icon {
    font-size: 1.75rem;
    color: var(--jory-bg);
  }

}
</style>
