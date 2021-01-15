var debug =0; //0线上、1线下、2本地
var root = {}
switch (debug) {
  case 0:
    root.domain = 'https://shandian.bookbb.cn/';
    root.path = 'https://shandian.bookbb.cn/api/';
    root.image = 'https://shandian.bookbb.cn/xcx/images/';
    break;
  case 1:
    root.domain = 'http://testphoto.yueyuewo.cn/';
    root.path = 'http://testphoto.yueyuewo.cn/api/';
    root.image = 'http://testphoto.yueyuewo.cn/xcx/images/';
    break;
}
module.exports = { 
  root: root,
  debug: debug,
  code: "sdzjz",
  version_name: "1.0.5",
  version_code: 1,
  qq_map_key: '',
  sign_key: ''
}