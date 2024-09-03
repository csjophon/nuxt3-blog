<script lang="ts" setup>

import { formatDate } from '@/utils/date';

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

})

</script>
<template>
  <div class="short">
    <div class="title">
      日常唠叨
    </div>
    <div class="short-boby">
      <div class="short-body-list" v-for="item, index in posts" :key="index">
        <div class="item">
          <div class="short-desc">
            {{ item.desc }}
          </div>
          <div class="time">
            - {{ formatDate(item.date, 'diy', 'MMM D') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.short {
  .title {
    color: var(--jory-color);
    font-size: 2.5rem;
    font-weight: bold;
    opacity: .25;
    padding: 1rem;
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
    position: relative;
    z-index: 1000;
    min-width: 375px;
    // background-color: var(--jory-bg);
    color: var(--jory-color);
    padding: 1rem 1.5rem;
    border-radius: .5rem;
    font-size: 15px;
    // box-shadow: var(--jory-short-shadow);
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
