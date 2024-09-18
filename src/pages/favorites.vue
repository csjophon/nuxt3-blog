<script lang="ts" setup>

const router = useRouter();

const selected_parent_type = ref<string>('')
const selected_children_type = ref<string>('')

const favorites = ref<Favorites[]>([
  {
    parent_type: '个人网站',
    isOpen: false,
    children: [
      {
        children_type: '科学上网',
        favorites: [
          {
            name: '极速Max',
            desc: '',
            url: 'https://jisumax.net/#/knowledge',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADB0lEQVQ4jVWTvW8cVRTFz33vzZvZ2Zm1vfHasb27BBMRQAoVBcFCcghVLMFfgBQQBRUSIhKIlp5/AASGNhVyYyEUgaLQIRCFJT4kW2Szjj/X3pnZ+XrvXYrIxDntPTrF/Z1DeCICwAuvvvmiJP0uEa4z+Nlxq+05qQYgum8lrefff/PLeT+dC0Dv9bXP4Pi2UHpGej5I+zhpz8OyBecTuKqoWIgv053BJ/jjh+wsRQDg3mtrX0vPuyWDJhrt+Vr5DUlK0/7iM6iJmfPUmf2HwiUnwlbl3TRJ38ZPdzIJgLvXbn6qtL7txdNVtHCJdDglvaApWDcwnu+CmpGQyhcinmZ2rkaZX/ak6FR//b5BnWtvXQ6o/lXH7SheWob2mwQvIKU8nm3HdNR/DoOKuShKyCKFzU652vnTmcOHombcUAHMe8LTrcbMnFG6IcnzaWoq4jdeXqZ2q4nT6Q5OaqbN7QMMAEhnoOaX4JIRqWLygWDiVekF7DVCkkqDlObVq8vU70xjbmYKlyKNbqSxttxBGGhmHUIETUF+CGK7qsDoC+UBJIUF6GIrxGwcotkM0VvsQDoHldaYGIV+HNBWNmGlNQnfJ8uYE6AnKAkAEQAwpCDQY9SQdHYngJ9Gr8AYOFMvgK0TgDgcTzBKC4rDCYb7R7BBiN3KIakMHqQFSzBcVTFXJQA6kK3elSsgXlFB7JT2BZOkvXHOs62QjLHYJR8HpcPm9iH20pxkkbJNRo87YetN2ew+P4AztxisVRhBCoG8tvTP8JiHJyn9ZjzcezTmg6SAKjPYSYJ6d4ft6ZFgQR/JdPD3Yav/giZnrjtrauE3hACDnaVRWvK214Cpa5J5QnaSsHn0r7HHe5619rtsY/0LCUCMHyzei5bkS2yqq6bMiKQ07CzBWcoDH6bMYJORrYfbZI/3lKur+2mQvoOtrercR1dVdyX6nJg/lFqH/4/pwkUYZ8FFBlfk1pFYz/LkY/x45/SM3FNaWLn5inJ4n8E3INAbxxcESzF0JH8mkt+mG1/dPT/n/wDZq3pHPMva5QAAAABJRU5ErkJggg=='
          }
        ]
      },
      {
        children_type: '微信',
        favorites: [
          {
            name: '微信公众平台',
            desc: '',
            url: 'https://mp.weixin.qq.com/',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACX0lEQVQ4jYVSPWhTURg93733vbyXpjF9Focu6tBBHARdFBVaEeqgOGURKWkIrZvFSXBx6lCwe9OERortkMGC4FbIIjo4KKiIIsWfxdQ2aXx5L+/l5X4OsVrt3zfd+33cc8537gEOLKb9+upgAOJMbv2slHKYGEmGeK/bzafz87QGMO2B3n15ZpzVKb0xLZU5accTAACtgSBoftBhmC0WnWf7yCPOTtTu2FbqQRBsrrNGEYi+EomrMatvJPDrn6KwfWGPFYjT6bcmMY1GUdiJ2lGuVOxfBoBMZrXAEI9jsd4rmt1rYhur6DKzAADbPtRLxP3t0G0qsp4DLIaGVq1S6XiLtX4tpQSTPqK2SdZbSADQtgQpBiSJThQFJpDQlQpao9m1YSHljSDwAJYv1Z99s9/PCcO6pZlbOqzdDt14hxJMDFAowQBTdrwxo6QxGYvZ8LyNh6sfnRUFEGdztVFlmLPxnrj1s1F7Y5rHBFDn33KIhO6k0+8MYOA8CJ99r16qwpmuVCgSmYnqIEmaYUbMbWxOebp9OZ8nr0nKAAACtBA9olw+GbbcxkgnWD9dyPfdf5InDwCU0HLItpOHW359qTDn3AOAdJolxLcOkNAAyIx8AoDFxaO1v4Z3PRNdmQwNllv/US5TJ4mkI4RMAfCYlded3Bf/GQ7KZKqDyjRfSGWmorY/FbFcNiQcDb7bE09d8t3ao8Kcc3PL7B2JAYCxidqYIazZmGUZQcuHlCaUIeE3668Cn68vLDhf9gUAgEyuelFIc4ygTxBEkyBW3IY7t7Q08GP3tO7I/m7n3e7/1i/h6Q/NwOjePQAAAABJRU5ErkJggg=='
          }
        ]
      }
    ]

  },
  {
    parent_type: '资源网站',
    isOpen: false,
    children: [
      {
        children_type: 'office',
        favorites: [
          {
            name: '[激活 Office] Office Tool Plus 入门教程 - Yerong の小窝',
            desc: '',
            url: 'https://www.coolhub.top/archives/14',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACvUlEQVQ4jT3SXW/TVhjA8ec5PnbSxHXSJmAjmqakpUwFjW2wMmmapmnTJiS0q+0z7QtM+w67AglNTALtBUZBFZQOVgp9C2rVkhcnjt/i2MfnPLsY2v3v6q8/KqUAgIgQMU1TTdN0XQcAAEiS5OTkJPaD5YuXDENHIADg/2tE9H2fiDjXpcyJyPW8/s4O63TjhZahVwCJCPh/VCk1mUzCKNreflUsFHRDt0zTaTSicYJZJlXGGCmFiMDTLNt59ixRSiICqXptVtO0TIhxkrzaesmqFY5MCgmARAoRWapg3G6PH6/nQkyVSnmeR1FMSoVhNMmyI280LBVFngOApjFEZGbRmF9dZeWSyLIgCONxEoSxEHnQ7Zihf//unbWHf7nu4OaToz9evlWKOCOqNxqvlxYBUQoZub2E9CSOMPYf7b6u6sa1K1cZ0mlTzxUhAlNEnPOZWi3LxN8bG+v3/+SBe7U1d2nlwh1h6J98YU1PK6JP33M+XznzLisiVqrVo4ODYbdzj82snmudv3wRkuyH5jK+2et23HKtHgQB5/rUVBGFEFIqkYvHD9dmUHqnnKZlnpFJ7L2155eS9sGjfshn7aXWQhRFzWaT93q9KPSXzy9b9Xpv+8V1bQLNj4+3trL+7qhqrR0OI1LTRlgsTjmOAwDMtm3r9HwkKI3j3Jr98Wn711u3teD4VKXw5MGDn37+RUgMgyCMQsYYInICXN8fXD5XQyApaeu4//xg7C/aceTvJ9ypz5hmaW+/XXr+j2PbUkquMbzx0Vye5xvucBQEKNLFlQ9vbW7+/ts9u0TXv/rMtKxyuZymaRzHjDFGRIyx4dDru4Nup6dxzTGxs7PxfuvsB1euGZWzBaPwzddfTtJ0NBp5nvfu1sPDIwDY3XszcDsvNp96erkxN//d999aVnXo+QsLDaVU3x1k6eRfBeaS2dpGE4sAAAAASUVORK5CYII='
          }
        ]
      }
    ]
  }
])

const favoriteItems = computed(() => {
  const parent = favorites.value.find(f => f.parent_type === selected_parent_type.value);
  if (parent) {
    return parent.children.find(c => c.children_type === selected_children_type.value)?.favorites || [];
  }
  return [];
});

const toggle = (item: Favorites) => {
  const favoriteItem = favorites.value.find(f => f.parent_type === item.parent_type);
  console.log(item)
  if (favoriteItem) {
    favoriteItem.isOpen = !favoriteItem.isOpen; // 切换 isOpen 属性
    selected_parent_type.value = item.parent_type;
    selected_children_type.value = item.children[0].children_type;
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

  &-main {
    position: absolute;
    top: 4rem;
    left: 16rem;

    &-item {
      cursor: pointer;
      width: 16rem;
      height: 12rem;
      padding: 1rem 1.25rem; // 内边距
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
            width: 1.5rem;
            height: 1.5rem;
          }
        }

        &-name {
          margin-bottom: .5rem;
          font-size: .9rem;
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
