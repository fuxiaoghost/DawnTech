<template>
	<div class="photos">
		<nav-bar :index="3"></nav-bar>
		<div class="container">
			<a class="image-item" v-for="item in items" :href="`/article/${item.id}`">
				<span class="image-cover">
					<img :src="item.image" />
				</span>
				<span class="image-title">{{item.title}}</span>
			</a>
		</div>
		<foot></foot>
	</div>
</template>
<script>
import navBar from '../components/nav-bar.vue';
import foot from '../components/foot.vue';
export default {
	components: { navBar, foot },
	data: function() {
		return {
			"items": [{ "image": "https://webimg.baichanghui.com/reecho/articles/image-filter-cover.jpg", "title": "信手涂鸦", "id": "1" },
			{ "image": "https://webimg.baichanghui.com/reecho/articles/image-filter-cover.jpg", "title": "信手涂鸦" },
			{ "image": "https://webimg.baichanghui.com/reecho/articles/image-filter-cover.jpg", "title": "信手涂鸦" },
			{ "image": "https://webimg.baichanghui.com/reecho/articles/image-filter-cover.jpg", "title": "信手涂鸦" }],
		}
	},
	created: function() {

	},
	methods: {

	}
}
</script>
<style lang="sass">
.photos {
    .container {
        .image-item {
            width: 310px;
            height: 260px;
            display: inline-block;
            background-color: #eee;
            margin: 15px;
            transition: all 0.5s ease;
            &:hover {
                box-shadow: #ccc 0px 6px 16px;
            }
            .image-cover {
                height: 200px;
                width: 100%;
                display: block;
                background-color: #ccc;
                overflow: hidden;
            }
            .image-title {
                display: block;
                text-align: left;
                background-color: #fff;
                padding: 0px 20px;
                font-size: 20px;
                line-height: 60px;
                height: 60px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        @media screen and (max-width: 500px) {
            .image-item {
                width: 100%;
                margin: 15px 0px 15px 0px;
            }
        }
    }
}
</style>