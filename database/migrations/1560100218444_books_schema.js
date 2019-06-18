'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class BooksSchema extends Schema {
  up() {
    this.create('books', table => {
      table.increments();
      table.string('title', 254).notNullable();
      table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('authors');
      table.text('description').notNullable();
      table.integer('quantity').notNullable();
      table.string('isbn', 30).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('books');
  }
}

module.exports = BooksSchema;
