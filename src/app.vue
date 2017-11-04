<template>
    <div class="page">
         <router-view></router-view>
    </div>
</template>
<script>
export default {
  components: {}
};
</script>
<style lang="sass">
    html {
        height: 100%;
        body {
            height: 100%;
            margin: 0;
            padding: 0;
            font-size: 14px;
            color: #333;
            background-color: #f2f2f2;
            font-family: PingFang SC, Microsoft YaHei, simhei, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            text-size-adjust: 100%;
            -webkit-touch-callout: none;
            /*去除 ios safari <a>以及 <input> 选中时高亮显示，去除高亮后我们可以自定义样式*/
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-user-select: none;  
        }
        a, a:link {
            -webkit-appearance: none;
            text-decoration: none;
            color: #333;
            cursor: pointer;
        }
    }
    .router-before {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 70px;
        min-height: 400px;
        background-color: #fff;
        height: 100%;
    }

    .router-after {
        background-image: none;
    }
    .page {
        height: 100%;
        padding-top: 60px;
        .container {
            width: 70% !important;
            min-width: 1024px;
            position: relative;
            margin: 0 auto;
        }

        @media screen and (max-width: 500px) {
            .container {
                width: 100%;
                min-width: 100%;
            }
        }
        @media screen and (max-width: 500px) {
            .container {
                width: 100%;
            }
        }
        @media screen and (min-width: 800px) {
            .container {
                width: 680px;
            }
        }
        @media screen and (min-width: 1024px) {
            .container {
                width: 1020px;
            }
        }
        @media screen and (min-width: 1360px) {
            .container {
                width: 1360px;
            }
        }
    }
</style>