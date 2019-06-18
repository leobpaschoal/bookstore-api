'use strict';

const Config = use('Config');
const Response = Config.get('app.response');
const Book = use('App/Models/Book');
const GenreBook = use('App/Models/GenreBook');

class BookController {
  async list() {
    try {
      const allBooks = await Book.query()
        .with('author')
        .with('genres')
        .fetch();
      return Response.getResponse(Response.statusSuccess, Response.successMessage, allBooks);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async save({ request }) {
    const data = request.all();
    const genres = data.genres;
    const toEdit = data.id !== 0 ? true : false;

    delete data.genres;

    if (toEdit) {
      return await this.edit(data, genres);
    }

    delete data.id;

    try {
      const book = await Book.create(data);
      await this.makeGenreBooks(genres, book.id);
      const getBook = await this.getBookById(book.id);
      const bookMessageCreated = 'Book ' + data.title + ' was created with success';

      return Response.getResponse(Response.statusSuccess, bookMessageCreated, getBook);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async edit(data, genres) {
    try {
      await Book.query()
        .where('id', data.id)
        .update({
          title: data.title,
          author_id: data.author_id,
          description: data.description,
          quantity: data.quantity,
          isbn: data.isbn
        });

      await this.makeGenreBooks(genres, data.id);
      const getBook = await this.getBookById(data.id);
      const bookMessageEdited = 'Book ' + data.title + ' was edited with success';

      return Response.getResponse(Response.statusSuccess, bookMessageEdited, getBook);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async makeGenreBooks(genres, bookId) {
    const genresToSave = genres.map(genre => {
      return {
        genre_id: genre,
        book_id: bookId
      };
    });

    await GenreBook.query()
      .where('book_id', bookId)
      .delete();
    await GenreBook.createMany(genresToSave);
  }

  async stock({ request }) {
    const data = request.all();

    try {
      await Book.query()
        .where('id', data.id)
        .update({ quantity: data.quantity });

      const getBook = await this.getBookById(data.id);

      return Response.getResponse(Response.statusSuccess, Response.successMessage, getBook);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async delete({ request }) {
    const data = request.all();

    try {
      await GenreBook.query()
        .where('book_id', data.bookId)
        .delete();

      await Book.query()
        .where('id', data.bookId)
        .delete();
      const bookMessageDeleted = 'The book was deleted with success';
      return Response.getResponse(Response.statusSuccess, bookMessageDeleted, Response.noData);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async getBookById(id) {
    return await Book.query()
      .where('id', id)
      .with('author')
      .with('genres')
      .first();
  }
}

module.exports = BookController;
