<script setup lang="ts">


const items = [
  'https://picsum.photos/600/800?random=1',
  'https://picsum.photos/600/800?random=2',
  'https://picsum.photos/600/800?random=3',
  'https://picsum.photos/600/800?random=4',
  'https://picsum.photos/600/800?random=5',
  'https://picsum.photos/600/800?random=6'
]


const colorMode = useColorMode()

colorMode.preference = 'light'

console.log(colorMode.preference)

</script>

<template>
  <main>
    <div class="sidebar">

    </div>
    <div class="body container mx-auto flex w-60vw flex-col min-h-100vh overflow-y-auto">
      <div class="info h-40vh w-full relative">
        <div class="bg w-full h-full">
          <div class="mask h-full w-full"></div>
          <UCarousel class="carousel w-full h-full" :ui="{ item: 'basis-full ', container: 'h-full ' }"
            v-slot="{ item }" :items="items">
            <img class="w-full h-full object-cover" :src="item" draggable="false">
          </UCarousel>
        </div>

        <div class="profile">
          <div class="flex items-center mr-16">
            <div class="name color-white mr-2">Jory Joe⭐</div>
            <img class="avatar object-cover" src="/avatar.jpg" alt="Avatar" />
          </div>
          <div class="introduce pt-2">
            人生得意须尽欢，莫使金樽空对月。
          </div>
        </div>

      </div>

      <div class="content flex-grow-1 w-full p-16">
        <ContentList></ContentList>
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
</style>
