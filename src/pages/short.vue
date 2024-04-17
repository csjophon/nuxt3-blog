<script lang="ts" setup>

import { formatDate } from '@/utils/date';

import links from '@/assets/links'

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

  return posts;
}

const posts = await extractChildRoutes(navigation.value!);


const getDate = (a: Date | string | number) => new Date(a).getDate()
const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
const isSameGroup = (a: any, b?: any) => {
  return isSameYear(a.date, b?.date)
}

const getYearGroupName = (p: any) => {
  return getYear(p.date)
}

const isSameDate = (a: any, b?: any) => a && b && getDate(a.date) === getDate(b?.date)

onMounted(async () => {
  await nextTick();

  const short = document.querySelector('.short') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${short.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})

const openInNewTab = (link: string) => {
  window.open(link, '_blank');
}


</script>
<template>
  <div class="short relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
    <div class="short-boby w-full flex-grow-1 p-16">
      <div class="title">
        日常唠叨
      </div>
      <div class="short-body-list" v-for="item, index in posts" :key="index">
        <div class="item">
          <div class="desc">
            {{ item.desc }}
          </div>
          <div class="time">
            - {{ formatDate(item.date, 'diy', 'MMM D') }}
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <SideBar></SideBar>
    </div>
    <div class="footer">
      <div class="links">
        <button v-for="i, idx in links " :key="idx" :class="[idx, 'button']" @click="openInNewTab(i.link)">
          <UIcon class="icon" :name="i.icon" dynamic />
        </button>
      </div>
      <div class="copyright">
        <span select-none>© Jory 2024</span>
        <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-1</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.short {
  .title {
    color: var(--jory-color);
    font-size: 2.5rem;
    font-weight: 600;
  }

  &-body-list {

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
</style>
