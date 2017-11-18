<template>
    <div class="footer">
        <span class="copyright">2017 dawntech.top. All rights reserved.</span>
        <a class="mail" href="mailto:wangsguang@gmail.com">wangsguang@gmail.com</a>
        <span class="icp">京ICP备17056676号</span>
        <a class="icon iconfont icon-yinzhang" href="/"></a>
    </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  methods: {}
};
</script>
<style lang="sass">
    .footer {
        padding: 40px 0px 40px 0px;
        text-align: center;
        background-color: #fff;
        color: #999999 !important;
        font-size: 13px;
        .copyright {
            height: 20px;
            display: block;
            color: #999;
        }
        .icp {
            height: 20px;
            display: block;
            color: #999999 !important;
        }
        .icon {
            width: 100px;
            display: block;
            margin: 0px auto;
            padding: 6px 0px;
            font-size: 30px;
            color: #999;
        }
        .mail {
            height: 20px;
            display: block;
            color: #999;
        }
    }
</style>