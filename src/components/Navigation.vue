<script lang="ts" setup>

const colorMode = useColorMode()
const router = useRouter();
const route = useRoute();

// 监听滚动事件
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop
  showToTop.value = scrollTop > 128
}

const showToTop = ref<boolean>(false)

const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  document.addEventListener('scroll', handleScroll);
  currentThemeIndex.value = themeList.indexOf(colorMode.preference);
})

// 取消滚动事件
onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})

const themeList = ['dark', 'light']
const currentThemeIndex = ref(0)
const switchTheme = () => {
  // 计算下一个主题索引（如果到达最后一个，则回到第一个）
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themeList.length;
  // 根据新的索引设置当前主题
  colorMode.preference = themeList[currentThemeIndex.value];
}

const openRssFeed = () => {
  window.open('/rss.xml', '_blank')
}

</script>
<template>
  <nav class="nav">
    <div class="nav-routes">
      <div class="nav-routes-left">
        <img class="nav-routes-left-avatar" src="/avatar.jpeg" alt="">
        <div class="nav-routes-left-item" @click="router.push('/')">
          Jophon
        </div>
      </div>
      <div class="nav-routes-center">
        <button :class="{ displaynone: !showToTop }" @click="toTop" class="totop">
          <Icon name="material-symbols:vertical-align-top-rounded" />
        </button>
      </div>
      <div class="nav-routes-right">
        <button class="nav-routes-right-item" @click="router.push('/archive')">
          <Icon name="material-symbols:archive" />
        </button>
        <button class="nav-routes-right-item" @click="openRssFeed">
          <Icon name="material-symbols:rss-feed" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  z-index: 1000;
  display: flex; // 使用 Flexbox
  width: 100vw; // 宽度占满全屏
  height: 4rem;
  justify-content: center; // 水平居中
  padding: var(--spacing-m); // 内边距
  backdrop-filter: blur(.75rem); // 添加模糊效果

  &-routes {
    width: 100%; // 宽度占满全屏
    display: flex; // 使用 Flexbox
    justify-content: space-between;

    &-left {
      display: flex; // 使用 Flexbox
      justify-content: center; // 水平居中
      align-items: center; // 垂直居中
      margin-right: auto; // 左侧导航项靠左对齐

      &-avatar {
        border-radius: var(--shape-border-radius-circle);
        width: 2rem;
        height: 2rem;
        border: var(--border-s);
        margin-right: .5rem;
      }

      &-item {
        display: flex; // 使用 Flexbox
        justify-content: center; // 水平居中
        align-items: center; // 垂直居中
        cursor: pointer;
        font-size: 1.5rem;
        color: rgba(0, 0, 0, .75);

      }
    }

    &-center {
      display: flex; // 使用 Flexbox
      justify-content: center; // 水平居中
      align-items: center; // 垂直居中

      .totop {
        transition: all .15s ease-in-out;

        svg,
        span {
          width: 1.75rem;
          height: 1.75rem;
        }
      }
    }

    &-right {
      display: flex; // 使用 Flexbox
      justify-content: center; // 水平居中
      align-items: center; // 垂直居中
      margin-left: auto; // 右侧导航项靠右对齐

      &-item {
        display: flex; // 使用 Flexbox
        justify-content: center; // 水平居中
        align-items: center; // 垂直居中
        cursor: pointer;
        width: 1.75rem;
        height: 1.75rem;
        margin: 0 .75rem;
        color: rgba(0, 0, 0, .75);

        svg,
        span {
          width: 90%;
          height: 90%;
          transition: all .15s ease-in-out;
        }
      }

      &-item:hover {

        svg,
        span {
          width: 100%;
          height: 100%;
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
}

.displaynone {
  opacity: 0;
  cursor: none;
}
</style>
