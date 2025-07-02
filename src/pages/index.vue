<script setup lang="ts">

useSeoMeta({
  title: 'Jophon',
  ogTitle: 'Jophon',
  description: 'Jophon',
  ogDescription: 'Jophon',
  ogImage: '',
})

</script>

<template>
  <div class="home">
    
    <div class="home-main">
      <div class="articles">
        <div class="articles-main">
          <ContentList></ContentList>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-top: 8rem;
}
</style>
