# zyf-markdown
本插件只是简易版markdown工具，暂未兼容vue3.0。支持自定义图片上传功能，也会不断优化。
### 仓库地址
[仓库地址](https://gitee.com/zhangyifen/zyf-mark-down.git)

### 示例
[demo](https://www.cwgj.xyz/m/markdown)

### 安装

```javascript
  npm install zyf-markdown
```

### 使用

```javascript
在main.js中调用
import markDown from 'zyf-markdown'
Vue.use(markDown)
```
### 示例

```javascript
<template>
<div class="example-wrap">
    <markDown 
    v-model="content" 
    :toolbars="toolbars" 
    :readonly="false" 
    :disabled="false" 
    style="width:100%;height:100%;"
    @uploadImage="uploadImage"
    />
</div>
</template>
<script>
import axios from 'axios'
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
        // 上传图片
        uploadImage(e) {
            console.log(e, e.name)
            //这儿写自己的上传方法，e是markdown返回给你的file对象
            const formData = new FormData()
            formData.append('file', e)
            axios({
                url: '上传图片的地址',
                method: 'post',
                data: formData,
            }).then(res=>{
            console.log('res=>',res);
            // imgUrlAdd 有两个参数imgUrlAdd(url, name)
            this.$refs.MarkDown.imgUrlAdd('url: 这儿写url->res.url', e.name)           
            }).catch(() => {})
        }
    }
}
</script>
<style>
.example-wrap /deep/ #editor{
    min-height:calc(100% - 51px) !important;
}
.example-wrap /deep/ textarea {
    min-height:calc(100% - 51px) !important;
}
</style>
<style lang="scss">
.example-wrap{
    width:100%;
    height:100%;
}
</style>
```
### 上传图片
```
uploadImage(e) {
    console.log(e, e.name)
    //这儿写自己的上传方法，e是markdown返回给你的file对象
    const formData = new FormData()
    formData.append('file', e)
    axios({
        url: '上传图片的地址',
        method: 'post',
        data: formData,
    }).then(res=>{
       console.log('res=>',res);
       // imgUrlAdd 有两个参数imgUrlAdd(url, name)
       this.$refs.MarkDown.imgUrlAdd('url: 这儿写url->res.url', e.name)           
    }).catch(() => {})
}
```
### 配置项
|字段|类型|默认值|描述|
|:-----|:-----|:-----|:-----|
|toolbars|Object|{}|顶部操作栏，配置见'toolbars'配置|
|readonly|Bollean|false|是否只读|
|disabled|Bollean|false|是否不可编辑|

### toolbars配置项

|字段|类型|默认值|描述|
|:-----|:-----|:-----|:-----|
|tabBar|Bollean|true|启用操作栏|
|preview|Bollean|true|是否开启预览|
|bold|Bollean|true|是否开启加粗|
|italic|Bollean|true|启用倾斜字体|
|useH|Bollean|true|是否使用不同主题大小的字体|
|table|Bollean|true|是否使用表格|
|alignleft|Bollean|true|居左对齐|
|aligncenter|Bollean|true|居中对齐|
|alignright|Bollean|true|居右对齐|
|code|Bollean|true|代码|
|link|Bollean|true|链接|
|img|Bollean|true|图片上传|