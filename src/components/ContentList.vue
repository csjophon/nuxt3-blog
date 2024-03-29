<script lang="ts" setup>
import { formatDate } from '@/utils/date';

const router = useRouter();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

// 将异步获取的内容信息包装成 Promise 对象
const contentInfoPromiseMap = new Map<string, any>();

const getContentInfo = async (path: string) => {
  if (!contentInfoPromiseMap.has(path)) {
    const { data: info } = await useAsyncData('info' + path, () => queryContent(path).findOne());
    // 使用 onMounted 或 onServerPrefetch 生命周期钩子等待数据加载完成
    contentInfoPromiseMap.set(path, info.value);
  }
  // 获取并返回已经加载过的数据
  return contentInfoPromiseMap.get(path);
}

const extractChildRoutes = async (items: any) => {
  let posts: any = [];

  for (let item of items) {
    if (!item.children) {
      const info = await getContentInfo(item._path);
      const excerpt = info.excerpt?.children[0].children ? info.excerpt?.children[0].children[0].value : ''
      posts.push({
        title: info.title,
        path: info._path,
        excerpt: excerpt,
        date: info.date,
        type: info.type
      });
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
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

const getYearGroupName = (p: any) => {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}

const isSameDate = (a?: Date | string | number, b?: Date | string | number) => a && b && getDate(a) === getDate(b)


</script>
<template>
  <div class="content-list">
    <div class="w-full" v-for="item, index in posts" :key="index">

      <div v-if="!isSameGroup(item, posts[index - 1])" select-none relative h20 pointer-events-none slide-enter :style="{
      '--enter-stage': index - 2,
      '--enter-step': '60ms',
    }">
        <span class="year" text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2 op10>
          {{ getYearGroupName(item) }}
        </span>
      </div>

      <div class="w-full slide-enter flex mb-8">

        <div class="date" ws-nowrap v-if="item.date && !isSameDate(item, posts[index - 1])">
          {{ formatDate(item.date, 'diy', 'MMM D') }}
        </div>
        <div v-else class="date placeholder"></div>

        <div class="card w-full cursor-pointer px-2 pb-2" @click="router.push(item.path)">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="underline mb-2"></div>
          <div class="excerpt">
            {{ item.excerpt }}
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
    background-color: #EEEEEE;

  }

  .underline {
    width: 1rem;
    height: .5rem;
    border-radius: .5rem;
    background-color: rgb(64, 64, 64);
    transition: all .3s;
  }

  .card:hover .underline {
    width: 2.5rem;
    background-color: rgb(22, 192, 22);
  }

  .title {
    color: #353535;
    display: block;
    font-size: 2rem;
    font-weight: 700;
    line-height: 3rem;
  }

  .date {
    line-height: 3rem;
    min-width: 5rem;
    font-size: 1.25rem;
  }



}
</style>
