<script setup lang="ts">

const router = useRouter();

const links = {
  tiktok: {
    icon: 'i-ic-outline-tiktok',
    link: ''
  },
  youtube: {
    icon: 'i-mingcute-youtube-fill',
    link: 'https://www.youtube.com/channel/UCXE1CZ9CVMvLG3ohizQq-IA'
  },
  twitter: {
    icon: 'i-ri-twitter-x-line',
    link: 'https://twitter.com/JoryJoestar',
  },
  ins: {
    icon: 'i-basil-instagram-solid',
    link: '',
  },
  bili: {
    icon: 'i-ri-bilibili-fill',
    link: 'https://space.bilibili.com/100638063?spm_id_from=333.1007.0.0',
  },

  xiaohongshu: {
    icon: 'i-simple-icons-xiaohongshu',
    link: 'https://www.xiaohongshu.com/user/profile/5b1b85b86b58b718f9de594d?m_source=pinpai',
  },
  zhihu: {
    icon: 'i-ri-zhihu-fill',
    link: 'https://www.zhihu.com/people/huang-xiao-yao-6-54',
  },
  douyin: {
    icon: 'i-ic-outline-tiktok',
    link: 'https://www.douyin.com/user/MS4wLjABAAAAKdCvJ_1FJwDskpBszVzIcfoQtkgbB47i88c8IbxHQyx43sfjgjaVI8UVGdaneitx'
  },
}

const items = [
  '/bg/1.jpg',
  '/bg/2.jpg',
  '/bg/3.jpg',
  '/bg/4.jpg',
  '/bg/5.jpg',
  '/bg/6.jpg',
  '/bg/7.jpg',
  '/bg/8.jpg',
  '/bg/9.jpg',
  '/bg/10.jpg',
  '/bg/11.jpg',
  '/bg/12.jpg',
  '/bg/13.jpg',
  '/bg/14.jpg',
  '/bg/15.jpg',
  '/bg/16.jpg',
  '/bg/17.jpg',

]

const carouselRef = ref()

const carouselTimer = ref()


onMounted(async () => {
  await nextTick();

  carouselTimer.value = setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)

  const body = document.querySelector('.body') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${body.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})

onUnmounted(() => {
  clearInterval(carouselTimer.value);
});

</script>

<template>
  <main>
    <div class="body relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
      <div class="info h-40vh w-full relative">
        <div class="bg w-full h-full">
          <div class="mask h-full w-full"></div>
          <UCarousel ref="carouselRef" class="carousel w-full h-full"
            :ui="{ item: 'basis-full ', container: 'h-full ' }" v-slot="{ item }" :items="items">
            <img class="w-full h-full object-cover" :src="item" draggable="false">
          </UCarousel>
        </div>

        <div class="profile w-full">
          <div class="flex items-center mr-16">
            <div class="name color-white mr-2">Jory Joestar⭐</div>
            <img class="avatar object-cover" src="/avatar.jpg" alt="Avatar" />
          </div>
          <div class="sub w-full flex justify-between items-center">
            <div class="links">
              <button v-for="i, idx in  links " :key="idx" :class="[idx, 'button']" @click="router.push(i.link)">
                <UIcon class="icon" :name="i.icon" dynamic />
              </button>
            </div>
            <div class="introduce font-bold font-size-6">
              人生得意须尽欢，莫使金樽空对月。
            </div>
          </div>
        </div>

      </div>

      <div class="content flex-grow-1 w-full p-16">
        <ContentList></ContentList>
      </div>

      <div class="sidebar">
        <SideBar></SideBar>
      </div>

      <div class="copyright">
        <span select-none>© Jory 2024</span>
        <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-1</a>
      </div>

    </div>



  </main>
</template>

<style lang="scss">
.body {
  background-color: var(--jory-body-bg);
  max-width: 960px;
  min-width: 375px;
  box-shadow: var(--jory-body-shadow);
  box-sizing: content-box;
}

.copyright {
  z-index: 1000;
  width: 100%;
  bottom: 0;
  color: var(--jory-color);
  font-size: 13px;
  text-align: center;

  span {
    margin-right: .5rem;
  }
}

.sidebar {
  position: fixed;
  z-index: 1000;
  margin-left: 1rem;
  height: 100vh;
  padding: 2rem 0;
}

.bg {
  position: absolute;
  z-index: 998;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 95%, rgba(0, 0, 0, .5) 100%);
    z-index: 998;
    pointer-events: none;
  }

  .carousel {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 997;
  }
}



.profile {
  position: absolute;
  z-index: 999;
  right: 0rem;
  bottom: -4rem;
  display: flex;
  flex-direction: column;
  align-items: end;

  .avatar {
    height: 5rem;
    width: 5rem;
    border-radius: .5rem;
  }

  .name {
    font-size: 1.5rem;
  }

  .sub {

    .button {
      margin: .5rem;
      background-color: var(--jory-button-bg);
      width: 2rem;
      height: 2rem;
      border-radius: .5rem;
      transition: all .3s;
    }

    .button:hover {
      background-color: var(--jory-button-hover-bg);
    }

    .icon {
      font-size: 1.75rem;
      color: var(--jory-bg);
    }

    .introduce {
      color: var(--jory-color);
    }
  }



}
</style>
