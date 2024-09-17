<script lang="ts" setup>

const parent_tpye = ref<string>('')
const children_tpye = ref<string>('')

const favorites = ref<Favorites[]>([
  {
    parent_type: '个人网站',
    children_type: '科学上网',
    isOpen: false,
    favorites: [
      {
        name: '极速Max',
        url: 'https://jisumax.net/#/knowledge',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADB0lEQVQ4jVWTvW8cVRTFz33vzZvZ2Zm1vfHasb27BBMRQAoVBcFCcghVLMFfgBQQBRUSIhKIlp5/AASGNhVyYyEUgaLQIRCFJT4kW2Szjj/X3pnZ+XrvXYrIxDntPTrF/Z1DeCICwAuvvvmiJP0uEa4z+Nlxq+05qQYgum8lrefff/PLeT+dC0Dv9bXP4Pi2UHpGej5I+zhpz8OyBecTuKqoWIgv053BJ/jjh+wsRQDg3mtrX0vPuyWDJhrt+Vr5DUlK0/7iM6iJmfPUmf2HwiUnwlbl3TRJ38ZPdzIJgLvXbn6qtL7txdNVtHCJdDglvaApWDcwnu+CmpGQyhcinmZ2rkaZX/ak6FR//b5BnWtvXQ6o/lXH7SheWob2mwQvIKU8nm3HdNR/DoOKuShKyCKFzU652vnTmcOHombcUAHMe8LTrcbMnFG6IcnzaWoq4jdeXqZ2q4nT6Q5OaqbN7QMMAEhnoOaX4JIRqWLygWDiVekF7DVCkkqDlObVq8vU70xjbmYKlyKNbqSxttxBGGhmHUIETUF+CGK7qsDoC+UBJIUF6GIrxGwcotkM0VvsQDoHldaYGIV+HNBWNmGlNQnfJ8uYE6AnKAkAEQAwpCDQY9SQdHYngJ9Gr8AYOFMvgK0TgDgcTzBKC4rDCYb7R7BBiN3KIakMHqQFSzBcVTFXJQA6kK3elSsgXlFB7JT2BZOkvXHOs62QjLHYJR8HpcPm9iH20pxkkbJNRo87YetN2ew+P4AztxisVRhBCoG8tvTP8JiHJyn9ZjzcezTmg6SAKjPYSYJ6d4ft6ZFgQR/JdPD3Yav/giZnrjtrauE3hACDnaVRWvK214Cpa5J5QnaSsHn0r7HHe5619rtsY/0LCUCMHyzei5bkS2yqq6bMiKQ07CzBWcoDH6bMYJORrYfbZI/3lKur+2mQvoOtrercR1dVdyX6nJg/lFqH/4/pwkUYZ8FFBlfk1pFYz/LkY/x45/SM3FNaWLn5inJ4n8E3INAbxxcESzF0JH8mkt+mG1/dPT/n/wDZq3pHPMva5QAAAABJRU5ErkJggg=='
      }
    ]
  },
  {
    parent_type: '微信',
    children_type: '',
    isOpen: false,
    favorites: [
      {
        name: '微信公众平台',
        url: 'https://mp.weixin.qq.com/',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACX0lEQVQ4jYVSPWhTURg93733vbyXpjF9Focu6tBBHARdFBVaEeqgOGURKWkIrZvFSXBx6lCwe9OERortkMGC4FbIIjo4KKiIIsWfxdQ2aXx5L+/l5X4OsVrt3zfd+33cc8537gEOLKb9+upgAOJMbv2slHKYGEmGeK/bzafz87QGMO2B3n15ZpzVKb0xLZU5accTAACtgSBoftBhmC0WnWf7yCPOTtTu2FbqQRBsrrNGEYi+EomrMatvJPDrn6KwfWGPFYjT6bcmMY1GUdiJ2lGuVOxfBoBMZrXAEI9jsd4rmt1rYhur6DKzAADbPtRLxP3t0G0qsp4DLIaGVq1S6XiLtX4tpQSTPqK2SdZbSADQtgQpBiSJThQFJpDQlQpao9m1YSHljSDwAJYv1Z99s9/PCcO6pZlbOqzdDt14hxJMDFAowQBTdrwxo6QxGYvZ8LyNh6sfnRUFEGdztVFlmLPxnrj1s1F7Y5rHBFDn33KIhO6k0+8MYOA8CJ99r16qwpmuVCgSmYnqIEmaYUbMbWxOebp9OZ8nr0nKAAACtBA9olw+GbbcxkgnWD9dyPfdf5InDwCU0HLItpOHW359qTDn3AOAdJolxLcOkNAAyIx8AoDFxaO1v4Z3PRNdmQwNllv/US5TJ4mkI4RMAfCYlded3Bf/GQ7KZKqDyjRfSGWmorY/FbFcNiQcDb7bE09d8t3ao8Kcc3PL7B2JAYCxidqYIazZmGUZQcuHlCaUIeE3668Cn68vLDhf9gUAgEyuelFIc4ygTxBEkyBW3IY7t7Q08GP3tO7I/m7n3e7/1i/h6Q/NwOjePQAAAABJRU5ErkJggg=='
      }
    ]
  }
])

const favorites_tree = computed(() => {
  const structure: any = [];

  favorites.value.forEach(item => {

    const parent = structure.find((p: any) => p.parent_type === item.parent_type);

    if (parent) {
      if (item.children_type === '') return;
      parent.children.push({
        children_type: item.children_type,
      });
    } else {

      if (item.children_type === '') {
        structure.push({
          parent_type: item.parent_type,
          isOpen: item.isOpen,
          children: []
        });
      } else {
        structure.push({
          parent_type: item.parent_type,
          isOpen: item.isOpen,
          children: [{
            children_type: item.children_type,
          }]
        });
      }
    }
  });

  return structure;
});

const toggle = (item: any) => {
  const favoriteItem = favorites.value.find(f => f.parent_type === item.parent_type);
  if (favoriteItem) {
    favoriteItem.isOpen = !favoriteItem.isOpen; // 切换 isOpen 属性
  }
};


const openLink = (url: string) => {
  window.open(url, '_blank'); // 在新标签页中打开链接
};


</script>

<template>
  <div class="favorites">
    <div class="favorites-search"></div>

    <div class="favorites-sidebar">
      <ul class="favorites-sidebar-item" v-for="(item, index) in favorites_tree" :key="index">
        <div class="favorites-sidebar-item-parent" @click="toggle(item)">
          <p>
            {{ item.parent_type }}
          </p>
          <UIcon class="project-item-header-route icon" :class="{ 'open': item.isOpen }" name="i-mingcute-down-fill" />
        </div>
        <transition name="fade">
          <div v-if="item.children.length > 0 && item.isOpen">
            <li class="favorites-sidebar-item-child" v-for="(child, index2) in item.children" :key="index2">
              {{ child.children_type }}
            </li>
          </div>
        </transition>
      </ul>
    </div>
    <div class="favorites-main">

    </div>
    Favorites
  </div>
</template>

<style lang="scss" scoped>
.favorites {
  height: 100vh;

  &-search {}

  &-sidebar {
    margin-top: 5rem;
    position: fixed;
    width: 12.5rem;
    max-height: 80vh;
    padding: .5rem .75rem; // 内边距
    border-radius: .75rem; // 圆角
    background: rgba(255, 255, 255, 0.5); // 半透明背景色
    border: 1px solid rgba(255, 255, 255, 0.2); // 轻微的白色边框
    backdrop-filter: blur(10px); // 添加模糊效果
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); // 添加阴影效果

    display: flex;
    flex-direction: column;
    transition: all .25s;

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
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        display: flex;
        justify-content: start;
        align-items: center;
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
}
</style>
