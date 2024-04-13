<script setup lang="ts">

import links from '@/assets/links'


const content = useContent()

console.log(content)

onMounted(async () => {
  await nextTick();


  const blog = document.querySelector('.blog') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;
  const toc = document.querySelector('.toc') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${blog.getBoundingClientRect().right}px`;
    toc.style.right = `${blog.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})

const openInNewTab = (link: string) => {
  window.open(link, '_blank');
}


</script>


<template>
  <main>

    <div class="blog relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
      <ContentDoc v-slot="{ doc }">
        <div class="w-full prose px-8 flex-grow-1">
          <h1 class="w-full text-center">{{ doc.title }}</h1>
          <p class="w-full text-center font-600">{{ doc.subtitle }}</p>
          <p class="w-full text-center opacity-50">{{ formatDate(doc.date, 'diy', 'MMM D, YYYY') }}</p>
          <p class="w-full">{{ doc.desc }}</p>
          <ContentRenderer :value="doc" />
        </div>
      </ContentDoc>

      <div class="sidebar">
        <SideBar></SideBar>
      </div>
      <div class="footer">
        <div class="links">
          <button v-for="i, idx in links " :key="idx" :class="[idx, 'button']" @click="openInNewTab(i.link)">
            <UIcon class="icon" :name="i.icon" dynamic />
          </button>
        </div>
        <div class="copyright">
          <span select-none>© Jory 2024</span>
          <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-1</a>
        </div>
      </div>

      <div class="toc">
        <UIcon class="toc-icon" name="i-heroicons-solid-menu-alt-2" dynamic />
        <ul class="toc-main" v-if="content.toc.value && content.toc.value.links">
          <li v-for="link in content.toc.value.links" :key="link.text">
            <a :href="`#${link.id}`">
              {{ link.text }}
            </a>
          </li>
        </ul>
      </div>

    </div>
  </main>
</template>

<style lang="scss">

.toc {
  position: fixed;
  z-index: 1000;
  margin-right: 1rem;
  height: 100vh;
  padding: 2rem 0;
  min-width: 8rem;
  max-width: 8rem;
  color: var(--jory-color);

  li {
    margin: .5rem 0;
    transition: all .3s;
    opacity: .5;
  }


  &-icon {
    font-size: 2rem;
    position: absolute;
    left: -1rem;
    transition: all .3s;
    opacity: .6;
  }

  &-main {
    margin-top: 2.5rem;
  }
}

.toc:hover .toc-icon {
  opacity: 1;
}

.toc-main>li:hover {
  opacity: 1;
  font-weight: inherit;
  text-decoration: underline;
  text-underline-offset: .3rem;
  transition: border 0.3s ease-in-out;
}


</style>
