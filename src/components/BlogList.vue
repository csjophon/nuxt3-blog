<script lang="ts" setup>
import { formatDate } from '@/utils/date';

const router = useRouter();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const extractChildRoutes = async (items: any) => {
  let posts: any = [];

  for (let item of items) {
    if (!item.children) {
      if (!(item.top || item.favorites || item.short)) {
        posts.push(item);
      }
    } else {
      const childRoutes = await extractChildRoutes(item.children);
      posts = [...posts, ...childRoutes.posts];
    }
  }

  // 按照 date 字段倒序排列 posts 数组
  posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
}

const list = await extractChildRoutes(navigation.value!);

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

const isSameDate = (a: any, b?: any) => {
  return a && b && getDate(a.date) === getDate(b.date)
}



</script>
<template>
  <div class="blogList">
    <div v-for="item, index in list.posts" :key="index" class="slide-enter blogList-item">
      <div class="blogList-item-header">
        <div class="blogList-item-header-left">
          <div class="blogList-item-header-left-type">
            {{ item.type }}
          </div>
          <div class="blogList-item-header-left-date" ws-nowrap
            v-if="(!isSameGroup(item, list.posts[index - 1]) || item.date && !isSameDate(item, list.posts[index - 1]))">
            {{ formatDate(item.date, 'diy', 'MMM D, YYYY') }}
          </div>
          <div v-else class="date placeholder"></div>
        </div>
        <div class="blog-item-header-right">
          <UIcon class="project-item-header-route icon" name="i-icon-park-outline-double-right" dynamic />
        </div>
      </div>

      <div class="blogList-item-info" @click="router.push(item._path)">
        <div class="blogList-item-info-title">
          <span>
            {{ item.title }}
          </span>
        </div>
        <div class="blogList-item-info-desc">
          {{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.blogList {

  display: flex;
  flex-wrap: wrap; // 允许换行
  justify-content: space-between; // 项目之间的间距

  &-item {
    min-width: 24rem;
    cursor: pointer;
    width: calc(50% - 1rem);
    height: 12rem;
    padding: 1rem; // 内边距
    margin-bottom: 1rem;
    border-radius: .75rem; // 圆角
    background: rgba(255, 255, 255, 0.5); // 半透明背景色
    border: 1px solid rgba(255, 255, 255, 0.2); // 轻微的白色边框
    backdrop-filter: blur(10px); // 添加模糊效果
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); // 添加阴影效果
    transition: all .3s ease;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: .5rem;
      font-size: .6rem;

      .icon {
        font-size: 1rem;
      }

      &-left {
        display: flex;

        &-date {
          margin-left: .5rem;
        }
      }
    }

    &-info {
      display: flex;
      flex-direction: column;

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
    }
  }

  &-item:hover {
    background: rgba(255, 255, 255, 1); // 半透明背景色
  }

  .blogList-item-info-title span::after {
    position: absolute; // 绝对定位
    display: block;
    content: "";
    width: 1rem;
    height: .25rem;
    border-radius: .5rem;
    background-color: var(--jory-color);
    transition: all .3s ease-in-out;
  }

  &-item:hover .blogList-item-info-title span::after {
    width: 100%;
    background-color: rgb(182, 182, 182);
  }
}
</style>
