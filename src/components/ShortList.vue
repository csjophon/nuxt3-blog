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
  posts.length = Math.min(posts.length, 2); // 保留前两个元素，若原本少于两个则不变

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
    <div class="shortList-body">
      <div class="item" v-for="item, index in posts" :key="index">
        <div class="short-header">
          <div class="short-header-title">{{ item.type }}</div>
          <div class="short-header-time">{{ formatDate(item.date, 'diy', 'MMM D') }}</div>
        </div>
        <div class="short-content">
          {{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shortList {
  position: relative;
  width: 100%;
  height: 100%;
}

.shortList-body {
  display: flex;
  justify-content: space-between; // 项目之间的间距


  .item {
    cursor: pointer;
    width: calc(50% - 1rem);
    height: 12rem;
    padding: 1rem; // 内边距
    border-radius: .75rem; // 圆角
    background: rgba(255, 255, 255, 0.5); // 半透明背景色
    border: 1px solid rgba(255, 255, 255, 0.2); // 轻微的白色边框
    backdrop-filter: blur(10px); // 添加模糊效果
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); // 添加阴影效果

    .short-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: .5rem;
      font-size: .6rem;
    }

    .short-content {
      font-size: .9rem;
      display: -webkit-box; // 使用弹性盒子布局
      -webkit-box-orient: vertical; // 垂直排列
      -webkit-line-clamp: 6; // 限制显示的行数
      overflow: hidden; // 超出部分隐藏
      text-overflow: ellipsis; // 用省略号表示超出部分
    }
  }
}
</style>
