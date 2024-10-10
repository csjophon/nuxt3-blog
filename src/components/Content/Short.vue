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
  <div class="short" @click="router.push(props.data._path as string)">
    <div class="short-info">
      <div class="short-info-type">
        {{ props.data.type }}
      </div>
      <div class="short-info-date">
        {{ formatDate(props.data.date, 'diy', 'MMM D, YYYY') }}
      </div>
    </div>

    <div class="short-content">
      {{ content }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.short {
  min-width: 24rem;
  cursor: pointer;
  width: 100%;
  height: 12rem;
  padding: 1rem; // 内边距
  margin-bottom: 1rem;
  border-radius: .75rem; // 圆角
  background: rgba(255, 255, 255, 0.5); // 半透明背景色
  border: 1px solid rgba(255, 255, 255, 0.2); // 轻微的白色边框
  backdrop-filter: blur(10px); // 添加模糊效果
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); // 添加阴影效果
  transition: all .3s ease;

  display: flex;
  flex-direction: column;

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
    font-size: .9rem;
    display: -webkit-box; // 使用弹性盒子布局
    -webkit-box-orient: vertical; // 垂直排列
    -webkit-line-clamp: 3; // 限制显示的行数
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 用省略号表示超出部分
  }

  &:hover {
    background: rgba(255, 255, 255, 1); // 半透明背景色
  }

}
</style>
