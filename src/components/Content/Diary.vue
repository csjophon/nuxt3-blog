<script lang="ts" setup>
import { formatDate } from '@/utils/date';
import type { ParsedContent } from '@nuxt/content';

const router = useRouter();

const props = defineProps<{
  data: ParsedContent
}>()



</script>
<template>
  <div class="diary" @click="router.push(props.data._path as string)">
    <div class="diary-title">
      <span>
        {{ props.data.title }}
      </span>
    </div>
    <div class="diary-desc">
      {{ props.data.desc }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.diary {

  display: flex;
  cursor: pointer;
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

    &-type {
      text-transform: capitalize;
      margin-right: .5rem;
    }
  }

  &-title {
    font-size: 1.25rem;
    margin-bottom: .5rem;

    span {
      position: relative; // 确保伪元素相对于标题定位
      width: auto; // 确保标题宽度不被影响
    }
  }

  &-desc {
    font-size: .9rem;
    display: -webkit-box; // 使用弹性盒子布局
    -webkit-box-orient: vertical; // 垂直排列
    -webkit-line-clamp: 3; // 限制显示的行数
    overflow: hidden; // 超出部分隐藏
    text-overflow: ellipsis; // 用省略号表示超出部分
    color: rgb(70, 70, 70);
  }


  &:hover {
    background: rgba(255, 255, 255, 1); // 半透明背景色
  }

  .diary-title span::after {
    position: absolute; // 绝对定位
    display: block;
    content: "";
    width: 1rem;
    height: .25rem;
    border-radius: .5rem;
    background-color: rgb(182, 182, 182);
    transition: all .3s ease-in-out;
  }

  &:hover .diary-title span::after {
    width: 100%;
    background-color: var(--jory-color);
  }
}
</style>
