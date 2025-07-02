<script lang="ts" setup>
import { formatDate } from '@/utils/date';
import type { ParsedContent } from '@nuxt/content';

const router = useRouter();

const props = defineProps<{
  data: ParsedContent
}>()



</script>
<template>
  <div class="article" @click="router.push(props.data._path as string)">
    <div class="article-title">
      <span>
        {{ props.data.title }}
      </span>
    </div>
    <div class="article-desc">
      {{ props.data.desc }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.article {

  display: flex;
  flex-direction: column;
  cursor: pointer;
  min-width: 24rem;
  width: 100%;
  height: 100%;
  padding: 1rem; // 内边距
  flex: 1;
  flex-grow: 1;
  font-size: var(--typography-font-size-body1);
  box-shadow: var(--shadow-s);
  border: 1px solid var(--color-natural-Ink20);
  border-radius: var(--shape-border-radius-rounded-rectangle-l);
  padding: 1.5rem 2rem;
  transition: all .3s ease;

  &-title {
    font-size: var(--typography-font-size-headline5);
    margin-bottom: 1rem;

    span {
      position: relative; // 确保伪元素相对于标题定位
      width: auto; // 确保标题宽度不被影响
    }
  }

  &-desc {
    font-size: var(--typography-font-size-body3);
    display: -webkit-box; // 使用弹性盒子布局
    -webkit-box-orient: vertical; // 垂直排列
    -webkit-line-clamp: 3; // 限制显示的行数
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 用省略号表示超出部分
    color: rgb(70, 70, 70);
  }


  &:hover {
    background-color: var(--background-color-hover);
  }

  .article-title span::after {
    position: absolute; // 绝对定位
    display: block;
    content: "";
    width: 2rem;
    height: .3rem;
    border-radius: .5rem;
    background-color: var(--article-title-undeline-color);
    transition: all .3s ease-in-out;
  }

  &:hover .article-title span::after {
    width: 100%;
    background-color: var(--article-title-undeline-color-hover);
  }
}
</style>
