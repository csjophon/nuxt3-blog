<script lang="ts" setup>

import { formatDate } from '@/utils/date';

const router = useRouter();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const extractChildRoutes = async (items: any) => {
  let posts: any = [];

  for (let item of items) {
    if (!item.children) {
      if (item.favorites) {
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

  const favorites = document.querySelector('.favorites') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${favorites.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})


</script>
<template>
  <div class="favorites">
    <div class="title">
      偶滴收藏
    </div>
    <div class="favorites-boby w-full flex-grow-1 px-16 py-8">
      <div class="favorites-body-list">
        <div class="w-full" v-for="item, index in posts" :key="index">

          <div v-if="!isSameGroup(item, posts[index - 1])" select-none relative h20 pointer-events-none slide-enter
            :style="{
              '--enter-stage': index - 2,
              '--enter-step': '60ms',
            }">
            <span class="year" text-4em color-transparent absolute font-bold text-stroke-2 op10>
              {{ getYearGroupName(item) }}
            </span>
          </div>

          <div class="w-full slide-enter flex mb-2">

            <div class="date" ws-nowrap
              v-if="!isSameGroup(item, posts[index - 1]) || item.date && !isSameDate(item, posts[index - 1])">
              {{ formatDate(item.date, 'diy', 'MMM D') }}
            </div>
            <div v-else class="date placeholder"></div>

            <div class="card cursor-pointer px-2" @click="router.push(item._path)">
              <div class="card-title">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss">
.favorites {
  .title {
    color: var(--jory-color);
    font-size: 5rem;
    font-weight: bold;
    border-bottom: .25rem dashed var(--jory-color);
    opacity: .10;
    padding: 1rem;
  }

  &-body-list {
    .year {

      color: grey;
    }


    .card {
      border-radius: .5rem;
      transition: all .3s;
    }

    .card-title::after {
      display: block;
      content: " ";
      width: 1rem;
      height: .25rem;
      border-radius: .5rem;
      background-color: var(--jory-color);
      transition: all .3s;
    }

    .card:hover .card-title::after {
      width: 100%;
      background-color: rgb(22, 192, 22);
    }

    .card-title {
      color: var(--jory-color);
      font-size: 1rem;
      font-weight: 600;
      line-height: 2rem;
    }

    .date {
      line-height: 2rem;
      min-width: 4rem;
      font-size: 1rem;
      color: var(--jory-color);
    }

  }
}
</style>
