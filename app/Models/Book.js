'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Book extends Model {
  author() {
    return this.belongsTo('App/Models/Author');
  }

  genres() {
    return this.belongsToMany('App/Models/Genre').pivotTable('genre_books');
  }
}

module.exports = Book;
