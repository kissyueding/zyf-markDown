/**
 * txtareaSelectionStart: 获取鼠标选中的文本
 * @param {*} dom ：这是dom对像，建议this.$refs.dom
 * @param {*} method: 需要执行的方法
 * @param {*} th: 行数 - table需要
 * @param {*} td: 列数 - table需要
 * @param {*} styles: 表格样式 - table需要
 * @param {*} imgUrl: 图片url - 上传图片需要
 * @param {*} imgDesc：图片名称 - 上传图片需要
 * @returns 
 */
export function txtareaSelectionStart(dom, method, th, td, styles, imgUrl, imgDesc){
    let vas
    var txtarea = dom;
    //获取textarea中选择文本开头字符的坐标
    var start = txtarea.selectionStart;
    //获取textarea中选择文本结尾字符的坐标
    var finish = txtarea.selectionEnd;
    // 获取值
    var allText = txtarea.value;
    //截取textarea中选择的文本
    var sel = allText? allText.substring(start, finish) : '';


    /**
     * 方法
     * @param {*} bold：加粗 
     * @param {*} italic：倾斜 
     * @param {*} H1：主题1 
     * @returns 
     */
    const bold = function(value) {
       return value ? `**${value}**` : '**加粗文本**'
    }
    const italic = function(value) {
        return value ? `*${value}*` : '*倾斜文本*'
    }
    const H1 = function(value) {
        return value ? `# ${value}` : '# 主题1'
    }
    const H2 = function(value) {
        return value ? `## ${value}` : '## 主题2'
    }
    const H3 = function(value) {
        return value ? `### ${value}` : '### 主题3'
    }
    const H4 = function(value) {
        return value ? `##### ${value}` : '##### 主题4'
    }
    const H5 = function(value) {
        return value ? `###### ${value}` : '###### 主题5'
    }
    const H6 = function(value) {
        return value ? `####### ${value}` : '####### 主题6'
    }
    const table = function() {
        let theader = '|'
        let tbody = '|'
        let thBody = ''
        let tgj = '|'
        if(td) {
          for(let i=0;i<td;i++) {
            tbody = tbody + 'column' + i + '|'
            theader = theader + 'column' + i + '|'
            if(styles === 'mr'){
                tgj = tgj + '-|'
            }
            if(styles === 'left'){
                tgj = tgj + ':-----|'
            }
            if(styles === 'center'){
                tgj = tgj + ':----:|'
            }
            if(styles === 'right'){
                tgj = tgj + '----:|'
            }
          }
        }
        if(th) {
            for(let i=0;i<th;i++) {
                thBody = thBody + tbody + '\n'
            }
        }
        let reg = /^([1-9][0-9]*)$/
        if(!reg.test(td) || !reg.test(th)) {
            return '\n|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
        }
        if(!td || !th) {
            return '\n|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
        } else {
            return '\n' + theader + '\n' + tgj + '\n' + thBody + '\n'  
        }      
    }
    const alignleft = function(value) {
        return value ? `\n::: hljs-left\n\n ${value}\n\n:::\n` : '\n::: hljs-left\n\n居左\n\n:::\n'
    }
    const aligncenter = function(value) {
        return value ? `\n::: hljs-center\n\n ${value}\n\n:::\n` : '\n::: hljs-center\n\n居中\n\n:::\n'
    }
    const alignright = function(value) {
        return value ? `\n::: hljs-right\n\n ${value}\n\n:::\n` : '\n::: hljs-right\n\n居右\n\n:::\n'
    }
    const code = function(value) {
        return value ? '\n```' + '\n' +  value + '\n' + '```' + '\n' : '\n```\n代码块\n```\n'
    }
    const link = function() {
        return '\n[链接描述：示例-百度](https://www.baidu.com)\n'
    }
    const del = function(value) {
        return value ? '\n~~' +  value + '~~\n' : '\n~~删除线~~\n'
    }
    const quote = function(value) {
        return value ? '\n> ' +  value + '\n' : '\n> 段落引用\n'
    }
    const ol = function(value) {
        return value ? '\n1. ' +  value + '\n' : '\n1. 有序列表\n'
    }
    const ul = function(value) {
        return value ? '\n- ' +  value + '\n' : '\n- 无序列表\n'
    }
    const strikethrough = function(value) {
        return value ? '\n------------\n' +  value + '\n' : '\n------------\n'
    }
    // 获取返回的值
    switch(method) {
        case 'bold':
            vas = bold(sel)
            break;
        case 'italic':
            vas = italic(sel)
            break;
        case 'H1' :
            vas = H1(sel)
            break;
        case 'H2' :
            vas = H2(sel)
            break;
        case 'H3' :
            vas = H3(sel)
            break;
        case 'H4' :
            vas = H4(sel)
            break;
        case 'H5' :
            vas = H5(sel)
            break;
        case 'H6' :
            vas = H6(sel)
            break;
        case 'table' :
            vas = table(sel)
            break;
        case 'alignleft' :
            vas = alignleft(sel)
            break;
        case 'aligncenter' :
            vas = aligncenter(sel)
            break;
        case 'alignright' :
            vas = alignright(sel)
            break;
        case 'code':
            vas = code(sel)
            break;
        case 'link':
            vas = link(sel)
            break;
        case 'imgAdd':
            vas = '\n![' + imgDesc + '](' + imgUrl + ')\n'
            break;
        case 'del':
            vas = del(sel)
            break;
        case 'quote':
            vas = quote(sel)
            break;
        case 'ol':
            vas = ol(sel)
            break;
        case 'ul':
            vas = ul(sel)
            break;
        case 'strikethrough':
            vas = strikethrough(sel)
            break;
    }
    //构造新文本
    var newText=allText.substring(0, start)+vas+allText.substring(finish, allText.length);
    return newText;
}
