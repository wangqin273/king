# 作用
html2canvas可以通过纯JS对浏览器端经行截屏，但截图的精确度还有待提高，部分css不可识别，所以在canvas中不能完美呈现原画面样式

# 支持的浏览器
1. Firefox 3.5+
2. Google Chrome
3. Opera 12+
4. IE9+
5. Safari 6+

# 基本语法
```
/*参数：
* #screenshots 所需要截图的元素id，截图后要执行的函数，
* backgroundColor 配置项背景色
* canvas为截图后返回的最后一个canvas
*/
function screenshotsImg(){
       html2canvas(document.querySelector("#screenshots"),{
            backgroundColor: 'transparent',// 设置背景透明
        }).then(canvas => {
            canvasTurnImg(canvas) //保存的图片格式转换方法
        });
    }
```
# 可用配置项
<table>
<thead>
<tr>
<th>参数名称</th>
<th>类型</th>
<th>默认值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>allowTaint</td>
<td>boolean</td>
<td>false</td>
<td>Whether to allow cross-origin images to taint the canvas---允许跨域</td>
</tr>
<tr>
<td>background</td>
<td>string</td>
<td>#fff</td>
<td>Canvas background color, if none is specified in DOM. Set undefined for transparent---canvas的背景颜色，如果没有设定默认白色</td>
</tr>
<tr>
<td>height</td>
<td>number</td>
<td>null</td>
<td>Define the heigt of the canvas in pixels. If null, renders with full height of the window.---canvas高度设定</td>
</tr>
<tr>
<td>letterRendering</td>
<td>boolean</td>
<td>false</td>
<td>Whether to render each letter seperately. Necessary if letter-spacing is used.---在设置了字间距的时候有用</td>
</tr>
<tr>
<td>logging</td>
<td>boolean</td>
<td>false</td>
<td>Whether to log events in the console.---在console.log()中输出信息</td>
</tr>
<tr>
<td>proxy</td>
<td>string</td>
<td>undefined</td>
<td>Url to the proxy which is to be used for loading cross-origin images. If left empty, cross-origin images won't be loaded.---代理地址</td>
</tr>
<tr>
<td>taintTest</td>
<td>boolean</td>
<td>true</td>
<td>Whether to test each image if it taints the canvas before drawing them---是否在渲染前测试图片</td>
</tr>
<tr>
<td>timeout</td>
<td>number</td>
<td>0</td>
<td>Timeout for loading images, in milliseconds. Setting it to 0 will result in no timeout.---图片加载延迟，默认延迟为0，单位毫秒</td>
</tr>
<tr>
<td>width</td>
<td>number</td>
<td>null</td>
<td>Define the width of the canvas in pixels. If null, renders with full width of the window.---canvas宽度</td>
</tr>
<tr>
<td>useCORS</td>
<td>boolean</td>
<td>false</td>
<td>Whether to attempt to load cross-origin images as CORS served, before reverting back to proxy--这个我也不知道是干嘛的</td>
</tr>
</tbody>
</table>

# 设置图片格式
## 1、从canvas中直接提取图片元数据
```
  // 图片导出为 png 格式
        var type = 'png';
        var imgData = canvas.toDataURL(type);
```
## 2、将mime-type改为image/octet-stream，强制让浏览器直接download

```
/**
 * 获取mimeType
 * @param  {String} type the old mime-type
 * @return the new mime-type
 */
var _fixType = function(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
};
   
// 加工image data，替换mime type
imgData = imgData.replace(_fixType(type),'image/octet-stream');
```
## 3、图片download到本地

```
/**
 * 在本地进行文件保存
 * @param  {String} data     要保存到本地的图片数据
 * @param  {String} filename 文件名
 */
var saveFile = function(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
   
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};
   
// 下载后的文件名
var filename = 'baidufe_' + (new Date()).getTime() + '.' + type;
// download
saveFile(imgData,filename);
```
# 案例


# 参考资料
[html2canvas][1]
[html2canvas][2]
[如何使用js将canvas保存为图片文件，并且可以自定义文件名][3]


[1]: http://html2canvas.hertzen.com/
[2]: https://www.jianshu.com/p/6a07e974a7e8
[3]: http://blog.csdn.net/qq547276542/article/details/51906741