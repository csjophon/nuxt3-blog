<script lang="ts" setup>
import { formatDate } from '@/utils/date';

const router = useRouter();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const extractChildRoutes = async (items: any) => {
  let posts: any = [];

  for (let item of items) {
    if (!item.children) {
      posts.push(item);
    } else {
      const childRoutes = await extractChildRoutes(item.children);
      posts = [...posts, ...childRoutes];
    }
  }

  // 按照 date 字段倒序排列 posts 数组
  // posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  posts.sort((a: any, b: any) => {
    // 先判断是否都有 top 属性且都为 true，此时直接比较日期
    if (a.top && b.top) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    // 接下来处理至少有一个 post 的 top 为 false 或 undefined 的情况

    // 如果只有 a.top 为 true，b.top 不为 true，则 a 应排在 b 前面
    if (a.top && !b.top) {
      return -1;
    }

    // 如果只有 b.top 为 true，a.top 不为 true，则 b 应排在 a 前面
    if (!a.top && b.top) {
      return 1;
    }

    // 如果 a 和 b 都没有 top 属性或都为 false，则按照日期倒序排序
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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

const isSameDate = (a: any, b?: any) => {
  return a && b && getDate(a.date) === getDate(b.date)
}



</script>
<template>
  <div class="content-list">
    <div class="w-full" v-for="item, index in posts" :key="index">
      <div v-if="!item.top && !isSameGroup(item, posts[index - 1])" select-none relative h20 pointer-events-none
        slide-enter :style="{
      '--enter-stage': index - 2,
      '--enter-step': '60ms',
    }">
        <span class="year" text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2 op10>
          {{ getYearGroupName(item) }}
        </span>
      </div>

      <div select-none relative h20 pointer-events-none v-else-if="item.top">
        <span class="year" text-4em color-transparent absolute text-stroke-2 op-25>
          置顶
        </span>
      </div>

      <div class="w-full slide-enter flex mb-8">
        <div class="date" ws-nowrap
          v-if="!item.top && (!isSameGroup(item, posts[index - 1]) || item.date && !isSameDate(item, posts[index - 1]))">
          {{ formatDate(item.date, 'diy', 'MMM D') }}
        </div>
        <div v-else class="date placeholder"></div>

        <div class="card w-full cursor-pointer px-2 pb-2" @click="router.push(item._path)">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="underline mb-2"></div>
          <div class="excerpt">
            {{ item.desc }}
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
<style lang="scss">
.content-list {
  .year {
    color: grey;
  }


  .card {
    border-radius: .5rem;
    transition: all .3s;
  }

  .card:hover {
    background-color: var(--jory-card-hover-bg);

  }

  .underline {
    width: 1rem;
    height: .5rem;
    border-radius: .5rem;
    background-color: var(--jory-color);
    transition: all .3s;
  }

  .card:hover .underline {
    width: 2.5rem;
    background-color: rgb(22, 192, 22);
  }

  .title {
    color: var(--jory-color);
    display: block;
    font-size: 2rem;
    font-weight: 700;
    line-height: 3rem;

  }

  .excerpt {
    color: var(--jory-color);
  }

  .date {
    line-height: 3rem;
    min-width: 5rem;
    font-size: 1.25rem;
    color: var(--jory-color);
  }



}
</style>
