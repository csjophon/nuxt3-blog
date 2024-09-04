<script setup lang="ts">

const router = useRouter();
const route = useRoute();

const baseUrl = `/`

const showBack = computed(() => {
  return route.path !== baseUrl
})

const back = () => {
  router.back()
}

</script>

<template>
  <div class="goBack">
    <button :class="{ displaynone: !showBack }" @click="back" class="back button">
      <UIcon class="icon" name="i-streamline-return-2-solid" dynamic />
    </button>
  </div>
</template>

<style lang="scss"></style>
