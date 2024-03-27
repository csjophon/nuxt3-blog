<script setup lang="ts">
const colorMode = useColorMode()

const router = useRouter();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const extractChildRoutes = (items: any) => {
  return items.flatMap((item: any) => {
    // 如果当前item没有children属性，则直接返回该item
    if (!item.children) {
      return { title: item.title, path: item._path };
    } else {
      // 如果当前item有children属性，则仅返回children中的项
      return flattenChildren(item.children);
    }
  });
}

const flattenChildren = (children: any) => {
  return children.flatMap((childItem: any) => ({
    title: childItem.title,
    path: childItem._path
  }));
}

const nav_route = extractChildRoutes(navigation.value!);

console.log(nav_route)

</script>

<template>
  <main>
    <div class="sidebar">

    </div>
    <div class="body container mx-auto flex w-60vw flex-col h-100vh overflow-y-auto">
      <div class="info h-40vh w-full relative">
        <div class="bg w-full h-full">
          <div class="mask h-full w-full"></div>
          <img class="h-full w-full object-cover" src="/bg.jpg" alt="Bg">
        </div>

        <div class="profile">
          <div class="flex items-center mr-8">
            <div class="name color-white mr-2">Rwilds</div>
            <img class="avatar object-cover" src="/avatar.jpg" alt="Avatar" />
          </div>
          <div class="introduce pt-2">
            人生得意须尽欢，莫使金樽空对月。
          </div>

        </div>

      </div>

      <div class="content flex-grow-1 w-full">
        <div v-for="item, index in nav_route" :key="index">
          <div class="card cursor-pointer">
            <div class="title" @click="router.push(item.path)">
              {{ item.title }}
            </div>
          </div>
        </div>

      </div>

    </div>
  </main>
</template>

<style lang="scss">
.body {
  background-color: rgb(254, 247, 238);
  max-width: 960px;
}

.bg {
  position: absolute;
  z-index: 998;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}



.profile {
  position: absolute;
  z-index: 999;
  right: 0rem;
  bottom: -3rem;
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
}

.content {
  padding-top: 5rem;
}
</style>
