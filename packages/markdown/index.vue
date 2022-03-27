<template>
  <div class="markdown-content">
    <div class="tab" v-if="toolbarsValue.tabBar && !readonly">
      <p @click="fontWeightFunction('bold')" class="a-01" v-if="toolbarsValue.bold">
        <img :src="iocnBold" alt="加粗" />
      </p>
      <p @click="fontWeightFunction('italic')" class="a-01" v-if="toolbarsValue.italic">
        <img :src="iconItalic" alt="倾斜" />
      </p>
      <div class="a-02" v-if="toolbarsValue.useH">
        <p class="a-01 aa-01" @click="getOpnHeaderLi">
          <img :src="iconUseH" alt="主题" />
        </p>
        <div class="aa-02" v-if="showHeaderLi">
          <template v-for="(item, index) in headerList">
            <p :key="`aaa${index}`" class="aa-03" @click="fontWeightFunction(item.label)">
              {{ item.label }}
            </p>
          </template>
        </div>
      </div>
      <div class="a-03" v-if="toolbarsValue.table">
        <p class="a-01 aa-01" @click="getOpnTable">
          <img :src="iconTable" alt="table" />
        </p>
        <div class="aa-02" v-if="showTable">
          <div class="aaa-01">
            <span>单元格数：</span>
            <span style="margin-right:4px;">行数</span><input v-model="table.th" type="text" pattern="[1-9]*" style="width:40px;border:solid 1px #ccc;height:20px;text-indent:0.5em;margin-right:6px;" maxlength="2">
            <span style="margin-right:4px;">列数</span><input v-model="table.td" type="text" pattern="[1-9]*" style="width:40px;border:solid 1px #ccc;height:20px;text-indent:0.5em" maxlength="2">
          </div>
          <div class="aaa-01">
            <span>对齐：</span>
            <input type="radio" ref="radioamr" name="radioa" value="mr" checked>默认<br>
            <input type="radio" ref="radioaleft" name="radioa" value="left">左对齐<br>
            <input type="radio" ref="radioacenter" name="radioa" value="center">居中<br>
            <input type="radio" ref="radioaright" name="radioa" value="right">右对齐<br>
          </div>
          <div class="aaa-02">
            <button @click="submitTable">确定</button>
            <button @click="closeTable">取消</button>
          </div>
        </div>
      </div>
      <div class="a-04" v-if="toolbarsValue.alignleft || toolbarsValue.aligncenter || toolbarsValue.alignright">
        <p @click="fontWeightFunction('alignleft')" class="a-01" v-if="toolbarsValue.alignleft">
          <img :src="iconAlignleft" alt="居左" />
        </p>
        <p @click="fontWeightFunction('aligncenter')" class="a-01" v-if="toolbarsValue.aligncenter">
          <img :src="iconAligncenter" alt="居中" />
        </p>
        <p @click="fontWeightFunction('alignright')" class="a-01" v-if="toolbarsValue.alignright">
          <img :src="iconAlignright" alt="居右" />
        </p>
      </div>
      <div class="a-05" v-if="toolbarsValue.preview">
        <p class="a-01 aa-01" v-if="preview" @click="preview=false">
          <img :src="iconEyeClose" alt="闭眼" />
        </p>
        <p class="a-01 aa-01" v-else @click="preview=true">
          <img :src="iconEyeOpen" alt="开眼" />
        </p>
      </div>
      <p @click="fontWeightFunction('code')" class="a-01" v-if="toolbarsValue.code">
        <img :src="iocnCode" alt="代码块" />
      </p>
      <p @click="fontWeightFunction('link')" class="a-01" v-if="toolbarsValue.link">
        <img :src="iconLink" alt="链接" />
      </p>
      
      <div class="a-06" v-if="toolbarsValue.img">
        <p class="a-01" @click="getOpenImage()">
           <img :src="iconImage" alt="上传图片" />
        </p>
        <div v-if="!useImagUrl && showImage" class="a-02">
           <p @click="addImageUrl()">新增图片链接</p>
           <p @click="uploadImage()">上传图片</p>
        </div>
        <div v-if="useImagUrl && showImage" class="a-03">
          <input placeholder="图片名称或描述" v-model="imageName" maxlength="200">
          <input placeholder="图片链接" v-model="imageUrl" maxlength="200">
          <div class="aaa-02">
            <button @click="submitImgUrl">确定</button>
            <button @click="closeImgUrl">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div id="editor">
      <div v-if='!readonly' :class="{'left': preview, 'left-all': !preview }">
        <textarea
          ref="textarea"
          v-if="!readonly"
          :tabindex="tabindex"
          :disabled="inputDisabled"
          v-bind="$attrs"
          @compositionstart="handleCompositionStart"
          @compositionupdate="handleCompositionUpdate"
          @compositionend="handleCompositionEnd"
          @input="handleInput"
          @click="closeAllDialog"
        ></textarea>
      </div>
      <div v-if="readonly || preview" v-html="contentHtml" :class="{'marked':true, 'right': preview, 'right-all': readonly}" @click="closeAllDialog($event)"></div>
    </div>
    <input type="file" ref="img" style="cursor:pointer;position:absolute; top:-11111px;clip:rect(0 0 0 0);" accept="image/*" @change="uploadImg($event, 1)" >
    <preview v-if="isShowPreview" :currentImg="currentImg" @closeImage="closeImage"></preview>
  </div>
</template>
<script>
// marked.min.js
import { marked } from "marked/marked.min.js";
import { isKorean } from "./js/shared";
import { txtareaSelectionStart } from "./js/mouce";
import { getIcon } from "./js/icon.js"
import preview from './preview.vue'
export default {
  name: "MarkDown",
  componentName: "MarkDown",
  components: {
    preview
  },
  data() {
    return {
      isComposing: false,
      content: "",
      contentHtml: "",
	/** header配置 */
      headerList: [
        {
          label: 'H1',
          value: '1'
        },
        {
          label: 'H2',
          value: '2'
        },
        {
          label: 'H3',
          value: '3'
        },
        {
          label: 'H4',
          value: '4'
        },
        {
          label: 'H5',
          value: '5'
        },
        {
          label: 'H6',
          value: '6'
        }
      ],
      showHeaderLi: false,
      toolbarsValue: {
        preview: this.toolbars.preview ? this.toolbars.preview : true,
        tabBar: this.toolbars.tabBar ? this.toolbars.tabBar : true,
        bold: this.toolbars.bold ? this.toolbars.bold : true, // 加粗
        italic: this.toolbars.italic ? this.toolbars.italic : true, // 倾斜
        useH: this.toolbars.useH ? this.toolbars.useH : true, // 使用标题
        table: this.toolbars.table ? this.toolbars.table : true, // 表格
        alignleft: this.toolbars.alignleft ? this.toolbars.alignleft : true, // 居左
        aligncenter: this.toolbars.aligncenter ? this.toolbars.aligncenter : true, // 居中
        alignright: this.toolbars.alignright ? this.toolbars.alignright : true, // 居右
        code: this.toolbars.code ? this.toolbars.code : true, // 代码块
        link: this.toolbars.link ? this.toolbars.link : true, // 链接
        img: this.toolbars.img ? this.toolbars.img : true // 启用图片
      },
      preview: true,
      /** table */
      table: {
        td: 3,
        th: 3
      },
      showTable: false,
      /** iamge */
      useImagUrl: false,
      imageName: '',
      imageUrl: '',
      showImage: false,
      isShowPreview: false
    }
  },
  watch:{
    nativeInputValue() {
      this.setNativeInputValue();
    },
    value(val) {
      let asd = JSON.parse(JSON.stringify(val))
      // 处理居中，居左，居右
      asd = asd.replace(/::: hljs-left/g, '<div style="text-align:left">')
      asd = asd.replace(/::: hljs-right/g, '<div style="text-align:right">')
      asd = asd.replace(/::: hljs-center/g, '<div style="text-align:center">')
      asd = asd.replace(/:::/g, '</div>')
      // 处理图片
      // const rendererMD = new marked.Renderer()
      // rendererMD.image = function(href, title, text) {
      //   console.log(href, title, text)
      //   return `<img οnclick="showMarkedImage(event, '${href}')" src="${href}" alt="${text}" title="${
      //     title ? title : ''
      //   }">`
      // }
      this.contentHtml = marked(asd);

      // textarea自适应高度
      this.resizeHeight()
    },
    toolbars: {
      handler(val) {
        this.toolbarsValue = { ...val }
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    useImgPreview: {
      type: Boolean,
      default: true,
    },
    tabindex: String,
    toolbars: {
      type: Object,
      default: () => {
        return {
          tabBar: true, // 启用操作栏
          preview: true, // 开启预览
          bold: true, // 加粗
          italic: true, // 倾斜
          useH: true, // 使用标题
          table: true, // 表格
          alignleft: true, // 居左
          aligncenter: true, // 居中
          alignright: true, // 居右
          code: true, // 代码块
          link: true, // 链接
          img: true // 启用图片
        }
      },
    }
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      // 默认：true， 启用Github的风格
      gfm: true,
      // 默认：true，启动表格， 前提必须gfm: true,
      tables: true,
      // 默认：false，启用回车换行，前提必须gfm: true,
      breaks: true,
      // 默认：false，尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
      pedantic: false,
      // 默认：false，对输出进行过滤(清理)，将忽略任何已经输入的html代码(标签)
      sanitize: false,
      // 默认：true，使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉
      smartLists: true,
      // 默认：false，使用更为时髦的标点，比如在引用语法中加入破折号。
      smartypants: false
    });
    // const rendererMD = new marked.Renderer()
    // rendererMD.image = function(href, title, text) {
    //   console.log(href, title, text)
    //   return `<img οnclick="showMarkedImage(event, '${href}')" src="${href}" alt="${text}" title="${
    //     title ? title : ''
    //   }">`
    // }
    this.contentHtml = marked(this.value)
    this.setNativeInputValue();
  },
  computed: {
    inputDisabled() {
      return this.disabled;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    iocnBold() {
      return getIcon('icon_bold')
    },
    iconItalic() {
      return getIcon('icon_italic')
    },
    iconUseH() {
      return getIcon('icon_useH')
    },
    iconTable() {
      return getIcon('icon_table')
    },
    iconAlignleft() {
      return getIcon('icon_alignleft')
    },
    iconAligncenter() {
      return getIcon('icon_aligncenter')
    },
    iconAlignright() {
      return getIcon('icon_alignright')
    },
    iconEyeClose() {
      return getIcon('icon_eye_close')
    },
    iconEyeOpen() {
      return getIcon('icon_eye_open')
    },
    iocnCode() {
      return getIcon('icon_code')
    },
    iconLink() {
      return getIcon('icon_link')
    },
    iconImage() {
      return getIcon('icon_image')
    }
  },
  filters: {
    markeds(val) {
      return val;
    },
  },
  methods: {
    closeAllDialog(e) {
      this.showTable = false
      this.showHeaderLi = false
      this.showImage = false
      if(e.target.tagName === 'IMG') {
        this.$emit('getImgUrl', e.target.src)
        if( this.useImgPreview ) {
          this.currentImg = e.target.src
          this.isShowPreview = true
        }
      }
      
    },
    /** textarea */
    handleCompositionStart(event) {
      this.$emit('compositionstart', event);
      this.isComposing = true;
    },
    handleCompositionUpdate(event) {
      this.$emit('compositionupdate', event);
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || '';
      this.isComposing = !isKorean(lastCharacter);
    },
    handleCompositionEnd(event) {
      this.$emit('compositionend', event);
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      if (this.isComposing) return;
      if (event.target.value === this.nativeInputValue) return;
      this.$emit('input', event.target.value);
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    resizeHeight () {
      let _this = this
      this.$nextTick(() => {
        var textArea = _this.$refs.textarea
        var scrollHeight = textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
        var height = textArea.offsetHeight // 屏幕上显示的高度
        if (height <= scrollHeight) {
          textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
          textArea.style.height = textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
        }
      })
    },
    /** tab */
    fontWeightFunction(method) {
      this.showHeaderLi = false
      this.showTable = false
      this.showImage = false
      let avalue = txtareaSelectionStart(
        this.$refs.textarea,
        method
      );
      this.$refs.textarea.value = avalue
      this.$emit("input", this.$refs.textarea.value);
    },
    getOpnHeaderLi() {
      this.showTable = false
      this.showImage = false
      this.showHeaderLi = this.showHeaderLi ? false : true
    },
    /** tab-table */
    getOpnTable() {
      this.showHeaderLi = false
      this.showImage = false
      this.showTable = this.showTable ? false : true
    },
    closeTable() {
      this.showTable = false
    },
    submitTable() {
      // 获取单选框的值，确定选中的表格样式
      let radioamr = this.$refs.radioamr
      let radioaleft = this.$refs.radioaleft
      let radioacenter = this.$refs.radioacenter
      let radioaright = this.$refs.radioaright
      let styles = 'mr'
      if(radioamr.checked) {
        styles = 'mr'
      }
      if(radioaleft.checked) {
        styles = 'left'
      }
      if(radioacenter.checked) {
        styles = 'center'
      }
      if(radioaright.checked) {
        styles = 'right'
      }
      let avalue = txtareaSelectionStart(
        this.$refs.textarea,
        'table',
        this.table.th,
        this.table.td,
        styles
      );
      this.$refs.textarea.value = avalue
      this.$emit("input", this.$refs.textarea.value);
      this.showTable = false
    },
    /** img */
    uploadImage() {
      this.showImage = false
      this.$refs.img.value = ''
      this.$nextTick(function() {
        this.$refs.img.click()
      })
    },
    uploadImg(e) {
      // 上传图片
      const file = e.target.files[0]
      this.$emit('uploadImage', file)
    },
    imgUrlAdd(imgUrl, imgName) {
      let avalue = txtareaSelectionStart(
        this.$refs.textarea,
        'imgAdd',
        '',
        '',
        '',
        imgUrl,
        imgName  
      );
      this.$refs.textarea.value = avalue
      this.$emit("input", this.$refs.textarea.value);
    },
    submitImgUrl() {
      let avalue = txtareaSelectionStart(
        this.$refs.textarea,
        'imgAdd',
        '',
        '',
        '',
        this.imageUrl ? this.imageUrl : '图片链接',
        this.imageName ? this.imageName : '图片名称或描述' 
      );
      this.$refs.textarea.value = avalue
      this.$emit("input", this.$refs.textarea.value);
      this.showImage = false
    },
    closeImgUrl() {
      this.useImagUrl = false
    },
    addImageUrl() {
      this.$refs.img.value = ''
      this.imageName = ''
      this.imageUrl = ''
      this.useImagUrl = true
    },
    getOpenImage() {
      this.useImagUrl = false
      this.showTable = false
      this.showHeaderLi = false
      this.showImage = this.showImage ? false : true
    },
    closeImage() {
      this.isShowPreview = false
    }
  },
};
</script>
<style lang="scss" rel="stylesheet/scss">
.markdown-content{
  width:100%;
  height:auto;
  .tab{
    width:100%;
    background: #ffffff;
    height:auto;
    border-bottom: solid 1px #f1f1f1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    .a-01{
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      margin-top:0px;
      margin-bottom: 0px;
      cursor: pointer;
      border-radius: 4px;
      img{
        width:14px;
        height: 14px;
      }
    }
    .a-01:hover{
      background: #f1f1f1;
    }
    .a-02{
      width: 30px;
      height: 30px;
      position: relative;
      .aa-01{
        width:30px;
        height:30px;
        position: absolute;
        top:0px;
        left:0px;
      }
      .aa-02{
        width:40px;
        background: #ffffff;
        z-index: 1000;
        position: absolute;
        top:30px;
        left:0px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        p{
          cursor: pointer;
          padding: 10px 0;
          margin-top:0px;
          margin-bottom:0px;
          font-size:14px;
          color:#626364;
          text-align: center;
        }
        p:hover{
          color:#409EFF;
          background:#d9ecff;
        }
      }
    }
    .a-03{
      width: 30px;
      height: 30px;
      position: relative;
      z-index:10000;
      .aa-01{
        width:30px;
        height:30px;
        position: absolute;
        top:0px;
        left:0px;
      }
      .aa-02{
        width:320px;
        height:130px;
        position: absolute;
        top:30px;
        left:0px;
        background: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        padding:20px;
        box-sizing: border-box;
        .aaa-01{
          width:100%;
          height:auto;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          font-size:14px;
          margin-bottom: 10px;
        }
        .aaa-02{
          width:100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top:10px;
          padding-bottom: 10px;
          button{
            cursor: pointer;
          }
          button:nth-of-type(1){
             background: #409EFF;
             color:#ffffff;
             border-radius: 13px;
             border: solid 1px #409EFF;
             width:60px;
             height:26px;
             margin-right:10px;
          }
          button:nth-of-type(2){
             background: #d9ecff;
             color:#409EFF;
             border-radius: 13px;
             border: solid 1px #409EFF;
             width:60px;
             height:26px;
          }
          button:active{
            transform:scale(0.97);
          }
        }
      }
    }
    .a-04{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 30px;
      flex-wrap: nowrap;
      border-left:solid 2px #ccc; 
      margin-left:10px;
      padding-left:10px;
    }
    .a-05{
      height: 30px;
      border-left:solid 2px #ccc; 
      margin-left:10px;
      padding-left:10px;
    }
    .a-06{
      width: 30px;
      height: 30px;
      position: relative;
      z-index:10000;
      .a-01{
        width:30px;
        height:30px;
        position: absolute;
        top:0px;
        left:0px;
      }
      .a-02{
        width:120px;
        background: #ffffff;
        height:80px;
        font-size:14px;
        z-index: 1000;
        position: absolute;
        top:30px;
        left:0px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        p{
          cursor: pointer;
          padding: 10px 0;
          margin-top:0px;
          margin-bottom:0px;
          font-size:14px;
          color:#626364;
          text-align: center;
        }
        p:hover{
          color:#409EFF;
          background:#d9ecff;
        }
      }
      .a-03{
        width:220px;
        background: #ffffff;
        height:140px;
        font-size:14px;
        z-index: 1000;
        position: absolute;
        top:30px;
        left:0px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        text-indent: 0.5em;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        input{
          width:200px;
          height:30px;
          margin-bottom: 10px;
          text-indent: 0.5rem;
          border-radius: 6px;
          border:solid 1px #cccc;
        }
        button{
            cursor: pointer;
            margin-top:5px;
          }
          button:nth-of-type(1){
             background: #409EFF;
             color:#ffffff;
             border-radius: 13px;
             border: solid 1px #409EFF;
             width:60px;
             height:26px;
             margin-right:10px;
          }
          button:nth-of-type(2){
             background: #d9ecff;
             color:#409EFF;
             border-radius: 13px;
             border: solid 1px #409EFF;
             width:60px;
             height:26px;
          }
          button:active{
            transform:scale(0.97);
          }
      }
    }
  }
  #editor {
    width:100%;
    height:auto;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: nowrap;
    .left{
      width:50%;
      background: #f1f1f1;
      border-right: 1px solid #ccc;
      textarea{
        width:100%;
        background: #f1f1f1;
        border-right: 0px;
      }
    }
    .left-all{
      width:100%;
      background: #f1f1f1;
      textarea{
        width:100%;
        background: #f1f1f1;
        border-right: 0px;
      }
    }
    .right-all{
      width:100%;
    }
    .right{
      width:50%;
      word-wrap:break-word;
      padding:20px;
      box-sizing: border-box;
    }
    img{
      cursor: pointer;
    }
  }
}
</style>
<style type="text/css" rel="stylesheet/css">
html,
body,
#editor {
  margin: 0;
  height: auto;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
  width: 100%;
  
}
#editor .left > textarea,
.left-all > textarea,
.right-all > .marked,
.right >.marked {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 20px;
}
#editor .left > textarea,  .left-all > textarea{
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}
.marked > p > code {
  padding: 4px 8px;
  font-size: 14px;
  color: #657b83;
  background-color: #f9f2f4;
  border-radius: 4px;
}
.marked > pre {
  overflow: auto;
  display: block;
  padding: 10px 20px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 20px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre;
  white-space: pre-wrap;
  background-color: #f1f3f1;
  border-left:10px solid #e9edec;
  background: #f1f3f1;
  color: #066;
}
.marked > table {
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 16px;
}
.marked > table thead th {
  border: 1px solid #dddddd;
  height: 30px;
  padding: 0 10px;
}
.marked > table tbody td {
  height: 30px;
  border: 1px solid #dddddd;
  padding: 0 10px;
  word-break:break-all;
}
.marked > table tbody tr:hover {
  background: #f5f5f5;
}
.marked > h1 {
  font-size: 48px;
}
.marked > h2 {
  font-size: 42px;
}
.marked > img {
  height: auto;
  max-width: 100%;
  cursor: pointer;
}
.marked > p > a {
  color: #0f6bc7;
}
.marked > blockquote {
  padding: 10px 15px;
  margin-bottom: 20px;
  background-color: whitesmoke;
  border-left: 4px solid #999999;
  word-break: break-word;
  font-size: 15px;
  font-weight: 100;
  line-height: 30px;
}
input,button{
  outline:none;
}
</style>