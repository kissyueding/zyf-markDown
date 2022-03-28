<template>
  <div id="app">
    <div id="nav">
      我是测试插件
      <MarkDown ref="MarkDown" 
      v-model="content" 
      :disabled="false" 
      :readonly="false" 
      :toolbars="toolbars"
      :useImgPreview="true"
      placeholder="请输入内容"
      @uploadImage="uploadImage"
      @getImgUrl="getImgUrl"
       />
      <div @click="submintFunction">提交</div>
    </div>
  </div>
</template>
<script>
import MarkDown from "./../packages/index";
import Vue from "vue";
 Vue.use(MarkDown);

export default {
  data() {
    return {
      content: '',
      toolbars: {
        tabBar: true, // 启用操作栏
        preview: true, // 开启预览
        bold: true, // 加粗
        italic: true, // 倾斜
        useH: true, // 使用标题
        table: true, // 表格
        alignleft: true, // 居左
        aligncenter: true, // 居中
        alignright: true, // 居右
        code: true, // 代码
        link: true, // 链接
        img: true, // 图片
        del: true, // 删除线
        quote: true, // 引用
        strikethrough: true, // 横线
        ol: true, // 有序列表
        ul: true, // 无序列表
      }
    }
  },
  methods: {
    uploadImage(e) {
      console.log(e, e.name)
      // imgUrlAdd 有两个参数imgUrlAdd(url, name)
      this.$refs.MarkDown.imgUrlAdd('https://www.zybuluo.com/static/img/logo.png', 'logo-icon')
    },
    submintFunction() {
      console.log('123123123', this.content)
    },
    getImgUrl(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
