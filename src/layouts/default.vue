<script lang="ts" setup>
</script>
<template>
    <div class="layout-default">
        <header>
            <Navigation />
        </header>

        <main class="main">
            <slot />
        </main>

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
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    .main {
        flex: 1;
        padding: 0 2rem;
    }

    .footer {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        width: 100%;
        height: 5rem;
        font-size: 13px;
        bottom: 0;
        color: var(--font-color);

        .copyright {
            span {
                margin-right: 0.5rem;
            }

            a {
                margin: 0.25rem;
                width: 1.25rem;
                height: 1.25rem;
                border-radius: 0.25rem;
                transition: all 0.3s;
            }

            a:hover {
                color: var(--button-text-color-hover);
            }
        }
    }
}
</style>