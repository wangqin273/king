# 全选、反选
```
<body>
<input type="checkbox" class="all" id='all'><label for="all">全选/全不选</label>
<input type="checkbox" class="uncheck" id='uncheck'><label for="uncheck">反选</label>
<div class="box">
<input type="checkbox" >吃饭
<br>
<input type="checkbox">睡觉
<br>
<input type="checkbox">打豆豆
</div>
<script>
/*获取相应节点*/
var box=document.querySelector('.box'),
input=box.querySelectorAll('input'),
lens = input.length,/*复选框总个数*/
all=document.getElementById('all'),/*全选按钮*/
uncheck = document.getElementById("uncheck"); /*反选按钮*/

for (var i=0;i<lens;i++)input[i].onclick = function () {
var length = box.querySelectorAll("input:checked").length;
all.checked = !(length < lens);
uncheck.checked = false;
}
//全选按钮
all.onclick=function () {
for(var i=0;i<lens;i++){
input[i].checked=this.checked
}
//同时 反选按钮 状态 未选中
uncheck.checked = false;
}

/*反选按钮*/
uncheck.onclick = function () {
for (var i = 0; i < lens; i++) {
input[i].checked =  !input[i].checked;
//必须在反选按钮改变复选框状态之后判断是否全部选中
var len = box.querySelectorAll("input:checked").length;
all.checked = !(len < lens);

console.log(length);

}

}
</script>
</body>
```

[全选、反选][1]


[1]: https://codepen.io/kingdil/pen/VQvwQe
