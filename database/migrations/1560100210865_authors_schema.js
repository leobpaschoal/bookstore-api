'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AuthorsSchema extends Schema {
  up() {
    this.create('authors', table => {
      table.increments();
      table.string('name', 254).notNullable();
      table.date('birthdate').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('authors');
  }
}

module.exports = AuthorsSchema;
