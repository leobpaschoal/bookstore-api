'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GenreBooksSchema extends Schema {
  up() {
    this.create('genre_books', table => {
      table.increments();
      table
        .integer('book_id')
        .unsigned()
        .references('id')
        .inTable('books');
      table
        .integer('genre_id')
        .unsigned()
        .references('id')
        .inTable('genres');
      table.timestamps();
    });
  }

  down() {
    this.drop('genre_books');
  }
}

module.exports = GenreBooksSchema;
