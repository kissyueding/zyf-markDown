<template>
    <div ref="image-viewer__wrapper" class="image-viewer__wrapper" @click="close">
      <div class="image-viewer__canvas" @click.stop="close">
          <img
            ref="img"
            class="image-viewer__img"
            :src="currentImgDiv"
            @error="handleImgError"
            @click="close">
      </div>
    </div>
</template>

<script>
import { getIcon } from "./js/icon.js"
export default {
  name: 'elImageViewer',
  props: {
    currentImg: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
        currentImgDiv: this.currentImg
    };
  },
  computed: {
  },
  watch: {
    currentImg(val) {
        this.currentImgDiv = val
    }
  },
  methods: {
    handleImgError(e) {
      this.currentImgDiv = getIcon('icon_image_fail')
      e.target.alt = '加载失败';
    },
    close() {
        if (this.$el && this.$el.parentNode) {
           this.$el.parentNode.removeChild(this.$el);
           this.$emit('closeImage')
        }
    }
  },
  mounted() {
    document.body.appendChild(this.$el);
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
<style>
.image-viewer__wrapper{
    width:100%;
    height:100%;
    position: fixed;
    background: rgba(0,0,0,0.7);
    top:0px;
    left:0px;
    z-index:1000000;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
</style>