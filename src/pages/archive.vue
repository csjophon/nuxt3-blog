<script lang="ts" setup>

import { formatDate } from '@/utils/date';

import type { ParsedContent } from '@nuxt/content';

const router = useRouter();

const posts = ref<ParsedContent[]>();

const contentQuery = queryContent()
  .where({ type: { $not: 'version' } })
  .limit(10)
  .find()

contentQuery.then((res) => {
  posts.value = res;
  posts.value.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
})

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

})

</script>
<template>
  <div class="archive relative">
    <div class="archive-body">

      <div class="archive-body-list">
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

            <div class="date" ws-nowrap v-if="!isSameGroup(item, posts[index - 1]) || item.date">
              {{ formatDate(item.date, 'diy', 'MMM D') }}
            </div>
            <div v-else class="date placeholder"></div>

            <div class="card cursor-pointer px-2" @click="router.push(item._path as string)">
              <div class="card-title" v-if="item.type !== 'short'">
                {{ item.title }}
              </div>
              <div class="card-title short" v-else>
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss" scoped>
.archive {

  padding-top: 5rem;
  width: 100%;

  .title {
    font-size: 2.5rem;
    font-weight: bold;
    opacity: .25;
    padding: 1rem;
  }

  &-body-list {
    width: 100%;

    .year {
      color: grey;
    }

    .card {
      max-width: 100%;
      border-radius: .5rem;
      transition: all .3s;

      .short {
        width: 100%;
        overflow: hidden; // 隐藏超出部分
        white-space: nowrap; // 不换行
        text-overflow: ellipsis; // 使用省略号表示超出部分
      }
    }

    .card-title::after {
      display: block;
      content: " ";
      width: 1rem;
      height: .15rem;
      border-radius: .5rem;
      background-color: var(--article-title-undeline-color);
      transition: all .3s;
    }

    .card:hover .card-title::after {
      width: 100%;
      background-color: var(--article-title-undeline-color-hover);
    }

    .card-title {
      font-size: 1rem;
      line-height: 2rem;
    }

    .date {
      line-height: 2rem;
      min-width: 4rem;
      font-size: .75rem;
    } 
  }
}
</style>
