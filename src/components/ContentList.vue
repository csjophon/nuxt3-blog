<script lang="ts" setup>
import { formatDate } from '@/utils/date';

const router = useRouter();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const extractChildRoutes = async (items: any) => {
  let posts: any = [];

  for (let item of items) {
    if (!item.children) {
      if (!item.top || !item.favorites || !item.short) {
        posts.push(item);
      }
    } else {
      const childRoutes = await extractChildRoutes(item.children);
      posts = [...posts, ...childRoutes.posts];
    }
  }

  // 按照 date 字段倒序排列 posts 数组
  posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
}

const list = await extractChildRoutes(navigation.value!);

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
    <div v-for="item, index in list.posts" :key="index">
      <div v-if="!isSameGroup(item, list.posts[index - 1])" select-none relative h20 pointer-events-none slide-enter
        :style="{
          '--enter-stage': index - 2,
          '--enter-step': '60ms',
        }">
        <span class="year" text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2 op10>
          {{ getYearGroupName(item) }}
        </span>
      </div>

      <div class="w-full slide-enter flex mb-8">
        <div class="date" ws-nowrap
          v-if="(!isSameGroup(item, list.posts[index - 1]) || item.date && !isSameDate(item, list.posts[index - 1]))">
          {{ formatDate(item.date, 'diy', 'MMM D') }}
        </div>
        <div v-else class="date placeholder"></div>

        <div class="card cursor-pointer px-2 pb-2" @click="router.push(item._path)">
          <div class="title">
            {{ item.title }}
          </div>
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
  margin-top: 2rem;

  .top-title,
  .year {
    color: grey;
  }

  .top-title {
    width: 15rem;
    display: flex;
    flex-direction: column;
    text-align-last: justify;
    text-align: justify;

    div {
      width: 100%;
    }
  }


  .card {
    border-radius: .5rem;
    transition: all .3s;
    display: inline-block;
  }

  .card:hover {
    background-color: var(--jory-card-hover-bg);

  }

  .title::after {
    display: block;
    content: " ";
    width: 1rem;
    height: .5rem;
    border-radius: .5rem;
    background-color: var(--jory-color);
    transition: all .3s;
  }

  .card:hover .title::after {
    width: 100%;
    background-color: rgb(22, 192, 22);
  }

  .title,
  .top-card-title {
    color: var(--jory-color);
    display: inline-block;
    font-size: 2rem;
    font-weight: 700;
    line-height: 3rem;
  }

  .top-card-title {
    transition: all .3s;
    opacity: 60%;
  }

  .top-card-title:hover {
    opacity: 100%;
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
