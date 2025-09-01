function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}
let timer = 120;
function displayResult(result) {
  resultTag.style.display = "flex";
  resultTag.innerHTML = result;
}

function determineWinner({ player, enemy, timerId }) {
clearTimeout(timerId);
  if (player.health === enemy.health) {
    displayResult("Tie");
  } else if (player.health > enemy.health) {
    displayResult("Player 1 won");
  } else {
    displayResult("Player 2 won");
  }
}

let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timerTag.innerHTML = timer;
    timer--;
  }
  if (timer == 0 || player.health<=0 || enemy.health<=0) {
    timer=0;
    timerTag.innerHTML = 0;
    determineWinner({player,enemy, timerId});
  }
}