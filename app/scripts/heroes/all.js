define([
  './warrior',
  './mage',
  './sorcerer',
  './wizard',
  './rogue'
], function(Warrior, Mage, Sorcerer, Wizard, Rogue) {
    'use strict';

    return {
      Warrior: Warrior,
      Mage: Mage,
      Sorcerer: Sorcerer,
      Wizard: Wizard,
      Rogue: Rogue
    };
});
