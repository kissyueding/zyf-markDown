<template>
  <div class="markdown-content">
    <div class="tab">
      <p @click="fontWeightFunction('bold')" class="a-01">
        <img src="../../assets/icon_bold.png" alt="加粗" />
      </p>
      <p @click="fontWeightFunction('italic')" class="a-01">
        <img src="../../assets/icon_italic.png" alt="倾斜" />
      </p>
      <div class="a-02">
        <p class="a-01 aa-01" @click="getOpnHeaderLi">
          <img src="../../assets/icon_header.png" alt="主题" />
        </p>
        <div class="aa-02" v-if="showHeaderLi">
          <template v-for="(item, index) in headerList">
            <p :key="`aaa${index}`" class="aa-03" @click="fontWeightFunction(item.label)">
              {{ item.label }}
            </p>
          </template>
        </div>
      </div>
      <div class="a-03">
        <p class="a-01 aa-01" @click="getOpnTable">
          <img src="../../assets/icon_table.png" alt="table" />
        </p>
        <div class="aa-02" v-if="showTable">
          <div class="aaa-01">
            <span>单元格数：</span>
            <span>行数</span><input style="width:40px;" maxlength="2">
            <span>列数</span><input style="width:40px;" maxlength="2">
          </div>
          <div class="aaa-01">
            <span>对齐：</span>
            <input type="radio" name="radioa" value="mr" checked>默认<br>
            <input type="radio" name="radioa" value="left">左对齐<br>
            <input type="radio" name="radioa" value="center">居中<br>
            <input type="radio" name="radioa" value="right">右对齐<br>
          </div>
          <div class="aaa-02">
            <button>确定</button>
            <button>取消</button>
          </div>
        </div>
      </div>
    </div>
    <div id="editor">
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
      ></textarea>
      <div v-html="contentHtml" class="marked"></div>
      <!-- <pre v-html="contentHtml">要输出的文本 </pre > -->
    </div>
  </div>
</template>
<script>
// marked.min.js
import { marked } from "marked/marked.min.js";
import { isKorean } from "./js/shared";
import { txtareaSelectionStart } from "./js/mouce";
export default {
  name: "MarkDown",
  componentName: "MarkDown",
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
      showTable: false
    }
  },
  watch:{
    contentHtml() {
      // textarea自适应高度
      this.resizeHeight()
    },
    nativeInputValue() {
      this.setNativeInputValue();
    },
    value(val) {
      this.contentHtml = marked(val);
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
    tabindex: String,
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      // 默认：true， 启用Github的风格
      gfm: true,
      // 默认：true，启动表格， 前提必须gfm: true,
      tables: true,
      // 默认：false，启用回车换行，前提必须gfm: true,
      breaks: false,
      // 默认：false，尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
      pedantic: false,
      // 默认：false，对输出进行过滤(清理)，将忽略任何已经输入的html代码(标签)
      sanitize: false,
      // 默认：true，使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉
      smartLists: true,
      // 默认：false，使用更为时髦的标点，比如在引用语法中加入破折号。
      smartypants: false
    });
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
  },
  filters: {
    markeds(val) {
      return val;
    },
  },
  methods: {
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
      let avalue = txtareaSelectionStart(
        this.$refs.textarea,
        method
      );
      this.$refs.textarea.value = avalue
      this.$emit("input", this.$refs.textarea.value);
    },
    getOpnHeaderLi() {
      this.showTable = false
      this.showHeaderLi = this.showHeaderLi ? false : true
    },
    getOpnTable() {
      this.showHeaderLi = false
      this.showTable = this.showTable ? false : true
    }
  },
};
</script>
<style scoped lang="scss">
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
        width:300px;
        height:100px;
        position: absolute;
        top:30px;
        left:0px;
        background: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        padding:10px;
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
      }
    }
  }
}
</style>
<style type="text/css">
html,
body,
#editor {
  margin: 0;
  height: auto;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
  width: 100%;
}
#editor > textarea,
.marked {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 20px;
}
#editor > textarea {
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
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 20px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre;
  white-space: pre-wrap;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  background: #fdf6e3;
  color: #657b83;
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
  width: 100%;
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
</style>