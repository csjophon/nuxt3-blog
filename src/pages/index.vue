<script setup lang="ts">
const colorMode = useColorMode()
console.log(colorMode.preference)

</script>

<template>
  <main>
    <div class="body container mx-auto flex max-w-max">
      <div class="pt-10">
        <ContentDoc class="prose" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">

</style>
