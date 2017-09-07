<template>
    <div class="footer">
        <i class="iconfont icon-logo"></i>
    </div>
</template>
<script>
    export default{
        data: function(){
            return {
            }
        },
        methods: {
        }
    }
</script>
<style lang="sass">
    .footer {
        height: 20px;
        padding: 20px 0;
        line-height: 20px;
        border-top: 1px solid #d1d1d1;
        color: #878787;
        text-align: center;
        .icon-logo {
            font-size: 20px;
            display: inline-block;
            animation:heartbeat 1s infinite;
        }
    }

    @keyframes heartbeat {
        0%{transform:  scale(1,1); opacity: 1;}
        25%{transform:  scale(1.1,1.1); opacity: 0.9;}
        100%{transform:  scale(1,1); opacity: 1;}
    }
</style>