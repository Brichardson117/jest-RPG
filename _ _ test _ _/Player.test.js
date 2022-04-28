const Player = require('../lib/Player.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');

test('creates a player object', () => {
  const player = new Player('Dave');

  expect(player.name).toBe('Dave');
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));

  expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

test("gets player's stats as an object", () => {
  const player = new Player('Dave');

  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
  const player = new Player('Dave');

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
});


//We chose to create a Player method for this in order to help declutter the logic in Game. This way, the game doesn't have to include logic about concatenating player data.
test("gets player's health value", () => {
  const player = new Player('Dave');

  //The expect.stringContaining() method is an expect method that we can use to make sure our string includes our player's health. This is preferred in this case because we might need flexibility to change how the player's health will be displayed. This way, if that change happens, we won't need to update our test as well.
  expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

//Here, we're updating the value of our Player health halfway through the test so that we can check for both conditions: true and false.

test('checks if player is alive or not', () => {
  const player = new Player('Dave');

  //Remember, truthy values are values that will be coerced to true in Boolean contexts, such as inside if statements.
  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});

// In this case, we will call the reduceHealth() method twice—the second time with an absurdly high value to make sure that it never goes negative.
test("subtracts from player's health", () => {
  const player = new Player('Dave');
  const oldHealth = player.health;

  player.reduceHealth(5);

  expect(player.health).toBe(oldHealth - 5);

  player.reduceHealth(99999);

  expect(player.health).toBe(0);
});