<script lang="ts" setup>
import { formatDate } from '@/utils/date';

const router = useRouter();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const getContentInfo = async (path: string) => {
  const { data: info } = await useAsyncData('info', () => queryContent(path).findOne());
  return info.value!;
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

  return posts;
}

const posts = await extractChildRoutes(navigation.value!);

console.log(posts)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
const isSameGroup = (a: any, b?: any) => {
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

const getGroupName = (p: any) => {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}


</script>
<template>
  <div class="content-list">
    <div v-for="item, index in posts" :key="index">

      <div v-if="!isSameGroup(item, posts[index - 1])" select-none relative h20 pointer-events-none slide-enter :style="{
      '--enter-stage': index - 2,
      '--enter-step': '60ms',
    }">
        <span class="year" text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2 op10>
          {{ getGroupName(item) }}
        </span>
      </div>

      <div class="card slide-enter flex mb-8">

        <div class="date" ws-nowrap v-if="item.date && !isSameGroup(item, posts[index - 1])">
          {{ formatDate(item.date, 'diy', 'MMM D') }}
        </div>
        <div v-else class="date placeholder"></div>

        <div class="content-list-boby cursor-pointer" @click="router.push(item.path)">
          <div class="title mb-2">
            {{ item.title }}
          </div>
          <div class="excerpt">
            {{ item.excerpt }}
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
<style lang="scss">
.year {
  color: grey;
}

.date {
  line-height: 3rem;
  min-width: 5rem;
  font-size: 1.25rem;
}

.title {
  color: #353535;
  display: block;
  font-size: 2rem;
  font-weight: 700;
  line-height: 3rem;
}
</style>
