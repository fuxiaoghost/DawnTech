<template>
    <div class="nav-bar" :class="navClass">
        <div class="container">
            <a class="brand" href="/">
                <span class="brand-logo">
                    <i class="iconfont icon-logo"></i>
                    <i class="iconfont icon-logo-txt"></i>
                </span>
            </a>
            <div class="nav-right">
                <a class="nav-item"
                    :class="{'active':index==idx}"
                    v-for="(item, idx) in navs"
                    :href="item.url">
                    {{item.title}}
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ['index'],
        data: function(){
            return {
                navs: [],
                navClass: ''
            }
        },
        created: function(){
            this.navs = [{
                title: '主页',
                url: '/'
            },{
                title: '团队介绍',
                url: '/article/about-us'
            }];

            window.onscroll = () => {
                if (window.scrollY > 160) {
                    this.navClass = 'light';
                } else {
                    this.navClass = '';
                }
            }
        },
        methods: {

        }
    }
</script>
<style lang="sass">
    .nav-bar {
        height: 60px;
        line-height: 60px;
        background-color: #000;
        color: #fff;
        position: fixed;
        width: 100%;
        z-index: 100;
        top:0;
        transition: all 1s ease;
        &.light {
            background-color: #fff;
            color: #000;
            opacity: .95;
            border-bottom: 1px solid #f2f2f2;
            .brand {
                color: #000;
            }
            .nav-item {
                color: #000 !important;
                &:after {
                    background-color: #fff;
                }

                &.active,&:hover {
                    &:after {
                        background-color: #000;
                    }
                }
            }
        }
        .brand {
            float: left;
            color: #fff;
            margin-left: 20px;
            height: 60px;
            .brand-logo {
                height: 60px;
                float: left;
                .icon-logo {
                    font-size: 24px;
                    float: left;
                    margin-right: 14px;
                }
                .icon-logo-txt {
                    font-size: 18px;
                    float: left;
                }
            }
        }
        .nav-right {
            float: right;
            margin-right: 20px;
        }
        .nav-item {
            display: block;
            float: left;
            padding: 0 20px;
            text-align: center;
            position: relative;
            color: #fff !important;
            &:after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: #000;
                transition: all 0.5s ease;
            }

            &.active,&:hover {
                &:after {
                    background-color: #fff;
                }
            }
        }
    }
</style>