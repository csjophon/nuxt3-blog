<script setup lang="ts">

import links from '@/assets/links'

const content = useContent()

// console.log(content)

onMounted(async () => {
  await nextTick();

})

const openInNewTab = (link: string) => {
  window.open(link, '_blank');
}


</script>


<template>
  <div class="blog">
    <ContentDoc v-slot="{ doc }">
      <div class="prose">
        <div class="prose-header">
          <div class="prose-title">
            {{ doc.title }}
          </div>
          <div class="prose-info">
            <p class="prose-info-subtitle">{{ doc.subtitle }}</p>
            <p class="prose-info-date">{{ formatDate(doc.date, 'diy', 'MMM D, YYYY') }}</p>
          </div>
        </div>
        <p class="prose-desc">{{ doc.desc }}</p>
        <ContentRenderer class="prose-content" :value="doc" />
      </div>
    </ContentDoc>

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
</template>

<style lang="scss">
.blog {
  display: flex;

  .prose {
    flex: 1;
    flex-grow: 1;
    max-width: calc(100% - 12rem);
    margin-left: 12rem;

    &-header {
      border: var(--border-m);
      border-radius: var(--shape-border-radius-rounded-rectangle-l);
      padding: 1.5rem 2rem;
    }

    &-title {
      font-size: var(--typography-font-size-headline4);
    }

    &-info {
      display: flex;
      gap: 1rem;

      &-subtitle {}

      &-date {}
    }

    &-desc {
      border: var(--border-m);
      border-radius: var(--shape-border-radius-rounded-rectangle-l);
      padding: 1rem 1.5rem;
      background-color: var(--prose-desc-background);
    }

    &-content {
      border: var(--border-m);
      border-radius: var(--shape-border-radius-rounded-rectangle-l);
      padding: 1.5rem 2rem;
    }
  }

  .toc {
    border: var(--border-m);
    border-radius: var(--shape-border-radius-rounded-rectangle-l);
    background-color: var(--prose-desc-background);
    position: fixed;
    z-index: 1000;
    top: 8rem;
    width: 10rem;
    color: var(--font-color);

    ul {
      padding: 0 1rem 1rem;
    }

    li {
      font-size: .9rem;
      margin: .5rem 0;
      transition: all .15s;
      opacity: .75;
    }


    &-icon {
      font-size: 1.5rem;
      transition: all .3s;
      opacity: .75;
      margin: 1rem .5rem 0;
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
}
</style>
