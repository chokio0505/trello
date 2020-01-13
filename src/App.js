import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import todoService from './services/todos';
import bookService from './services/books'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom';

import Home from './components/Home';

const Book = (props) => {
  console.log('props : ', props);
  return (
    <div>
      <Link to={`/book/${props.id}`}>{props.name}</Link>
    </div>
  );
}

const App = () => {
  const [todos, setTodos] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState('');

  useEffect(() => {
    // setTodos(initialTodos);
    console.log('hook!!!!');
    bookService
      .getAll()
      .then(initialBooks => {
        setBooks(initialBooks);
      });
  }, []);

  useEffect(() => {
    if(bookId.length > 0) {
      todoService
        .getByBookId(bookId)
        .then(todos => {
          setTodos(todos);
        });
    }
  },[bookId])


  const toggleArchive = (todoId, bookId) => {
    // const book = books.find(book => book.bookId === bookId);
    // const todos = book.todo;
    // const todo = todos.find(todo => todo.todoId === todoId);
    // const changedTodo = { ...todo, isArchived: !todo.isArchived };
    // const filteredTodo = todos.filter(todo => todo.todoId !== todoId);
    // const newTodos = filteredTodo.concat(changedTodo);
    // const changedBook = { ...book, todo: newTodos };
    // const filterdBooks = books.filter(book => book.bookId !== bookId);
    // const newBooks = filterdBooks.concat(changedBook);

    // setBooks(newBooks);
    // setTodos(newTodos);
  }

  const todoList = () =>
    todos.map(todo => (
      <Todo
        content={todo.content}
        isArchived={todo.isArchived}
        key={todo.todoId}
        toggleArchive={() => toggleArchive(todo.todoId, todo.bookId)}
      />
    ));

  const bookList = () => {
    console.log('books : ', books);
    return (
      books.map(book => (
        <Book
          name={book.name}
          id={book.id}
          key={book.id}
        />
      ))
    )
  }


  const todoById = (id) => {
    // const todo = books.find(book => book.bookId === id);
    // if (todo) {
    //   setTodos(todo);
    // }
    setBookId(id);
    return todoList();
  }

  return (
    <div>
      <Router>
        <div>
          <Link to='/'>home</Link>
          <Link to='/books'>books</Link>
        </div>
        <Route exact path='/books' render={bookList} />
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/book/:id' render={({ match }) => todoById(match.params.id)} />
      </Router>
    </div>
  );
}

export default App;
