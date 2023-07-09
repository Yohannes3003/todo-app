import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  componentDidUpdate(prevProps) {
    const { isRefresh } = this.props;
    if (isRefresh && isRefresh !== prevProps.isRefresh) {
      this.fetchTodos();
    }
  }

  fetchTodos() {
    try {
      fetch('http://localhost:8000/todos')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { setRefresh } = this.props;
          setRefresh(false);
          this.setState({
            todos: data,
          });
        })
        .catch((err) => {
          const { setRefresh } = this.props;
          setRefresh(false);
          if (err.name === 'AbortError') {
            console.log('fetch aborted.');
          }
        });
    } catch (error) {
      console.log('An error occurred while fetching todos:', error);
    }
  }

  render() {
    const { todos } = this.state;
    const { setRefresh } = this.props;
    const todoItems = todos.map((todo) => <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />);

    const todoListObject = {
      //object
      title: 'My Todo List',
      items: todoItems,
    };
    return (
      <div>
        <h1>{todoListObject.title}</h1>
        <ul id="todo-list">
          {todos.map((todo) => (
            <TodoItemPolymorphic todo={todo} key={todo.id} setRefresh={setRefresh} />
          ))}
        </ul>
      </div>
    );
  }
}

class TodoItemPolymorphic extends TodoItem {
  // polymorphism
  updateTodo = () => {
    if (typeof this.props.todo !== 'undefined') {
      // Implementasi untuk kasus di mana todo diberikan
      const { todo, setRefresh } = this.props;
      const { editedTitle } = this.state;

      const updatedTodo = { ...todo, title: editedTitle };

      fetch('http://localhost:8000/todos/' + todo.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })
        .then((response) => {
          if (response.ok) {
            console.log('todo updated.');
            setRefresh(true);
            this.setState({ isEditing: false });
          } else {
            throw new Error('Failed to update todo.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Implementasi untuk kasus default jika todo tidak diberikan
      console.log('No todo provided for updateTodo.');
    }
  };

  deleteTodo = () => {
    if (typeof this.props.todo !== 'undefined') {
      // Implementasi untuk kasus di mana todo diberikan
      const { todo, setRefresh } = this.props;

      fetch('http://localhost:8000/todos/' + todo.id, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('todo deleted.');
            setRefresh(true);
          } else {
            throw new Error('Failed to delete todo.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Implementasi untuk kasus default jika todo tidak diberikan
      console.log('No todo provided for updateTodo.');
    }
  };
}

export default TodoList;
