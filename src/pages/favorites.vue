<script lang="ts" setup>

const parent_tpye = ref<string>('')
const children_tpye = ref<string>('')

const favorites: Favorites[] = [
  {
    parent_type: '个人网站',
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
    favorites: [
      {
        name: '微信公众平台',
        url: 'https://mp.weixin.qq.com/',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACX0lEQVQ4jYVSPWhTURg93733vbyXpjF9Focu6tBBHARdFBVaEeqgOGURKWkIrZvFSXBx6lCwe9OERortkMGC4FbIIjo4KKiIIsWfxdQ2aXx5L+/l5X4OsVrt3zfd+33cc8537gEOLKb9+upgAOJMbv2slHKYGEmGeK/bzafz87QGMO2B3n15ZpzVKb0xLZU5accTAACtgSBoftBhmC0WnWf7yCPOTtTu2FbqQRBsrrNGEYi+EomrMatvJPDrn6KwfWGPFYjT6bcmMY1GUdiJ2lGuVOxfBoBMZrXAEI9jsd4rmt1rYhur6DKzAADbPtRLxP3t0G0qsp4DLIaGVq1S6XiLtX4tpQSTPqK2SdZbSADQtgQpBiSJThQFJpDQlQpao9m1YSHljSDwAJYv1Z99s9/PCcO6pZlbOqzdDt14hxJMDFAowQBTdrwxo6QxGYvZ8LyNh6sfnRUFEGdztVFlmLPxnrj1s1F7Y5rHBFDn33KIhO6k0+8MYOA8CJ99r16qwpmuVCgSmYnqIEmaYUbMbWxOebp9OZ8nr0nKAAACtBA9olw+GbbcxkgnWD9dyPfdf5InDwCU0HLItpOHW359qTDn3AOAdJolxLcOkNAAyIx8AoDFxaO1v4Z3PRNdmQwNllv/US5TJ4mkI4RMAfCYlded3Bf/GQ7KZKqDyjRfSGWmorY/FbFcNiQcDb7bE09d8t3ao8Kcc3PL7B2JAYCxidqYIazZmGUZQcuHlCaUIeE3668Cn68vLDhf9gUAgEyuelFIc4ygTxBEkyBW3IY7t7Q08GP3tO7I/m7n3e7/1i/h6Q/NwOjePQAAAABJRU5ErkJggg=='
      }
    ]
  }
]

const favorites_list = computed(() => {

});

const toggle = (item: any) => {
  item.isOpen = !item.isOpen; // 切换子项的展开状态
};


const openLink = (url: string) => {
  window.open(url, '_blank'); // 在新标签页中打开链接
};


</script>

<template>
  <div class="favorites">
    <div class="favorites-search"></div>

    <div class="favorites-sidebar">
      <ul>
        <li v-for="(item, index) in favorites" :key="index" :item="item">

        </li>
      </ul>
    </div>
    <div class="favorites-main">

    </div>
    Favorites
  </div>
</template>

<style lang="scss" scoped>
.favorites {
  padding-top: 5rem;

}
</style>
