// Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, on a mission to destroy every last alien ship.

// Battle the aliens as you try to destroy them with your lasers.

// There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.

//<button class="attack">Start the first volley!</button>;

////MAIN CHARACTER OBJECT

function graphics() {
  const title = document.createElement("h1");
  title.textContent = "Space!";
  title.style.color = "rgb(177,161,139)";
  document.body.append(title);
  document.body.style.backgroundColor = "rgb(36, 49, 74)";
}
graphics();

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
    alert("Is this how you want to be remembered, captain?");
    location.reload();
  }
}

////ALIEN CHARACTER OBJECT.
class Alien {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  //RETURNS PLAYER'S HULL HEALTH AFTER ATTACK (INCLUDING HIT OR MISS PROBABILITY)
  enemyAttack() {
    const textGenerator = (funcText) => {
      const variableText = document.createElement("h3");
      variableText.textContent = funcText;
      if (funcText === "Near miss.") {
        variableText.style.color = "green";
      } else if (funcText === "We have been hit, sir.") {
        variableText.style.color = "red";
        variableText.textContent = `${funcText} ----> Hull Status ${ussAssembly.hull - this.firepower} HP.`;
      } else {
        variableText.style.color = "orange";
      }
      document.body.append(variableText);
    };

    console.log('%c "incoming attack!"', "font-size: 20px; color: orange");
    textGenerator("Incoming attack!");

    if (Math.random() < Aliens[0].accuracy) {
      console.log('%c "We have been hit, sir."',"font-size: 20px; color: red");
      textGenerator("We have been hit, sir.");
      return ussAssembly.hull - this.firepower;
    } else {
      console.log('%c "Near miss."', "font-size: 20px; color: green");
      textGenerator("Near miss.");
      return ussAssembly.hull;
    }
  }
}

////WILL GENERATE ALL OBJECTS.

class Factory {
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

function getRandomNum2(min, max) {
  return Math.random() * (max - min) + min;
}
let randNumGen = Math.floor(getRandomNum2(7, 20))
const Aliens = setAliens(randNumGen);

////NEW PLAYER
const setPlayer = () => {
  const player = new Factory();
  return player.generatePlayer();
};
const ussAssembly = setPlayer();

////ROUND SIMULATION
const roundSimulation = () => {
  let attackOutcome = ussAssembly.playerAttack();

  const textGenerator2 = (funcText) => {
    const variableText = document.createElement("h3");

    if (funcText === "Lasers fired! Enemy damaged.") {
      variableText.textContent = `${funcText} ----> Alien hull status: ${attackOutcome} HP`;
      variableText.style.color = "yellow";
    } else if (funcText === "Enemy vaporized, sir.") {
      variableText.textContent = `${funcText}`;
      variableText.style.color = "green";
    } else {
      variableText.textContent = `${funcText}`;
      variableText.style.color = "white";
    }
    document.body.append(variableText);
  };

  if (attackOutcome <= 0) {
    console.log('%c "Lasers fired!"',"font-size: 20px; color: beige");
    textGenerator2("Lasers fired!");
    Aliens.shift();

    console.log('%c "Enemy vaporized, sir."', "font-size: 20px; color: green");
    textGenerator2("Enemy vaporized, sir.");

    console.table(Aliens);
  } else {
    console.log('%c "Lasers fired! Enemy damaged."',"font-size: 20px; color: yellow");
    textGenerator2("Lasers fired! Enemy damaged.");

    let attackOutcome2 = Aliens[0].enemyAttack();
    Aliens[0].hull = attackOutcome;
    ussAssembly.hull = attackOutcome2;
    console.table(Aliens[0])
    console.table(ussAssembly);
  }

  if (ussAssembly.hull <= 0) {
    alert(
      "The hull of your ship implodes, ending the battle in a matter of seconds. Do you want to play again?"
    );
    location.reload();
  } else if (Aliens.length === 0) {
    alert(
      "Victory for the Assembly, sir! The void is clear of our alien aggressors, for now..."
    );
    location.reload();
    return;
  }
};

function btns() {
  const fire = document.createElement("BUTTON");
  let text1 = document.createTextNode("Fire laser.");
  fire.appendChild(text1);
  document.body.appendChild(fire);
  fire.classList.add("attack");
  fire.addEventListener("click", roundSimulation);

  linebreak = document.createElement("br");
  document.body.appendChild(linebreak);
  linebreak = document.createElement("br");
  document.body.appendChild(linebreak);

  const retreat = document.createElement("BUTTON");
  let text2 = document.createTextNode("Retreat");
  retreat.appendChild(text2);
  document.body.appendChild(retreat);
  retreat.classList.add("retreat");
  retreat.addEventListener("click", ussAssembly.myRetreat);
}

btns();

console.table(Aliens);
console.table(ussAssembly);
