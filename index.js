$(function () {
    //1.监听游戏规则的点击
    $(".rules").click(function () {
        $('.rule').stop().fadeIn(100);
    });
    //2.监听关闭按钮的点击
    $('.close').click(function () {

        $('.rule').stop().fadeOut(100);
    });
    //3.监听开始游戏的点击
    $('.start').click(function () {
        $(this).stop().fadeOut(100);
        //调用处理进度条的方法
        progressHandler();
        //调用处理灰太狼动画的方法
        startwolfAnimation();
    });
    //监听重新开始按钮的点击
    $('.reStart').click(function () {
        $('.mask').stop().fadeOut(100);
        progressHandler();
        startwolfAnimation();
    });
    //定义一个专门灰太狼动画的方法
    var wolfTimer=null;
    function startwolfAnimation() {
        //1.定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];

        //2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        //3.创建一个图片
        var $wolfImage=$("<img src='' class='wolfImage'>");
        //随机获取图片的位置
        var posIndex = Math.round(Math.random()*8);
        $wolfImage.css({
            position:"absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
        //随机获取动物数组的类型
        var wolfType=Math.round(Math.random())===0? wolf_1: wolf_2;

        //5.设置并添加图片的内容
        window.wolfIndex=0;
        window.WolfIndexEnd=5;
        wolfTimer=setInterval(function () {
            if(wolfIndex>WolfIndexEnd){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startwolfAnimation();
            }
            $wolfImage.attr("src",wolfType[wolfIndex]);
            wolfIndex++;

        },300);
        $('.container').append($wolfImage);

        //6.调用游戏规则的方法
        gameRules($wolfImage);
    }
    //定义游戏规则的方法
    function gameRules($wolfImage) {
        $wolfImage.one('click',function () {
            //判断图片类
            var $src=$(this).attr('src');
            var flag=$src.indexOf("h")>=0;
            window.wolfIndex=6;
            window.WolfIndexEnd=9;
            if(flag){
                //+10
                $('.score').text(parseInt($('.score').text())+10);
            }else{
                //-10
                $('.score').text(parseInt($('.score').text())-10);
            }
        })
    }
    //定义一个停止灰太狼动画的方法
    function stopWolfAnimation() {
        clearInterval(wolfTimer);
        $('.wolfImage').remove();

    }
    //定义一个专门处理进度条的方法
    function progressHandler(){
        //重新设置进度条的宽度
        $('.progress').css({
            width:180
        });
        //开启进度条的宽度
        var timer=setInterval(function () {
            var progressWidth=$('.progress').width();
            progressWidth-=1;
            $('.progress').css({
                width:progressWidth
            });
            //监听进度条是否走完
            if(progressWidth<=0){
                clearTimeout(timer);
                $('.mask').stop().fadeIn(100);
                //停止灰太狼动画
                stopWolfAnimation();
            }
        },333.33);
    }
});