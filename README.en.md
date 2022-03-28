# zyf-markdown
This plug-in is only a simple version of markdown tool and is not compatible with vue3 0 Support custom image upload function and will be continuously optimized.
### 仓库地址
[仓库地址](https://gitee.com/zhangyifen/zyf-mark-down.git)

### 示例(demo)
[demo](https://www.cwgj.xyz/m/markdown)

### 安装(install)

```javascript
  npm install zyf-markdown
```

### 使用（use）

```javascript
在main.js中调用
import markDown from 'zyf-markdown'
Vue.use(markDown)
```
### 示例 (example)

```javascript
<template>
<div class="example-wrap">
    <markDown 
    v-model="content" 
    :toolbars="toolbars" 
    :readonly="false" 
    :disabled="false"
    :useImgPreview="true"
    style="width:100%;height:100%;"
    @uploadImage="uploadImage"
    @getImgUrl="getImgUrl"
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
        // 上传图片
        uploadImage(e) {
            console.log(e, e.name)
            //Write your own upload method here. E is the file object returned to you by markdown
            const formData = new FormData()
            formData.append('file', e)
            axios({
                url: 'url',
                method: 'post',
                data: formData,
            }).then(res=>{
            console.log('res=>',res);
            // Imgurladd has two parameters imgurladd (URL, name)
            this.$refs.MarkDown.imgUrlAdd('url: 这儿写url->res.url', e.name)           
            }).catch(() => {})
        },
        getImgUrl(e) {
          // get image url
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
### 上传图片 (upload images)
```
uploadImage(e) {
    console.log(e, e.name)
    //Write your own upload method here. E is the file object returned to you by markdown
    const formData = new FormData()
    formData.append('file', e)
    axios({
        url: 'url',
        method: 'post',
        data: formData,
    }).then(res=>{
       console.log('res=>',res);
       // Imgurladd has two parameters imgurladd (URL, name)
       this.$refs.MarkDown.imgUrlAdd('url: 这儿写url->res.url', e.name)           
    }).catch(() => {})
}
```
### 配置项 (setting)
|field|type|Default|descripe|
|:-----|:-----|:-----|:-----|
|toolbars|Object|{}|toolbars|
|readonly|Bollean|false|readonly|
|disabled|Bollean|false|disabled|
|useImgPreview|Bollean|true|image preview|

### toolbars配置项 (toolbars setting)

|field|type|Default|descripe|
|:-----|:-----|:-----|:-----|
|tabBar|Bollean|true|action bar|
|preview|Bollean|true|preview|
|bold|Bollean|true|bold|
|italic|Bollean|true|italic|
|useH|Bollean|true|use Title|
|table|Bollean|true|table|
|alignleft|Bollean|true|Align left|
|aligncenter|Bollean|true|Align center|
|alignright|Bollean|true|Align center|
|code|Bollean|true|code|
|link|Bollean|true|link|
|img|Bollean|true|image|
|del|Bollean|true|del|
|quote|Bollean|true|quote|
|strikethrough|Bollean|true|strikethrough|
|ol|Bollean|true|ol|
|ul|Bollean|true|ul|