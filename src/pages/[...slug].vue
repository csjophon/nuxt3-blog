<script setup lang="ts">

const content = useContent()

console.log(content)

onMounted(async () => {
  await nextTick();


  const blog = document.querySelector('.blog') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;
  const toc = document.querySelector('.toc') as HTMLElement;

  const updateSidebarPosition = () => {
    console.log(blog.getBoundingClientRect())
    sidebar.style.left = `${blog.getBoundingClientRect().right}px`;
    toc.style.right = `${blog.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})

</script>

<template>
  <main>



    <div class="blog relative container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
      <ContentDoc v-slot="{ doc }">
        <div class="w-full prose px-8">
          <h1 class="w-full text-center">{{ doc.title }}</h1>
          <p class="w-full text-center font-600">{{ doc.subtitle }}</p>
          <p class="w-full text-center">{{ formatDate(doc.date, 'diy', 'MMM D, YYYY') }}</p>
          <p class="w-full">{{ doc.desc }}</p>
          <ContentRenderer :value="doc" />
        </div>
      </ContentDoc>

      <div class="sidebar">
        <SideBar></SideBar>
      </div>

      <div class="toc">
        <UIcon class="toc-icon" name="i-material-symbols-toc" dynamic />
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
.blog {
  background-color: var(--jory-body-bg);
  max-width: 960px;
  min-width: 375px;
  border-left: .25rem solid rgba(0, 0, 0, 0.1);
  border-right: .25rem solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
}

.toc {
  position: fixed;
  z-index: 1000;
  margin-right: 1rem;
  height: 100vh;
  padding: 2rem 0;
  min-width: 8rem;
  max-width: 8rem;
  color: var(--jory-color);


  &-icon {
    font-size: 2rem;
    position: absolute;
    left: -1rem;
    transition: all .3s;
    opacity: .6;
  }

  &-main {
    margin-top: 2.5rem;
    transition: all .3s;
    opacity: .3;
  }
}

.toc:hover .toc-icon {
  opacity: 1;
}

.toc:hover .toc-main {
  opacity: 1;
}

.sidebar {
  position: fixed;
  z-index: 1000;
  margin-right: 1rem;
  height: 100vh;
  padding: 2rem 0;
}
</style>
