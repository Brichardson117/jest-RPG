//Using arrow functions, this now refers to whatever it means in the outer scope. In the case of Node.js, the global this is just an empty object (e.g., {}). Thus, all of these properties become undefined.
function Potion(name) {
  this.types = ['strength', 'agility', 'health'];
  this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

  if (this.name === 'health') {
    this.value = Math.floor(Math.random() * 10 + 30);
  } else {
    this.value = Math.floor(Math.random() * 5 + 7);
  }
}

module.exports = Potion;
