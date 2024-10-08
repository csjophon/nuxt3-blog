<script lang="ts" setup>
import { formatDate } from '@/utils/date';

const router = useRouter();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const extractChildRoutes = async (items: any) => {
  let posts: any = [];

  for (let item of items) {
    if (!item.children) {
      if (!(item.top || item.favorites)) {
        posts.push(item);
      }
    } else {
      const childRoutes = await extractChildRoutes(item.children);
      posts = [...posts, ...childRoutes.posts];
    }
  }

  // 按照 date 字段倒序排列 posts 数组
  posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  posts.length = Math.min(posts.length, 10); // 保留前两个元素，若原本少于两个则不变

  return { posts };
}

const list = await extractChildRoutes(navigation.value!);

</script>
<template>
  <div class="content-list">
    <div v-for="item, index in list.posts" :key="index" class="content-list-item">
      <div class="content-list-item-article" v-if="item.type === 'article'">
        <ContentArticle :data="item"></ContentArticle>
      </div>
      <div class="content-list-item-diary" v-else-if="item.type === 'diary'">
        <ContentDiary :data="item"></ContentDiary>
      </div>
      <div class="content-list-item-short" v-else-if="item.type === 'short'">
        <ContentShort :data="item"></ContentShort>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.content-list {

  display: flex;
  flex-wrap: wrap; // 允许换行
  justify-content: space-between; // 项目之间的间距

  &-item {
    width: calc(50% - 1rem);

  }


}
</style>
