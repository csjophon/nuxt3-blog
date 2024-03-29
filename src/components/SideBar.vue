<script lang="ts" setup>

const router = useRouter();

</script>
<template>
  <main>
    <div class="sidebar-container">

      <div class="navigation">
        <button class="home button" @click="router.push('/')">
          <UIcon class="icon" name="i-material-symbols-home" dynamic />
        </button>

        <button class="archive button">
          <UIcon class="icon" name="i-material-symbols-archive" dynamic />
        </button>
      </div>

      <div class="hover">
        <button class="back button">
          <UIcon class="icon" name="i-lets-icons-back" dynamic />
        </button>

        <button class="totop button">
          <UIcon class="icon" name="i-bxs-to-top" dynamic />
        </button>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
main {
  height: 100%;
}

.sidebar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .navigation {
    display: flex;
    flex-direction: column;
  }

  .hover {
    display: flex;
    flex-direction: column;
  }

  .button {
    background-color: #1c1c1c;
    width: 3rem;
    height: 3rem;
    border-radius: .5rem;
    transition: all .3s;
    margin-bottom: .5rem;
  }

  .button:hover {
    background-color: rgb(73, 73, 73);
  }

  .icon {
    font-size: 1.75rem;
    color: white;
  }

}
</style>
