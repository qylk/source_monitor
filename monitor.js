INTERVAL = 30 * 1000;
TARGET_URL = "http://weixin.ngarihealth.com/weixin/*.jsonRequest";

function requestPermission() {
    Notification.requestPermission().finally();
}

function start() {
    requestPermission();
    window.timerId = setInterval(monitor, INTERVAL);
}

function monitor() {
    var data = [31428, 1003331, "", "onlyRegisterAppoint"];
    $.ajax({
        type: "POST",
        url: TARGET_URL,
        data: JSON.stringify(data),
        success: handleResult,
        headers: {
            'X-Service-Method': 'effectiveSourceDoctorsWithBusTypeForhealth',
            'X-Access-Token': 'da4cc0a9-7d7d-4e24-a736-32e893e83659',
            'encoding': 'utf-8',
            'X-Service-Id': 'appoint.appointUnLoginService',
            'X-Requested-With': 'com.easygroup.ngaripatient.tianjinertong'
        },
        cache: false,
        contentType: 'application/json',
        dataType: "json"
    });
}

function handleResult(data) {
    var source = 0;
    data.body.forEach(function (item) {
        if (item.doctor.proTitle === '2') {//2副主任
            source += item.doctor.source;
        }
    });
    if (source > 0) {
        clearInterval(window.timerId);
        notify();
    } else {
        console.log("还没有");
    }
}

function notify() {
    new Notification("状态更新提醒",
        {
            body: "有了",
            icon: 'https://www.baidu.com/img/baidu_resultlogo@2.png',
            requireInteraction: true
        });
}
