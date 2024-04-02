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


onMounted(() => {
  const history = document.querySelector('.history') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${history.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})

</script>
<template>
  <main>
    <div class="history relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
      <div class="history-body w-full flex-grow-1 p-16">
        <div class="title">
          归档
        </div>
        <div class="history-body-list">
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
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="underline mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar">
        <SideBar></SideBar>
      </div>
      <div class="copyright">
        <span select-none>© Jory 2024</span>
        <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-1</a>
      </div>
    </div>
  </main>
</template>
<style lang="scss">
.history {
  background-color: var(--jory-body-bg);
  max-width: 960px;
  min-width: 375px;
  box-shadow: var(--jory-body-shadow);
  box-sizing: content-box;

  .title {
    color: var(--jory-color);
    font-size: 2.5rem;
    font-weight: 600;

  }

  &-body-list {
    .year {

      color: grey;
    }


    .card {
      border-radius: .5rem;
      transition: all .3s;
    }

    .underline {
      width: 1rem;
      height: 4px;
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

.copyright {
  z-index: 1000;
  width: 100%;
  bottom: 0;
  color: var(--jory-color);
  font-size: 13px;
  text-align: center;

  span {
    margin-right: .5rem;
  }
}


.sidebar {
  position: fixed;
  z-index: 1000;
  margin-left: 1rem;
  height: 100vh;
  padding: 2rem 0;
}
</style>
