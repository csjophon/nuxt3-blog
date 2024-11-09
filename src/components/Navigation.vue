<script lang="ts" setup>

const colorMode = useColorMode()
const router = useRouter();

onMounted(() => {
  currentThemeIndex.value = themeList.indexOf(colorMode.preference);
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
      <div class="nav-routes-item home" @click="router.push('/')">
        <UIcon class="project-item-header-route icon" name="i-ri-home-smile-fill" />
      </div>
      <div class="nav-routes-item archive" @click="router.push('/archive')">
        <UIcon class="project-item-header-route icon" name="i-ri-archive-2-fill" />
      </div>
      <div class="nav-routes-item rss" @click="openRssFeed">
        <UIcon class="project-item-header-route icon" name="i-ri-rss-fill" />
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.nav {
  position: fixed;
  z-index: 1000;
  // left: 50%; // 设置左侧为50%
  // transform: translateX(-50%); // 向左移动自身宽度的一半以实现居中
  transform: translateX(2rem);
  top: 4rem;
  display: flex; // 使用 Flexbox
  justify-content: center; // 水平居中
  padding: var(--spacing-xxs); // 内边距
  border-radius: var(--shape-border-radius-rounded-rectangle-l); // 圆角
  background-color: var(--background-color-50);
  border: var(--border-m);
  backdrop-filter: blur(.75rem); // 添加模糊效果
  box-shadow: var(--shadow-s); // 添加阴影效果

  &-routes {
    display: flex; // 使用 Flexbox
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中

    &-item {
      display: flex; // 使用 Flexbox
      justify-content: center; // 水平居中
      align-items: center; // 垂直居中
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      margin: 0 .25rem;
      color: rgba(0, 0, 0, .75);

      span {
        width: 90%;
        height: 90%;
        transition: all .2s ease-in-out;
      }
    }

    &-item:hover {
      span {
        width: 100%;
        height: 100%;
        color: rgba(0, 0, 0, 1);
      }
    }
  }

}
</style>
