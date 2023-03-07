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


class character {
  constructor(width,height){
    this.width = width,
    this.height = height,
    this.x = 350,
    this.y = 250,
    this.speedX = 0,
    this.speedY = 0,
    this.gravity = 0,
    this.gravitySpeed = 0,
    this.img = flappyBirdImg,
    this.score = 0,
    this.moves = false,
    this.fallingPoint = 0;
    this.bestScore = 0
  }
  falling(arg){
    if(arg === false){

    }
    setInterval(() => {
      this.y +=2;
    },15)
 
   }
   addFallingPoint(){
    setInterval(() => {
      this.fallingPoint += 1;
    },400)
   }
   //Checks if item has passed the obstacle & updates the score
   checkCollision(){
      obstacleArray.forEach((item) => {
        if(item.x + 50 === this.x){
          this.score++;
        }
      })
   }
   //Moves the character by different Y points on keypress Events
   moveUp(){
    document.addEventListener('keypress', (event) => {
     if(event.keyCode === 32){
       this.fallingPoint = 0;
       this.y -= 45;
       this.moves = true;
     }
    })
    document.addEventListener('click', (event) => {
     this.y -= 45;
     this.moves = true;
     this.fallingPoint = 0;
    })
    document.addEventListener('dblclick', (event) => {
     this.y -= 40;
     this.moves = true;
     this.fallingPoint = 0;
    })
  }
  }
  //Checks and updates if the current score is greater than the best score
 setInterval(() => {
  if(flappyBird.score > highestScore){
    highestScore = flappyBird.score;
  }
 },10)

 function addObstacle(){
  //Generates random height for the obstacles displayed on top
  const randomTopHeight = Math.floor(Math.random() * (220 - 140) + 140);
  if(randomTopHeight <= 180){
    //Generates random bottom height depending on randomTopHeight
    this.randomBottomHeight = Math.floor(Math.random() * (185 - 165) + 165);
  }else if(randomTopHeight > 180){
   this.randomBottomHeight = Math.floor(Math.random() * (140 - 130) + 165);
  }

  const object = {
    x:800,
     y:0,
      width:60,
       topHeight: randomTopHeight,
        bottomX:800, 
        bottomY: 500 - this.randomBottomHeight,
         bottomHeight: this.randomBottomHeight,
         topImg:obstacleTop,
         bottomImg:ostacleBottom,
         countedScore: 0
        }

  obstacleArray.push(object);
 }
};
