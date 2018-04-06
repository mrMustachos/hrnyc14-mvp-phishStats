import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      items: []
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Item List</h1>
        <List items={this.state.items}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));