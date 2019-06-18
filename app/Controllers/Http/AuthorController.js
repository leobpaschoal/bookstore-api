'use strict';

const Config = use('Config');
const Response = Config.get('app.response');
const Author = use('App/Models/Author');
const Book = use('App/Models/Book');

class AuthorController {
  async list() {
    try {
      const allAuthors = await Author.query()
        .with('books')
        .fetch();

      return Response.getResponse(Response.statusSuccess, Response.successMessage, allAuthors);
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

    const existsAuthor = await Author.findBy('name', data.name);

    if (existsAuthor) {
      const existsMessage = 'Author ' + data.name + ' already exists';
      return Response.getResponse(Response.statusError, existsMessage, existsAuthor);
    }

    try {
      const author = await Author.create(data);
      const authorCreatedMessage = 'Author ' + data.name + ' was created with success!';
      return Response.getResponse(Response.statusSuccess, authorCreatedMessage, author);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async edit(author) {
    try {
      await Author.query()
        .where('id', author.id)
        .update({
          name: author.name,
          birthdate: author.birthdate
        });

      const getAuthor = await this.getAuthorById(author.id);
      const authorMessageEdited = 'Author ' + author.name + ' was edited with success';

      return Response.getResponse(Response.statusSuccess, authorMessageEdited, getAuthor);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async delete({ request }) {
    const data = request.all();
    try {
      const booksWithAuthor = await Book.findBy('author_id', data.authorId);
      const hasBookWithAuthor =
        'This author is being used by a book(s). Please, delete or edit the book(s) before deleting it!';
      if (booksWithAuthor) {
        return Response.getResponse(Response.statusError, hasBookWithAuthor, Response.noData);
      }
      await Author.query()
        .where('id', data.authorId)
        .delete();
      const authorMessageDeleted = 'The author was deleted with success';
      return Response.getResponse(Response.statusSuccess, authorMessageDeleted, Response.noData);
    } catch (error) {
      return Response.getResponse(Response.statusError, error, Response.noData);
    }
  }

  async getAuthorById(id) {
    return await Author.query()
      .where('id', id)
      .first();
  }
}

module.exports = AuthorController;
