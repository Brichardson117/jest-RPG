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

Player.prototype.getAttackValue = function() {
  const min = this.strength - 5;
  const max = this.strength + 5;

  return Math.floor(Math.random() * (max - min) + min);
};

//Remember that .push() is an Array method that adds an item to the end of an array.
Player.prototype.addPotion = function(potion) {
  this.inventory.push(potion);
};

//Thus, two things are happening here: the original inventory array has a single Potion removed at the specified index value and put into a new "removed items" array, then the Potion at index [0] of this "removed items" array is saved in a potion variable.
Player.prototype.usePotion = function(index) {
  //The .splice() method removes items from an array and returns the removed item(s) as a new array
  const potion = this.getInventory().splice(index,1)[0];

  switch(potion.name) {
    case 'agility':
      this.agility += potion.value;
      breake;
    case 'health':
      this.health += potion.value;
      break;
    case 'strength':
      this.strength += potion.value;
      break;    
  }
};

module.exports = Player;