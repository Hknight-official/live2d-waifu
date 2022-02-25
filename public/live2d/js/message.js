function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage(':3, bạn đã bật bảng điều khiển, bạn có muốn xem bí mật của tôi không?', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('Bạn đã copy gì thì nhớ ghi nguồn khi tái bản nha ~~', 5000);
});

function initTips(){
    $.ajax({
        cache: true,
        url: `${message_Path}message.json`,
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(tips.selector).mouseover(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(tips.selector).click(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
        }
    });
}
initTips();

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = 'Chào mừng Oni-chan quay lại！';
    }else {
        var now = (new Date()).getHours();
        if (now > 23 || now <= 5) {
            text = 'Này! Oni-chan vẫn chưa ngủ à? Nếu anh ngủ muộn nhứ vậy anh làm sao thức dậy đi học?';
        } else if (now > 5 && now <= 7) {
            text = 'Ohayo Oni-chan! Hãy bắt đầu một buổi sáng tốt lành nào！';
        } else if (now > 7 && now <= 11) {
            text = 'Ohayo Oni-chan! Đừng quên tập thể dục buổi sáng nhé！';
        } else if (now > 11 && now <= 14) {
            text = 'Konnichiwa Oni-chan! Sau một bữa sáng mệt mỗi hãy nghĩ ngơi tý nào！';
        } else if (now > 14 && now <= 17) {
            text = 'Thật là mệt mỗi vào buổi chiều hãy cố lên nào Oni-chann!';
        } else if (now > 17 && now <= 19) {
            text = 'konbanwa Oni-chan! Anh có ngắm nhìn hoàng hôn hôm nay không? Nó đẹp lắm đấy >_<';
        } else if (now > 19 && now <= 21) {
            text = 'konbanwa Oni-chan! Ngày hôm nay của anh có thuận lợi không >_<';
        } else if (now > 21 && now <= 23) {
            text = 'Này Oni-chan đã muộn rồi đấy hãy đi nghỉ sớm đi!!';
        } else {
            text = 'Ya！';
        }
        
    }
    showMessage(text, 12000);
})();

// window.setInterval(showHitokoto,30000);

// function showHitokoto(){
//     $.getJSON('https://v1.hitokoto.cn/',function(result){
//         showMessage(result.hitokoto, 5000);
//     });
// }

function chatWaifu(msg){
    $.getJSON(`http://localhost:3000/ai?msg=${msg}`,function(result){
        showMessage(result.msg, 5000);
        return result.content;
    });
}

function chatWaifu2(msg){
    
    $.getJSON(`http://localhost:3000/voice?msg=${msg}`,function(result){
        var audio = $("#waifu-voice");      
        $("#waifu-src").attr("src", result.file);

        audio[0].pause();
        audio[0].load();
        audio[0].oncanplaythrough = audio[0].play();

        $('.message').html(msg).fadeTo(200, 1);

        audio[0].addEventListener("ended", function(){
            console.log("ended");
            $('.message').stop().css('opacity',1);
            $('.message').delay(100).fadeTo(200, 0);
        });
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

function initLive2d (){
    $('.hide-button').fadeOut(0).on('click', () => {
        $('#landlord').css('display', 'none')
    })
    $('#landlord').hover(() => {
        $('.hide-button').fadeIn(600)
    }, () => {
        $('.hide-button').fadeOut(600)
    })
}
initLive2d ();
