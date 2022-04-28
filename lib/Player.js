const Potion = require('../lib/Potion');

//Using arrow functions, this now refers to whatever it means in the outer scope. In the case of Node.js, the global this is just an empty object (e.g., {}). Thus, all of these properties become undefined.

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

module.exports = Player;