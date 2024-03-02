const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin');
const colors = ['#FF9999', '#FFCC99', '#FFFF99', '#CCFF99', '#99FF99', '#99FFCC'];
let options = ["選項1", "選項2", "選項3", "選項4", "選項5", "選項6","選項7", "選項8", "選項9", "選項10", "選項11", "選項12"];
let startAngle = 0;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;
let finalAngle = 0;
let angleDeg = 90
let isgo = true;
let isDragging = false;

const wheel = document.getElementById('wheel');
const pointer = document.getElementById('pointer');
const wheelCenter = { x: wheel.offsetWidth / 2, y: wheel.offsetHeight / 2 };




document.getElementById('listForm').addEventListener('submit', function(e) {
  e.preventDefault();
  options = document.getElementById('list').value.trim().split('\n');
  drawWheel()
});

pointer.addEventListener('mousedown', function(e) {
  e.preventDefault();
  isDragging = true;
  });

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const wheelRect = wheel.getBoundingClientRect();
      const wheelCenter = { x: wheelRect.left + wheelRect.width / 2, y: wheelRect.top + wheelRect.height / 2 };
      const angleRad = Math.atan2(e.clientY - wheelCenter.y, e.clientX - wheelCenter.x) + Math.PI / 2;
      angleDeg = angleRad * (180 / Math.PI);
      if (angleDeg < 0) {
        angleDeg += 360;
      }
      const radius = wheelRect.width / 2;
      console.log(wheelCenter,wheelRect);
      pointer.style.transform = `translate(0%, 0%) translate(-260px, ${-10}px) rotate(${angleDeg}deg) translateY(-${radius}px)`;

    }
  });

document.addEventListener('mouseup', function(e) {
  isDragging = false;
});



function drawWheel() {
  let angle = startAngle;
  const arc = Math.PI / (options.length / 2);
  const fontSize = Math.max(10, 30 - (options.length * 0.5)); // 假設基礎大小為20，每增加一個選項，字體大小減少0.5，但不小於10
  for (let i = 0; i < options.length; i++) {
    let endAngle = angle + arc;
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, angle, endAngle, false);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.font = `${fontSize}px Arial`;
    ctx.translate(250 + Math.cos(angle + arc / 2) * 150, 250 + Math.sin(angle + arc / 2) * 150);
    ctx.rotate(angle + arc / 2);
    ctx.fillText(options[i], (-ctx.measureText(options[i]).width / 2)+50, 5);
    ctx.restore();
    angle += arc;
  }
}

function drawPointer() {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(0, -190);
  ctx.lineTo(-10, -210);
  ctx.lineTo(10, -210);
  ctx.closePath();
  ctx.fill();
}


function rotateWheel() {
  spinTime += 20;
  if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      isgo = true
      return;
    }

  const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  finalAngle = startAngle;
  drawWheel();
  requestAnimationFrame(rotateWheel);
}


function stopRotateWheel() {
  const finalAngleDegrees = finalAngle * (180 / Math.PI);
  const winningOption = getWinningOption(finalAngleDegrees);
  console.log("中獎選項：", winningOption);
  showAlert(`是否移除選項: ${winningOption}?`, function(isConfirmed) {
    if (isConfirmed) {
      const index = options.indexOf(winningOption);
      if (index !== -1) {
          options.splice(index, 1);
          drawWheel();
      } else {
          alert(`找不到選項: ${winningOption}`);
      }
    } else {
        console.log("取消");
    }
  });

}


function spin() {
  if (isgo){
    isgo = false;
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 7000;
    startAngle = 0;
    finalAngle = 0;
    rotateWheel();
  }
}

function getWinningOption(finalAngle) {
  const adjustedAngle = finalAngle % 360;
  const optionsAngle = 360 / options.length;
  let winningIndex = Math.ceil((270 +angleDeg - adjustedAngle) / optionsAngle) % options.length;
  if (winningIndex-1 < 0) {
    winningIndex = winningIndex+options.length;
  }
  return options[winningIndex-1];
}

function easeOut(t, b, c, d) {
    const ts = (t/=d)*t;
    const tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}
spinButton.addEventListener('click', spin);
drawWheel();

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var confirmBtn = document.getElementById("confirmBtn");
var cancelBtn = document.getElementById("cancelBtn");

function showAlert(message, callback) {
  document.getElementById("modalText").innerText = message;
  modal.style.display = "block";
  confirmBtn.onclick = function() {
    closeModal();
    callback(true);
  }
  cancelBtn.onclick = function() {
    closeModal();
    callback(false);
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
      callback(false);
    }
  }
}

function closeModal() {
  modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
  const toggleListBtn = document.getElementById('toggleListBtn');
  const listContainer = document.getElementById('listContainer');
  const imageContainer = document.getElementById('imageContainer');
  toggleListBtn.addEventListener('click', function() {
    // 檢查清單容器的顯示狀態並切換
    if (listContainer.style.display === 'none') {
      listContainer.style.display = 'block'; // 顯示
      imageContainer.style.display = 'none';
    } else {
      listContainer.style.display = 'none'; // 隱藏
      imageContainer.style.display = 'block';
    }
  });
});