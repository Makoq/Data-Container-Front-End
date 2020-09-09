 
//格式化时间函数：传入new Date对象，返回2020-1-12 03：04格式的时间
var formatDate=function(d){
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1; 
    let curr_year = d.getFullYear();
    let curr_minute=d.getMinutes();
    let curr_hours=d.getHours();

    String(curr_month).length < 2 ? (curr_month = "0" + curr_month): curr_month;
    String(curr_date).length < 2 ? (curr_date = "0" + curr_date): curr_date;
    String(curr_minute).length < 2 ? (curr_minute = "0" + curr_minute): curr_minute;
    String(curr_hours).length < 2 ? (curr_hours = "0" + curr_hours): curr_hours;


    var time = curr_year + "-" + curr_month +"-"+ curr_date+' '+curr_hours+':' +curr_minute;
    return time;
}

exports.formatDate=formatDate


//获取本机ip

 