<script lang="ts" setup>
import { formatDate } from '@/utils/date';
import type { ParsedContent } from '@nuxt/content';

const props = defineProps<{
  data: ParsedContent
}>()

const contentQuery = queryContent(props.data._path as string).findOne();

const content = ref<string>();

const router = useRouter();

onBeforeMount(() => {
  contentQuery.then((res) => {
    content.value = res.description
  })
})


</script>
<template>
  <div class="short">
    <div class="short-content">
      {{ content }}
      <span class="short-info-date">
        - {{ formatDate(props.data.date, 'diy', 'MMM D, YYYY') }}
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.short {
  display: flex;
  min-width: 24rem;
  width: 100%;
  height: 100%;
  padding: 1rem; // 内边距
  flex: 1;
  flex-grow: 1;
  font-size: var(--typography-font-size-body1);
  border: var(--border-m);
  border-radius: var(--shape-border-radius-rounded-rectangle-l);
  padding: 1.5rem 2rem;
  transition: all .3s ease;



  &-info {
    display: flex;
    font-size: .8rem;
    color: rgb(70, 70, 70);
    margin-bottom: .5rem;

    &-type {
      text-transform: capitalize;
      margin-right: .5rem;
    }
  }


  &-content {
    font-size: var(--typography-font-size-body2);
    display: -webkit-box; // 使用弹性盒子布局
    -webkit-box-orient: vertical; // 垂直排列
    // -webkit-line-clamp: 3; // 限制显示的行数
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 用省略号表示超出部分
  }

  &:hover {
    background: rgba(255, 255, 255, 1); // 半透明背景色
  }

}
</style>
