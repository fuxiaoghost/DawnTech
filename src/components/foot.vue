<template>
    <div class="footer">
        <span class="copyright">2017 dawntech.top. All rights reserved.</span>
        <a target="_blank" href="http://www.miitbeian.gov.cn" class="icp">京ICP备17056676号</a>
        <a class="icon" href="/blog">
            <img src="/assets/images/dawn.jpg" alt="">
        </a>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
        }
    },
    methods: {
    }
}
</script>
<style lang="sass">
    .footer {
        padding: 40px 0px 40px 0px;
        text-align: center;
        background-color: #fff;
        color: #fff;
        font-size: 13px;
        .copyright {
            height: 20px;
            display: block;
            color: #888;
        }
        .icp {
            height: 20px;
            display: block;
            color: #888;
        }
        .icon {
            width: 64px;
            display: block;
            margin: 0px auto;
            padding: 6px 0px;
            img {
                width: 36px;
                height: 36px;
            }
        }
    }
</style>