import React, { Component } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefresh: true,
    };
  }

  setRefresh = (status) => {
    this.setState({
      isRefresh: status,
    });
  };

  render() {
    const { isRefresh } = this.state;

    return (
      <div className="App">
        <div className="content">
          <Header setRefresh={this.setRefresh} />
          <TodoList setRefresh={this.setRefresh} isRefresh={isRefresh} />
        </div>
      </div>
    );
  }
}

export default App;
