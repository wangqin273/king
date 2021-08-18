
/*
* -- AmrPlayer --
* params:
*  1. amr_url
*  2. download_success_cb (optional)
*  3. download_progress_cb (optional)
* props:
*  1. bool canPlay
*  2. bool isPlaying
* methods:
*  1. play()
*  2. pause()
*  3. toggle() // play() when paused or pause() when playing
*  3. endWith(callback) // fire callback with ended event
* */
var AmrPlayer = function(amr_url, download_success_cb, download_progress_cb){
    this.init(amr_url, download_success_cb, download_progress_cb);
};
AmrPlayer.prototype = {
    init: function(amr_url, download_success_cb, download_progress_cb){
        this.audioContext = null;
        this.bufferSource = null;
        this.blob = null;
        this.canPlay = false;
        this.isPlaying = false;
        var cnt = 0;
        this.ended_cb = function(){
            if(cnt === 0){
                cnt++;
                var msg = "AmrPlayer ended callback\n";
                msg += "usage:\n";
                msg += "var player = new AmrPlayer('http://xxx.com/xxx.amr');\n";
                msg += "player.endedWith( function(){ xxx } );";
                console.info(msg);
            }
        };
        this.downloadAmrBlob(amr_url, download_success_cb, download_progress_cb);
    },
    downloadAmrBlob: function(amr_url, download_success_cb, download_progress_cb){
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', amr_url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function(e) {
            if ( xhr.readyState == 4 && xhr.status == 200 ) {
                self.blob = new Blob([xhr.response], {type: 'audio/mpeg'});
                self.genPLayer();
                self.canPlay = true;
                download_success_cb && download_success_cb();
            }
        };
        xhr.onprogress = function(e){
            if(e.lengthComputable){
                download_progress_cb && download_progress_cb(e);
            }
        };
        xhr.send();
    },
    genPLayer: function(){
        var self = this;
        this.isPlaying = false;
        this.readBlob(this.blob, function(data){
            self.readAmrArray(data);
        });
    },
    readBlob: function(blob, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            callback(data);
        };
        reader.readAsArrayBuffer(blob);
    },
    readAmrArray: function(array) {
        var samples = AMR.decode(array);
        if (!samples) {
            alert('Failed to decode!');
            return;
        }
        this.readPcm(samples);
    },
    readPcm: function(samples) {
        var self = this;
        var ctx = this.getAudioContext();
        this.bufferSource = ctx.createBufferSource();
        var buffer = ctx.createBuffer(1, samples.length, 8000);
        if (buffer.copyToChannel) {
            buffer.copyToChannel(samples, 0, 0)
        } else {
            var channelBuffer = buffer.getChannelData(0);
            channelBuffer.set(samples);
        }
        this.bufferSource.buffer = buffer;
        this.bufferSource.connect(ctx.destination);
        this.bufferSource.onended = function(){
            self.ended_cb && self.ended_cb();
            self.genPLayer();
        };
    },
    getAudioContext: function(){
        if (!this.audioContext) {
            if(window.AudioContext) {
                this.audioContext = new AudioContext();
            } else {
                this.audioContext = new window.webkitAudioContext();
            }
        }
        return this.audioContext;
    },
    play: function(){
        if( !this.isPlaying && this.canPlay ){
            this.bufferSource.start();
            this.isPlaying = true;
        }
        else{
            this.warn('can not play now');
        }
    },
    pause: function(){
        if( this.isPlaying && this.canPlay ) {
            this.bufferSource.stop();
            this.genPLayer();
        }
        else{
            this.warn('can not pause now');
        }
    },
    toggle: function(){
        this.isPlaying ? this.pause() : this.play();
    },
    endedWith: function(cb){
        this.ended_cb = cb;
    },
    warn: function(msg){
        console.warn(msg);
    }
};