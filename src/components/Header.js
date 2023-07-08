import React, { Component } from 'react';

class Header extends Component {
  // class
  constructor(props) {
    // constructor
    super(props);
    this.state = {
      title: '',
      reminder: '',
      error: false, // Tambahkan state untuk error
    };
  }

  addTodo = () => {
    const { title, reminder } = this.state;
    const { setRefresh } = this.props;

    if (title.trim() !== '') {
      const newTodo = { title, reminder, done: false };

      fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      }).then(() => {
        this.setState({ title: '', reminder: '', error: false });
        setRefresh(true);

        setTimeout(() => {}, 500);
      });
    } else {
      this.setState({ error: true });
    }
  };

  handleInputChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleReminderChange = (e) => {
    this.setState({ reminder: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  };

  render() {
    const { title, reminder } = this.state;

    return (
      <div id="todo-header" className="header">
        <h1>To-Do-iT</h1>
        <input type="text" value={title} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} />
        <input type="datetime-local" value={reminder} onChange={this.handleReminderChange} />
        <span className="add-button" onClick={this.addTodo}>
          Add Task
        </span>
        {/* {error && <p className="error-message">Please enter a task title.</p>} Tampilkan pesan error jika tidak ada input */}
      </div>
    );
  }
}

export default Header;
