class Ship {
	constructor(name, hull, firePower, accuracy){
		this.name = name;
		this.hull = hull;
		this.firePower = firePower;
        this.accuracy = accuracy;
	}

	attack(target) {
		if (Math.random() < this.accuracy) {
			target.hull -= this.firePower;
			console.log(`${this.name} attacked ${target.name} and dealt ${this.firePower} damage`);
		}else {
			console.log(`${this.name} missed the attack on ${target.name}`)
		}
	}
}


class HumanShip extends Ship {
	constructor(name,hull, firePower, accuracy) {
		super(name, hull, firePower, accuracy)
	}
}

class AlienShip extends Ship {
	constructor(name, hull, firePower, accuracy) {
		super(name, hull, firePower, accuracy)
	}
}

class Game {
	constructor() {
	  this.humanShip = new HumanShip("USS Schwarzenegger", 15, 5, 0.7);
	  this.aliens = [];
	  this.round = 1;
	}
  
	addAlien(alienShip) {
	  this.aliens.push(alienShip);
	}
  
	checkWin() {
	  if (this.humanShip.hull <= 0) {
		console.log(`${this.humanShip.name} went kabloo-ey! Aliens win!`);
		return true;
	  } else if (this.aliens.every((alien) => alien.hull <= 0)) {
		console.log(`All aliens went kabloo-ey! Humans win!`);
		return true;
	  }
	  return false;
	}
  
	runRound() {
	  console.log(`----- Round ${this.round} -----`);
	  console.log(`${this.humanShip.name} (Human Ship) vs Aliens`);
  
	  this.humanShip.attack(this.aliens[0]);
	  if (this.aliens[0].hull <= 0) {
		console.log(`${this.aliens[0].name} went kabloo-ey!`);
		this.aliens.shift();
	  }
  
	  for (const alien of this.aliens) {
		if (alien.hull > 0) {
		  alien.attack(this.humanShip);
		  if (this.humanShip.hull <= 0) {
			console.log(`${this.humanShip.name} went kabloo-ey! Aliens win!`);
			return;
		  }
		}
	  }
  
	  this.round++;
	  this.checkWin() || this.runRound();
	}
  }
  
  // Function to generate random numbers between min and max (inclusive)
  function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to create a random alien ship
  function createRandomAlienShip() {
	const hull = getRandomNumber(3, 6);
	const firePower = getRandomNumber(2, 4);
	const accuracy = (getRandomNumber(6, 8) / 10).toFixed(1);
	return new AlienShip(`Alien Ship ${game.aliens.length + 1}`, hull, firePower, accuracy);
  }
  
  const game = new Game();
  
  // Create 6 random alien ships
  for (let i = 0; i < 6; i++) {
	const alienShip = createRandomAlienShip();
	game.addAlien(alienShip);
  }
  
  // Start the battle simulation
  console.log("Battle Begins!");
  game.runRound();