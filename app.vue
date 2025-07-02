<script lang="ts" setup>
const layout = 'default'

</script>
<template>
  <Html>

  <Body>
    <div>
      <NuxtLayout :name="layout">
        <NuxtPage />
      </NuxtLayout>
    </div>
  </Body>

  </Html>
</template>
