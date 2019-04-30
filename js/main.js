
var result = `/* 
* 面试官你好，我是Blake
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/

*{
 transition: all 1s;
}
html{
 background: #eee;
}
#code{
 border: 1px solid #aaa;
 padding: 16px;
}

/* 我需要一点代码高亮 */

.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个呼吸效果 */

#code{
 animation: breath 0.5s infinite alternate-reverse;
}

/* 现在正式开始 */

/* 我需要一张白纸 */
`;

var result2 = `#code-wrapper{
  width: 50%; 
  left: 0; 
  position: fixed; 
  height: 100%;
 }
 #paper > .content {
  display: block;
 }
 
 /* 于是我就可以在白纸上写字了，请看右边 */
  `;

var result3 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`;

var result4 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

var md = `
# 自我介绍

我叫 Blake
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`;

function writeCode(prefix,result,fn){
  let n = 0;
  let domCode = document.querySelector('#code');
  let timer = setInterval(()=>{
    n += 1;
    domCode.innerHTML = Prism.highlight(prefix + result.substring(0,n), Prism.languages.css, 'css');
  /*
  code.innerHTML = code.innerHTML.replace('html','<span style="color:teal;">html</span>')
  */
    niubi.innerHTML = prefix + result.substring(0,n);
    //domCode.scrollTop = 10000;  //自动下拉
    domCode.scrollTop = domCode.scrollHeight;
    if(n>=result.length){
      window.clearInterval(timer);
      fn && fn.call();
    } 
  },35);
};

function writeMarkdown(markdown,fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0;
  let timer = setInterval(()=>{
    n += 1;
    domPaper.innerHTML = markdown.substring(0,n);
    //domCode.scrollTop = 10000;  //自动下拉
    domPaper.scrollTop = domPaper.scrollHeight;
    if(n>=markdown.length){
      window.clearInterval(timer);
      fn && fn.call();
    } 
  },35);
}

writeCode(
  '',
  result,
  ()=>{createPaper(()=>{
    writeCode(result,result2,()=>{
      writeMarkdown(md,()=>{
        writeCode(result+result2,result3,()=>{
          convertMarkdownToHtml(()=>{
            writeCode(result+result2+result3,result4);
          });
        });
      });
    });
  });
});

function createPaper(fn){
  var paper = document.createElement('div');
  paper.id = 'paper';
  var content = document.createElement('pre');
  content.className = 'content';
  paper.appendChild(content);
  document.body.appendChild(paper);
  fn && fn.call();
};

//将markdown变成html
function convertMarkdownToHtml(fn){
  var div = document.createElement('div');
  div.className = 'html markdown-body';
  div.innerHTML = marked(md);
  let markdownContainer = document.querySelector('#paper > .content');
  markdownContainer.replaceWith(div);
  fn && fn.call();
};
