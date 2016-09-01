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
        this.minDate = opts.minDate||this.ele.getAttribute('min');
        this.maxDate = opts.maxDate||this.ele.getAttribute('max');
        this.format = opts.format||"yyyy-mm-dd";
        this.value = opts.value;
        this.date = null;
        this.showFooter = opts.showFooter!=void 0 ? opts.showFooter : true;
        this.focusDate = null;
        this.init();
    }
    Datepicker.prototype = {
        constructor : Datepicker,
        monthDay:[31,28,31,30,31,30,31,31,30,31,30,31],
        init: function(){
            var el = this.ele,
                minDate = this.minDate ? parseDate(this.minDate) : null,
                maxDate = this.maxDate ? parseDate(this.maxDate) : null;
            this.minDate = minDate;
            this.maxDate = maxDate;
            this.date = (this.value&&parseDate(this.value))||parseDate(new Date());
            this.focusDate = new Date(this.date);
            this.wrap = document.createElement('div');
            this.wrap.className = Datepicker.config.wrapCls;
            this.ele.appendChild(this.wrap);
            this.initPanel();
            this.initEvent();
        },
        getValue: function(format) {
            return dateFormat(this.date,format);
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
            var that = this;
            this.wrap.addEventListener('click',function(e){
                var target = e.target,eventType = target.getAttribute('data-e');
                if(eventType&&that[eventType+'Handler']) {
                    that[eventType+'Handler'](target);
                }else if(target.parentNode.parentNode.nodeName.toLowerCase()==='tbody'){
                    that.tdHandler(target);
                }
                e.stopPropagation();
                return false;
            })
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
            var tplConfig = Datepicker.tpl, locale = Datepicker.locale,
                thead = tplConfig.thead, tbody = '', tfoot = this.showFooter ? tplConfig.tfoot : '',
                minYear = this.minDate ? this.minDate.getFullYear() : 0,
                maxYear = this.maxDate ? this.maxDate.getFullYear() : Infinity,
                yearcls = '',showStartYear = Math.floor(year/10)*10-1,len = 12,
                title = showStartYear;
            for(var i=0;i<len;i++) {
                yearcls = '';
                if(showStartYear < minYear||showStartYear > maxYear) yearcls +='disabled ';
                if(showStartYear === this.date.getFullYear()) yearcls +='active ';
                if(showStartYear === this.focusDate.getFullYear()) yearcls +='focused ';
                (i%4===0) && (tbody += '<tr>');
                tbody +='<td class="'+yearcls+'">'+showStartYear+'</td>';
                (i%4===3) && (tbody += '</tr>');
                showStartYear++;
            }
            thead = thead.replace('PREV',title-1 < minYear ? 'prev disabled':'prev')
                         .replace('NEXT',showStartYear > maxYear ? 'next disabled':'next');
            title +=' - ' + (showStartYear-1);
            thead = thead.replace('COLSPAN','2').replace('TITLE',title);
            return '<table><thead>'+thead+'</thead><tbody>'+tbody+'</tbody></table>';
        },
        getMonthPanelTpl: function(date){
            var curDate = date||this.focusDate,year = curDate.getFullYear(), month = curDate.getMonth(),
                tplConfig = Datepicker.tpl, locale = Datepicker.locale,
                tpl = '<table><thead>HEAD</thead><tbody>BODY</tbody><tfoot>FOOT</tfoot></table>',
                thead = tplConfig.thead, tbody = '', tfoot = this.showFooter ? tplConfig.tfoot : '',
                minTimestamp = this.minDate ? this.minDate.getTime() : 0,
                maxTimestamp = this.maxDate ? this.maxDate.getTime() : Infinity,
                monthCls = '',timestamp=0,focusMonth = this.focusDate.getMonth();

            thead = thead.replace('COLSPAN','2').replace('TITLE',year + locale.YEAR)
                        .replace('PREV',(new Date(year,0,0)).getTime() < minTimestamp ? 'prev disabled':'prev')
                        .replace('NEXT',(new Date(year+1,0,1)).getTime() > maxTimestamp ? 'next disabled':'next');
            for(var i=0,len = locale.MONTH.length;i<len;i++) {
                monthCls = '';
                timestamp = (new Date(year,i+1,0)).getTime();
                if(timestamp < minTimestamp) monthCls += ' disabled';
                timestamp = (new Date(year,i,1)).getTime();
                if(timestamp > maxTimestamp) monthCls += ' disabled';
                if(year===this.date.getFullYear()&&i===this.date.getMonth()) monthCls += ' active';
                if(i===focusMonth) monthCls +=' focused';
                (i%4===0) && (tbody += '<tr>');
                tbody +='<td class="'+monthCls+'" data-m="'+i+'">'+locale.MONTH[i]+'</td>';
                (i%4===3) && (tbody += '</tr>');
            }
            tpl = tpl.replace('HEAD',thead).replace('BODY',tbody).replace('FOOT',tfoot.replace('COLSPAN',4));
            return tpl;
        },
        getDayPanelTpl: function(date){
            var curDate = date||this.focusDate,
                year = curDate.getFullYear(), month = curDate.getMonth(), days = this.getShowDays(curDate),
                tplConfig = Datepicker.tpl, locale = Datepicker.locale,
                thead = tplConfig.thead, tbody = '', tfoot = this.showFooter ? tplConfig.tfoot : '',
                tpl = '<table><thead>HEAD</thead><tbody>BODY</tbody><tfoot>FOOT</tfoot></table>',
                todayCls='';

            thead = thead.replace('COLSPAN','5')
                    .replace('TITLE',year + locale.YEAR + locale.MONTH[month])
                    .replace("PREV",days.shift().disabled ? 'prev disabled':'prev')
                    .replace("NEXT",days.pop().disabled ? 'next disabled':'next') +"<tr>";

            for(var i=0; i<7; i++){
                thead +='<th>' + locale.WEEK[i] + '</th>';
            }
            thead +='</tr>';
            for(i=0; i<days.length;i++) {
                todayCls = '';
                (i%7===0) && (tbody += '<tr>');
                days[i].disabled && (todayCls+=' disabled');
                days[i].old && (todayCls +=' old');
                days[i].today && (todayCls+=' today');
                days[i].active && (todayCls+=' active');
                days[i].new && (todayCls +=' new');
                tbody += '<td class="'+ todayCls +'">'+days[i].value+'</td>';
                (i%7===6) && (tbody += '</tr>');
            }
            tpl = tpl.replace('HEAD',thead).replace('BODY',tbody).replace('FOOT',tfoot.replace('COLSPAN',7));
            return tpl;
        },
        getShowDays: function(date){
            var curDate = date || this.date, year = curDate.getFullYear(), month = curDate.getMonth(),
                day = curDate.getDate(), start = (new Date(year,month,1)),
                endTimestamp = (new Date(year,month+1,0)).getTime(),startTimestamp = start.getTime(),
                minTimestamp = this.minDate ? this.minDate.getTime() : 0,
                maxTimestamp = this.maxDate ? this.maxDate.getTime() : Infinity,
                weekIndex = start.getDay(),dayArr = [], i = 1, item=null, now = new Date();

            startTs = startTimestamp - weekIndex * 86400000;
            dayArr[0] = {disabled:(startTs - 86400000 < minTimestamp)};

            for(;i<=42; i++) {
                item = {value:new Date(startTs).getDate()};
                if (startTs < minTimestamp || startTs > maxTimestamp) item.disabled = true;
                if(startTs === this.focusDate.getTime()) item.active = true;
                if(startTs === new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime()) item.today = true;
                if(startTs < startTimestamp) item.old = true;
                if(startTs > endTimestamp) item.new = true;
                dayArr[i] = item;
                startTs += 86400000;
            }
            dayArr[i] = {disabled : startTs > maxTimestamp};
            return dayArr;
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
        setDate: function(date){
            this.date = date;
        },
        setDateFromOut: function(date){
            date = parseDate(new Date());
            if(this.focusDate.getTime()===date.getTime()){
                return false;
            }
            this.focusDate = date;
            this.dayPanel.innerHTML = this.getDayPanelTpl();
            this.setDate(date);
        }
    };

    Datepicker.locale = {
        WEEK: ['日','一','二','三','四','五','六'],
        MONTH: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        YEAR:'年'
    };
    Datepicker.config = {wrapCls:'datepicker'};
    Datepicker.tpl = {
        thead:'<tr><th class="PREV" data-e="prev">«</th><th colspan="COLSPAN" class="title" data-e="title">TITLE</th><th class="NEXT" data-e="next">»</th></tr>',
        tfoot : '<tr><td colspan="COLSPAN"><span data-e="today" class="btn btn-xs btn-default">今天</span><span data-e="clear" class="btn btn-xs btn-default">清除</span></td></tr>'
    };
    new Datepicker({ele:document.body})
})();