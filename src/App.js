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
    <div className="book">
      <Link to={`/books/${props.id}`}>{props.name}</Link>
    </div>
  );
}

const TodoForm = ({ onSubmit, value, handleChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={handleChange}
        />
        <button type="submit"> + </button>
      </form>
    </div>
  );
}

const App = () => {
  const [todos, setTodos] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [newTodoContent, setNewTodoContent] = useState('');

  useEffect(() => {
    bookService
      .getAll()
      .then(initialBooks => {
        setBooks(initialBooks);
      });
  }, []);

  useEffect(() => {
    if (bookId.length > 0) {
      todoService
        .getByBookId(bookId)
        .then(todos => {
          setTodos(todos);
        });
    } else {
      setTodos([]);
    }
  }, [bookId]);

  const addTodo = (event) => {
    event.preventDefault();
    debugger

    const newTodo = {
      content: newTodoContent,
      bookId: bookId
    }

    todoService
      .create(newTodo)
      .then(returnedTodo => {
        setTodos(todos.concat(returnedTodo))
        setNewTodoContent('');
      });
  }

  const handleTodoChange = (event) => {
    setNewTodoContent(event.target.value);
  }


  const toggleArchive = (todoId, isArchived) => {
    console.log('isArchived : ', isArchived);
    todoService
      .updateIsArchived(todoId, isArchived)
      .then(updatedTodo => {
        debugger
        setTodos(todos.map(todo => todo.id !== updatedTodo.id ? todo : updatedTodo))
      }, []);
  }

  const todoList = () =>
    todos.map(todo => (
      <Todo
        content={todo.content}
        isArchived={todo.isArchived}
        key={todo.todoId}
        toggleArchive={() => toggleArchive(todo.id, todo.isArchived)}
      />
    ));

  const bookList = () => {
    setBookId('');
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
    setBookId(id);
    return (
      <div>
        <TodoForm
          onSubmit={addTodo}
          newTodoContent={newTodoContent}
          handleChange={handleTodoChange}
        />
        { todoList() }
      </div>
      
    );
    
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
      <Route exact path='/books/:id' render={({ match }) => todoById(match.params.id)} />
    </Router>
  </div>
);
}

export default App;
