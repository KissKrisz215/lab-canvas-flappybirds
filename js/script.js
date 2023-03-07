window.onload = function() {
  let highestScore = 0;
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

 var continueAnimation = true;
  let speed = 2;
  let isCrashed = false;


 function renderObstacle(){
  obstacleArray.forEach((item,index) => {
    //Checks if the player left the obstacle
    if(item.x < -50){
      
      obstacleArray.splice(index,1)
    }
    //If the player has toched the bottom of the screen crashes
    if(flappyBird.y >= 450){
      flappyBird.y = 450;
      crashed();
    }
    if(flappyBird.x === item.x){
      //If the player has the same Y coordinate as the top obstacle
      if(flappyBird.y < item.topHeight + 10){
        crashed();
      }else if(flappyBird.y - 85 > item.topHeight){
        crashed();

      }
    }
    
   ctx.clearRect(0,0, canvas.width, canvas.height);
   //If the player crashes it renders the best score and the current score
   if(isCrashed === true){
    ctx.fillStyle = 'white';
    ctx.font = '26px serif';
    ctx.fillStyle = '#FFDD71';
    ctx.beginPath();
    ctx.roundRect(330, 200, 100, 120, 20);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score:`,350,230);
    ctx.fillStyle = '#DA6D1E'
    ctx.fillText(`${flappyBird.score}`,375,250);
    ctx.fillStyle = 'white';
    ctx.fillText(`Best:`,355,280);
    ctx.fillStyle = '#DA6D1E'
    ctx.fillText(`${highestScore}`,375,305);
   }
   //Else the game continues and the obstacles are drawn
   ctx.globalCompositeOperation = 'destination-over';
   ctx.drawImage(item.topImg, item.x, item.y, 50, item.topHeight);
   ctx.drawImage(item.bottomImg, item.bottomX, item.bottomY, 50, item.bottomHeight);
   for(let i = 0; i < obstacleArray.length; i++){
    ctx.drawImage(obstacleArray[i].topImg, obstacleArray[i].x, obstacleArray[i].y, 50, obstacleArray[i].topHeight);
   ctx.drawImage(obstacleArray[i].bottomImg, obstacleArray[i].bottomX, obstacleArray[i].bottomY, 50, obstacleArray[i].bottomHeight);
   }
   //Decrements each obstacles X coodinate to animate obstacles moving
   item.bottomX -= speed;
   item.x -= speed;
  
  })
  if(continueAnimation === true){
    requestAnimationFrame(renderObstacle);
  }
  
}
function crashed(){
  //Stop the background looping if the player has crashed
  ctx.clearRect(0,0, 800, 600)
  loadBackground.speed = 0;
  loadBackground.x = 800;
  loadBackground.gameOver = true;
  isCrashed = true;
  speed = 0;
  setInterval(() => {
    if(flappyBird.y >= 450){
      flappyBird.y = 449;
    }
  },10)
 }
 setInterval(() => {
  flappyBird.moves = false;
}, 3000)

renderObstacle();

addObstacle();
setInterval(() => {
  addObstacle();
}, 1700)


const flappyBird = new character(50,50);
 flappyBird.moveUp();
 setInterval(() => {
  flappyBird.checkCollision();
 },20)

  //Loads the background
const loadBackground = {
  img: img,
  x: 0,
  speed: -1.5,
  character: flappyBird.img,


  animate: function(){
    //Icrements X to animate background image
    this.x += this.speed;
    this.x %= canvas.width;
    ctx.drawImage(this.img, this.x, 0);
    //Checks if the character is crashed
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
      ctx.fillStyle = 'white';
      ctx.font = '26px serif';
      ctx.fillText(`Score: ${flappyBird.score}`,650,35);
      ctx.globalCompositeOperation = 'source-atop';
      //Checks if the character is moving
      if(flappyBird.fallingPoint >= 2){
        //If not it rotates the character
        drawScore()
        drawImageRot(this.character,flappyBird.x, flappyBird.y, 50,50, 90 )
      }else{ 
        //If the player is moving it draw the character by default
        drawScore()
        ctx.drawImage(this.character, flappyBird.x, flappyBird.y, 50, 50);
      }
    } else {
      //If the character is not crashed
      ctx.drawImage(this.character, this.x - this.img.width, 0);
      ctx.globalCompositeOperation = 'source-atop';
      if(flappyBird.fallingPoint >= 2){
        //If the character is not moving it rotates the character
        drawScore()
        drawImageRot(this.character,flappyBird.x, flappyBird.y, 50,50, 90 )
      }else{
        //If the character is moving is displays it by default
        drawScore()
        ctx.drawImage(this.character, flappyBird.x, flappyBird.y, 50, 50);
      }
    }
  }
}
//Displays the Score on the screen
function drawScore(){
  ctx.fillStyle = 'white';
  ctx.font = '26px serif';
  ctx.fillText(`Score: ${flappyBird.score}`,650,35);
}

function drawImageRot(img,x,y,width,height,deg){
  // Store the current context state (i.e. rotation, translation etc..)
  ctx.save()
  //Convert degrees to radian 
  var rad = deg * Math.PI / 180;
  //Set the origin to the center of the image
  ctx.translate(x + width / 2, y + height / 2);
  //Rotate the canvas around the origin
  ctx.rotate(rad);
  //draw the image    
  ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
  // Restore canvas state as saved from above
  ctx.restore();
}

var update = true;

//Loads the background
function updateBackground() {
    loadBackground.animate();
    requestAnimationFrame(updateBackground); 
}
updateBackground();
flappyBird.falling();
flappyBird.addFallingPoint();
  }
};
