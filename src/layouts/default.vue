<script lang="ts" setup>
</script>
<template>
    <div>
        <header>
            <Navigation />
        </header>

        <div class="body">
            <slot />
        </div>
        <footer>
            <div class="footer">
                <div class="copyright">
                    <span select-none>© Jophon 2024 - 2025</span>
                    <!-- <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023134767号-2</a> -->
                </div>
            </div>
        </footer>
    </div>

</template>

<style lang="scss">
.layout-default {
    position: relative;

    main {
        padding: 0 2rem 5rem;
    }
}
</style>