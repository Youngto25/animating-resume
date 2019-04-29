
var result = `*{
  transition: all 1s;
}
html{
  background: rgb(222,222,222);
}
pre{
  padding: 16px;
  border: 1px solid black;
}
/*
 *我现在需要一些代码高亮
 */
.token.selector{
  color: #690;
}
.token.property{
  color: #905;
}
.token.punctuation{
  color: #999;
}
/*
 *加点3D效果
 */
#code{
  transform: rotate(360deg);
}
/*
 *现在需要一张白纸
 */
#code{
  position: fixed;
  left: 0;
  width: 50%;
  height: 100%;
}
#paper{
  position: fixed;
  right: 0;
  width: 50%;
  height: 100%;
  background: black;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#paper .content{
  background: white;
  width: 100%;
  height: 100%;
}
`;

var result2 = `
  `;

var md = `
# 标题一
# 标题一
# 标题一
# 标题一
# 标题一
# 标题一
# 标题一
# 标题一
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
  },10);
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
  },10);
}

writeCode(
  '',
  result,
  ()=>{createPaper(()=>{
    writeCode(result,result2,()=>{
      writeMarkdown(md);
    });
  });
});

function createPaper(fn){
  var paper = document.createElement('div');
  paper.id = 'paper';
  document.body.appendChild(paper);
  var content = document.createElement('pre');
  content.className = 'content';
  paper.appendChild(content);
  fn && fn.call();
}
