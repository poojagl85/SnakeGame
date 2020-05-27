function init(){


    canvas = document.getElementById("mycanvas");
    W = H = canvas.height = canvas.width = 1000;

    pen = canvas.getContext('2d');
    cs = 66;
    game_over = false;
    score = 0;


    fruit  = new Image();
    fruit.src = "assets/images/apple.png";

    trophy = new Image();
    trophy.src  = "assets/images/trophy.png";


    food = getRandomFood();
    score  = 0;

    snake  = {
        init_len  : 5,
        color : "blue",
        cells : [],
        direction : "right",

        createSnake : function(){
            for(var i = this.init_len ; i> 0; i-- ){
                this.cells.push({x : i, y : 0});
            }
        },

        drawSnake : function(){
            for(var  i = 0 ; i <this.cells.length ; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },

        updateSnake : function(){
        
          
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            var X , Y;
               

            if(food.x == headX && food.y == headY){
                console.log("Food Eaten");
                food = getRandomFood();
                score++;

            }else{
                this.cells.pop();
            }


            // var X = headX  +1;
            // var Y = headY;
            // 

           

            if(this.direction == "left"){
                
                 X = headX  -1;
                 Y = headY;
               
            }else if(this.direction == "right"){

                
             X = headX  +1;
             Y = headY;
           

            }else if(this.direction == "up"){

               
             X = headX  ;
             Y = headY -1;
           

            }else{
              
    
                X = headX  ;
                Y = headY  + 1;
              
    
            }
            this.cells.unshift({x : X, y : Y});

            var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

            if(this.cells[0].x > last_x  || this.cells[0].x <= 0 || this.cells[0].y > last_y || this.cells[0].y < 0){

             
                game_over = true;

                 
               
            }

        }

    }

    snake.createSnake();

     function keyPressed(e){
          console.log("You pressed a key", e.key);

          if(e.key == "ArrowRight"){
              snake.direction = "right";
          }else if(e.key == "ArrowLeft"){
              snake.direction = "left";
          }else if(e.key == "ArrowUp"){
              snake.direction = "up";
          }else{
              snake.direction = "down";
          }

          console.log(snake.direction);
     }


    document.addEventListener('keydown',keyPressed);

}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(fruit,food.x*cs, food.y*cs, cs,cs);
     snake.updateSnake();

     pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);
    

}
function update(){

    if(game_over == true){
        clearInterval(f);
        alert("Game Over");
    }
  

     
}
function getRandomFood(){
 var foodX = Math.round(Math.random()*(W - cs)/cs);
 var foodY = Math.round(Math.random()*(W - cs)/cs);

 food = {
     x : foodX,
     y : foodY,
     color  : "red"
 }

 return food;


}
function gameloop(){
      draw();
      update();

}

init();
var f = setInterval(gameloop,200);

