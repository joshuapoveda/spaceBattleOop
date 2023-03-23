// Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, on a mission to destroy every last alien ship.

// Battle the aliens as you try to destroy them with your lasers.

// There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.

////MAIN CHARACTER OBJECT
class Player {
  //////ADDED FUCNTIONALITY, CHARACTER CREATION
  //let gameIntro = window.prompt("test");
  // if (gameIntro.toLowerCase() === "test") {
  //   console.log('testPassed');
  // }
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  //RETURNS ALIEN'S HULL HEALTH AFTER ATTACK
  playerAttack() {
    return Aliens[0].hull - this.firepower;
  }

  myRetreat() {
      alert("You choose to run and fight another day.");
      location.reload()
  }
}

////ALIEN CHARACTER OBJECT.
class Alien {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  //RETURNS PLAYER'S HULL HEALTH AFTER ATTACK W/ HIT OR MISS PROBABILITY
  enemyAttack() {
    console.log("incoming attack.");
    if (Math.random() < Aliens[0].accuracy) {
      console.log("You have been hit!");
      return ussAssembly.hull - this.firepower;
    } else {
      console.log("Miss!");
      return ussAssembly.hull;
    }
  }
}

////WIL GENERATE ALL OBJECTS.
class Factory {
  //GENERATES SINGLE PLAYER
  generatePlayer() {
    const mainPlayer = new Player(20, 5, 0.7);
    return mainPlayer;
  }

  //GENERATES AN ARRAY OF ALIEN OBJECTS WITH PROPERTIES RANDOMIZED TO SPEC
  generateAliens(num) {
    let arrayOfAliens = [];
    for (let i = 0; i < num; i++) {
      function getRandomNum(min, max) {
        return Math.random() * (max - min) + min;
      }
      let randomHull = Math.floor(getRandomNum(3, 7));
      let randomFirepower = Math.floor(getRandomNum(2, 5));
      let randomAcc = getRandomNum(0.6, 0.9);

      const alien = new Alien(randomHull, randomFirepower, randomAcc);
      arrayOfAliens.push(alien);
    }
    return arrayOfAliens;
  }
}
////NEW SET OF ALIENS
const setAliens = (num) => {
  const setOfAliens = new Factory();
  return setOfAliens.generateAliens(num);
};
let Aliens = setAliens(50);

////NEW PLAYER
const setPlayer = () => {
  const player = new Factory();
  return player.generatePlayer();
};
let ussAssembly = setPlayer();

////ROUND SIMULATION
const roundSimulation = () => {
  let attackOutcome = ussAssembly.playerAttack();

  if (attackOutcome <= 0) {
    console.log("Fire lasers.");
    Aliens.shift();
    console.log("Enemy vaporized.");
    console.table(Aliens);
  } else {
    console.log("Fire lasers. Enemy damaged.");
    let attackOutcome2 = Aliens[0].enemyAttack();
    Aliens[0].hull = attackOutcome;
    ussAssembly.hull = attackOutcome2;
    console.table(ussAssembly);
  }
  //END GAME PARAMS. TO-DO: IF HEALTH REACHES 0, GAME OVER. YOU WIN IF ALL ALIENS ARE DESTROYED. 
};

const fireBtn = document.querySelector(".attack");
fireBtn.addEventListener("click", roundSimulation);

const retBtn = document.querySelector(".retreat");
retBtn.addEventListener("click", ussAssembly.myRetreat);

console.table(Aliens);
console.table(ussAssembly);
