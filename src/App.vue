<template>
  <div id="app">
    <div id="nav">
      我是测试插件
      <MarkDown v-model="content" :disabled="false" :readonly="false" :toolbars="toolbars" placeholder="请输入内容" />
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
        link: true // 链接
      }
    }
  },
  methods: {
    submintFunction() {
      console.log(this.content)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
