/**
 * Created by zhy on 2017/12/6.
 */
var control=document.getElementsByClassName('control');
var word=document.getElementsByClassName('zhy-word');
var canList=document.getElementsByClassName('zhy-bg');
var index=0,timeId;
for(var i=0;i<control.length;i++){
    ;(function (control,word,canList) {
        var j=i;
        control[i].onclick=function () {
            if(timeId)clearInterval(timeId);
            for(var i=0;i<control.length||i<canList.length;i++){
                if(control[i]){
                    control[i].setAttribute('class','control');
                    word[i].setAttribute('class','zhy-word');
                }
                canList[i].style.display='none';
            }
            this.setAttribute('class','control active');
            word[j].setAttribute('class','zhy-word active');
            canList[j].style.display='block';
            shineStar(j);
            if(j==0){
                ca2draw();
                if(ctx4.tId)clearInterval(ctx4.tId);
                ctx4.tId=0;
                clearInterval(ctx.tId);
                ctx.tId=setInterval(ca1draw,60);
                zoomIn(j);
            }
            if(j!=0){
                coutOfdraw=0;
                canList[3].style.display='block';
                ca4draw();
            }
            if(j==1){
                ca3draw();
                zoomIn(j);
            }else {
                if(ctx2.tId)clearInterval(ctx2.tId);
                ctx2.tId=0;
            }
            if(j==2){
                draw5();
                zoomIn(j);

            }
            if(j==3){
                draw5();
                canList[2].style.display='block';
                shineStar(j);
            }
            index=j;
            autoRun();
        }
    })(control,word,canList);
}
function autoRun() {
    timeId=setInterval(function () {
        index=index==3?0:++index;
        control[index].onclick();
    },6000)
}
 autoRun();

function addEvent(obj,xEvent,fn) {
    if(obj.attachEvent){
        obj.attachEvent('on'+xEvent,fn);
    }else{
        obj.addEventListener(xEvent,fn,false);
    }
}
window.onload = function () {
    //接着利用我们自己封装的函数给p绑定事件，
    addEvent(document,'mousewheel',onMouseWheel);
    addEvent(document,'DOMMouseScroll',onMouseWheel);
    // 当滚轮事件发生时，执行onMouseWheel这个函数
    function onMouseWheel(e) {
        e=e||window.event;
        if(e.wheelDelta>0){
            index=index==0?3:--index;
        }else if(e.detail<0){
            index=index==0?3:--index;
        }else {
            index=index==3?0:++index;
        }
        control[index].onclick();
    }
}
//************************************************************
//画布2固定星空
var canvas2=document.getElementById('canvas2');
var ctx1=canvas2.getContext('2d');
window.addEventListener("resize", resizeCanvas, false);

function resizeCanvas() {
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    ca2draw();
}
resizeCanvas();
function ca2draw() {
    ctx1.clearRect(0,0,canvas2.width,canvas2.height);
    for(var k=0;k<180;k++){
        ctx1.save();
        ctx1.beginPath();
        ctx1.translate((0.05+Math.random()*0.9)*canvas2.width ,(0.05+Math.random()*0.9)*canvas2.width);
        ctx1.fillStyle='#bbbbbb';
        ctx1.arc(0,0,Math.random()*3,0,Math.PI*2);
        ctx1.fill();
        ctx1.restore();
    }
}

//************************************************************
var canvas1=document.getElementById('canvas1');
var ctx=canvas1.getContext('2d');
   window.addEventListener("resize", resizeCanvas1, false);

   function resizeCanvas1() {
       canvas1.width = window.innerWidth;
       canvas1.height = window.innerHeight;
   }
resizeCanvas1();
var coutOfdraw=0;
function ca1draw() {
    // ctx.clearRect(0,0,canvas1.width,canvas1.height);
    var img=new Image();
    img.onload=function () {
        ctx.save();
        ctx.fillRect(0,0,canvas1.width,canvas1.height);
        ctx.translate(canvas1.width/2,canvas1.height/2);
        ctx.rotate(-coutOfdraw*Math.PI/2880);
        ctx.drawImage(img,-img.width/2,-img.height/2);
        ctx.restore();
        ctx.save();
        ctx.translate(canvas1.width/2,canvas1.height/2);
        ctx.rotate(-3*coutOfdraw*Math.PI/2880);
        ctx.drawImage(canvas2,-canvas2.width/2,-canvas2.height/2);
        coutOfdraw=coutOfdraw>5760?0:++coutOfdraw;
        ctx.restore();
    }
    img.src="images/page1_bg.jpg";
}
 ctx.tId=setInterval(ca1draw,100);

//************************************************************
//************************************************************
var canvas4=document.getElementById('canvas4');
var ctx4=canvas4.getContext('2d');
   window.addEventListener("resize", resizeCanvas4, false);
   function resizeCanvas4() {
       canvas4.width = window.innerWidth;
       canvas4.height = window.innerHeight;
   }
resizeCanvas4();
function ca4draw() {
    var arrLi=[],arr=[];
    var hfw=canvas4.width/2
    var hfh=canvas4.height/2
    for(var k=0;k<150;k++){
        arr[0]=k<99?20+Math.random()*(hfw-20):2*k+Math.random()*(hfw-k*2);
        arr[1]=Math.PI*2*Math.random();
        arr[2]=Math.random()*3;
        arrLi[arrLi.length]=arr;
        arr=[];
    }
    var cout=0;
    if(ctx4.tId)return;
    function move() {
        if(cout%50==0){
            for(var k=0;k<6;k++){
                arr[0]=20+Math.random()*30;
                arr[1]=Math.PI*2*Math.random();
                arr[2]=Math.random()*2;
                arrLi.unshift(arr);
                arr=[];
            }
        }
        if(arrLi.length>500){
            arrLi=arrLi.slice(0,400);
        }
        ctx4.save();
        ctx4.clearRect(0,0,canvas4.width,canvas4.height);
        ctx4.translate(hfw,hfh);
        ctx4.fillStyle='#ccc';
        for(var k=0;k<arrLi.length;k++){
            arrLi[k][0]+=0.8;
            ctx4.save();
            ctx4.rotate(arrLi[k][1]);
            ctx4.beginPath();
            ctx4.arc(arrLi[k][0],0,arrLi[k][2],0,Math.PI*2);
            ctx4.fill();
            ctx4.restore();
        }
        cout++;
        if(cout>12000)cout=0;
        ctx4.restore();
    }
    ctx4.tId=setInterval(move,100);
}
// ca4draw();

// //************************************************************
var canvas3=document.getElementById('canvas3');
var ctx2=canvas3.getContext('2d');
window.addEventListener("resize", resizeCanvas3, false);
function resizeCanvas3() {
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;
}
resizeCanvas3();
function ca3draw() {
    var rayArr=[];
    for(var i=0;i<=5;i++){
        var arr=[];
        for(var j=1;j<window.innerHeight*0.9/60;j++){
            arr[0]=4+10*Math.random();
            arr[1]=(40-10*Math.random())+i*30;
            arr[2]=Math.random()<0.5?Math.PI*(0.2+Math.random()*0.82):Math.PI*(0.2+Math.random()*0.82)+Math.PI;
            rayArr[rayArr.length]=arr;
            arr=[];
        }
    }
    var num=window.innerHeight*0.8/120;
    var cout2=0;
    if(ctx2.tId)return;
    function draw2() {
        var arr=[];
        for(var j=1;j<num-1;j++){
            arr[0]=7+4*Math.random();
            arr[1]=(44-6*Math.random());
            arr[2]=Math.random()<0.5?Math.PI*(0.22+Math.random()*0.63):Math.PI*(0.22+Math.random()*0.63)+Math.PI;
            rayArr.unshift(arr);
            arr=[];
        }

        if(rayArr.length>180)rayArr=rayArr.slice(0,150);
        // var radgrad = ctx1.createRadialGradient(0,0,28,0,0,80);
        // radgrad.addColorStop(0,"black");
        // radgrad.addColorStop(0.8,"#020915");
        // radgrad.addColorStop(1,"#020a18");
        ctx2.clearRect(0,0,canvas3.width,canvas3.height);
        // ctx1.fillStyle=radgrad;
        ctx2.arc(0,0,80,0,Math.PI*2);
        ctx2.save();
        ctx2.beginPath();
        ctx2.strokeStyle='#3b313b';
        ctx2.lineWidth=0.5;
        ctx2.translate(canvas3.width/2,canvas3.height/2);
        ctx2.fill();
        for(var i=6;i<rayArr.length;i++){
            ctx2.save();
            ctx2.rotate(rayArr[i][2]);
            ctx2.moveTo((rayArr[i][1]-rayArr[i][0])+Math.floor(i/num+1)*14,0);
            ctx2.lineTo(rayArr[i][1]+Math.floor(i/num+1)*12,0);
            ctx2.stroke();
            ctx2.restore();
        }
        ctx2.restore();
    }
    ctx2.tId=setInterval(draw2,100);
}
// ca3draw();
//************************************************************
//************************************************************
var canvas5=document.getElementById('canvas5');
var ctx5=canvas5.getContext('2d');
window.addEventListener("resize", resizeCanvas5, false);

function resizeCanvas5() {
    canvas5.width = window.innerWidth;
    canvas5.height = window.innerHeight;
    draw5();
}
canvas5.width = window.innerWidth;
canvas5.height = window.innerHeight;

function draw5() {
    var img5=new Image();
    img5.onload=function () {
        ctx5.save();
        ctx5.clearRect(0,0,canvas5.width,canvas5.height);
        ctx5.translate(canvas5.width/2,canvas5.height/2);
        ctx5.drawImage(img5,-img5.width/2,-img5.height/2,img5.width,img5.height);
        ctx5.restore();
    }
    img5.src='images/page3_bg.jpg';
}
function zoomIn(i) {
    var zoom=document.getElementsByClassName('zhy-earth')[0];
    if(i==3||i==2){
        zoom.setAttribute('class','zhy-earth zoomIn');
    }else {
        zoom.setAttribute('class','zhy-earth');
    }
}
var sliup=document.getElementById('zhy-sliup');
var pika=document.getElementById('zhy-pika');
var cont=document.getElementById('zhy-cont');
var coutArr=[];
function shineStar(j) {
    if(j==3){
        if(coutArr.length>0)return;
        pika.style.width=cont.offsetWidth+'px';
        pika.style.height=cont.offsetHeight+'px';
        coutArr[coutArr.length]=setTimeout("cont.setAttribute('class','zhy-move1')",800);
        coutArr[coutArr.length]=setTimeout("cont.setAttribute('class','zhy-move2')",1400);
        coutArr[coutArr.length]=setTimeout("cont.setAttribute('class','zhy-move3')",3000);
        coutArr[coutArr.length]=setTimeout("cont.setAttribute('class','')",4000);

        coutArr[coutArr.length]= setTimeout("sliup.setAttribute('class','zhy-move1')",4400);
        coutArr[coutArr.length]= setTimeout("sliup.setAttribute('class','');coutArr=[]",5000);

        coutArr[coutArr.length]=setTimeout("pika.setAttribute('class','zhy-move1')",1200);
        coutArr[coutArr.length]= setTimeout("pika.setAttribute('class','zhy-move2')",1700);
        coutArr[coutArr.length]= setTimeout("pika.setAttribute('class','zhy-move1')",2200);
        coutArr[coutArr.length]=setTimeout("pika.setAttribute('class','zhy-move2')",2700);
        coutArr[coutArr.length]=setTimeout("pika.setAttribute('class','')",4000);
    }else {
        cont.setAttribute('class','');
        sliup.setAttribute('class','');
        pika.setAttribute('class','');
        for(var i=0;i<coutArr.length;i++){
            clearTimeout(coutArr[i]);
        }
        coutArr=[];
    }
}

