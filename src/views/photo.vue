<template>
    <div class="photo">
        <div class="container">
            <div class="photo-header">
                <span class="photo-category">{{ this.title }}</span>
                <span>◇</span>
                <span>◇</span>
                <span>◇</span>
                <span>.</span>
            </div>
            <a class="image-item" v-for="photo in photos" :href="`${photo.url}`">
                <span class="image-cover">
                    <img :src="photo.url" />
                    <span class="image-camera">{{photo.camera}}</span>
                <span class="image-exif">{{photo.exif}}</span>
                </span>
                
            </a>
        </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      photos: [],
      title: ""
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      var category = this.$route.params.category;
      this.title = this.$route.query.title;

      this.$http
        .get("/api/photo/" + category, {
          params: {}
        })
        .then(resp => {
          if (resp && resp.body && resp.body.items) {
            this.photos = resp.body.items;
            console.log(this.photos);
          }
        });
    }
  }
};
</script>
<style lang="sass">
.photo {
    .container {
        .photo-header {
            margin-bottom: 20px;
            text-align: center;
            .photo-category {
                font-size: 30px;
                color: #333333;
                font-weight:bold;
                height: 60px;
                line-height: 60px;
                text-align: center;
                width: 100%;
                display: block;
            }
            span {
                display: block;
                font-size: 14px;
            }
        }
        .image-item {
            margin: 20px 0px;
            width: 100%;
            display: inline-block;
            background-color: #fff;
            transition: all 0.5s ease;
            &:hover {
                box-shadow: #ccc 0px 6px 16px;
            }
            .image-cover {
                width: 100%;
                display: block;
                background-color: #fff;
                padding: 20px 20px 0px 20px;
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                .image-camera {
                    display: block;
                    text-align: left;
                    font-size: 14px;
                    height: 30px;
                    line-height: 30px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #666;
                }
                .image-exif {
                    display: block;
                    text-align: left;
                    font-size: 14px;
                    height: 30px;
                    line-height: 30px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #666;
                }
            }
        }
    }
}
</style>