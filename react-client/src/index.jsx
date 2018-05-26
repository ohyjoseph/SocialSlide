import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  testPost() {
    axios.post('/login', {username: 'he', password: 'as'})
      .then((response) => {
        console.log(response);
      })
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
      <button onClick={this.testPost}>
        Post Test
      </button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));