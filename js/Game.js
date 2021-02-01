class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    boy = createSprite(-100, 0, 50, 50);
    //boy.shapeColor = "red";
    boy.addImage("by", boy_img);
    boy.scale = 0.3;
    girl = createSprite(-100, 0, 50, 50);
    girl.addImage("gy", girl_img);
    girl.scale = 0.3;
    cycles = [boy, girl];
  }

  play() {
    form.hide();
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background("violet");
      image(ground, 0, 0, displayWidth * 5, displayHeight);

      //var display_position = 100;


      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y = 50;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the cars in y direction
        x = displayWidth / 2 + 100 - allPlayers[plr].distance;
        cycles[index - 1].x = x;
        cycles[index - 1].y = y;

        textSize(25);
        fill("violet");
        text("Please Check Your Console.", 200, 80);
        text("TimeLimit : " + TimeLimit, displayWidth - 20, 80);
        TimeLimit = TimeLimit - 1;


        if (index === player.index) {
          stroke(10);
          fill("pink");
          text("You", x + 80, y);
          cycles[index - 1].shapeColor = "red";
          camera.position.x = cycles[index - 1].x;
          camera.position.y = displayHeight / 2;
        }
        else {
          stroke(10);
          fill("pink");
          text("Other", x + 80, y);
        }

      }

    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      player.distance -= 10;
      player.update();
    }
    if (player.distance < -6000) {
      gameState = 2;
      game.end();
    }
    if (TimeLimit < 0) {
      alert("Your Time is Finish");
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
    alert("Game is Ended☹☹");
  }
}
