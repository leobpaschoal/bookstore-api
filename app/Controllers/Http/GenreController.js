'use strict';
const Config = use('Config');
const Response = Config.get('app.response');
const Genre = use('App/Models/Genre');
const GenreBook = use('App/Models/GenreBook');

class GenreController {
  async list() {
    try {
      const allGenres = await Genre.query()
        .with('books')
        .fetch();
      return Response.getResponse(Response.statusSuccess, Response.successMessage, allGenres);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async save({ request }) {
    const data = request.all();
    const toEdit = data.id !== 0 ? true : false;

    if (toEdit) {
      return await this.edit(data);
    }

    delete data.id;

    const existsGenre = await Genre.findBy('name', data.name);

    if (existsGenre) {
      const existsMessage = 'Genre ' + data.name + ' already exists';
      return Response.getResponse(Response.statusError, existsMessage, existsGenre);
    }

    try {
      const genre = await Genre.create(data);
      const genreCreatedMessage = 'Genre ' + data.name + ' was created with success!';
      return Response.getResponse(Response.statusSuccess, genreCreatedMessage, genre);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async edit(genre) {
    try {
      await Genre.query()
        .where('id', genre.id)
        .update({ name: genre.name });

      const getGenre = await this.getGenreById(genre.id);
      const genreMessageEdited = 'Genre ' + genre.name + ' was edited with success';

      return Response.getResponse(Response.statusSuccess, genreMessageEdited, getGenre);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async delete({ request }) {
    const data = request.all();

    try {
      const booksWithGenre = await GenreBook.findBy('genre_id', data.genreId);
      const hasBookWithGenre =
        'This genre is being used by a book(s). Please, delete or edit the book(s) before deleting it!';
      if (booksWithGenre) {
        return Response.getResponse(Response.statusError, hasBookWithGenre, Response.noData);
      }
      await Genre.query()
        .where('id', data.genreId)
        .delete();
      const genreMessageDeleted = 'The genre was deleted with success';
      return Response.getResponse(Response.statusSuccess, genreMessageDeleted, Response.noData);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async getGenreById(id) {
    return await Genre.query()
      .where('id', id)
      .first();
  }
}

module.exports = GenreController;
