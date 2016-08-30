/**
 * Created by Administrator on 2016-08-25.
 */
(function(){
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
        this.showFooter = opts.showFooter;
        this.todayIndex = null;
        this.init();
    }

    Datepicker.prototype = {
        constructor : Datepicker,
        monthDay:[31,28,31,30,31,30,31,31,30,31,30,31],
        isLeap:function(year){
            return year%100==0?(year%400==0?1:0):(year%4==0?1:0);
        },
        init: function(){
            var el = this.ele,
                minDate = this.minDate ? parseDate(this.minDate) : null,
                maxDate = this.maxDate ? parseDate(this.maxDate) : null;
            this.minDate = minDate;
            this.maxDate = maxDate;
            this.date = (this.value&&parseDate(this.value))||parseDate(new Date());
            this.wrap = document.createElement('div');
            this.wrap.className = Datepicker.config.wrapCls;
            this.ele.appendChild(this.wrap);
            this.initDayPanel();
            this.initMonthPanel();
            this.initYearPanel();
        },
        getValue: function(format) {
            return dateFormat(this.date,format);
        },
        initDayPanel: function(){
            var date = this.date,dayPanelTpl = this.getDayPanelTpl(date),dayPanel=null;
            dayPanel = document.createElement('div');
            dayPanel.className = 'day wrap';
            dayPanel.innerHTML = dayPanelTpl;
            this.wrap.appendChild(dayPanel);
            this.dayPanel = dayPanel;
        },
        initMonthPanel: function(){
            var date = this.date, monthPanelTpl = this.getMonthPanelTpl(date);
            this.monthPanel = document.createElement('div');
            this.monthPanel.className = 'month wrap';
            this.monthPanel.style.display = "none";
            this.monthPanel.innerHTML = monthPanelTpl;
            this.wrap.appendChild(this.monthPanel);
        },
        initYearPanel: function(){
            var date = this.date,year = date.getFullYear(), tpl = this.getYearPanelTpl(year);
            this.yearPanel = document.createElement('div');
            this.yearPanel.className = 'year wrap';
            //this.yearPanel.style.display = "none";
            this.yearPanel.innerHTML = tpl;
            this.wrap.appendChild(this.yearPanel);
        },
        getYearPanelTpl: function(year){
            var tplConfig = Datepicker.tpl, locale = Datepicker.locale,
                thead = tplConfig.thead, tbody = '', tfoot = this.showFooter ? tplConfig.tfoot : '',
                minYear = this.minDate ? this.minDate.getFullYear() : 0,
                maxYear = this.maxDate ? this.maxDate.getFullYear() : Infinity,
                yearcls = '',showStartYear = Math.floor(year/10)*10-1,len = 12,
                title = showStartYear;
            for(var i=0;i<len;i++) {
                yearcls = 'year';
                if(showStartYear < minYear) yearcls +=' disabled';
                if(showStartYear > maxYear) yearcls +=' disabled';
                (i%4===0) && (tbody += '<tr>');
                tbody +='<td class="'+yearcls+'" data-m="'+showStartYear+'">'+showStartYear+'</td>';
                (i%4===3) && (tbody += '<tr>');
                showStartYear++;
            }
            title +=' - ' + showStartYear;
            return '<table><thead>'+thead.replace('COLSPAN','2').replace('TITLE',title)+'</thead><tbody>'+tbody+'</tbody></table>';
        },
        getMonthPanelTpl: function(date){
            var year = date.getFullYear(), month = date.getMonth(),
                tplConfig = Datepicker.tpl, locale = Datepicker.locale,
                tpl = '<table><thead>HEAD</thead><tbody>BODY</tbody><tfoot>FOOT</tfoot></table>',
                thead = tplConfig.thead, tbody = '', tfoot = this.showFooter ? tplConfig.tfoot : '',
                minTimestamp = this.minDate ? this.minDate.getTime() : 0,
                maxTimestamp = this.maxDate ? this.maxDate.getTime() : Infinity,
                monthCls = '',timestamp=0;

            thead = thead.replace('COLSPAN','2').replace('TITLE',year + locale.YEAR);
            for(var i=0,len = locale.MONTH.length;i<len;i++) {
                monthCls = 'month';
                timestamp = (new Date(year,i+1,0)).getTime();
                if(timestamp < minTimestamp) monthCls += ' disabled';
                timestamp = (new Date(year,i,1)).getTime();
                if(timestamp > maxTimestamp) monthCls += ' disabled';
                if(year===this.date.getFullYear()&&i===month) monthCls += ' actived';
                (i%4===0) && (tbody += '<tr>');
                tbody +='<td class="'+monthCls+'" data-m="'+i+'">'+locale.MONTH[i]+'</td>';
                (i%4===3) && (tbody += '<tr>');
            }
            tpl = tpl.replace('HEAD',thead).replace('BODY',tbody).replace('FOOT',tfoot.replace('COLSPAN',4));
            return tpl;
        },
        getDayPanelTpl: function(date){
            var year = date.getFullYear(), month = date.getMonth(), days = this.getShowDays(date),
                tplConfig = Datepicker.tpl, locale = Datepicker.locale,
                thead = tplConfig.thead, tbody = '', tfoot = this.showFooter ? tplConfig.tfoot : '',
                tpl = '<table><thead>HEAD</thead><tbody>BODY</tbody><tfoot>FOOT</tfoot></table>',
                todayCls='';

            thead = thead.replace('COLSPAN','5').replace('TITLE',year + locale.YEAR + locale.MONTH[month])+"<tr>";
            for(var i=0; i<7; i++){
                thead +='<th>' + locale.WEEK[i] + '</th>';
            }
            thead +='</tr>';
            for(i=0; i<days.length;i++) {
                todayCls = 'day';
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
                day = curDate.getDate(), timestamp = curDate.getTime(), start = (new Date(year,month,1)),
                endTimestamp = (new Date(year,month+1,0)).getTime(),startTimestamp = start.getTime(),
                minTimestamp = this.minDate ? this.minDate.getTime() : 0,
                maxTimestamp = this.maxDate ? this.maxDate.getTime() : Infinity,
                weekIndex = start.getDay(),dayArr = [], i = 0, item=null, now = new Date();

            startTs = startTimestamp - weekIndex * 86400000;
            for(;i<42; i++) {
                item = {value:new Date(startTs).getDate()};
                if (startTs < minTimestamp || startTs > maxTimestamp) item.disabled = true;
                if(startTs === timestamp) item.active = true;
                if(startTs === new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime()) item.today = true;
                if(startTs < startTimestamp) item.old = true;
                if(startTs > endTimestamp) item.new = true;
                dayArr[i] = item;
                startTs += 86400000;
            }
            return dayArr;
        }
    };

    Datepicker.locale = {
        WEEK: ['日','一','二','三','四','五','六'],
        MONTH: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        YEAR:'年'
    };
    Datepicker.config = {
        wrapCls:'datepicker'
    };
    Datepicker.tpl = {
        thead:'<tr><th class="prev">«</th><th colspan="COLSPAN" class="title">TITLE</th><th class="next">»</th></tr>',
        tfoot : '<tr><td colspan="COLSPAN"><span data-e="today" class="btn btn-xs btn-default">今天</span><span data-e="clear" class="btn btn-xs btn-default">清除</span></td></tr>'
    };


    new Datepicker({ele:document.body,minDate:'2016-08-12'})
})();