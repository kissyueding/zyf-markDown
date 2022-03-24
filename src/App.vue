<template>
  <div id="app">
    <div id="nav">
      我是测试插件
      <MarkDown v-model="content" />
      <div @click="submintFunction">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '213123213123123'
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
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
