
Page({
    data: {
        objArray:[
            {
                index:0,
                title:'选项一',
                option: ['1111', '2222', '3333','4444','5555'],
            },
            {
                index:0,
                title:'选项二',
                option: ['一一一一', '二二二二', '三三三三', '四四四四','五五五五'],
            },
            {
                index:0,
                title:'选项三',
                option: ['①①①①', '②②②②', '③③③③', '④④④④','⑤⑤⑤⑤']
            },
        ]
    },
    bindChange_select: function(ev) {
        const curindex = ev.target.dataset.current
        this.data.objArray[curindex].index = ev.detail.value
        this.setData({
            objArray: this.data.objArray
        })
    }
})