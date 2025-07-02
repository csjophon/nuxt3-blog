<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content';

const list = ref<ParsedContent[]>();

const contentQuery = queryContent()
  .where({ type: { $not: 'version' } })
  .limit(10)
  .find()

contentQuery.then((res) => {
  list.value = res;
  list.value.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // console.log(list.value)
})

</script>
<template>
  <div class="content-list">
    <div v-for="item, index in list" :key="index" class="content-list-item">
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
  flex-direction: column;
  gap: 1rem;
}
</style>
