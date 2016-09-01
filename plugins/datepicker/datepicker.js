/**
 * Created by Administrator on 2016-08-25.
 */
(function(){
    function capitalize(str){return str.charAt(0).toUpperCase() + str.substr(1)};
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
        if(typeof date=='string'){
            if (/^\d+$/.test(date)) {
                date = toInt(date);
            }else {
                var trimDate = date.replace(/ /g,''),
                    dateArray = [],
                    oDate = new Date(0);
                trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/,function(_,a,b,c){
                    dateArray = [a,b-1,c];
                    return '';
                });
                oDate.setFullYear.apply(oDate,dateArray);
                date = oDate;
            }
        }
        if(typeof date=='number'){
            date = new Date(date);
        }
        if(Object.prototype.toString.call(date)!='[object Date]'){
            return;
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
    function Datepicker(opts){
        opts = opts||{};
        if(!opts.ele) return ;
        this.ele = opts.ele;
        this.inline = opts.inline||false;
        this.showRange = opts.showRange||true;
        this.minDate = opts.minDate||this.ele.getAttribute('dp-min');
        this.maxDate = opts.maxDate||this.ele.getAttribute('dp-max');
        this.format = opts.format||"yyyy/mm/dd";
        this.value = opts.value||this.ele.getAttribute('dp-v');
        this.clear = opts.clear||true;
        this.date = null;
        this.focusDate = null;
        this.init().call(this);
    }
    Datepicker.prototype = {
        constructor : Datepicker,
        monthDay:[31,28,31,30,31,30,31,31,30,31,30,31],
        init: function(){
            var init = false;
            return function(){
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
                this.date = (this.value&&parseDate(this.value))||parseDate(new Date());
                this.focusDate = new Date(this.date);
                this.checkDateIsValid();
                div = document.createElement('div');
                div.className = Datepicker.config.wrapCls;
                if(this.inline) {
                    this.ele.appendChild(div);
                    this.wrap = div;
                }else {
                    this.ele.parentNode.classList.add('datepicker-wrap');
                    var top = this.ele.offsetHeight + this.ele.offsetTop+5,left = this.ele.offsetLeft;
                    div.style.top = top +"px";
                    div.style.left = left + "px";
                    this.ele.parentNode.appendChild(div);
                }
                this.wrap = div;
                this.initPanel();
                this.initEvent();
                

                if(!init) {
                    document.addEventListener('click',function(){
                        Datepicker.config.curItem&&Datepicker.config.curItem.hide();
                    });
                    init = true;
                }
            }
        },
        getValue: function(format) {
            format = format||this.format;
            return dateFormat(this.date,format);
        },
        initPanel: function(){
            var date = this.date,year = date.getFullYear(),div,map=['day','month','year'],type;
            for(var i=0,len=map.length;i<len;i++){
                type = map[i];
                div = document.createElement('div');
                div.className = type+' wrap';
                (type!=='day'||(type==='day'&&!this.inline))&&(div.style.display='none');
                div.innerHTML =  this['get'+capitalize(type)+'PanelTpl'](date);
                this.wrap.appendChild(div);
                this[type+'Panel'] = div;
            }
        },
        initEvent: function(){
            var that = this,wrap;
            this.wrap.addEventListener('click',function(e){
                var target = e.target,eventType = target.getAttribute('data-e');
                if(eventType&&that[eventType+'Handler']) {
                    that[eventType+'Handler'](target);
                }else if(target.parentNode.parentNode.nodeName.toLowerCase()==='tbody'){
                    that.tdHandler(target);
                }
                e.stopPropagation();
                return false;
            });
            if(!this.inline){
                this.ele.addEventListener('click',function(e){
                    if(this.show){
                        that.hide();
                    }else{
                        that.show();
                    }
                    e.stopPropagation();
                })
            }
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
        },
        clearHandler: function(){
            if(this.inputEl.nodeName.toLowerCase()=='input'){
                this.inputEl.value = '';
            }else {
                this.inputEl.innerHTML = '';
            }
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
                        this.dayPanel.innerHTML = this.getDayPanelTpl();
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
                locale = Datepicker.locale, tbody = '', 
                minTimestamp = this.minDate ? this.minDate.getTime() : 0,
                maxTimestamp = this.maxDate ? this.maxDate.getTime() : Infinity,
                startTimestamp = (new Date(year,month,1)).getTime(), 
                endTimestamp = (new Date(year,month+1,0)).getTime(),
                daySeconds = 86400000, 
                startTs = startTimestamp - curDate.getDay() * daySeconds,
                statusArr = [!!(startTs - daySeconds < minTimestamp)],cls='';
            for(var i=0; i<=42; i++) {
                cls='';
                (i%7===0) && (tbody += '<tr>');
                item = {value:new Date(startTs).getDate()};
                if (startTs < minTimestamp || startTs > maxTimestamp){
                    cls +=' disabled';
                }else {
                    if(this.showRange) cls+=' range';
                };
                if(startTs === this.focusDate.getTime()) cls += ' active';
                if(startTs === now.getTime()) cls += ' today'
                if(startTs < startTimestamp) {
                    cls += ' old'
                }else if(startTs > endTimestamp){
                    cls += ' new'
                }
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
            thead = '<tr><th class="'+prevCls+'" data-e="prev">«</th><th colspan="'+ (colspan-2) +'" class="title" data-e="title">'+title+'</th><th class="'+nextCls+'" data-e="next">»</th></tr>';
            if(type==='day') {
                thead +='<tr>';
                for(var i=0; i<colspan; i++){
                    thead +='<th>' + locale.WEEK[i] + '</th>';
                }
                thead +='</tr>';
            }
            tfoot ='<tr><td colspan="'+colspan+'"><span data-e="today" class="btn btn-xs btn-default">'+locale.today+'</span>';
            if(type!=='year'&&this.clear&&!this.inline){
                tfoot +='<span data-e="clear" class="btn btn-xs btn-default">'+locale.clear+'</span>';
            }
            tfoot +='</td></tr>'
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
            if(!this.inline) {
                if(this.inputEl.nodeName.toLowerCase()==='input'){
                    this.inputEl.value = this.getValue();
                }else {
                    this.inputEl.innerHTML = this.getValue();
                }
                this.dayPanel&&this.hide();
            }
        },
        setDateFromOut: function(date){
            date = parseDate(new Date());
            if(this.focusDate.getTime()===date.getTime()){
                return false;
            }
            this.focusDate = date;
            this.dayPanel.innerHTML = this.getDayPanelTpl();
            this.setDate(date);
        },
        show: function(){
            var showItem = Datepicker.config.curItem;
            if(showItem&&showItem !== this){
                showItem.hide();
            }
            this.dayPanel.style.display="block";
            this.ele.show = true;
            Datepicker.config.curItem = this;
        },
        hide: function(){
            var panel = this.showPanel||'day';
            this[panel+'Panel'].style.display="none";
            this.showPanel = 'day';
            this.ele.show = false;
            Datepicker.config.curItem = null;
            if(this.focusDate.getTime()!==this.date.getTime()){
                this.focusDate = new Date(this.date);
                this.dayPanel.innerHTML = this.getDayPanelTpl();
            }
        },
        checkDateIsValid: function(){
            if(this.minDate&&this.minDate.getTime()>this.date.getTime()){
                this.setDate(this.minDate,true);
            }
            if(this.maxDate&&this.maxDate.getTime()<this.date.getTime()){
                this.setDate(this.maxDate,true);
            }
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
            this.checkDateIsValid()
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

    function RangeDatepicker(options){
        this.ele = options.ele;
        this.inputEl = this.ele.querySelector('.input')||this.ele;
        if(!this.ele) {
            return false;
        }
        this.minDate = options.minDate || this.ele.getAttribute('dp-min');
        this.maxDate = options.maxDate || this.ele.getAttribute('dp-max');
        this.startDate = options.startDate || this.ele.getAttribute('dp-start') || new Date();
        this.endDate = options.endDate || this.ele.getAttribute('dp-end')|| new Date();
        this.init();
    }
    RangeDatepicker.prototype = {
        constructor: RangeDatepicker,
        init: function(){
            this.startDate = parseDate(this.startDate);
            this.endDate = parseDate(this.endDate);
            
        }
    }

    //new Datepicker({ele:document.body,inline:true});
    new Datepicker({ele:document.getElementById('date'),minDate:'2016-08-01',maxDate:'2016-09-05'});
    //new Datepicker({ele:document.getElementById('date1')});


    document.getElementById('test-btn').addEventListener('click',function(e){
        e.stopPropagation();
    })
})();