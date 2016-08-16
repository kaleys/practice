var ulit = {
    subStrByLength: function (str,len) {
        if(str.length <= len) return str;
        var retLen = len;
        for(var i=0; i<len; i++) {
            if(/[\u4e00-\u9fa5]/.test(str.charAt(i))) {
                i++;
                retLen--;
            }
        };
        return str.substr(0,retLen)+'...';
    }
};
