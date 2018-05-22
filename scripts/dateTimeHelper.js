 // Mohamed Hassan



Date.prototype.AddMinutes = function (number_of_minutes) {
    var time = this ? this : new Date();
    number_of_minutes = number_of_minutes != null ? number_of_minutes : 0;
    return new Date(time.setMinutes(time.getMinutes() + number_of_minutes));
};

Date.prototype.AddSeconds = function (number_of_seconds) {
    var time = this ? this : new Date();
    number_of_seconds = number_of_seconds != null ? number_of_seconds : 0;
    return new Date(time.setSeconds(time.getSeconds() + number_of_seconds));
};

Date.prototype.FormatDateTime = function (date_format, separate_date, time_format, separate_time) {
    date_time = this ? this : new Date();
    var formated_date = date_time.FormatDate(date_time, date_format, separate_date);
    var formated_time = date_time.FormatTime(date_time, time_format, separate_time);
    var res = formated_date + ' ' + formated_time;
    return res;
};

Date.prototype.FormatTime = function (format, separate) {
    date = this ? this : new Date();
    format = format ? format : 'hh/mm/ss';
    separate = separate ? separate : ':';
    var hours = (parseInt(date.getHours()).toString().length == 1) ? ('0' + parseInt(date.getHours())) : date.getHours();
    var minutes = (parseInt(date.getMinutes()).toString().length == 1) ? ('0' + parseInt(date.getMinutes())) : date.getMinutes();
    var seconds = (parseInt(date.getSeconds()).toString().length == 1) ? ('0' + parseInt(date.getSeconds())) : date.getSeconds();
    var res;
    switch (format) {
        case 'hh:mm:ss': res = hours + separate + minutes + separate + seconds; return res;
        case 'ss:mm:hh': res = seconds + separate + minutes + separate + hours; return res;
        case 'hh:mm': res = hours + separate + minutes; return res;
        case 'mm:hh': res = minutes + separate + hours; return res;
        case 'ss': res = seconds; return res;
        case 'mm': res = minutes; return res;
        case 'hh': res = hours; return res;
        default: res = hours + separate + minutes + separate + seconds; return res;
    }
};


Date.prototype.FormatDate = function (format, separate) {
    date = this ? this : new Date();
    format = format ? format : 'yyyy/mm/dd';
    separate = separate ? separate : '/';
    var year = date.getFullYear();
    var month = (parseInt(date.getMonth()) + 1).toString().length == 1 ? ('0' + (parseInt(date.getMonth()) + 1)) : (parseInt(date.getMonth()) + 1);
    var eaxct_month = parseInt(date.getMonth()) + 1;
    var day = (parseInt(date.getDate())).toString().length == 1 ? ('0' + parseInt(date.getDate())) : parseInt(date.getDate());
    var res;
    switch (format) {
        case 'yyyy/mm/dd': res = year + separate + month + separate + day; return res;
        case 'yyyy/dd/mm': res = year + separate + day + separate + month; return res;
        case 'dd/mm/yyyy': res = day + separate + month + separate + year; return res;
        case 'mm/dd/yyyy': res = month + separate + day + separate + year; return res;
        case 'yyyy/m/dd': res = year + separate + eaxct_month + separate + day; return res;
        case 'yyyy/dd/m': res = year + separate + day + separate + eaxct_month; return res;
        case 'dd/m/yyyy': res = day + separate + eaxct_month + separate + year; return res;
        case 'm/dd/yyyy': res = eaxct_month + separate + day + separate + year; return res;
        case 'dd/mm': res = day + separate + month; return res;
        case 'mm/dd': res = month + separate + day; return res;
        case 'dd/yyyy': res = day + separate + year; return res;
        case 'yyyy/dd': res = year + separate + day; return res;
        case 'mm/yyyy': res = month + separate + year; return res;
        case 'yyyy/mm': res = year + separate + month; return res;
        case 'dd/m': res = day + separate + eaxct_month; return res;
        case 'm/dd': res = eaxct_month + separate + day; return res;
        case 'm/yyyy': res = eaxct_month + separate + year; return res;
        case 'yyyy/m': res = year + separate + eaxct_month; return res;
        default: res = year + separate + month + separate + day; return res;
    }
};