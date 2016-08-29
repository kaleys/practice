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
                var trimDate = data.replace(/ /g,''),
                    dateArray = [],
                    oDate = new Date(0);
                trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/,function(_,a,b,c){
                    dateArray = [a,b,c];
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
        return date;
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
        this.minDate = null;
        this.maxDate = null;
        this.format = opts.format||"yyyy-mm-dd";
        this.value = opts.value;
        this.date = null;
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
                minDate = el.getAttribute('min')&&parseDate(el.getAttribute('min')),
                maxDate = el.getAttribute('max')&&parseDate(el.getAttribute('max'));
            this.minDate = minDate;
            this.maxDate = maxDate;
            this.date = (this.value&&parseDate(this.value))||new Date();
            this.value = dateFormat(this.date,this.format);

            this.initDayPanel();
        },
        initDayPanel: function(){
            var date = this.date, year = date.getFullYear(), month = date.getMonth(), days = this.getShowDays(this.date),
                tpl = '<div class="day wrap"><table><thead>HEAD</thead><tbody>BODY</tbody><tfoot>FOOT</tfoot></table></div>',
                thead=tbody=tfoot='',locale = Datepicker.locale,config=Datepicker.config,todayCls;
            thead = '<tr><th><span class="'+config.leftCls+'"></span></th>' +
                '<th colspan="5" class="curDate">' + year + locale.YEAR + locale.MONTH[month] +'</th>' +
                '<th><span class="'+config.rightCls+'"></span></th></tr><tr>';
            for(var i=0; i<7; i++){
                thead +='<th>' + locale.MONTH[i] + '</th>';
            }
            thead +='</tr>';
            for(i=0; i<days.length;i++) {
                if(i%7===6){
                    tbody += '</tr>';
                }
                if(i%7===0){
                    tbody += '<tr>';
                }
                todayCls = i==this.todayIndex ? 'class="today"' : '';
                tbody += '<td '+ todayCls +'>'+days[i]+'</td>';
            }
        },
        getCurDayRange: function(date){
            var year = date.getFullYear(),month = date.getMonth();
            return  [new Date(year,month,1),new Date(year,month+1,0)];
        },
        getShowDays: function(date){
            var curDate = date || this.date,year = curDate.getFullYear(),month = curDate.getMonth(),
                day = curDate.getDate(),start = (new Date(year,month,1)).getDate(),
                end = (new Date(year,month+1,0)).getDate(),weekIndex = startDate.getDay(),
                dayArr = [], i = weekIndex-1,j=1;
            //前一个月
            if(i>=0){
                var prevMonth = new Date(year,month,0).getDate();
                while(i>=0){
                    dayArr[i] = prevMonth;
                    prevMonth--;
                    i--;
                }
            }
            //当前月
            for(i = start; i <= end; i++) {
                if(day === i){
                    this.todayIndex = weekIndex;
                }
                dayArr[weekIndex++] = i;
            }
            //后一个月
            for(i=weekIndex;i<42;i++){
                dayArr[i] = j++;
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
        leftCls:'glyphicon glyphicon-chevron-left',
        rightCls:'glyphicon glyphicon-chevron-right'
    };


    new Datepicker({ele:document.body})
})();