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

    return (
      <ul id="todo-list">
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
        ))}
      </ul>
    );
  }
}

export default TodoList;
