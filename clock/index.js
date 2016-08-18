/**
 * Created by Administrator on 2016-08-11.
 */
(function(){
    var c2t = {},hasOwn = c2t.hasOwnProperty(),toString = c2t.toString();
    var isFunction = function(obj){
        return toString.call(obj) == '[object Function]';
    };
    function extend() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i=1,
            length = arguments.length;
        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && isFunction(target) ) {
            target = {};
        }
        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];
                    if ( target === copy ) {
                        continue;
                    }
                    target[ name ] = copy;
                }
            }
        }
        return target;
    }
    function padNum(num){
        num = ""+num;
        if(num.length<2) {
            num = "0" + num;
        }
        return num;
    }
    function getDate(format) {
        var now = new Date(),hour = now.getHours(),minite = now.getMinutes(),second = now.getSeconds(),
            prevDate = new Date(now.getTime()-1000),prevHour = prevDate.getHours(),prevMin = prevDate.getMinutes(),
            prevSec = prevDate.getSeconds();
        return {
            before: [padNum(hour),padNum(minite),padNum(second)],
            active: [padNum(prevHour),padNum(prevMin),padNum(prevSec)]
        }
    }
    function Clock(config) {
        var defaults = {
            second: true,   //显示秒
            minute: true,   //显示分种
            hour: true,     //显示小时
            element : document.body
        };
        this.options = extend({},defaults,config||{});
        if(this.options.hour)  this.initWrap(0);
        if(this.options.minute) this.initWrap(1);
        if(this.options.second) this.initWrap(2);

        this.start();
    }

    Clock.prototype = {
        constructor: Clock,
        initWrap: function(index){
            var num,date = getDate(),tpl=Clock.tpl,div;
            var wrapName = index ? (index==1 ? 'minute':'second') : 'hour';
            if((wrapName=='minute'&&this.options.hour)||(wrapName=='second'&&this.options.minute)){
                div = document.createElement('div');
                div.innerHTML = ":";
                div.className = 'clock-split';
                this.options.element.appendChild(div);
            }
            div = document.createElement('div');
            div.className = 'clock-'+wrapName;
            div.innerHTML =tpl.replace(/CLOCK_BEFORE/g,date.before[index]).replace(/CLOCK_ACTIVE/g,date.active[index]);
            this.options.element.appendChild(div);
            this[wrapName+'Wrap'] = div;
        },
        changeDate: function(){
            var date = getDate();
            this.changeDateByType('hour',date.before[0],date.active[0]);
            this.changeDateByType('minute',date.before[1],date.active[1]);
            this.changeDateByType('second',date.before[2],date.active[2]);
        },
        changeDateByType: function(type,before,active){

            if(!this.options[type]) return;
            if(before==active) return ;
            var wrap = this[type+'Wrap'];
            wrap.classList.remove('play');
            var activeEle = wrap.querySelector('.clock-active'),
                activeText = activeEle.querySelectorAll('.flip-text'),
                beforeEle = wrap.querySelector('.clock-before'),
                beforeText = beforeEle.querySelectorAll('.flip-text');
            beforeEle.className = beforeEle.className.replace('before','active');
            beforeText.forEach(function(item){
                item.innerHTML = before;
            });
            activeEle.className = activeEle.className.replace('active','before');
            activeText.forEach(function(item){
                item.innerHTML = active;
            });
            wrap.classList.add('play');
        },
        start: function(){
            this.timer&&clearInterval(this.timer);
            var _self = this;
            this.timer = setInterval(function(){
                _self.changeDate();
            },1000);
        },
        stop: function(){
            this.timer&&clearInterval(this.timer);
        }

    };
    Clock.tpl = '<div class="clock-before"><div class="flip flip-up"><span class="flip-shadow"></span><span class="flip-text">CLOCK_BEFORE</span></div><div class="flip flip-down"><span class="flip-shadow"></span><span class="flip-text">CLOCK_BEFORE</span></div></div><div class="clock-active"><div class="flip flip-up"><span class="flip-shadow"></span><span class="flip-text">CLOCK_ACTIVE</span></div><div class="flip flip-down"><span class="flip-shadow"></span><span class="flip-text">CLOCK_ACTIVE</span></div></div>';



    var clock = document.querySelector('#clock');
    var clockObj = new Clock({element:clock}),stop = false;


    document.getElementById('btn').onclick = function(){
        stop ? clockObj.start() : clockObj.stop();
        this.innerHTML = stop ? '停止':'开始';
        stop = !stop;
    }
})();