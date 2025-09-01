const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const resultTag = document.querySelector("#displayResult");
const timerTag = document.querySelector("#timer");

// 16:9 ratio
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "./img/background.png",
});

const shop = new Sprite({
  position: {
    x: 640,
    y: 160,
  },
  imgSrc: "./img/shop.png",
  scale: 2.5,
  framesMax: 6,
});

const player = new Fighter({
  position: {
    x: 100,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  attackBox: {
    offset: {
      x: 100,
      y: 100,
    },
    width: 150,
    height: 50,
  },
  color: "green",
  framesHold: 1,
  scale: 2.5,
  offset: {
    x: 215,
    y: 105,
  },
  sprites: {
    idle: {
      imgSrc: "./samurai/Idle.png",
      framesMax: 8,
    },
    run: {
      imgSrc: "./samurai/Run.png",
      framesMax: 8,
    },
    jump: {
      imgSrc: "./samurai/Jump.png",
      framesMax: 2,
    },
    fall: {
      imgSrc: "./samurai/Fall.png",
      framesMax: 2,
    },

    attack: {
      imgSrc: "./samurai/Attack1_cleaned.png",
      framesMax: 4,
    },
    takeHit: {
      imgSrc: "./samurai/Take hit.png",
      framesMax: 4,
    },
    death: {
      imgSrc: "./samurai/Death.png",
      framesMax: 6,
    },
  },
});
const enemy = new Fighter({
  position: {
    x: 400,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
  color: "blue",
  scale: 2.5,

  imgSrc: "./kenji/Idle.png",
  attackBox: {
    offset: {
      x: -180,
      y: 100,
    },
    width: 150,
    height: 50,
  },
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 120,
  },
  sprites: {
    idle: {
      imgSrc: "./kenji/Idle.png",
      framesMax: 4,
    },
    run: {
      imgSrc: "./kenji/Run.png",
      framesMax: 8,
    },
    jump: {
      imgSrc: "./kenji/Jump.png",
      framesMax: 2,
    },
    fall: {
      imgSrc: "./kenji/Fall.png",
      framesMax: 2,
    },
    attack: {
      imgSrc: "./kenji/Attack1.png",
      framesMax: 4,
    },
    takeHit: {
      imgSrc: "./kenji/Take hit.png",
      framesMax: 3,
    },
    death: {
      imgSrc: "./kenji/Death.png",
      framesMax: 7,
    },
  },
});

player.draw();

enemy.draw();

console.log(player);

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

decreaseTimer();

function animate() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprites("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprites("run");
  } else {
    player.switchSprites("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprites("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprites("fall");
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprites("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprites("run");
  } else {
    enemy.switchSprites("idle");
  }
  if (enemy.velocity.y < 0) {
    enemy.switchSprites("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprites("fall");
  }

  //player misses
  //   if(player.isAttacking && player.framesCurrent===4){
  //     player.isAttacking = false;
  //   }

  // // enemy misses
  //   if(enemy.isAttacking && enemy.framesCurrent===2){
  //     enemy.isAttacking = false;
  //   }

  //collision detection

  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 2
  ) {
    enemy.takeHit();
    player.isAttacking = false;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    enemy.isAttacking = false;
    player.takeHit();
    document.querySelector("#playerHealth").style.width = player.health + "%";
    console.log("enemy attack successful");
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      if (player.position.y + player.height >= canvas.height - 95) {
        player.velocity.y = -7;
        break;
      }
      break;
    case " ":
      player.attack();
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      if (enemy.position.y + enemy.height >= canvas.height - 95) {
        enemy.velocity.y = -7;
        break;
      }
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
  console.log(event.key);
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
  }
});

const socket = new WebSocket("ws://localhost:8080");
socket.onopen = () => {
  console.log("Connected to the server");
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(message);
  if (message.type === "movement") {
    const move = message.move;
    if (move === "left") {
      enemy.velocity.x = -5;
      enemy.switchSprites("run");
    } else if (move === "right") {
      enemy.velocity.x = 5;
      enemy.switchSprites("run");
    }
  }
};
