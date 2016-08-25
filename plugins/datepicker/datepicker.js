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
        },
        initDayPanel: function(){

        }
    }
})();