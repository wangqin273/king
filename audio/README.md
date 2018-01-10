# 理解[].forEach.call()

# 例子：
```
let cols = document.querySelectorAll('ul li')
[].forEach.call(cols, function (col, index) {
  // TODO
}
```
# 分析：
1. []是一个空数组，无论这个数组里的最初值是什么，它们都不会被使用到；
2. forEach方法是一个数组方法，只有数组才能调用；完整写法：Array.prototype.forEach，Array.forEach为简写；
3. call方法：
    语法：fun.call(thisArg, arg1, arg2, ...)
    参数：thisArg：在 fun 函数运行时指定的this值；arg1, arg2, ... ： 指定的参数列表； 

# 综上： 
[]这个空数组里的值(当然，它没有值)是最初的this值，通过call方法，当这个空数组调用方法forEach时，cols里的值会取代空数组原先的this值。 

通俗的说，就是cols需要使用forEach这个方法，但是这个方法是一个数组方法，只有数组才能调用，于是通过call方法来了个偷梁换柱，在数组调用forEach方法的时候，将数组里的this值替换成了cols的值，达成了目的。