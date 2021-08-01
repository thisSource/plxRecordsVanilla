const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
const file = document.getElementById("fileupload");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.lineWidth = 2
ctx.globalCompositeOperation = 'difference'

// ctx.shadowOffsetX = 0;
// ctx.shadowOffsetY = 0;
// ctx.shadowColor = 'blue'
let audioSoruce;
let analyser;

const playButton = document.getElementById('playButton')

playButton.addEventListener("click", function () {
  // let audio1 = new Audio();
  const audio1 = document.getElementById("audio1");
  audio1.src = "./songs/mirage.mp3";
  const audioContext = new AudioContext();

  audio1.play();
  audioSoruce = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSoruce.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 512;
  //128 256 512 1024 2048
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // const barWidth = (canvas.width/2) / bufferLength;
  const barWidth = 15

  let barHeight;
  let x;
 
  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);

    requestAnimationFrame(animate);
  }
  animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 2;
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.rotate(i *  3.2);
    
    const hue = (i) * 300;
    // ctx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)';
    ctx.strokeStyle = 'hsl(' + hue + ',80%, 80%)';

    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(0, barHeight)
    ctx.stroke()
    x += barWidth;
    // ctx.shadowBlur = 5;
    // ctx.shadowColor = 'gold'
    if(i > bufferLength * 0,6){

      ctx.beginPath();
      ctx.arc(0,0, barHeight/4,0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.restore();
  }
}






// function lineShape(startX, startY, endX, endY, LW){
//   ctx.beginPath();
//   ctx.lineWidth = LW
//   // ctx.strokeStyle = 'white'
//   ctx.moveTo(startX, startY)
//   ctx.lineTo(endX, endY)
//   ctx.stroke()
//   ctx.closePath()
// }

// function arcShape(xCenter, yCenter, r, startC, endC, LW){
//   ctx.beginPath()
//   ctx.lineWidth = LW
//   // ctx.strokeStyle = 'white'
//   ctx.arc(xCenter, yCenter, r, 1.5 * Math.PI, 0.5 * Math.PI)
//   ctx.closePath()
//   ctx.stroke()

// }


// function xShape(startX, startY, endX, endY, LW){
//   // ctx.strokeStyle = 'white'
//   lineShape(startX, startY, endX, endY, LW)
//   lineShape(endX, startY, startX, endY, LW)
//   // ctx.stroke()
// }

// function lShape(startX, startY, endX, endY, LW){
//   // ctx.strokeStyle = 'white'
//   lineShape(startX, startY, endX, endY, LW)
//   lineShape(startX-2, startY*2, endX*1.5, endY, LW)
//   // ctx.stroke()
// }

// function pShape(startX, startY, endX, endY, LW){
//   // ctx.strokeStyle = 'white'
//   lineShape(startX, startY, endX, endY, LW)
//   arcShape(startX,startY+(startX/4),startX/3, LW)
//   ctx.stroke()
// }
// function plxShape(startX, startY, endX, endY, LW){
//   pShape(startX,startY,endX,endY,LW)
//   lShape(startX*1.5,startY,endX*1.5,endY,LW)
//   xShape(startX*2,startX,startX*3,startX*2,LW)
// }


// function smileyFace(){
//   ctx.beginPath();
//   //arc(x,y,r,sAngle,eAngle,counterclockwise);
//   ctx.arc(barHeight +75, barHeight +75, 40, 0, Math.PI * 2, true); // Outer circle
//   ctx.moveTo(barHeight +110, barHeight +75)
//   ctx.arc(barHeight +75,barHeight + 75, 25, 0, Math.PI, false); // Mouth (clockwise)
//   ctx.moveTo(barHeight +65,barHeight + 65);
//   ctx.arc(barHeight +60,barHeight + 65, 5, 0, Math.PI * 2, true); // Left eye
//   ctx.moveTo(barHeight +95,barHeight + 65);
//   ctx.arc(barHeight +90,barHeight + 65, 5, 0, Math.PI * 2, true); // Right eye
//   ctx.stroke();
// }

// // smileyFace()

// // pShape(100, 100, 100,200, 2)
// // xShape(100, 100, 300,300, 2)
// // lShape(20,20,20,40,2)

// // function sunLike(bufferLength, x, barWidth, dataArray) {
// //   for (let i = 0; i < bufferLength; i++) {
// //     barHeight = dataArray[i] * 2;
// //     ctx.save();
// //     ctx.translate(canvas.width/2, canvas.height/2)
// //     ctx.rotate(i + Math.PI * 2 / bufferLength);
// //     // const red = (i * barHeight) / 20;
// //     // const green = i/2;
// //     // const blue = barHeight / 2;
// //     // ctx.fillStyle ='white'
// //     // ctx.fillRect(0, 0, barWidth, 15);

// //     const hue = 40;
// //     ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';

// //     // ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
// //     ctx.fillRect(0, 0, barWidth, barHeight);
// //     x += barWidth;
// //     ctx.restore();
// //   }
// // }


// // function drawCircleVisualiser(bufferLength, x, barWidth, dataArray) {
// //   for (let i = 0; i < bufferLength; i++) {
// //     barHeight = dataArray[i] * 5.5;
// //     ctx.save();
// //     ctx.translate(canvas.width/2, canvas.height/2)
// //     ctx.rotate(i * 4.184);
// //     const hue = 120 + i * 0.05;
// //     ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
// //     ctx.beginPath();
// //     ctx.arc(20, barHeight/2, barHeight/2,0, Math.PI /4);
// //     ctx.fill();
// //     ctx.stroke();
// //     x += barWidth;
// //     ctx.restore();
// //   }
// // }

// // function drawPLXVisualiser(bufferLength, x, barWidth, dataArray) {
// //   for (let i = 0; i < bufferLength; i++) {
// //     barHeight = dataArray[i] * 1.5;
// //     ctx.save();
// //     ctx.translate(canvas.width/2, canvas.height/2)
// //     ctx.rotate(i *  8.1);
// //     const hue = i * 3;
// //     ctx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)';
// //     ctx.font = dataArray[i] + 'px Helvetica'
// //     ctx.fillText('PLX',40, barHeight)
// //     ctx.strokeText('PLX',40, barHeight)

// //     x += barWidth;
// //     ctx.restore();
// //   }
// // const fontSize = dataArray[15] * 3;
// // ctx.font = fontSize + 'px Helvetica'
// // ctx.fillText('PLX', canvas.width/2 - fontSize/3, canvas.height/2 - fontSize/3)
// // ctx.strokeText('PLX', canvas.width/2 - fontSize/3, canvas.height/2 - fontSize/3)
// // }