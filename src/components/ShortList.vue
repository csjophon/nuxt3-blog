<script lang="ts" setup>

const router = useRouter();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const extractChildRoutes = async (items: any) => {
  let posts: any = [];

  for (let item of items) {
    if (!item.children) {
      if (item.short) {
        posts.push(item);
      }
    } else {
      const childRoutes = await extractChildRoutes(item.children);
      posts = [...posts, ...childRoutes];
    }
  }

  // 按照 date 字段倒序排列 posts 数组
  posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  posts.length = Math.min(posts.length, 1); // 保留前两个元素，若原本少于两个则不变

  return posts;
}

const posts = await extractChildRoutes(navigation.value!);

const isDragging = ref(false);
const dragStartX = ref(0);
const scrollContainer = ref();

onMounted(async () => {
  await nextTick();
  scrollContainer.value = document.querySelector('.shortList-body');

  scrollContainer.value.addEventListener('wheel', (event: any) => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
    const { deltaY } = event;
    const maxScrollLeft = scrollWidth - clientWidth;
    const left = scrollContainer.value.scrollLeft + event.deltaY;

    if ((deltaY < 0 && left >= 0) || (deltaY > 0 && left <= maxScrollLeft)) {
      event.preventDefault();
    }

    // event.preventDefault();
    scrollContainer.value.scrollLeft = left;
  });
});

</script>
<template>
  <div class="shortList">
    <div class="title text-8em color-transparent absolute left--3rem top--7.5rem font-bold text-stroke-2 op10">
      Short
    </div>
    <div class="shortList-body">
      <div class="item" v-for="item, index in posts" :key="index">
        <div class="desc">
          {{ item.desc }}
        </div>
        <div class="time">
          - {{ formatDate(item.date, 'diy', 'MMM D') }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shortList {
  position: relative;
  width: 100%;

  .title {
    color: var(--jory-color);
    z-index: 999;
  }

  &-body {
    display: flex;
    flex-direction: row;
    padding: 1rem 0;
    width: calc(60vw - 8rem);
    overflow-x: auto;
    /* 允许水平滚动 */
    scrollbar-width: none;
    /* 隐藏滚动条（仅适用于Firefox） */
    -ms-overflow-style: none;
    /* 隐藏滚动条（仅适用于IE/Edge） */
  }

  .item {
    margin-right: 1rem;
    position: relative;
    z-index: 1000;
    min-width: calc(375px - 32px);
    background-color: var(--jory-bg);
    color: var(--jory-color);
    padding: 1rem 1.5rem;
    border-radius: .5rem;
    font-size: 15px;
    box-shadow: var(--jory-short-shadow);
  }

  .time {
    width: 100%;
    opacity: .6;
    display: flex;
    justify-content: end;
    margin-top: .5rem;
  }

}


/* 使用伪元素覆盖滚动条（适用于现代浏览器） */
.shortList-body::-webkit-scrollbar {
  display: none;
  /* 隐藏滚动条（适用于Chrome、Safari等WebKit内核浏览器） */
}
</style>
