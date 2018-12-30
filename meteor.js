// Változók beállítása
var movePaddle = 0;
var moveBullet = 0;
var bullettX = paddlePos + 40;
var bullettPosY = 30;
var paddlePos,
    ghostPosX,
    spectrePosX,
    bombPosX,
    bombPosY,
    bomb2PosX,
    bomb2PosY,
    life;
var score = 0;
var game = true;
var paused = false;
var sound = true;

// configuring DOM
var mainLayout = document.querySelector("#mainMenu");
var gameArea = document.querySelector("#universe");
var ghost = document.querySelector("#enemy_1");
var spectre = document.querySelector("#enemy_2");
var ghostBomb = document.querySelector("#bomb_1");
var spectreBomb = document.querySelector("#bomb_2");
var pad = document.querySelector("#paddle");
var fire = document.querySelector("#bullet");
var counter = document.querySelector(".pressSpace");
var scoreContainer = document.querySelector("#score");
var endScore = document.querySelector(".score");
var lifeContainer = document.querySelector("#life");
var endGameMessage = document.querySelector(".endGameMessage");
var newGame = document.querySelector(".again");
var newMainGame = document.querySelector(".mainAgain");
var helpGame = document.querySelector(".help");
var mainMenu = document.querySelector(".main_menu");
var level0 = document.querySelector(".goose");
var level1 = document.querySelector(".baby");
var level2 = document.querySelector(".disintegrate");
var level3 = document.querySelector(".minotaur");
var level0 = document.querySelector(".goose");
var modals = document.querySelector(".modals");
var exitButton = document.querySelector(".exit");

// Howler beállítás, hangok, zenék
var shoot = new Howl({
  src: ['./sounds/Laser_Shoot7.wav']
});

var endSound = new Howl({
  src: ['./sounds/game-over-voice.wav']
});

var destroyPad = new Howl({
  src: ['./sounds/hardcore-kick.wav']
});

var destroyEnemy = new Howl({
  src: ['./sounds/game-over-arcade.wav']
});

var gameMusic = new Howl({
  src: ['./music/bensound-creepy.mp3'],
  loop: true
});

var endMusic = new Howl({
  src: ['./music/bensound-psychedelic.mp3']
});
var mainMusic = new Howl({
  src: ['./music/Extincta.mp3'],
  loop: true,
  onpause: function () {},
});

// Főmenü beállítása
function startMainMenu() {
  gameMusic.stop();
  endMusic.stop();
  mainMusic.play();
  endGameMessage.style.display = "none";
  gameArea.style.display = "none";
  mainLayout.style.display = "block";
}

// Játék alapbeállítása, ellenség véletlenszerű pozicionálása, ugyanonnan indul az első bomba is
function startNewGame() {
  game = true;
  paused = true;
  paddlePos = 450;
  mainLayout.style.display = "none";
  endGameMessage.style.display = "none";
  level0.style.display = "none";
  level1.style.display = "none";
  level2.style.display = "none";
  level3.style.display = "none";
  gameArea.style.display = "block";
  counter.style.display = "block";
  mainMusic.stop();
  endMusic.stop();
  endSound.stop();
  gameMusic.play();
  ghostPosX = Math.floor(Math.random() * 920);
  spectrePosX = Math.floor(Math.random() * 920);
  ghostPos();
  spectrePos();
  life = 3;
  score = 0;
  var timeleft = 3;
  counter.textContent = "3";
  var downloadTimer = setInterval(function () {
    counter.textContent = --timeleft;
    if (timeleft == 0) {
      clearInterval(downloadTimer);
      timeleft = 3;
    }
  }, 1000);
  setTimeout(function () {
    counter.style.display = "none";
    paused = false;
  }, 3000);
}

function ghostPos() {
  ghost.classList.remove("scale-out-center");
  bombPosX = ghostPosX;
  bombPosY = 30;
  ghost.classList.add("scale-in-center");
}

function spectrePos() {
  spectre.classList.remove("scale-out-center");
  bomb2PosX = ghostPosX;
  bomb2PosY = 30;
  spectre.classList.add("scale-in-center");
}

// Játék befejezésének kezelése
function endGame() {
  mainMusic.stop();
  gameMusic.stop();
  endSound.play();
  endMusic.play();
  gameArea.style.display = "none";
  mainLayout.style.display = "none";
  endGameMessage.style.display = "block";
  pad.classList.remove("scale-out-horizontal");
  endScore.textContent = score;
  if (score < 100) {
    level0.style.display = "block";
  }
  if (score > 100 && score < 2000) {
    level1.style.display = "block";
  }
  if (score > 2000 && score < 8000) {
    level2.style.display = "block";
  }
  if (score > 8000) {
    level3.style.display = "block";
  }
}

// Egy élet elvesztésének  ill. az összes élet elvesztésének lekezelése
function endLife() {
  if (life > 1) {
    life -= 1;
    destroyPad.play();
    pad.classList.remove("scale-out-horizontal");
    pad.classList.add("scale-in-hor-center");
  } else {
    game = false;
    lifeContainer.textContent = "0";
    life = 0;
    endGame();
  }
}

// Menü gombjaira való klikkelések lekezelése
mainMenu.addEventListener("click", function () {
  startMainMenu();
});

newMainGame.addEventListener("click", function () {
  startNewGame();
});

newGame.addEventListener("click", function () {
  startNewGame();
});

helpGame.addEventListener("click", function () {
    modals.style.display = "block";
}); 


exitButton.addEventListener("click", function () {
  modals.style.display = "none";
});




// billentyűlenyomás figyelése, lenyomásra / "-" "+", "space", "p" / érték adása változónak
document.addEventListener("keydown", function (moving) {
  if (moving.keyCode == 37 || moving.which == 37) { // left arrow key
    movePaddle = -9;

  }
  if (moving.keyCode == 39 || moving.which == 39) { // right arrow Key
    movePaddle = 9;

  }
  if ((moving.keyCode == 32 || moving.which == 32) && bullettPosY == 30) { // space key
    bullettX = paddlePos + 40;
    shoot.play();
    moveBullet = 7;
    paused = false;
  }

  if (moving.keyCode == 80 || moving.which == 80 && paused === false) { // p key
    paused = !paused;
  }

}, false);


// billentyűfelengedés figyelése, felengedéskor változó érték "0", azaz a pad megáll
document.addEventListener("keyup", function (moving) {
  if (moving.keyCode == 37 || moving.which == 37) { // left arrow key
    movePaddle = 0;

  }
  if (moving.keyCode == 39 || moving.which == 39) { // right arrow Key
    movePaddle = 0;
  }
}, false);


// Ez a funkció teszi lehetővé a folyamatos képkocka/mp értéket
// A mozgás, grafikai elemek ezen belül kell legyenek!!!
window.setInterval(function show() {

  if (paused === false) { // Ha a paused false, akkor megy a játék, ellenkező esetben pillanat álj.

    // A paddle mozgása a játéktéren belül
    paddlePos += movePaddle;
    document.getElementById("paddle").style.left = paddlePos + "px";

    if (paddlePos <= 0) {
      paddlePos = 0;
    } else if (paddlePos > 870) {
      paddlePos = 870;
    }

    // Az ellenséges szellemek folyamatos jobbra-balra mozgatása
    ghostPosX += 4;
    if (ghostPosX > 920) {
      ghostPosX = 0;
    }

    spectrePosX -= 3;
    if (spectrePosX < 0) {
      spectrePosX = 920;
    }

    // Az ellenséges bombák zuhanása, azok sebessége
    bomb2PosY += 8;
    bombPosY += 6;

    // A bombák és a pad találkozásának definiálása
    if ((bombPosX + 50 > paddlePos && bombPosY >= 510) && (bombPosX - 100 < paddlePos) && bombPosY >= 510) {
      pad.classList.remove("scale-in-hor-center");
      pad.classList.add("scale-out-horizontal");
      bombPosX = ghostPosX;
      bombPosY = 0;
      setTimeout(function () {
        endLife();
      }, 550);
    }

    if ((bomb2PosX + 50 > paddlePos && bomb2PosY >= 510) && (bomb2PosX - 100 < paddlePos) && bomb2PosY >= 510) {
      pad.classList.remove("scale-in-hor-center");
      pad.classList.add("scale-out-horizontal");
      bomb2PosX = ghostPosX;
      bomb2PosY = 0;
      setTimeout(function () {
        endLife();
      }, 550);
    }

    // A bombák "esemény nélküli" lezuhanása, nem találnak el
    if (bombPosY >= 530 && game === true) {
      bombPosY = 0;
      bombPosX = ghostPosX;
      score += 1;
    }

    if (bomb2PosY >= 530 && game === true) {
      bomb2PosY = 0;
      bomb2PosX = spectrePosX;
      score += 1;
    }

    // Ez mondja meg a lövedéknek hogy mindig ott legyen ahol a padunk közepe
    if (bullettPosY == 30) {
      bullettX = paddlePos + 40;
    }

    // A lövedékünk "esemény nélküli" repülése, nem talál el ellenséges szellemet
    if (bullettPosY > 540) {
      bullettPosY = 30;
      moveBullet = 0;
      bullettX = paddlePos + 40;
      fire.style.left = bullettX + "px";
    }

    // A kilőtt lövedék és az ellenséges szellemek találkozásának kezelése
    if ((bullettX + 30 > ghostPosX && bullettPosY >= 520) && (bullettX - 50 < ghostPosX) && bullettPosY >= 520) {
      ghost.classList.remove("scale-in-center");
      ghost.classList.add("scale-out-center");
      destroyEnemy.play();
      bullettPosY = 30;
      moveBullet = 0;
      score += 50;
      setTimeout(function () {
        ghostPos();
      }, 850);
    } else if ((bullettX + 30 > spectrePosX && bullettPosY >= 520) && (bullettX - 50 < spectrePosX) && bullettPosY >= 520) {
      spectre.classList.remove("scale-in-center");
      spectre.classList.add("scale-out-center");
      destroyEnemy.play();
      bullettPosY = 30;
      moveBullet = 0;
      score -= 60;
      setTimeout(function () {
        spectrePos();
      }, 850);
    } else {
      // A korábban a pad pozícióját felvett lövedék repülése függőlegesen felfelé
      bullettPosY += moveBullet;
      fire.style.display = "block";
      fire.style.bottom = bullettPosY + "px";
    }

    // Megjelenítés a layouton, DOM-on keresztül manipuláljuk az oldalt
    ghostBomb.style.left = bombPosX + "px";
    ghostBomb.style.top = bombPosY + "px";
    ghost.style.left = ghostPosX + "px";
    spectreBomb.style.left = bomb2PosX + "px";
    spectreBomb.style.top = bomb2PosY + "px";
    spectre.style.left = spectrePosX + "px";
    lifeContainer.textContent = life;
    scoreContainer.textContent = score;
    fire.style.left = bullettX + "px";
  }
}, 1000 / 60);

startMainMenu();