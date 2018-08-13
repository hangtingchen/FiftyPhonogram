/*
@author Chen Hangting
@date   2018/08/10
@notes  script for fifty phonogram test
*/
"use strict";

function Phone(ping,pian,yin){
    this.ping=ping;
    this.pian=pian;
    this.yin=yin;
    this.url='meta/audio/'+yin+'.mp3';
    return this;
}

let phoneArr=new Array();
for(let i=0;i<10;i++){
    phoneArr.push(new Array());
}

phoneArr[0][0] = new Phone('あ', 'ア', 'a');
phoneArr[0][1] = new Phone('い', 'イ', 'i');
phoneArr[0][2] = new Phone('う', 'ウ', 'u');
phoneArr[0][3] = new Phone('え', 'エ', 'e');
phoneArr[0][4] = new Phone('お', 'オ', 'o');
phoneArr[1][0] = new Phone('か', 'カ', 'ka');
phoneArr[1][1] = new Phone('き', 'キ', 'ki');
phoneArr[1][2] = new Phone('く', 'ク', 'ku');
phoneArr[1][3] = new Phone('け', 'ケ', 'ke');
phoneArr[1][4] = new Phone('こ', 'コ', 'ko');
phoneArr[2][0] = new Phone('さ', 'サ', 'sa');
phoneArr[2][1] = new Phone('し', 'シ', 'shi');
phoneArr[2][2] = new Phone('す', 'ス', 'su');
phoneArr[2][3] = new Phone('せ', 'セ', 'se');
phoneArr[2][4] = new Phone('そ', 'ソ', 'so');
phoneArr[3][0] = new Phone('た', 'タ', 'ta');
phoneArr[3][1] = new Phone('ち', 'チ', 'chi');
phoneArr[3][2] = new Phone('つ', 'ツ', 'tsu');
phoneArr[3][3] = new Phone('て', 'テ', 'te');
phoneArr[3][4] = new Phone('と', 'ト', 'to');
phoneArr[4][0] = new Phone('な', 'ナ', 'na');
phoneArr[4][1] = new Phone('に', 'ニ', 'ni');
phoneArr[4][2] = new Phone('ぬ', 'ヌ', 'nu');
phoneArr[4][3] = new Phone('ね', 'ネ', 'ne');
phoneArr[4][4] = new Phone('の', 'ノ', 'no');
phoneArr[5][0] = new Phone('は', 'ハ', 'ha');
phoneArr[5][1] = new Phone('ひ', 'ヒ', 'hi');
phoneArr[5][2] = new Phone('ふ', 'フ', 'fu');
phoneArr[5][3] = new Phone('へ', 'ヘ', 'he');
phoneArr[5][4] = new Phone('ほ', 'ホ', 'ho');
phoneArr[6][0] = new Phone('ま', 'マ', 'ma');
phoneArr[6][1] = new Phone('み', 'ミ', 'mi');
phoneArr[6][2] = new Phone('む', 'ム', 'mu');
phoneArr[6][3] = new Phone('め', 'メ', 'me');
phoneArr[6][4] = new Phone('も', 'モ', 'mo');
phoneArr[7][0] = new Phone('や', 'ヤ', 'ya');
phoneArr[7][1] = new Phone('ゆ', 'ユ', 'yu');
phoneArr[7][2] = new Phone('よ', 'ヨ', 'yo');
phoneArr[8][0] = new Phone('ら', 'ラ', 'ra');
phoneArr[8][1] = new Phone('り', 'リ', 'ri');
phoneArr[8][2] = new Phone('る', 'ル', 'ru');
phoneArr[8][3] = new Phone('れ', 'レ', 're');
phoneArr[8][4] = new Phone('ろ', 'ロ', 'ro');
phoneArr[9][0] = new Phone('わ', 'ワ', 'wa');
phoneArr[9][1] = new Phone('を', 'ヲ', 'wo');
phoneArr[9][2] = new Phone('ん', 'ン', 'n');

let phoneArr2=new Array();
let phoneLengthMap=[0,];
for(let phone1 of phoneArr){
    for(let phone2 of phone1){
        phoneArr2.push(phone2);
    }
    phoneLengthMap.push(phoneLengthMap[phoneLengthMap.length-1]+phone1.length);
}

let progress=document.querySelector("#progress_id");
let result=document.querySelector("#result_id");
let confirmButton=document.querySelector(".confirm");
let resetButton=document.querySelector(".reset");
let rightButton=document.querySelector(".right");
let wrongButton=document.querySelector(".wrong");
let ansButton=document.querySelector(".ans_show");
let phoneAudio=document.querySelector("audio source")

let inputList=document.querySelectorAll('input');
let inputValueList=new Array();
let testOrder;
let nowIndex=0;let currentPhone;
let rightNo=0;let totalNo=0;
rightButton.disabled=true;
wrongButton.disabled=true;
ansButton.disabled=true;


confirmButton.addEventListener('click',confirmGame);
resetButton.addEventListener('click',resetGame);
ansButton.addEventListener("click",playStage1);
rightButton.addEventListener("click",playStage2_1);
wrongButton.addEventListener("click",playStage2_2);

function randomListSort(arr){
    arr.sort(function(){return 0.5-Math.random();});
    return arr;
}

function playGame(){
    testOrder=new Array();
    rightButton.disabled=true;
    wrongButton.disabled=true;
    ansButton.disabled=false;

    for(let i=phoneLengthMap[inputValueList[0]-1];i<phoneLengthMap[inputValueList[1]];i++){
        testOrder.push(i);
    }
    testOrder=randomListSort(testOrder);
    let i=0;
    currentPhone=phoneArr2[testOrder[i]];
    phoneAudio.src=currentPhone.url;
    phoneAudio.parentElement.autoplay=true;
    phoneAudio.parentElement.load();
}

function playStage1(){
    rightButton.disabled=false;
    wrongButton.disabled=false;
    ansButton.disabled=true;
    ansButton.textContent=currentPhone.ping+"\n\n"+currentPhone.pian;
}

function playStage2_1(){
    rightButton.disabled=true;
    wrongButton.disabled=true;
    ansButton.disabled=false;
    ansButton.textContent="SHOW";
    nowIndex=nowIndex+1;
    currentPhone=phoneArr2[testOrder[nowIndex]];
    rightNo=rightNo+1;
    totalNo=totalNo+1;
    progress.textContent=totalNo+"/"+testOrder.length;
    result.textContent=rightNo+"/"+totalNo;
    if(totalNo===testOrder.length){
        alert(rightNo+"/"+totalNo);
        resetGame();
    }

    phoneAudio.src=currentPhone.url;
    phoneAudio.parentElement.autoplay=true;
    phoneAudio.parentElement.load();
}

function playStage2_2(){
    rightButton.disabled=true;
    wrongButton.disabled=true;
    ansButton.disabled=false;
    ansButton.textContent="SHOW";
    nowIndex=nowIndex+1;
    currentPhone=phoneArr2[testOrder[nowIndex]];
    totalNo=totalNo+1;
    progress.textContent=totalNo+"/"+testOrder.length;
    result.textContent=rightNo+"/"+totalNo;
    if(totalNo===testOrder.length){
        alert(rightNo+"/"+totalNo);
        resetGame();
    }

    phoneAudio.src=currentPhone.url;
    phoneAudio.parentElement.autoplay=true;
    phoneAudio.parentElement.load();
}

function confirmGame(){
    inputList=document.querySelectorAll('input');
    try {
        if(inputList.length !== 3){
            throw new SyntaxError("input list length is not correct");
        }
        for(let i=0;i<inputList.length;i++){
            inputValueList[i]=Number(inputList[i].value);
            inputList[i].disabled=true;
        }
        if(inputValueList[0]<1 || inputValueList[0]>10 || inputValueList[1]<1 || inputValueList[1]>10 || inputValueList[2]<-1 || inputValueList[2]>100){
            throw new RangeError("START 1-10\nEND 1-10\nTIMES <=100")
        }
    } catch (error) {
        alert(error);
    }
    confirmButton.disabled=true;
    rightButton.disabled=false;
    wrongButton.disabled=false;
    ansButton.disabled=false;
    playGame();
}

function resetGame(){
    inputList[0].value="1";
    inputList[1].value="9";
    inputList[2].value="-1";
    confirmButton.disabled=false;
    progress.textContent="0/0";
    result.textContent="";
    phoneAudio.src="";
    rightButton.disabled=true;
    wrongButton.disabled=true;
    ansButton.disabled=true;
    ansButton.textContent="SHOW";
    rightNo=0;
    totalNo=0;
    for(let i=0;i<inputList.length;i++){
        inputList[i].disabled=false;
    }
}
