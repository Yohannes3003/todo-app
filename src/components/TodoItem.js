import React, { Component } from 'react';

class TodoItem extends Component {
  updateTodo = () => {
    const { todo, setRefresh } = this.props;
    todo.done = !todo.done;

    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log('todo updated.');
      setRefresh(true);
    });
  };

  deleteTodo = () => {
    const { todo, setRefresh } = this.props;

    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'DELETE',
    }).then(() => {
      console.log('todo deleted.');
      setRefresh(true);
    });
  };

  state = {
    isEditing: false,
    editedTitle: '',
  };

  editTodo = () => {
    const { todo } = this.props;
    this.setState({ isEditing: true, editedTitle: todo.title });
  };

  handleTitleChange = (e) => {
    this.setState({ editedTitle: e.target.value });
  };

  updateEditedTodo = () => {
    const { todo, setRefresh } = this.props;
    const { editedTitle } = this.state;

    const updatedTodo = { ...todo, title: editedTitle };

    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    }).then(() => {
      console.log('todo updated.');
      setRefresh(true);
      this.setState({ isEditing: false });
    });
  };

  cancelEdit = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { todo } = this.props;
    const { isEditing, editedTitle } = this.state;

    if (isEditing) {
      return (
        <li className="editing">
          <input type="text" value={editedTitle} onChange={this.handleTitleChange} />
          <span className="fa fa-check" onClick={this.updateEditedTodo}></span>
          <span className="fa fa-times" onClick={this.cancelEdit}></span>
        </li>
      );
    }
    return (
      <li className={`${todo.done ? 'checked' : ''}`}>
        <div onClick={this.updateTodo}>
          {todo.done ? <span className="fa fa-check-circle"></span> : <span className="fa fa-circle-thin"></span>}
          {todo.title}
          <div className="reminder">{todo.reminder}</div>
        </div>
        <span className="pencil" onClick={this.editTodo}>
          <span className="fa fa-pencil"></span>
        </span>
        <span className="close" onClick={this.deleteTodo}>
          <span className="fa fa-trash-o"></span>
        </span>
      </li>
    );
  }
}

export default TodoItem;
