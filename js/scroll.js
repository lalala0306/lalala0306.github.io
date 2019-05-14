/*
nicescroll插件使用
*/
$(document).ready(function(){
    $("html").niceScroll({
        cursorcolor:"rgb(16, 167, 175)",//改变滚动条颜色
        cursorwidth: '6', // 滚动条的宽度，单位：便素
        cursorborderradius: '10px', // 滚动条圆角（像素）
        background: '#424f63',// 轨道的背景颜色
        spacebarenabled:false, // 当按下空格时使页面向下滚动
        cursorborder: '0', // CSS方式定义滚动条边框 
        zindex: '1000' // 改变滚动条的DIV的z-index值
    });
    $(".scrollbar1").niceScroll({
        cursorcolor:"rgb(16, 167, 175)", 
        cursorwidth: '6', 
        cursorborderradius: '0',
        autohidemode: 'false',// 隐藏滚动条的方式, 可用的值: true |无滚动时隐藏。。。。。  "cursor" |隐藏。。。。。   false | 不隐藏,。。。。。  "leave" |仅在指针离开内容时隐藏。。。。。  "hidden" | 一直隐藏。。。。。     "scroll"| 仅在滚动时显示  。。。。。       
        background: '#F1F1F1', 
        spacebarenabled:false, 
        cursorborder: '0'
    });  
})