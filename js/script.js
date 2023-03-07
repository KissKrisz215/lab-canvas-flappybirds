window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
//Load new Images
const img = new Image();
img.src = '../images/bg.png';
  const flappyBirdImg = new Image();
  flappyBirdImg.src = '../images/flappy.png'
  const ostacleBottom = new Image();
  ostacleBottom.src = '../images/obstacle_bottom.png';
  const obstacleTop = new Image();
  obstacleTop.src = '../images/obstacle_top.png';

  const obstacleArray = [];
 let countedScore = 0;
//Declares Canvas and background Image
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
canvas.height = 600;
canvas.width = 800;

  }

};
