<script lang="ts" setup>
import favoritesJsonData from '@/assets/data/favorites.json'

const router = useRouter();

const selected_parent_type = ref<string>('')
const selected_children_type = ref<string>('')

const favorites = ref<Favorites[]>(favoritesJsonData['favorites'])

const favoriteItems = computed(() => {
  const parent = favorites.value.find(f => f.parent_type === selected_parent_type.value);
  if (parent) {
    return parent.children.find(c => c.children_type === selected_children_type.value)?.favorites || [];
  }
  return [];
});

const toggle = (item: Favorites) => {
  const favoriteItem = favorites.value.find(f => f.parent_type === item.parent_type);
  if (favoriteItem) {
    favoriteItem.isOpen = !favoriteItem.isOpen; // 切换 isOpen 属性

    // 关掉上一个
    const prevFavoriteParent = favorites.value.find(f => f.parent_type === selected_parent_type.value && f.parent_type !== item.parent_type);
    if (prevFavoriteParent) {
      prevFavoriteParent.isOpen = false;
    }

    if (favoriteItem.isOpen) {
      selected_parent_type.value = item.parent_type;
      selected_children_type.value = item.children[0].children_type;
    }
  }
};

const select = (item: Favorites, child: Children) => {
  selected_parent_type.value = item.parent_type;
  selected_children_type.value = child.children_type;
}


const openLink = (url: string) => {
  window.open(url, '_blank'); // 在新标签页中打开链接
};

onMounted(() => {
  if (favorites.value.length > 0) {
    selected_parent_type.value = favorites.value[0].parent_type; // 选择第一个父类型
    if (favorites.value[0].children.length > 0) {
      favorites.value[0].isOpen = true; // 展开第一个父类型
      selected_children_type.value = favorites.value[0].children[0].children_type; // 选择第一个子类型
    }
  }
})


</script>

<template>
  <div class="favorites">
    <div class="favorites-search"></div>

    <div class="favorites-sidebar">
      <ul class="favorites-sidebar-item" v-for="(item, index) in favorites" :key="index">
        <div v-if="item.children.length > 0" class="favorites-sidebar-item-parent" @click="toggle(item)">
          <p>
            {{ item.parent_type }}
          </p>
          <UIcon class="project-item-header-route icon" :class="{ 'open': item.isOpen }" name="i-mingcute-down-fill" />
        </div>
        <div v-else class="favorites-sidebar-item-parent">
          <p>
            {{ item.parent_type }}
          </p>
        </div>
        <transition name="fade">
          <div v-if="item.children.length > 0 && item.isOpen">
            <li
              :class="{ 'active': item.parent_type === selected_parent_type && child.children_type === selected_children_type }"
              class="favorites-sidebar-item-child" v-for="(child, index2) in item.children" :key="index2"
              @click="select(item, child)">
              {{ child.children_type }}
            </li>
          </div>
        </transition>
      </ul>
    </div>
    <Transition name="fade">
      <div class="favorites-main">
        <div class="favorites-main-item" v-for="item, index in favoriteItems" :key="index" @click="openLink(item.url)">
          <div class="favorites-main-item-main">
            <div class="favorites-main-item-main-icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="favorites-main-item-main-name">
              {{ item.name }}
            </div>
            <div class="favorites-main-item-main-desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.favorites {
  height: 100vh;

  &-search {}

  &-sidebar {
    margin-top: 4rem;
    position: fixed;
    width: 12.5rem;
    height: calc(100vh - 6rem);
    padding: .5rem .75rem; // 内边距
    border-radius: .75rem; // 圆角
    background: rgba(255, 255, 255, 0.5); // 半透明背景色
    border: 1px solid rgba(255, 255, 255, 0.2); // 轻微的白色边框
    backdrop-filter: blur(10px); // 添加模糊效果
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); // 添加阴影效果

    display: flex;
    flex-direction: column;
    transition: all .25s;

    overflow-y: auto;
    scrollbar-width: none;
    /* Firefox 隐藏滚动条 */

    &::-webkit-scrollbar {
      display: none;
      /* Chrome 和 Safari 隐藏滚动条 */
    }

    &-item {
      margin: .25rem 0;
      transition: all .25s;

      &-parent {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: .25rem 0;
        cursor: pointer;
        padding: .5rem .75rem;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: .5rem; // 圆角

        p {
          font-size: .8rem;
        }

        span {
          font-size: 1rem;
          transform: rotate(180deg);
          transition: transform 0.3s ease;
          /* 添加过渡效果 */
        }

        span.open {
          transform: rotate(0deg);
        }

      }

      &-child {
        font-size: .75rem;
        padding: .5rem .75rem;
        border-radius: .5rem; // 圆角
        margin: .25rem 0 .25rem .5rem;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        display: flex;
        justify-content: start;
        align-items: center;
        transition: all .2s ease-in-out;
      }

      &-child.active {
        color: white;
        background-color: #333333;
      }

      &-child::before {
        display: inline-block;
        content: "";
        width: .5rem;
        height: .5rem;
        margin-right: .5rem;
        border-radius: 50%;
        background-color: grey;
      }
    }

    &-item:first-child {
      margin: 0 0 0;
    }

    &-item:last-child {
      margin: 0 0 0;
    }

  }

  & &-main {
    position: absolute;
    top: 4rem;
    left: 16rem;
    display: flex;
    flex-wrap: wrap;

    &-item {
      cursor: pointer;
      width: 16rem;
      height: 12rem;
      padding: 1rem 1.25rem; // 内边距
      margin: .5rem;
      border-radius: .75rem; // 圆角
      background: rgba(255, 255, 255, 0.25); // 半透明背景色
      border: 1px solid rgba(255, 255, 255, 0.2); // 轻微的白色边框
      backdrop-filter: blur(10px); // 添加模糊效果
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); // 添加阴影效果

      &-main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &-icon {
          margin-bottom: .5rem;

          img {
            width: 2rem;
            height: 2rem;
          }
        }

        &-name {
          margin-bottom: .5rem;
          font-size: .9rem;
        }

        &-desc {
          font-size: .8rem;
          color: #555555
        }
      }

    }

    &-item:hover {
      background: rgba(255, 255, 255);
      border: 1px solid rgba(0, 0, 0, .1);
    }
  }
}
</style>
