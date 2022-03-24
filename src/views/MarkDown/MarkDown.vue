<template>
	<div>
		<div class="tab">
			<p @click="fontWeightFunction('bold')">
				<img src="../../assets/icon_bold.png" alt="加粗">
			</p>
			<p @click="fontWeightFunction('italic')">
				<img src="../../assets/icon_italic.png" alt="倾斜">
			</p>
			<p>
				<img src="../../assets/icon_header.png" alt="主题">
			</p>
		</div>
		<div id="editor">
			<textarea ref="textarea" v-if="!readonly" v-model="content" :tabindex="tabindex" :disabled="inputDisabled"
                @compositionstart="handleCompositionStart"
                @compositionupdate="handleCompositionUpdate"
                @compositionend="handleCompositionEnd"
				@input="inputFunction"
            ></textarea>
			<div v-html="contentHtml" class="marked"></div>
		</div>
	</div>
</template>
<script>
    // marked.min.js
	import { marked } from 'marked/marked.min.js'
    import { isKorean } from './js/shared';
	import { txtareaSelectionStart } from './js/mouce'
	export default{
        name: 'MarkDown',
        componentName: 'MarkDown',
		data () {
			return {
                isComposing: false,
				content: '',
				contentHtml: '',
				nativeInputValue: ''
			}
		},
		props: {
            value: [String, Number],
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            tabindex: String
        },
		mounted(){
			marked.setOptions({
				renderer: new marked.Renderer(),
				highlight: null,
				pedantic: true,
				gfm: true,
				tables: true,
				breaks: true,
				sanitize: true,
				smartLists: true,
				smartypants: true,
				xhtml: true,
				headerIds:true,
				headerPrefix: true,
				langPrefix: true,
				sanitizer: true,
				silent: true,
				mangle: true
			})
		},
        computed: {
            inputDisabled() {
                return this.disabled;
            }
        },
		filters: {
			markeds(val){
				return val
			}
		},
		methods: {
			/** textarea */
            handleInput(event) {
                // should not emit input during composition
                // see: https://github.com/ElemeFE/element/issues/10516
                if (this.isComposing) return;

                // hack for https://github.com/ElemeFE/element/issues/8548
                // should remove the following line when we don't support IE
                if (event.target.value === this.nativeInputValue) return;

                this.$emit('input', event.target.value);

                // ensure native input value is controlled
                // see: https://github.com/ElemeFE/element/issues/12850
                this.$nextTick(this.setNativeInputValue);
            },
            handleCompositionStart() {
                this.isComposing = true;
            },
            handleCompositionUpdate(event) {
                const text = event.target.value;
                const lastCharacter = text[text.length - 1] || '';
                this.isComposing = !isKorean(lastCharacter);
            },
            handleCompositionEnd(event) {
                if (this.isComposing) {
                    this.isComposing = false;
                    this.handleInput(event);
                }
            },
            handleChange(event) {
                this.$emit('change', event.target.value);
            },
			inputFunction() {
				this.contentHtml = marked(this.content)
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
			/** tab */
			fontWeightFunction(method) {
				this.nativeInputValue = txtareaSelectionStart(this.$refs.textarea, method)
				this.$emit('input', this.$refs.textarea.value);
				this.$nextTick(this.setNativeInputValue);
				this.contentHtml = marked(this.nativeInputValue)
			}
		}
	}
</script>
<style type="text/css">
	html, body, #editor {
		margin: 0;
		height: 600px;
		font-family: 'Helvetica Neue', Arial, sans-serif;
		color: #333;
		width: 100%;
	}
	#editor > textarea, .marked{
		display: inline-block;
		width: 49%;
		height: 100%;
		vertical-align: top;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0 20px;
	}
	#editor> textarea{
		border: none;
		border-right: 1px solid #ccc;
		resize: none;
		outline: none;
		background-color: #f6f6f6;
		font-size: 14px;
		font-family: 'Monaco', courier, monospace;
		padding: 20px;
	}
	.marked > p > code {
		padding: 4px 8px;
		font-size: 14px;
		color: #657b83;
		background-color: #f9f2f4;
		border-radius: 4px;
	}
	.marked > pre{
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
		border: 1px solid rgba(0,0,0,0.15);
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		background: #fdf6e3;
		color: #657b83;
	}
	.marked > table{
		margin-bottom: 20px;
		border: 1px solid #dddddd;
		width: 100%;
		background-color: transparent;
		border-collapse: collapse;
		border-spacing: 0;
		font-size: 16px;
	}
	.marked > table thead th{
		border: 1px solid #dddddd;
		height: 30px; 
		padding: 0 10px;
	}
	.marked > table tbody td{
		height: 30px;
		border: 1px solid #dddddd;
		padding: 0 10px;
	}
	.marked > table tbody tr:hover{
		background: #f5f5f5;
	}
	.marked >h1{
		font-size: 48px;
	}
	.marked >h2{
		font-size: 42px;
	}
	.marked > img{
		width: 100%;
	}
	.marked > blockquote{
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