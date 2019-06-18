'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Genre extends Model {
  books() {
    return this.belongsToMany('App/Models/Book').pivotTable('genre_books');
  }
}

module.exports = Genre;
