INTERVAL = 30 * 1000;
TARGET_URL = "http://weixin.ngarihealth.com/weixin/*.jsonRequest";
COUNT = 0;

function requestPermission() {
    Notification.requestPermission().finally();
}

function start() {
    requestPermission();
    monitor();
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
        dataType: "json",
        complete: function () {
            $('#count').text(`has monitor ${++COUNT} times`);
            setTimeout(monitor, INTERVAL);
        }
    });
}

function handleResult(data) {
    var source = 0;
    data.body.forEach(function (item) {
        if (item.doctor.proTitle === '2') {//2
            source += item.doctor.source;
        }
    });
    if (source > 0) {
        notify();
    }
}

function notify() {
    new Notification("what happens?",
        {
            body: "let's go go",
            icon: 'https://www.baidu.com/img/baidu_resultlogo@2.png',
            requireInteraction: true
        });
}
