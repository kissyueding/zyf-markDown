/**
 * txtareaSelectionStart: 获取鼠标选中的文本
 * @param {*} dom ：这是dom对像，建议this.$refs.dom
 * @param {*} method: 需要执行的方法
 * @returns 
 */
export function txtareaSelectionStart(dom, method){
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
     * @returns 
     */
    const bold = function(value) {
       return value ? `**${value}**` : '**加粗文本**'
    }
    const italic = function(value) {
        return value ? `*${value}*` : '*倾斜文本*'
    }
    // 获取返回的值
    switch(method) {
        case 'bold':
            vas = bold(sel)
            break;
        case 'italic':
            vas = italic(sel)
            break;
    }
    //构造新文本
    var newText=allText.substring(0, start)+vas+allText.substring(finish, allText.length);
    return newText;
}

