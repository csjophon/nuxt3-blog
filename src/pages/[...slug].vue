<script setup lang="ts">

import links from '@/assets/links'

const content = useContent()

console.log(content)

const { toc } = useContent()

const router = useRouter();

const back = () => {
  router.back();
}

const scrollToAnchor = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  // 不改变 hash，不计入 history
}

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
        <div class="back">
          <Icon name="material-symbols:arrow-forward-ios-rounded"></Icon>
          &nbsp;
          <button @click="back">
            cd&nbsp;&nbsp;..
          </button>
        </div>
      </div>
    </ContentDoc>

    <div class="toc">
      <Icon class="toc-icon" name="i-heroicons-solid-menu-alt-2" dynamic />
      <ul class="toc-main" v-if="toc && toc.links">
        <li v-for="link in toc.links" :key="link.text">
          <a :href="`#${link.id}`" @click.prevent="scrollToAnchor(link.id)">
            {{ link.text }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.blog {
  .prose {
    flex: 1;
    flex-grow: 1;
    max-width: 800px;
    min-width: 375px;
    margin: 0 auto;


    &-header {
      padding: 1.5rem 2rem;
    }

    &-title {
      font-size: var(--typography-font-size-headline4);
    }

    &-info {
      display: flex;
      gap: 1rem;
    }

    &-desc {
      padding: 1rem 1.5rem;
      background-color: var(--prose-desc-background);
    }

    &-content {
      padding: 1.5rem 2rem;
    }
  }

  .back {
    width: 100%;
    padding: 1.5rem 2rem;

    svg,
    span {
      width: .75rem;
      height: .75rem;
      color: var(--color-natural-Ink50);
    }

    button {
      font-weight: inherit;
      text-decoration: none;
      color: var(--color-natural-Ink50);
      border-bottom: 1px solid var(--color-natural-Ink30);
      transition: border .3s ease-in-out;
    }

    button:hover {
      color: var(--color-natural-Ink70);
      border-bottom: 1px solid var(--color-natural-Ink50);
    }
  }

  .toc {
    position: fixed;
    z-index: 1000;
    top: 8rem;
    left: 1rem;
    color: var(--font-color);
    opacity: 1;

    ul {
      padding: 0 1rem 1rem;
      opacity: 0;
      transition: all .25s ease-in-out;
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

  @media (max-width: 1280px) {
    .toc {
      opacity: 0;
    }
  }

  @media (min-width: 1281px) and (max-width: 1440px) {
    .toc {
      width: 16rem;
      opacity: 1;
    }
  }

  @media (min-width: 1441px) and (max-width: 1600px) {
    .toc {
      width: 20rem;
      opacity: 1;
    }
  }

  .toc:hover .toc-icon {
    opacity: 1;
  }

  .toc:hover {
    .toc-main {
      opacity: 1;
    }
  }

  .toc-main>li:hover {
    color: black;
    opacity: 1;
    font-weight: inherit;
    text-decoration: underline;
    text-underline-offset: .3rem;
  }
}
</style>
