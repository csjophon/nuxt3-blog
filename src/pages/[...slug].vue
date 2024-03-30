<script setup lang="ts">

onMounted(async () => {
  await nextTick();


  const blog = document.querySelector('.blog') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${blog.getBoundingClientRect().right}px`;
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
          <p class="w-full text-center font-600">{{ doc.desc }}</p>
          <p class="w-full text-center">{{ formatDate(doc.date, 'diy', 'MMM D, YYYY') }}</p>
          <ContentRenderer :value="doc" />
        </div>
      </ContentDoc>

      <div class="sidebar">
        <SideBar></SideBar>
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

.sidebar {
  position: fixed;
  z-index: 1000;
  margin-left: 1rem;
  height: 100vh;
  padding: 2rem 0;
}
</style>
