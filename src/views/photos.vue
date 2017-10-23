<template>
	<div class="photos">
		<nav-bar :index="3"></nav-bar>
		<div class="container">
			<a class="image-item" v-for="photo in photos" :href="`/photo/${photo.category}?title=${photo.title}`">
				<span class="image-cover">
					<img :src="photo.url" />
				</span>
				<span class="image-title">{{photo.title}}</span>
                <span class="image-date">{{photo.date}}</span>
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
            photos: []
		}
	},
	created: function() {
        this.init();
	},
	methods: {
        init:function() {
            this.$http.get('/api/photos', {
                params: {
                    
                }
            }).then((resp) => {
                if (resp && resp.body && resp.body.items) {
                    this.photos = resp.body.items;
                }
            });
        }
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
                img {
                    width: 100%;
                }
            }
            .image-title {
                display: block;
                text-align: left;
                background-color: #fff;
                padding: 0px 18px;
                font-size: 18px;
                height: 30px;
                line-height: 30px;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #333;
            }
            .image-date{
                display: block;
                text-align: left;
                background-color: #fff;
                padding: 0px 18px;
                font-size: 14px;
                height: 30px;
                line-height: 30px;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #999;
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