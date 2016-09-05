/**
 * Created by Administrator on 2016-08-25.
 */
(function(){
    function capitalize(str){return str.charAt(0).toUpperCase() + str.substr(1)};
    function contains(parent,sub) {
        if(parent===sub) return true;
        while(sub.parentNode){
            if(sub.parentNode===parent) {
                return true;
            }
            sub = sub.parentNode;
        }
        return false;
    }
    function toggleEle(eles,show){
        var status = show ? 'block' : 'none';
        if(!eles[0]){
            eles.style.display = status;
            return;
        }
        for(var i=0,len=eles.length;i<len;i++) {
            eles[i].style.display = status; 
        }
    }
    function extend() {
        var options, name, src, copy,
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
    function toInt(str) {
        return parseInt(str, 10) || 0
    }
    function padNumber(num, digits, trim) {
        num = '' + num;
        while (num.length < digits)
            num = '0' + num;
        if (trim)
            num = num.substr(num.length - digits);
        return num;
    }
    function dateGetter(name, size, offset, trim) {
        return function (date) {
            var value = date["get" + name]();
            if (offset > 0 || value > -offset)
                value += offset;
            return padNumber(value, size, trim);
        }
    }
    //将字符串或者int类型转成日期对象
    function parseDate(date){
        if(typeof date==='string'){
            if (/^\d+$/.test(date)) {
                date = toInt(date);
            }else {
                var trimDate = date.replace(/ /g,''),
                    dateArray = [],
                    oDate = new Date(0);
                if(/^(\d{4})\D(\d{1,2})\D(\d{1,2})$/.test(trimDate)){
                    trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/,function(_,a,b,c){
                        dateArray = [a,b-1,c];
                        return '';
                    });

                    oDate.setFullYear.apply(oDate,dateArray);
                    date = oDate;
                }
            }
        }
        if(typeof date==='number'){
            date = new Date(date);
        }
        if(Object.prototype.toString.call(date)!='[object Date]'){
            return false;
        }
        return new Date(date.getFullYear(),date.getMonth(),date.getDate());
    }
    var DATE_FORMATS = {
        yyyy: dateGetter("FullYear", 4),
        yy: dateGetter("FullYear", 2, 0, true),
        mm: dateGetter("Month", 2, 1),
        m: dateGetter("Month", 1, 1),
        dd: dateGetter("Date", 2),
        d: dateGetter("Date", 1)
    }, rdateFormat = /((?:[^ymd']+)|(?:'(?:[^']|'')*')|(?:E+|y+|m+|d+))(.*)/;
    //日期格式化
    function dateFormat(date,format){
        var text="",parts=[],match,fn;
        date = parseDate(date);
        if(!date) return;
        while (format) {
            match = rdateFormat.exec(format);
            if (match) {
                parts = parts.concat(match.slice(1));
                format = parts.pop();
            } else {
                parts.push(format);
                format = null;
            }
        }
        parts.forEach(function (value) {
            fn = DATE_FORMATS[value];
            text += fn ? fn(date) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'");
        });
        return text;
    }
    function loop(){};

    var globalPanel;
    function clearPanel(e){
        if(globalPanel) {
            globalPanel.hide();
        }
    }
    function Datepicker(opts){
        opts = opts||{};
        if(!opts.ele) return ;
        opts.minDate = opts.minDate || opts.ele.getAttribute('dp-min');
        opts.maxDate = opts.maxDate || opts.ele.getAttribute('dp-max');
        opts.date = opts.date || opts.ele.getAttribute('dp-v');
        extend(this,{
            ele:null,               //实例化的dom
            inline: false,          //是否展开还是点击别的dom元素触发展开
            showRange: false,       //是否要显示日期区间
            minDate: null,          //最小日期
            maxDate: null,          //最大日期
            format: 'yyyy/mm/dd',   //显示日期时的格式化格式
            clear: true,            //是否显示清除按钮
            showFooter: true,
            date: null,             //value是日期格式
            focusDate: null,        //点击datepicker时记录操作日期
            onclicked: loop,        //选中日期后的回调
        },opts)
        this.init();
    }
    Datepicker.prototype = {
        constructor : Datepicker,
        monthDay:[31,28,31,30,31,30,31,31,30,31,30,31],
        init: function(){
            var el = this.ele,div,that = this,
                minDate = this.minDate ? parseDate(this.minDate) : null,
                maxDate = this.maxDate ? parseDate(this.maxDate) : null;
            this.inputEl = this.ele.querySelector('.input')||this.ele;
            //如果最小日期比最大日期要大，要纠正
            if(minDate&&maxDate&&minDate>maxDate){
                this.minDate = maxDate;
                this.maxDate = minDate;
            }else {
                this.minDate = minDate;
                this.maxDate = maxDate;
            }
            this.date = parseDate(this.date||new Date());
            this.focusDate = new Date(this.date);
            this.checkDateIsValid();
            div = document.createElement('div');
            div.className = Datepicker.config.wrapCls;
            if(this.inline) {
                this.ele.appendChild(div);
                this.wrap = div;
            }else {
                this.ele.classList.add('datepicker-wrap');
                var top = this.ele.offsetHeight + 5, left = 0;
                div.style.top = top +"px";
                div.style.left = left + "px";
                this.ele.appendChild(div);
                this.setValue(this.getValue())
            }
            this.wrap = div;
            this.initPanel();
            this.initEvent();
        },
        getValue: function(format) {
            format = format||this.format;
            return dateFormat(this.date,format);
        },
        setValue: function(value){
            if(this.inputEl.nodeName.toLowerCase()==='input'){
                this.inputEl.value = value;
            }else {
                this.inputEl.innerHTML = value;
            }
        },
        initPanel: function(){
            var date = this.date,year = date.getFullYear(),div,map=['day','month','year'],type;
            for(var i=0,len=map.length;i<len;i++){
                type = map[i];
                div = document.createElement('div');
                div.className = type+' wrap';
                (type!=='day')&&(div.style.display='none');
                div.innerHTML =  this['get'+capitalize(type)+'PanelTpl'](date);
                this.wrap.appendChild(div);
                this[type+'Panel'] = div;
            }
        },
        initEvent: function(){
            var that = this,wrap = !this.inline ? this.ele : this.wrap;
            wrap.addEventListener('click',function(e){
                var target = e.target,eventType = target.getAttribute('dp-e');
                if(eventType&&that[eventType+'Handler']) {
                    that[eventType+'Handler'](target);
                }else if(target.parentNode.parentNode.nodeName.toLowerCase()==='tbody'){
                    that.tdHandler(target);
                }else if(!that.inline && contains(that.ele, e.target)) {
                    if(this.show){
                        that.hide();
                    }else{
                        that.show();
                    }
                }
                e.stopPropagation();
                return false;
            });
        },
        prevHandler: function(){
            this.slideHandler(-1);
        },
        nextHandler: function(){
            this.slideHandler(1);
        },
        slideHandler: function(step){
            var showPanel = this.showPanel||'day';
            switch (showPanel) {
                case 'day':
                    this.setFocusDate(null,step,null);
                    this.dayPanel.innerHTML = this.getDayPanelTpl(this.focusDate);
                    break;
                case 'month':
                    this.setFocusDate(step,null,null);
                    this.monthPanel.innerHTML = this.getMonthPanelTpl(this.focusDate);
                    break;
                case 'year':
                    var year = this.focusDate.getFullYear()+step*10;
                    this.setFocusDate(year);
                    this.yearPanel.innerHTML = this.getYearPanelTpl(year);
                    break;
            }
        },
        titleHandler: function(){
            this.switchShowPanel(1);
        },
        switchShowPanel: function(dir){
            var panelName = this.showPanel||'day',panelMap = dir?{day:'month',month:'year'}:{year:'month',month:'day'},
                hidePanel=null,showPanel=null;
            if(!panelMap[panelName]){
                return false;
            }
            hidePanel = this[panelName+'Panel'];
            showPanel = this[panelMap[panelName]+'Panel'];
            hidePanel.innerHTML = this['get'+capitalize(panelName)+'PanelTpl']();
            showPanel.innerHTML = this['get'+capitalize(panelMap[panelName])+'PanelTpl']();
            hidePanel.style.display='none';
            showPanel.style.display = 'block';
            this.showPanel = panelMap[panelName];
        },
        todayHandler: function(){
            this.setDateFromOut(new Date());
            this.setValue(this.getValue());
        },
        clearHandler: function(){
            this.setValue('');
        },
        tdHandler: function(target){
            var type = this.showPanel||'day',value = target.innerHTML,cls = target.className,isSuccess;
            if(cls.indexOf('disabled')!==-1){
                return false;
            }
            switch(type){
                case 'day':
                    if(cls.indexOf('old')!==-1){
                        isSuccess = this.setFocusDate(null,-1,value);
                    }else if(cls.indexOf('new')!==-1) {
                        isSuccess = this.setFocusDate(null,1,value);
                    }else {
                        isSuccess = this.setFocusDate(null,null,value);
                    }
                    if(isSuccess){
                        this.setDate(this.focusDate);
                        !this.inline&&this.setValue(this.getValue());
                        this.dayPanel.innerHTML = this.getDayPanelTpl();
                        this.onclicked.call(this);
                    }
                    break;
                case 'month':
                    value = target.getAttribute('data-m');
                    this.setFocusDate(null,value,null);
                    this.switchShowPanel(0);
                    break;
                case 'year':
                    this.setFocusDate(value,null,null);
                    this.switchShowPanel(0);
                    break;
            }
        },
        getYearPanelTpl: function(year){
            year = year||this.focusDate.getFullYear();
            var tplConfig = Datepicker.tpl, tbody = '',
                minYear = this.minDate ? this.minDate.getFullYear() : 0,
                maxYear = this.maxDate ? this.maxDate.getFullYear() : Infinity,
                yearcls = '',showStartYear = Math.floor(year/10)*10-1,
                title = showStartYear;
            for(var i=0; i<12; i++) {
                yearcls = '';
                if(showStartYear < minYear||showStartYear > maxYear) yearcls +='disabled ';
                if(showStartYear === this.date.getFullYear()) yearcls +='active ';
                if(showStartYear === this.focusDate.getFullYear()) yearcls +='focused ';
                (i%4===0) && (tbody += '<tr>');
                tbody +='<td class="'+yearcls+'">'+showStartYear+'</td>';
                (i%4===3) && (tbody += '</tr>');
                showStartYear++;
            }
            var statusArr = [!!(title-1 < minYear),!!(showStartYear > maxYear)];
            return this.getPanelHeadTpl('year',statusArr,title+'-'+(showStartYear-1)).replace('BODY',tbody);
        },
        getMonthPanelTpl : function(date) {
            var curDate = date||this.focusDate,year = curDate.getFullYear(), month = curDate.getMonth(),
                locale = Datepicker.locale, dateArr = locale.MONTH, tbody='',
                minTimestamp = this.minDate ? this.minDate.getTime() : 0,
                maxTimestamp = this.maxDate ? this.maxDate.getTime() : Infinity,
                cls = '';
                for(var i=0,len = dateArr.length; i<len; i++) {
                    cls = ''
                    if((new Date(year,i+1,0)).getTime() < minTimestamp||
                        (new Date(year,i,1)).getTime() > maxTimestamp
                      ){
                        cls +=' disabled';
                    }
                    if(year === this.date.getFullYear() && i === this.date.getMonth()) cls +='active';
                    if(i===this.focusDate.getMonth()) cls +=' focused';
                    (i%4===0) && (tbody += '<tr>');
                    tbody +='<td class="'+cls+'" data-m="'+i+'">'+locale.MONTH[i]+'</td>';
                    (i%4===3) && (tbody += '</tr>');
                }
                var canPrev = !!((new Date(year,0,0)).getTime() < minTimestamp);
                var canNext = !!((new Date(year+1,0,1)).getTime() > maxTimestamp)
                return this.getPanelHeadTpl('month',[canPrev,canNext],year + locale.YEAR).replace('BODY',tbody);
        },        
        getDayPanelTpl: function(date){
            var curDate = date||this.focusDate,tpl = '',now = parseDate(new Date()),
                year = curDate.getFullYear(),month = curDate.getMonth(),
                locale = Datepicker.locale, tbody = '', start = new Date(year,month,1),
                minTimestamp = this.minDate ? this.minDate.getTime() : 0,
                maxTimestamp = this.maxDate ? this.maxDate.getTime() : Infinity,
                startTimestamp = start.getTime(), 
                endTimestamp = (new Date(year,month+1,0)).getTime(),
                curTimestamp = this.date.getTime(),
                daySeconds = 86400000, 
                startTs = startTimestamp - start.getDay() * daySeconds,
                statusArr = [!!(startTs - daySeconds < minTimestamp)],cls='';
                //console.log(curDate.getDay())
            for(var i=0; i<=42; i++) {
                cls='';
                (i%7===0) && (tbody += '<tr>');
                item = {value:new Date(startTs).getDate()};
                if (startTs < minTimestamp || startTs > maxTimestamp){
                    cls +=' disabled';
                }
                if((this.showRange==='start'&&startTs >=curTimestamp&&startTs <= maxTimestamp)||
                    (this.showRange==='end'&&startTs <=curTimestamp&&startTs >= minTimestamp)) cls +=' range';

                if(startTs < startTimestamp) {
                    cls += ' old'
                }else if(startTs > endTimestamp){
                    cls += ' new'
                }
                if(startTs === curDate.getTime()) cls += ' focused';
                if(startTs === this.date.getTime()) cls += ' active';
                if(startTs === now.getTime()) cls += ' today'

                tbody +='<td class="'+cls+'">'+new Date(startTs).getDate()+'</td>';
                startTs += 86400000;
                (i%7===6) && (tbody += '</tr>');
            }
            statusArr.push(!!(startTs > maxTimestamp))
            tpl = this.getPanelHeadTpl('day',statusArr, curDate.getFullYear() + locale.YEAR + locale.MONTH[curDate.getMonth()]);
            return tpl.replace('BODY',tbody);
        },
        getPanelHeadTpl:function(type,statusArr,title){
            var locale = Datepicker.locale, colspan = type==='day' ? 7 : 4, thead = '', tfoot = '',
                tpl = '<table><thead>HEAD</thead><tbody>BODY</tbody><tfoot>FOOT</tfoot></table>',
                prevCls = statusArr[0] ? 'prev disabled':'prev',
                nextCls = statusArr[1] ? 'next disabled':'next';
            thead = '<tr><th class="'+prevCls+'" dp-e="prev">«</th><th colspan="'+ (colspan-2) +'" class="title" dp-e="title">'+title+'</th><th class="'+nextCls+'" dp-e="next">»</th></tr>';
            if(type==='day') {
                thead +='<tr>';
                for(var i=0; i<colspan; i++){
                    thead +='<th>' + locale.WEEK[i] + '</th>';
                }
                thead +='</tr>';
            }
            if(this.showFooter){
                tfoot ='<tr><td colspan="'+colspan+'"><span dp-e="today" class="btn btn-xs btn-default">'+locale.today+'</span>';
                if(type!=='year'&&this.clear&&!this.inline){
                    tfoot +='<span dp-e="clear" class="btn btn-xs btn-default">'+locale.clear+'</span>';
                }
                tfoot +='</td></tr>';
            }
            return tpl.replace('HEAD',thead).replace('FOOT',tfoot);
        },
        setFocusDate: function(year,month,day){
            var oYear = this.focusDate.getFullYear(),oMonth = this.focusDate.getMonth(),date = parseDate(new Date(0));
            if(!year){
                year = oYear;
            }else if(year===1||year===-1) {
                year = oYear + year;
            }
            if(!month&&month!==0){
                month = oMonth;
            }else if(month===1||month===-1){
                month = oMonth + month;
            }
            if(!day&&day!==0) day = this.focusDate.getDate();
            if(day===31||(month===1&&day>=29)) {
                month+=1;
                day = 0;
            }

            date.setFullYear(year,month,day);
            if(date.getTime()===this.focusDate.getTime()){
                return false;
            }
            this.focusDate = date;
            return true;
        },
        setDate: function(date,changeFocus){
            this.date = date;
            if(changeFocus){
                this.focusDate = new Date(date);
            }
            this.dayPanel&&this.hide();
        },
        setDateFromOut: function(date){
            date = parseDate(date);
            if(this.focusDate.getTime()===date.getTime()){
                return false;
            }
            this.focusDate = date;
            this.setDate(date);
            this.dayPanel.innerHTML = this.getDayPanelTpl();
        },
        show: function(){
            if(globalPanel&&globalPanel !== this){
                globalPanel.hide();
            }
            this.wrap.style.display = 'block';
            this.ele.show = true;
            globalPanel = this;
        },
        hide: function(){
            if(this.inline) return false;
            this.wrap.style.display="none";
            this.restore();
            this.ele.show = false;
            globalPanel = null;
            //隐藏要重置下datepicker选中值
            if(this.focusDate.getTime()!==this.date.getTime()){
                this.focusDate = new Date(this.date);
                this.dayPanel.innerHTML = this.getDayPanelTpl();
            }
        },
        restore: function(){
            var panel = this.showPanel||'day';
            if(panel!=='day') {
                this[panel+'Panel'].style.display="none";
            }
            toggleEle(this.dayPanel,true);
            this.showPanel = 'day';
        },
        checkDateIsValid: function(){
            if(this.minDate&&this.minDate.getTime()>this.date.getTime()){
                this.setDate(this.minDate,true);
                return false;
            }
            if(this.maxDate&&this.maxDate.getTime()<this.date.getTime()){
                this.setDate(this.maxDate,true);
                return false;
            }
            return true;
        },
        setDateRange: function(range){
            var refreshPanel = false;
            if(range.start) {
                refreshPanel = true;
                this.minDate = parseDate(range.start);
            }
            if(range.end) {
                refreshPanel = true;
                this.maxDate = parseDate(range.end);
            }
            if(!this.checkDateIsValid()&&!this.inline){
                this.setValue(this.getValue())
            }
            if(refreshPanel) {
                this.dayPanel.innerHTML = this.getDayPanelTpl();
            }
        }
    };

    Datepicker.locale = {
        WEEK: ['日','一','二','三','四','五','六'],
        MONTH: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        YEAR:'年',
        today:' 今天',
        clear:'清除'
    };
    Datepicker.config = {wrapCls:'datepicker',curItem:null};

    document.addEventListener('click',clearPanel);

    function RangeDatepicker(options){
        this.ele = options.ele;
        this.inputEl = this.ele.querySelector('.input');
        if(!this.ele||!this.inputEl) {
            return false;
        }
        this.isCus  = true; //是否点击的自定义
        this.minDate = parseDate(options.minDate || this.ele.getAttribute('dp-min'));
        this.maxDate = parseDate(options.maxDate || this.ele.getAttribute('dp-max'));
        this.startDate = options.startDate || this.ele.getAttribute('dp-start');
        this.endDate = options.endDate || this.ele.getAttribute('dp-end');
        this.format = options.format || 'yyyy/mm/dd';
        this.init();
    }
    RangeDatepicker.prototype = {
        constructor: RangeDatepicker,
        init: function(){
            var div,that = this, maxDate=Infinity, minDate=0, temp;
            this.startDate = parseDate(this.startDate)|| parseDate(new Date());
            this.endDate = parseDate(this.endDate) || parseDate(new Date());
            if(this.startDate.getTime() > this.endDate.getTime()) {
                throw new Error('开始时间不能比结束时间大');
                return false;
            }
            minDate = this.minDate ? this.minDate.getTime() : minDate;
            maxDate = this.maxDate ? this.maxDate.getTime() : maxDate;
            if(minDate > maxDate) {
                throw new Error('规则最小时间不能比规定的最大时间大');
                return false;
            }
            if(this.startDate.getTime() < minDate) this.startDate = minDate;
            if(this.startDate.getTime() > maxDate) this.startDate  = maxDate
            if(this.endDate.getTime() < minDate) this.endDate = minDate;
            if(this.endDate.getTime() > maxDate) this.endDate = maxDate;
            
            this.ele.classList.add('range-datepicker-wrap');
            div = document.createElement('div');
            div.className = 'range-datepicker';
            if(this.isCus){
                div.className +=' daterange-show'
            }
            div.style.left = 0;
            div.style.top = (this.ele.offsetHeight+5) +'px';
            this.ele.appendChild(div);
            this.wrap = div;
            this.startPicker = new Datepicker({
                ele: div,
                inline:true,
                minDate: this.minDate,
                maxDate: this.endDate,
                date: this.startDate,
                showRange:'start',
                showFooter: false,
                format: this.format,
                onclicked: function(){
                    that.endPicker.setDateRange({start:this.date})
                    that.setStartValue(this.date);
                    that.checkShotCut();
                }
            });
            this.startPicker.wrap.className +=' start';
            this.endPicker = new Datepicker({
                ele:div,
                inline: true,
                minDate: this.startDate,
                maxDate: this.maxDate,
                showRange:'end',
                date: this.endDate,
                showFooter: false,
                format: this.format,
                onclicked: function(){
                    that.startPicker.setDateRange({end:this.date})
                    that.setEndValue(this.date);
                    that.checkShotCut();
                }
            });
            this.endPicker.wrap.className +=' end';
            this.setValue();
            this.initShortCut();
            this.initEvent();
            //快捷操作
        },
        initShortCut: function(){
            var wrap = document.createElement('div'),ul = document.createElement('ul'),li,foot = document.createElement('div'),
            locale = RangeDatepicker.locale, items = locale.items,
            today = parseDate(new Date()), year = today.getFullYear(), month = today.getMonth(),day = today.getDate(),
            startDate, endDate ,daySeconds = 86400000, flag, that = this, shortCurDate={};
            wrap.className = 'shortcut';
            for(var i in items) {
                startDate = parseDate(new Date());
                endDate = parseDate(new Date());
                li = document.createElement('li');
                flag = '';
                switch (i) {
                    case 'today':
                        startDate = endDate = startDate.getTime();
                        break;
                    case 'yesterday':
                        startDate = endDate = startDate.setDate(startDate.getDate()-1);
                        break;
                    case 'last7Day':
                    case 'last30Day':
                    case 'last60Day':
                    case 'last90Day':
                        var d = i.match(/\d+/)[0];
                        startDate = startDate.setDate(startDate.getDate()- d);
                        endDate = endDate.setDate(endDate.getDate()-1);
                        break;
                    case 'thisMonth':
                        startDate = startDate.setDate(1);
                        endDate = endDate.getTime();
                        break;
                    case 'lastMonth':
                        startDate = startDate.setMonth(month-1,1);
                        endDate = endDate.setMonth(month,0);
                        break;
                    case 'threeMonthAgo':
                        startDate = startDate.setMonth(month-2,1);
                        endDate = endDate.setMonth(month-1,0);
                        break;
                    case 'thisYear':
                        startDate = startDate.setMonth(0,1);
                        endDate = endDate.setMonth(month,0);
                        break;
                    case 'lastYear':
                        startDate = startDate.setFullYear(year-1,0,1);
                        endDate = endDate.setMonth(-1,31)
                        break;
                    case 'customeRange':
                        startDate = null;
                        endDate = null;
                        flag = 'customeRange';
                        break;
                }
                li._type = i;
                this.isCus&&flag&&(li.className ='active');
                li.innerHTML = items[i];
                ul.appendChild(li);
                shortCurDate[i]=[startDate,endDate,li];
                this._shortCutDate = shortCurDate;
            }
            ul.addEventListener('mouseover',function(e){
                that.mouseoverEvent(e);
            })
            ul.addEventListener('mouseout',function(e){
                that.mouseoutEvent(e);
            })
            wrap.appendChild(ul);
            foot.className = 'ranges-input';
            foot.innerHTML = '<div><label>'+locale.from+'：</label><input class="start" type="text" name="start" value="'+this.getStartValue()+'"></div><div><label>'+locale.to+'：</label><input class="end" type="text" name="end" value="'+this.getEndValue()+'"></div><button class="btn btn-success apply" dp-e="apply">'+locale.apply+'</button"><button class="btn btn-default" dp-e="cancel">'+locale.cancel+'</button>'
            wrap.appendChild(foot);
            this.startDateInput = foot.querySelector('.start');
            this.endDateInput = foot.querySelector('.end');
            this.wrap.appendChild(wrap);
        },
        initEvent: function(){
            var that = this;
            this.ele.addEventListener('click',function(e){
                var target = e.target, etype = target.getAttribute('dp-e'),fn;
                if(etype) {
                    if(fn=that[etype+'Handle']) {
                        fn.call(that);
                        e.preventDefault();
                    }
                }else if(target.nodeName.toLowerCase()==='li'){
                    var dateType = target._type;
                    if(!that.changeShortCutStatus(dateType)) return false;
                    if(dateType==='customeRange'){
                        target.className='';
                        if(!that.isCus) {
                            that.showCustomePanel();
                        }
                    }else {
                        var curItem = that._shortCutDate[dateType], startDate = curItem[0],endDate = curItem[1];
                        that.endPicker.minDate = parseDate(startDate);
                        that.startPicker.maxDate = parseDate(endDate);
                        that.startPicker.setDateFromOut(startDate,true);
                        that.endPicker.setDateFromOut(endDate,true);
                        that.setValue();
                        that.hide();
                        this.isCus = false;
                    }
                }else if(!contains(that.wrap,target)){
                    (this.show===true) ? that.hide() : that.show();
                }
                e.stopPropagation();
            })
            this.startDateInput.addEventListener('blur',function(){
                var date = parseDate(this.value),
                    minTimestamp = that.minDate ? parseDate(that.minDate).getTime() : 0,
                    maxTimestamp = parseDate(that.endDateInput.value).getTime();
                if(!date || date.toString()==='Invalid Date' ||
                    date.getTime() > maxTimestamp ||
                    date.getTime() < minTimestamp){
                    this.value = that.getStartValue();
                }
            })
            this.endDateInput.addEventListener('blur',function(){
                var date = parseDate(this.value),
                    minTimestamp = parseDate(that.startDateInput.value).getTime(),
                    maxTimestamp = that.maxDate ? parseDate(that.maxDate).getTime() : Infinity;
                if(!date||date.toString()==='Invalid Date' ||
                    date.getTime() > maxTimestamp ||
                    date.getTime() < minTimestamp){
                    this.value = that.getEndValue();
                }
            })
        },
        applyHandle: function(){
            var inputStart = this.startDateInput.value,inputEnd = this.endDateInput.value;
            var start = this.getStartValue(),end = this.getEndValue(), flag = false;
            if(inputStart !== start) {
                flag = true;
                this.startPicker.setDateFromOut(inputStart);
                this.endPicker.setDateRange({start:inputStart});
            }
            if(inputEnd !== end) {
                flag = true;
                this.endPicker.setDateFromOut(inputEnd);
                this.startPicker.setDateRange({end: inputEnd});
            }
            if(flag) {
                this.setValue();
                this.checkShotCut();
            }
            this.hide();
        },
        cancelHandle: function(){
            this.hide();
        },
        mouseoverEvent: function(e){
            var target = e.target,
                startDate = target.startDate,
                endDate = target.endDate;
            if(startDate&&endDate) {
                this.setStartValue(startDate);
                this.setEndValue(endDate);
            }
        },
        mouseoutEvent: function(e){
            var startDate = e.target.startDate;
            if(startDate) {
                this.setStartValue(this.getStartValue());
                this.setEndValue(this.getEndValue());
            }
        },
        getStartValue: function(){
            return this.startPicker.getValue();
        },
        getEndValue: function(){
            return this.endPicker.getValue();
        },
        setStartValue: function(date){
            date = dateFormat(date,this.startPicker.format);
            this.startDateInput.value = date;
        },
        setEndValue: function(date){
            date = dateFormat(date,this.endPicker.format);
            this.endDateInput.value = date;
        },
        checkShotCut: function(){
            var startDate = this.startPicker.date.getTime(), endDate = this.endPicker.date.getTime();
            var shortcut = this._shortCutDate, flag = true;
            for(var d in shortcut) {
                if(d==='customeRange') { continue ;}
                var item = shortcut[d];
                if(startDate==item[0]&&endDate==item[1]) {
                    this.changeShortCutStatus(d)
                    flag = false;
                    break;
                }
            }
            if(flag) {
                this.changeShortCutStatus('customeRange');
            }
            this.isCus = flag;
        },
        changeShortCutStatus: function(i) {
            var li = this._shortCutDate[i][2];
            if(li.className==='active') return false;
            li.parentNode.querySelector('.active')&&(li.parentNode.querySelector('.active').className = '');
            li.className = 'active';
            return true;
        },
        setValue: function(){
            var value = this.getStartValue() +' - '+ this.getEndValue();
            if(this.inputEl.nodeName.toLowerCase()==='input'){
                this.inputEl.value = value;
            }else {
                this.inputEl.innerHTML = value;
            }
        },
        show: function(){
            this.ele.show = true;
            this.wrap.style.display ='block';
            globalPanel = this;
        },
        hide: function(){
            if(this.isCus===false) {
                this.hideCustomePanel();
            }
            this.wrap.style.display="none";
            this.ele.show = false;
            globalPanel = null;
        },
        showCustomePanel: function(){
            this.wrap.className +=' daterange-show';
        },
        hideCustomePanel: function(){
            this.wrap.className = this.wrap.className.replace(' daterange-show','');
            this.startPicker.restore();
            this.endPicker.restore();
        }
    };
    RangeDatepicker.locale = {
        items: {
            today:'今天',
            yesterday:'昨天',
            last7Day:'最近7天',
            last30Day:'最近30天',
            last60Day:'最近60天',
            last90Day:'最近90天',
            thisMonth:'这个月',
            lastMonth:'上个月',
            threeMonthAgo:'3个月前',
            thisYear:'今年',
            lastYear:'去年',
            customeRange:'自定义'
        },
        apply:'确定',
        cancel:'取消',
        from: '起',
        to:'止'
    }

    //new Datepicker({ele:document.body,inline:true});
    new Datepicker({ele:document.getElementById('date'),format:'yyyy-mm-dd',minDate:'2016-08-01',maxDate:'2016-09-02',showRange:true});
    //new Datepicker({ele:document.getElementById('date1')});
    new RangeDatepicker({ele:document.getElementById('rangeDate'),maxDate:'2016-09-02'})


    document.getElementById('test-btn').addEventListener('click',function(e){
        e.stopPropagation();
    })
})();