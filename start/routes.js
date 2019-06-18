'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return 'adonis on';
});

// Book routes
Route.get('/books', 'BookController.list');
Route.post('/save-book', 'BookController.save');
Route.post('/stock-quantity', 'BookController.stock');
Route.post('/delete-book', 'BookController.delete');

// Author routes
Route.get('/authors', 'AuthorController.list');
Route.post('/save-author', 'AuthorController.save');
Route.post('/delete-author', 'AuthorController.delete');

// Genre routes
Route.get('/genres', 'GenreController.list');
Route.post('/save-genre', 'GenreController.save');
Route.post('/delete-genre', 'GenreController.delete');
