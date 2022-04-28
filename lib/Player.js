const Potion = require('../lib/Potion');

//Using arrow functions, this now refers to whatever it means in the outer scope. In the case of Node.js, the global this is just an empty object (e.g., {}). Thus, all of these properties become undefined.

// The moral of the story is that it's important to create a new instance of the object we're testing in every test to give that test a fresh start.
function Player(name = '') {
  this.name = name;

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);

  this.inventory = [new Potion('health'), new Potion()];
}

Player.prototype.getStats = function() {
  return {
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility
  };
};

Player.prototype.getInventory = function() {
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
};

Player.prototype.getHealth = function() {
  return `${this.name}'s health is now ${this.health}!`;
};

Player.prototype.isAlive = function() {
  if(this.health === 0) {
    return false;
  } else {
    return true;
  }
};

Player.prototype.reduceHealth = function(health) {
  this.health -= health;

  if(this.health < 0) {
    this.health = 0;
  }
};

module.exports = Player;