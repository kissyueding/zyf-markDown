# zyf-markdown
本插件只是简易版markdown工具，暂未兼容vue3.0。暂不支持图片上传功能，后续会持续支持该功能，也会不断优化。

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
    <markDown v-model="content" :toolbars="toolbars" :readonly="readonly" :disabled="false" style="width:100%;height:100%;" />
</div>
</template>
<script>
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

### 配置项
|字段|类型|默认值|描述|
|:-----|:-----|:-----|:-----|
|toolbars|Object|{}|顶部操作栏，配置见操作栏配置|
|readonly|Bollean|false|是否只读|
|disabled|Bollean|false|是否不可编辑|

### toolbars配置项

|字段|类型|默认值|描述|
|:-----|:-----|:-----|:-----|
|tabBar|Bollean|true|启用操作栏|
|preview|Bollean|false|是否开启预览|
|bold|Bollean|false|是否开启加粗|
|italic|Bollean|true|启用倾斜字体|
|useH|Bollean|false|是否使用不同主题大小的字体|
|table|Bollean|false|是否使用表格|
|alignleft|Bollean|true|居左对齐|
|aligncenter|Bollean|false|居中对齐|
|alignright|Bollean|false|居右对齐|
|code|Bollean|false|代码|
|link|Bollean|false|链接|