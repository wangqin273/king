var mv = new Vue({
    el: '.vueBox',
    data () {
        return {
            imgUrl: '',
            imgList: []
        }
    },
    methods: {
        fileChange(el){
            /*选择图片*/
            this.fileList(el.target.files);
            el.target.value = ''
        },
        fileList(files){
            /*添加图片到列表*/
            for (let i = 0; i < files.length; i++) {
                this.fileAdd(files[i]);
            }
        },
        fileAdd(file){
            /*添加图片*/
            let reader = new FileReader();
            reader.vue = this;
            reader.readAsDataURL(file);
            reader.onload = function () {
                file.src = this.result;
                this.vue.imgList.push({ file});
            }

        },
        fileDel(index){
            /*删除图片*/
            this.imgList.splice(index, 1);
        }
    }
})